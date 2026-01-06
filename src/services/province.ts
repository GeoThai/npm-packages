import geoData from "../data/data/v4/geo.json";
import type { Province, ProvinceIndex } from "../types";
import { cache } from "../utils/cache";
import { createService } from "../utils/create-service";

const provinces = geoData as Province[];

export const createProvinceService = (data: Province[]) => {
  return createService<Province>(data, "code");
};

const provinceService = createService<Province>(provinces, "code");

/**
 * Retrieves all provinces from the database.
 *
 * @returns An array of all province objects
 */
export function getAllProvinces(): Province[] {
  const key = "provinces";
  const cached = cache.get<Province[]>(key);
  if (cached) {
    return cached;
  }
  const allProvinces = provinceService.getAll();
  cache.set<Province[]>(key, allProvinces);
  return allProvinces;
}

/**
 * Retrieves a province by its unique code.
 *
 * @param code - The unique identifier code of the province
 * @returns The province object if found, undefined otherwise
 */
export function getProvinceByCode(code: ProvinceIndex): Province | undefined {
  const key = `province-${code}`;
  const cached = cache.get<Province>(key);
  if (cached) {
    return cached;
  }
  const province = provinceService.getByCode(code);
  cache.set(key, province);
  return province;
}

/**
 * Retrieves provinces that match the specified search criteria.
 *
 * @param criterion - The partial province object containing search criteria
 * @returns An array of provinces matching the criteria
 */
export function getProvincesByCriterion(
  criterion: Partial<Province>,
): Province[] {
  const key = `provinces-${JSON.stringify(criterion)}`;
  const cached = cache.get<Province[]>(key);
  if (cached) {
    return cached;
  }
  const matchedProvinces = provinceService.getByCriterion(criterion);
  cache.set(key, matchedProvinces);
  return matchedProvinces;
}

// Export the raw data for other services
export { provinces as rawProvinces };
