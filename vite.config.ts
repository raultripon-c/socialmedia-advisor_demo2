import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? "/socialmedia-advisor_demo2/" : "/",
  server: {
    port: 4320,
    open: true,
  },
});
