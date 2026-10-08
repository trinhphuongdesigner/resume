// Lets TypeScript resolve side-effect CSS imports (e.g. `import "./globals.css"`)
// so editors don't flag them under `noUncheckedSideEffectImports`.
declare module "*.css";
