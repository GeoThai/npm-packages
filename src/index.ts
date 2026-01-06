import { readFileSync } from "node:fs";
import type { Metadata } from "./types";
import { resolveDataPath } from "./utils/resolve-data-path";

export * from "./services/district";
export * from "./services/postal-code";
export * from "./services/province";
export * from "./services/subdistrict";
export * from "./types";
export * from "./utils/criteria-matcher";

const metaData = JSON.parse(
  readFileSync(resolveDataPath("metadata.json", import.meta.url), "utf-8"),
) as Metadata;

export const metadata: Metadata = metaData;
