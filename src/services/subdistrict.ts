import { readFileSync } from "node:fs";
import type { Province, Subdistrict, SubdistrictIndex } from "../types";
import { cache } from "../utils/cache";
import { createService } from "../utils/create-service";
import { resolveDataPath } from "../utils/resolve-data-path";

const provinces = JSON.parse(
  readFileSync(resolveDataPath("geo.json", import.meta.url), "utf-8"),
) as Province[];

// Flatten all subdistricts from all districts from all provinces
const subdistricts: Subdistrict[] = provinces.flatMap((province) =>
  province.districts.flatMap((district) => district.subdistricts),
);

export const createSubdistrictService = (data: Subdistrict[]) => {
  return createService<Subdistrict>(data, "code");
};

const subdistrictService = createService<Subdistrict>(subdistricts, "code");

/**
 * Retrieves all subdistricts from the database.
 *
 * @returns An array of all subdistrict objects
 */
export function getAllSubdistricts(): Subdistrict[] {
  const key = "subdistricts";
  const cached = cache.get<Subdistrict[]>(key);
  if (cached) {
    return cached;
  }
  const allSubdistricts = subdistrictService.getAll();
  cache.set<Subdistrict[]>(key, allSubdistricts);
  return allSubdistricts;
}

/**
 * Retrieves a subdistrict by its unique code.
 *
 * @param code - The unique identifier code of the subdistrict
 * @returns The subdistrict object if found, undefined otherwise
 */
export function getSubdistrictByCode(
  code: SubdistrictIndex,
): Subdistrict | undefined {
  const key = `subdistrict-${code}`;
  const cached = cache.get<Subdistrict>(key);
  if (cached) {
    return cached;
  }
  const subdistrict = subdistrictService.getByCode(code);
  cache.set(key, subdistrict);
  return subdistrict;
}

/**
 * Retrieves subdistricts that match the specified search criteria.
 *
 * @param criterion - The partial subdistrict object containing search criteria
 * @returns An array of subdistricts matching the criteria
 */
export function getSubdistrictsByCriterion(
  criterion: Partial<Subdistrict>,
): Subdistrict[] {
  const key = `subdistricts-${JSON.stringify(criterion)}`;
  const cached = cache.get<Subdistrict[]>(key);
  if (cached) {
    return cached;
  }
  const matchedSubdistricts = subdistrictService.getByCriterion(criterion);
  cache.set(key, matchedSubdistricts);
  return matchedSubdistricts;
}
