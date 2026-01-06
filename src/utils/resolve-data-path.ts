import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolves the path to a data file, checking production path first then falling back to development path
 *
 * @param filename - The name of the data file (e.g., "geo.json", "metadata.json")
 * @param importMetaUrl - The import.meta.url from the calling module
 * @returns The resolved path to the data file
 */
export function resolveDataPath(
  filename: string,
  importMetaUrl: string,
): string {
  const currentDir = dirname(fileURLToPath(importMetaUrl));

  // Find the project root by looking for the src directory
  // From src/services -> go up 2 levels
  // From src -> go up 1 level
  const srcDir = currentDir.includes("/services")
    ? join(currentDir, "../..")
    : join(currentDir, "..");

  const prodPath = join(srcDir, "dist/data", filename);
  const devPath = join(srcDir, "data/data/v4", filename);

  return existsSync(prodPath) ? prodPath : devPath;
}
