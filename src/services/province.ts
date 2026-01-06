import provinces from "../data/provinces.json";
import type { Province, ProvinceIndex } from "../types";
import { cache } from "../utils/cache";
import { createService } from "../utils/create-service";
import { recordToArray } from "../utils/record-to-array";

export const createProvinceService = (
  data: Record<ProvinceIndex, Province>,
) => {
  const provinces = recordToArray(data);
  return createService<Province>(provinces, "code");
};

const provinceService = createService<Province>(
  recordToArray(provinces),
  "code",
);

/**
 *
 */
export function getAllProvinces(): Province[] {
  const key = "provinces";
  if (cache.has(key)) {
    return cache.get<Province[]>(key)!;
  }
  const provinces = provinceService.getAll();
  cache.set<Province[]>(key, provinces);
  return provinces;
}

/**
 *
 * @param code
 */
export function getProvinceByCode(code: ProvinceIndex): Province | undefined {
  const key = `province-${code}`;
  if (cache.has(key)) {
    return cache.get<Province>(key)!;
  }
  const province = provinceService.getByCode(code);
  cache.set(key, province);
  return province;
}

/**
 *
 * @param criterion
 */
export function getProvincesByCriterion(
  criterion: Partial<Province>,
): Province[] {
  const key = `provinces-${JSON.stringify(criterion)}`;
  if (cache.has(key)) {
    return cache.get<Province[]>(key)!;
  }
  const provinces = provinceService.getByCriterion(criterion);
  cache.set(key, provinces);
  return provinces;
}
