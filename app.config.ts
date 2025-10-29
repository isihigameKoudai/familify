import { defineConfig } from "@solidjs/start/config";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path";

export default defineConfig({
  vite: {
    resolve: {
      conditions: []
    },
    plugins: [
      vanillaExtractPlugin({}),
      TanStackRouterVite({ target: "solid" })
    ]
  }
});
