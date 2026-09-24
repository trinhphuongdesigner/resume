import { NextRequest, NextResponse } from "next/server";
import type { Browser } from "puppeteer-core";
import { getResumeFilename } from "@/data/resume";

// Needs full Node (child processes, filesystem access for the Chromium
// binary) — the Edge runtime can't run a browser.
export const runtime = "nodejs";
// The resume content changes over time (job titles, projects); never let
// this route or its result get statically cached.
export const dynamic = "force-dynamic";

const isProduction = process.env.NODE_ENV === "production";

// Vercel's serverless functions can't fit the ~300MB Chromium build that
// full `puppeteer` bundles, so production launches the trimmed
// @sparticuz/chromium binary via puppeteer-core instead. Local dev uses
// plain `puppeteer`, which downloads and manages its own Chromium — no
// extra setup needed on a dev machine.
async function launchBrowser(): Promise<Browser> {
  if (isProduction) {
    const [{ default: chromium }, { launch }] = await Promise.all([
      import("@sparticuz/chromium"),
      import("puppeteer-core"),
    ]);
    return launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const { launch } = await import("puppeteer");
  return launch({ headless: true }) as unknown as Promise<Browser>;
}

export async function GET(request: NextRequest) {
  let browser: Browser | undefined;

  const requestedTheme = request.nextUrl.searchParams.get("theme");
  const theme = requestedTheme === "dark" ? "dark" : "light";

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();

    // Runs before any of the page's own scripts (including the inline
    // theme-init script in layout.tsx <head>), so the PDF always renders
    // the requested theme regardless of what a real visitor last chose.
    await page.evaluateOnNewDocument((themeToApply: string) => {
      try {
        window.localStorage.setItem("theme", themeToApply);
      } catch {
        // localStorage unavailable — the inline script falls back to
        // prefers-color-scheme, which the headless browser reports as light.
      }
    }, theme);

    await page.setViewport({ width: 1280, height: 1024 });
    await page.goto(request.nextUrl.origin, { waitUntil: "networkidle0" });

    // Switches on the site's @media print rules (hide nav/buttons, force
    // the single-column card layout, break-inside: avoid on cards) before
    // Chromium paginates the page.
    await page.emulateMediaType("print");
    await page.evaluate(() => document.fonts.ready);

    const pdfBuffer = await page.pdf({
      printBackground: true,
      // Reads page size/margin from the @page rule in globals.css (A4
      // portrait, shared by both themes) instead of duplicating those
      // numbers here.
      preferCSSPageSize: true,
    });

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${getResumeFilename()}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  } finally {
    await browser?.close();
  }
}
