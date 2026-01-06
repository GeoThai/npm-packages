import { describe, expect, test } from "vitest";
import {
  getAllSubdistricts,
  getSubdistrictByCode,
  getSubdistrictsByCriterion,
  type Subdistrict,
} from "../../src";

describe("Subdistrict Service", () => {
  test("should retrieve all subdistricts", () => {
    const subdistricts = getAllSubdistricts();
    expect(subdistricts).toBeInstanceOf(Array);
    expect(subdistricts.length).toBeGreaterThan(0);

    // Test cache hit
    const cachedSubdistricts = getAllSubdistricts();
    expect(cachedSubdistricts).toBe(subdistricts);
  });

  test("should retrieve a subdistrict by ID", () => {
    const code = "100101";
    const subdistrict = getSubdistrictByCode(code);
    expect(subdistrict).toBeDefined();
    expect(subdistrict?.code).toBe(Number(code));

    // Test cache hit
    const cachedSubdistrict = getSubdistrictByCode(code);
    expect(cachedSubdistrict).toBe(subdistrict);
  });

  test("should return undefined for an invalid subdistrict ID", () => {
    const invalidCode = "99999";
    // @ts-expect-error eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const subdistrict = getSubdistrictByCode(invalidCode);
    expect(subdistrict).toBeUndefined();
  });

  test("should retrieve subdistricts by a specific criterion", () => {
    const criterion: Partial<Subdistrict> = {
      name_en: "Phra Borom Maha Ratchawang",
    };
    const subdistricts = getSubdistrictsByCriterion(criterion);
    expect(subdistricts).toBeInstanceOf(Array);
    expect(subdistricts.length).toBeGreaterThan(0);
    expect(subdistricts[0]?.name_en).toBe("Phra Borom Maha Ratchawang");

    // Test cache hit
    const cachedSubdistricts = getSubdistrictsByCriterion(criterion);
    expect(cachedSubdistricts).toBe(subdistricts);
  });

  test("should return an empty array for a non-matching criterion", () => {
    const criterion: Partial<Subdistrict> = {
      name_en: "Non-Existent Subdistrict",
    };
    const subdistricts = getSubdistrictsByCriterion(criterion);
    expect(subdistricts).toBeInstanceOf(Array);
    expect(subdistricts.length).toBe(0);
  });
});
