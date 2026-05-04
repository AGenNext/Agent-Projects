import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { brand: "#4F46E5" } } },
  plugins: []
} satisfies Config;
