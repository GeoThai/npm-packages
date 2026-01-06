import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [/\.json$/],
  copy: [
    { from: "data/data/v4/geo.json", to: "dist/data" },
    { from: "data/data/v4/metadata.json", to: "dist/data" },
    { from: "data/data/v4/postal_lookup.json", to: "dist/data" },
  ],
});
