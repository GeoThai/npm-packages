import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Metadata } from "./types";

export * from "./services/district";
export * from "./services/postal-code";
export * from "./services/province";
export * from "./services/subdistrict";
export * from "./types";
export * from "./utils/criteria-matcher";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "../dist/data/metadata.json");
const devPath = join(__dirname, "../data/data/v4/metadata.json");
const metaData = JSON.parse(
  readFileSync(existsSync(dataPath) ? dataPath : devPath, "utf-8"),
) as Metadata;

export const metadata: Metadata = metaData;
