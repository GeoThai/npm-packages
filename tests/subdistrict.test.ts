import { describe, expect, test } from "vitest";
import {
  getAllSubdistricts,
  getSubdistrictByCode,
  getSubdistrictsByCriterion,
  type Subdistrict,
} from "../dist";

describe("Subdistrict Service", () => {
  test("should retrieve all subdistricts", () => {
    const subdistricts = getAllSubdistricts();
    expect(subdistricts).toBeInstanceOf(Array);
    expect(subdistricts.length).toBeGreaterThan(0);
  });

  test("should retrieve a subdistrict by ID", () => {
    const code = "100101";
    const subdistrict = getSubdistrictByCode(code);
    expect(subdistrict).toBeDefined();
    expect(subdistrict?.code).toBe(Number(code));
  });

  test("should return undefined for an invalid subdistrict ID", () => {
    const invalidCode = "99999";
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
