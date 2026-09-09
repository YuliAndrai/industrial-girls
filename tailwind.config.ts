import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./apps/web/src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        panel: "#0C0C0C",
        soft: "#161616",
        raveRed: "#FF0000",
        raveRedDark: "#990000",
        raveRedGlow: "rgba(255, 0, 0, 0.4)",
        raveBorder: "#222222",
        raveTextMuted: "#888888"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      },
      boxShadow: {
        rave: "0 0 30px rgba(255, 0, 0, 0.45)",
        raveGlow: "0 0 15px rgba(255, 0, 0, 0.3)",
        tactileRed: "3px 3px 0px #FF0000",
        tactileWhite: "3px 3px 0px #FFFFFF",
        tactilePressed: "1px 1px 0px #FF0000"
      },
      backgroundImage: {
        scanline: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
        gridPattern: "radial-gradient(rgba(255,0,0,0.15) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
