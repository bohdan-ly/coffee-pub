import {
  default as react,
  default as reactModuleReload,
} from "@vitejs/plugin-react";
import reactPageReload from "@vitejs/plugin-react-refresh";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig((args) => {
  var env = loadEnv(args.mode, process.cwd());

  return {
    envPrefix: "REACT_APP",
    plugins: [
      env.VITE_DEV_HMR ? reactModuleReload() : reactPageReload(),
      tsconfigPaths(),
      react(),
    ],
    build: {
      sourcemap: true,
    },
  };
});
