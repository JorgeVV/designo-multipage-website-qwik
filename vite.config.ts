import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    build: {
      assetsInlineLimit: 1000,
    },
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
