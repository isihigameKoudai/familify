import { defineConfig } from "@solidjs/start/config";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { getPrerenderRoutes } from "./src/prerender/routes";

// ビルド時にプリレンダールートを生成
const prerenderRoutes = await getPrerenderRoutes();

export default defineConfig({
  server: {
    preset: "vercel",
    prerender: {
      routes: prerenderRoutes
    }
  },
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
