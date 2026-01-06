import districts from "../data/data/v3/districts.json";
import type { District, DistrictIndex } from "../types";
import { cache } from "../utils/cache";
import { createService } from "../utils/create-service";
import { recordToArray } from "../utils/record-to-array";

export const createDistrictService = (
  data: Record<DistrictIndex, District>,
) => {
  const districts = recordToArray(data);
  return createService<District>(districts, "code");
};

const districtService = createService<District>(
  recordToArray(districts),
  "code",
);

/**
 * Retrieves all districts from the database.
 *
 * @returns An array of all district objects
 */
export function getAllDistricts(): District[] {
  const key = "districts";
  const cached = cache.get<District[]>(key);
  if (cached) {
    return cached;
  }
  const districts = districtService.getAll();
  cache.set<District[]>(key, districts);
  return districts;
}

/**
 * Retrieves a district by its unique code.
 *
 * @param code - The unique identifier code of the district
 * @returns The district object if found, undefined otherwise
 */
export function getDistrictByCode(code: DistrictIndex): District | undefined {
  const key = `district-${code}`;
  const cached = cache.get<District>(key);
  if (cached) {
    return cached;
  }
  const district = districtService.getByCode(code);
  cache.set(key, district);
  return district;
}

/**
 * Retrieves districts that match the specified search criteria.
 *
 * @param criterion - The partial district object containing search criteria
 * @returns An array of districts matching the criteria
 */
export function getDistrictsByCriterion(
  criterion: Partial<District>,
): District[] {
  const key = `districts-${JSON.stringify(criterion)}`;
  const cached = cache.get<District[]>(key);
  if (cached) {
    return cached;
  }
  const districts = districtService.getByCriterion(criterion);
  cache.set(key, districts);
  return districts;
}
