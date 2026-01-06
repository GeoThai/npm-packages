import metaData from "./data/metadata.json";
import type { Metadata } from "./types";

export * from "./services/district";
export * from "./services/postal-code";
export * from "./services/province";
export * from "./services/subdistrict";
export * from "./types";
export * from "./utils/criteria-matcher";
export const metadata: Metadata = metaData;
