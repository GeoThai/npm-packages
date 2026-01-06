import subdistricts from "../data/data/v3/subdistricts.json";
import type { Subdistrict, SubdistrictIndex } from "../types";
import { cache } from "../utils/cache";
import { createService } from "../utils/create-service";
import { recordToArray } from "../utils/record-to-array";

export const createSubdistrictService = (
  data: Record<SubdistrictIndex, Subdistrict>,
) => {
  const subdistricts = recordToArray(data);
  return createService<Subdistrict>(subdistricts, "code");
};

const subdistrictService = createService<Subdistrict>(
  recordToArray(subdistricts),
  "code",
);

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
  const subdistricts = subdistrictService.getAll();
  cache.set<Subdistrict[]>(key, subdistricts);
  return subdistricts;
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
  const subdistricts = subdistrictService.getByCriterion(criterion);
  cache.set(key, subdistricts);
  return subdistricts;
}
