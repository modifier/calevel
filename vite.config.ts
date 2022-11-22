import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2020",
    rollupOptions: {
      external: /^lit/,
      input: {
        app: "./index.html", // default
      },
    },
  },
});
