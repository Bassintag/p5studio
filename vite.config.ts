import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: path.join(__dirname, "src", "app"),
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, "dist", "app"),
    minify: false,
  },
});
