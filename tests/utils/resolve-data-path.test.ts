import { describe, expect, test } from "vitest";
import { resolveDataPath } from "../../src/utils/resolve-data-path";

describe("resolveDataPath", () => {
  const GEO_JSON = "geo.json";
  const METADATA_JSON = "metadata.json";
  const DATA_V4_PATH = "/data/data/v4";

  test("should resolve path from services directory", () => {
    // Simulate calling from src/services/
    const mockUrl = "file:///home/user/project/src/services/test.ts";
    const result = resolveDataPath(GEO_JSON, mockUrl);

    // Should contain data/data/v4 (dev path)
    expect(result).toContain(`${DATA_V4_PATH}/${GEO_JSON}`);
  });

  test("should resolve path from src directory", () => {
    // Simulate calling from src/
    const mockUrl = "file:///home/user/project/src/index.ts";
    const result = resolveDataPath(METADATA_JSON, mockUrl);

    // Should contain data/data/v4 (dev path)
    expect(result).toContain(`${DATA_V4_PATH}/${METADATA_JSON}`);
  });

  test("should handle different file names", () => {
    const mockUrl = "file:///home/user/project/src/test.ts";

    const geoPath = resolveDataPath(GEO_JSON, mockUrl);
    const metadataPath = resolveDataPath(METADATA_JSON, mockUrl);
    const postalPath = resolveDataPath("postal_lookup.json", mockUrl);

    expect(geoPath).toContain(GEO_JSON);
    expect(metadataPath).toContain(METADATA_JSON);
    expect(postalPath).toContain("postal_lookup.json");
  });

  test("should handle utils directory path", () => {
    // Simulate calling from src/utils/
    const mockUrl = "file:///home/user/project/src/utils/helper.ts";
    const result = resolveDataPath(GEO_JSON, mockUrl);

    // Should contain data/data/v4 (dev path since /utils is not /services)
    expect(result).toContain(`${DATA_V4_PATH}/${GEO_JSON}`);
  });

  test("should resolve correctly from tests directory", () => {
    // Simulate calling from tests/
    const mockUrl = "file:///home/user/project/tests/test.ts";
    const result = resolveDataPath(GEO_JSON, mockUrl);

    // Should contain data/data/v4
    expect(result).toContain(`${DATA_V4_PATH}/${GEO_JSON}`);
  });
});
