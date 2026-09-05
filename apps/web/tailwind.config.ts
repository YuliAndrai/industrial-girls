/**
 * @file apps/web/tailwind.config.ts
 * @description Layer 1: Presentation - Package-level Tailwind configuration for apps/web.
 * Extends monorepo root Tailwind theme and maps relative content glob paths.
 */

import type { Config } from "tailwindcss";
import rootConfig from "../../tailwind.config";

const config: Config = {
  ...rootConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    ...(Array.isArray(rootConfig.content) ? rootConfig.content : [])
  ]
};

export default config;
