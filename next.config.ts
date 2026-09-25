import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // puppeteer-core/@sparticuz/chromium resolve their embedded Chromium
  // binary via require.resolve/__dirname at runtime; webpack's default
  // bundling of route handlers rewrites those paths and breaks it. Marking
  // them external keeps them as plain `require()`s so Next's serverless
  // file tracing can find and ship the binary — without this, the /api/
  // generate-pdf route throws (and falls back to window.print()) the
  // instant it tries to launch the browser on Vercel.
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
};

export default nextConfig;
