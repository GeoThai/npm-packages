import districtRows from './data/districts';
import rows from './data/provinces';
import subdistrictRows from './data/subdistricts';
import type { District, Province, Subdistrict } from './types';

/** A subdistrict together with the district and province it is in. */
export type Address = { province: Province; district: District; subdistrict: Subdistrict };

/** One match from {@link search}. Check `level` to know which kind of area `area` is. */
export type SearchResult =
  | { level: 'province'; area: Province }
  | { level: 'district'; area: District }
  | { level: 'subdistrict'; area: Subdistrict };

/** Options for {@link search}. */
export type SearchOptions = {
  /** Most results to return. Default 10. */
  limit?: number;
};

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

/**
 * Every province, sorted by code.
 *
 * @returns A new array of all 77 provinces.
 * @example
 * provinces().map((p) => p.name_en); // ['Bangkok', 'Samut Prakan', …]
 */
export function provinces(): Province[] {
  return [...list];
}

/**
 * Finds a province by its code.
 *
 * @param code - Two-digit DOPA province code, such as `'84'`.
 * @returns The province, or `undefined` if no province has this code.
 * @example
 * province('84')?.name_en; // 'Surat Thani'
 */
export function province(code: string): Province | undefined {
  return byCode.get(code);
}

/**
 * Lists the districts of a province, sorted by code.
 *
 * @param provinceCode - Two-digit code of the province.
 * @returns A new array, empty if the province code is unknown.
 * @example
 * districts('84').length; // 19
 */
export function districts(provinceCode: string): District[] {
  return [...(districtsBy.get(provinceCode) ?? [])];
}

/**
 * Finds a district by its code.
 *
 * @param code - Four-digit DOPA district code, such as `'8405'`.
 * @returns The district, or `undefined` if no district has this code.
 * @example
 * district('8405')?.name_th; // 'เกาะพะงัน'
 */
export function district(code: string): District | undefined {
  return districtByCode.get(code);
}

/**
 * Lists the subdistricts of a district, sorted by code.
 *
 * @param districtCode - Four-digit code of the district.
 * @returns A new array, empty if the district code is unknown.
 * @example
 * subdistricts('8405').map((s) => s.name_en); // ['Ko Pha-ngan', 'Ban Tai', 'Ko Tao']
 */
export function subdistricts(districtCode: string): Subdistrict[] {
  return [...(subdistrictsBy.get(districtCode) ?? [])];
}

/**
 * Finds a subdistrict by its code.
 *
 * @param code - Six-digit DOPA subdistrict code, such as `'840503'`.
 * @returns The subdistrict, or `undefined` if no subdistrict has this code.
 * @example
 * subdistrict('840503')?.postal_codes; // ['84360']
 */
export function subdistrict(code: string): Subdistrict | undefined {
  return subdistrictByCode.get(code);
}

/**
 * Gets a subdistrict with its district and province in one call.
 *
 * @param subdistrictCode - Six-digit code of the subdistrict.
 * @returns The full address, or `undefined` if the subdistrict code is unknown.
 * @example
 * const a = address('840503');
 * `${a?.subdistrict.name_th} ${a?.district.name_th} ${a?.province.name_th}`;
 * // 'เกาะเต่า เกาะพะงัน สุราษฎร์ธานี'
 */
export function address(subdistrictCode: string): Address | undefined {
  const found = subdistrictByCode.get(subdistrictCode);
  if (!found) return undefined;
  const parentDistrict = districtByCode.get(found.district_code);
  const parentProvince = byCode.get(found.province_code);
  if (!parentDistrict || !parentProvince) return undefined;
  return { province: parentProvince, district: parentDistrict, subdistrict: found };
}

/**
 * Finds the subdistricts that use a postal code. One code can cover many subdistricts.
 *
 * @param postalCode - Five-digit Thailand Post code, such as `'84280'`.
 * @returns A new array sorted by subdistrict code, empty if no subdistrict uses the code.
 * @example
 * byPostalCode('84280').map((s) => s.name_en); // ['Ko Pha-ngan', 'Ban Tai']
 */
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
 * Finds provinces, districts and subdistricts by Thai or English name.
 * Case, spaces, hyphens and a leading word such as "อำเภอ" do not matter.
 * Names that start with the query come first, then provinces, districts and subdistricts.
 *
 * @param query - Part of a name, such as `'พะงัน'` or `'phangan'`.
 * @param options - See {@link SearchOptions}.
 * @returns The matches, empty for an empty query.
 * @example
 * search('phangan').map((r) => `${r.level} ${r.area.name_th}`);
 * // ['district เกาะพะงัน', 'subdistrict เกาะพะงัน']
 */
export function search(query: string, options: SearchOptions = {}): SearchResult[] {
  const { limit = 10 } = options;
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
