import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/my_uiux_portfolio/" : "/",
  server: {
    host: "localhost",
    port: 5173,
    strictPort: false,
    open: false,
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
      interval: 100,
    },
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
    sourcemap: mode === "development",
  },
  define: {
    __DEV__: mode === "development",
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
  plugins: [
    react({
      devTarget: "esnext",
    }), 
    expressPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@emailjs/browser"
    ],
    force: mode === "development",
  },
  esbuild: {
    define: {
      global: "globalThis",
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
