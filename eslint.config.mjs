import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextCoreWebVitals,
  {
    rules: {
      // These React 19 advisory rules require broader component refactors.
      // Keep the correctness-focused hooks rules enabled in CI.
      "react-hooks/globals": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "dist/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
]);
