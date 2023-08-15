import { defineConfig } from "vite";
import {createHtmlPlugin} from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2020",
    rollupOptions: {
      input: {
        app: "./index.html", // default
      },
    },
  },
  plugins: [createHtmlPlugin({
    inject: {
      data: {
        additionalCode: (process?.env?.ADDITIONAL_CODE) || ""
      }
    }
  })],
});
