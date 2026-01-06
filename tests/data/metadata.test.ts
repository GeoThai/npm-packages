import { describe, expect, test } from "vitest";
import metaData from "../../data/data/v4/metadata.json";
import { metadata } from "../../src";

describe("Metadata", () => {
  test("should match the expected metadata", () => {
    expect(metadata).toEqual(metaData);
  });

  test("should have v4 version", () => {
    expect(metadata.version).toBe("4.0.0");
  });

  test("should have description and features", () => {
    expect(metadata.description).toBeDefined();
    expect(metadata.features).toBeInstanceOf(Array);
    expect(metadata.features.length).toBeGreaterThan(0);
  });
});
