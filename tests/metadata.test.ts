import { describe, expect, test } from "vitest";
import { metadata } from "../src";
import metaData from "../src/data/metadata.json";

describe("Metadata", () => {
  test("should match the expected metadata", () => {
    expect(metadata).toEqual(metaData);
  });
});
