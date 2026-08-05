import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

const analyze = process.env.ANALYZE === "true";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    tailwindcss(),
    analyze
      ? visualizer({
          filename: path.resolve(import.meta.dirname, "reports/bundle.html"),
          gzipSize: true,
          brotliSize: true,
          open: false
        })
      : undefined
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src")
    }
  },
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 4173
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: isSsrBuild
        ? undefined
        : {
            manualChunks: {
              router: ["react-router-dom"],
              motion: ["gsap", "@gsap/react", "lenis"]
            }
          }
    }
  }
}));
