import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { baseServer, baseAssets } from "./src/base.js";

export default {
  root: "./src",
  public: "./src/public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [
    react(),
    ssr({
      baseAssets,
      baseServer,
    }),
  ],
};
