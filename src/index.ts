import districtRows from './data/districts';
import rows from './data/provinces';
import subdistrictRows from './data/subdistricts';
import type { District, Province, Subdistrict } from './types';

export type Address = { province: Province; district: District; subdistrict: Subdistrict };
export type SearchResult =
  | { level: 'province'; area: Province }
  | { level: 'district'; area: District }
  | { level: 'subdistrict'; area: Subdistrict };

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
const subdistrictsByPostal = new Map<string, Subdistrict[]>();
for (const s of subdistrictList) {
  for (const code of s.postal_codes) {
    subdistrictsByPostal.set(code, [...(subdistrictsByPostal.get(code) ?? []), s]);
  }
}

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

/** A subdistrict with its district and province, or undefined for an unknown code. */
export function address(subdistrictCode: string): Address | undefined {
  const found = subdistrictByCode.get(subdistrictCode);
  if (!found) return undefined;
  const parentDistrict = districtByCode.get(found.district_code);
  const parentProvince = byCode.get(found.province_code);
  if (!parentDistrict || !parentProvince) return undefined;
  return { province: parentProvince, district: parentDistrict, subdistrict: found };
}

/** The subdistricts that use this five-digit postal code, sorted by code. Empty if none do. */
export function byPostalCode(postalCode: string): Subdistrict[] {
  return [...(subdistrictsByPostal.get(postalCode) ?? [])];
}

// Words people type before a name ("อำเภอ…", "เขต…") and the marks English names differ by.
const PREFIX = /^(?:จังหวัด|อำเภอ|เขต|ตำบล|แขวง|กิ่งอำเภอ)/;
const key = (text: string): string =>
  text
    .toLowerCase()
    .replaceAll(/[\s.'-]/g, '')
    .replace(PREFIX, '');

let index: { result: SearchResult; keys: string[] }[] | undefined;

/**
 * Areas whose Thai or English name contains the query, in any of the three levels.
 * Names that start with the query come first, then provinces before districts before subdistricts.
 */
export function search(query: string, { limit = 10 }: { limit?: number } = {}): SearchResult[] {
  const q = key(query);
  if (!q) return [];
  index ??= [
    ...list.map((area): SearchResult => ({ level: 'province', area })),
    ...districtList.map((area): SearchResult => ({ level: 'district', area })),
    ...subdistrictList.map((area): SearchResult => ({ level: 'subdistrict', area })),
  ].map((result) => ({ result, keys: [key(result.area.name_th), key(result.area.name_en)] }));

  const starts: SearchResult[] = [];
  const contains: SearchResult[] = [];
  for (const { result, keys } of index) {
    if (keys.some((k) => k.startsWith(q))) starts.push(result);
    else if (keys.some((k) => k.includes(q))) contains.push(result);
  }
  return [...starts, ...contains].slice(0, limit);
}
