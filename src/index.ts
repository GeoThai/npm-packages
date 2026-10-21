import districtRows from './data/districts.ts';
import rows from './data/provinces.ts';
import subdistrictRows from './data/subdistricts.ts';

export type Province = { code: string; name_th: string; name_en: string };
export type District = Province & { province_code: string };
export type Subdistrict = District & { district_code: string; postal_codes: string[] };

const list: Province[] = rows.map(([code, name_th, name_en]) => ({ code, name_th, name_en }));
const byCode = new Map(list.map((p) => [p.code, p]));
const districtList = districtRows.map(([code, name_th, name_en]): District => ({
  code,
  name_th,
  name_en,
  province_code: code.slice(0, 2),
}));
const districtsBy = Map.groupBy(districtList, (d) => d.province_code);
const districtByCode = new Map(districtList.map((d) => [d.code, d]));
const subdistrictList = subdistrictRows.map(([code, name_th, name_en, postal]): Subdistrict => ({
  code,
  name_th,
  name_en,
  district_code: code.slice(0, 4),
  province_code: code.slice(0, 2),
  postal_codes: postal.split(' '),
}));
const subdistrictsBy = Map.groupBy(subdistrictList, (s) => s.district_code);
const subdistrictByCode = new Map(subdistrictList.map((s) => [s.code, s]));

/** Every province, sorted by code. */
export function provinces(): Province[] {
  return [...list];
}

/** The province with this two-digit code, or undefined. */
export function province(code: string): Province | undefined {
  return byCode.get(code);
}

/** The districts of a province, sorted by code. Empty for an unknown province. */
export function districts(provinceCode: string): District[] {
  return [...(districtsBy.get(provinceCode) ?? [])];
}

/** The district with this four-digit code, or undefined. */
export function district(code: string): District | undefined {
  return districtByCode.get(code);
}

/** The subdistricts of a district, sorted by code. Empty for an unknown district. */
export function subdistricts(districtCode: string): Subdistrict[] {
  return [...(subdistrictsBy.get(districtCode) ?? [])];
}

/** The subdistrict with this six-digit code, or undefined. */
export function subdistrict(code: string): Subdistrict | undefined {
  return subdistrictByCode.get(code);
}
