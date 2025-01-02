import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-mode="dark"]'],

  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false,
  },
  important: "#app",
  plugins: [],
};
export default config;
