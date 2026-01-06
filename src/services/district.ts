import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { District, DistrictIndex, Province } from "../types";
import { cache } from "../utils/cache";
import { createService } from "../utils/create-service";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "../data/geo.json");
const devPath = join(__dirname, "../../data/data/v4/geo.json");
const provinces = JSON.parse(
  readFileSync(existsSync(dataPath) ? dataPath : devPath, "utf-8"),
) as Province[];

// Flatten all districts from all provinces
const districts: District[] = provinces.flatMap(
  (province) => province.districts,
);

export const createDistrictService = (data: District[]) => {
  return createService<District>(data, "code");
};

const districtService = createService<District>(districts, "code");

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
  const allDistricts = districtService.getAll();
  cache.set<District[]>(key, allDistricts);
  return allDistricts;
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
  const matchedDistricts = districtService.getByCriterion(criterion);
  cache.set(key, matchedDistricts);
  return matchedDistricts;
}
