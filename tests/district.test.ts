import { describe, expect, test } from "vitest";
import {
  type District,
  getAllDistricts,
  getDistrictByCode,
  getDistrictsByCriterion,
} from "../src";

describe("District Service", () => {
  test("should retrieve all districts", () => {
    const districts = getAllDistricts();
    expect(districts).toBeInstanceOf(Array);
    expect(districts.length).toBeGreaterThan(0);
  });

  test("should retrieve a district by code", () => {
    const code = "1001";
    const district = getDistrictByCode(code);
    expect(district).toBeDefined();
    expect(district?.code).toBe(Number(code));
  });

  test("should return undefined for an invalid district code", () => {
    const invalidCode = "99999";
    // @ts-expect-error eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const district = getDistrictByCode(invalidCode);
    expect(district).toBeUndefined();
  });

  test("should retrieve districts by a specific criterion", () => {
    const criterion: Partial<District> = { name_en: "Phra Nakhon" };
    const districts = getDistrictsByCriterion(criterion);
    expect(districts).toBeInstanceOf(Array);
    expect(districts.length).toBeGreaterThan(0);
    expect(districts[0]?.name_en).toBe("Phra Nakhon");
  });

  test("should return an empty array for a non-matching criterion", () => {
    const criterion: Partial<District> = { name_en: "Non-Existent District" };
    const districts = getDistrictsByCriterion(criterion);
    expect(districts).toBeInstanceOf(Array);
    expect(districts.length).toBe(0);
  });
});
