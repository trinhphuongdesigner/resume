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
  // serverExternalPackages alone still isn't enough: @sparticuz/chromium
  // computes the path to its own bin/*.br files at runtime (not via a
  // statically analyzable require), so Next's output file tracing never
  // sees them and silently drops the whole bin/ directory from the deployed
  // function — the exact "input directory .../bin does not exist" error
  // seen in production. Forcing it in here is what actually ships the
  // binaries.
  outputFileTracingIncludes: {
    "/api/generate-pdf": ["./node_modules/@sparticuz/chromium/bin/**"],
  },
};

export default nextConfig;
