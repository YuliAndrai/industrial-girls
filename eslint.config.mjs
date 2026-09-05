import nextVitals from "eslint-config-next/core-web-vitals";

const reactHooks = nextVitals[0].plugins["react-hooks"];

const config = [
  ...nextVitals,
  {
    ignores: [
      "**/.next/**",
      "**/.vercel/**",
      "**/node_modules/**",
      "playwright-report/**",
      "test-results/**",
      ".blob-report/**",
      ".cache-synpress/**",
      ".agents/**"
    ]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks
    },
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/preserve-manual-memoization": "warn"
    }
  },
  {
    files: ["lib/software/**/*.{ts,tsx}", "apps/web/src/lib/software/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@knowledge/*", "@regulatory/*"]
        }
      ]
    }
  },
  {
    files: ["lib/knowledge/**/*.{ts,tsx}", "apps/web/src/lib/knowledge/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@software/*", "@regulatory/*"]
        }
      ]
    }
  },
  {
    files: ["lib/regulatory/**/*.{ts,tsx}", "apps/web/src/lib/regulatory/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@software/*", "@knowledge/*"]
        }
      ]
    }
  }
];

export default config;
