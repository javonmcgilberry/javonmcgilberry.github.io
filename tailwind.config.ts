import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontWeight: {
        ["semi-bold"]: "500",
      },
      fontSize: {
        "7xl": "90px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "40px",
        },
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "1920px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
