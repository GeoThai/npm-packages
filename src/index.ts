import version from './data/version';
import {
  districtByCode,
  districtsBy,
  provinceByCode,
  provinceList,
  searchIndex,
  subdistrictByCode,
  subdistrictsBy,
  subdistrictsByName,
  subdistrictsByPostal,
} from './tables';
import type {
  Address,
  District,
  MatchQuery,
  Province,
  SearchOptions,
  SearchResult,
  Subdistrict,
} from './types';
import { isDistrict, isProvince } from './utils/areas';
import { normalize } from './utils/normalize';

/**
 * The GeoThai/data release this package was built from, as `YYYY.M.D`.
 * See the changes in each release at https://geothai.fasu.dev/changelog/.
 *
 * @example
 * dataVersion; // '2026.10.20'
 */
export const dataVersion: string = version;

/**
 * Every province, sorted by code.
 *
 * @returns A new array of all 77 provinces.
 * @example
 * provinces().map((p) => p.name_en); // ['Bangkok', 'Samut Prakan', …]
 */
export function provinces(): Province[] {
  return [...provinceList()];
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
  return provinceByCode().get(code);
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
  return [...(districtsBy().get(provinceCode) ?? [])];
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
  return districtByCode().get(code);
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
  return [...(subdistrictsBy().get(districtCode) ?? [])];
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
  return subdistrictByCode().get(code);
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
  const found = subdistrictByCode().get(subdistrictCode);
  if (!found) return undefined;
  const parentDistrict = districtByCode().get(found.district_code);
  const parentProvince = provinceByCode().get(found.province_code);
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
  return [...(subdistrictsByPostal().get(postalCode) ?? [])];
}

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
  const q = normalize(query);
  if (!q) return [];

  const starts: SearchResult[] = [];
  const contains: SearchResult[] = [];
  for (const { result, keys } of searchIndex()) {
    if (keys.some((k) => k.startsWith(q))) starts.push(result);
    else if (keys.some((k) => k.includes(q))) contains.push(result);
  }
  return [...starts, ...contains].slice(0, limit);
}

/**
 * Finds the subdistricts that fit an address written by hand, such as one from an old record or a form.
 * Names must match in full, after the same clean-up as `search()`. Each field you give narrows the list.
 *
 * @param query - See {@link MatchQuery}. Empty fields are ignored.
 * @returns Every address that fits, sorted by subdistrict code. One result means the address is clear.
 *   More than one means you need another field. None means no current subdistrict has this name:
 *   for an old name, check `abolishedAreas()` in `geothai/abolished`.
 * @example
 * match({ subdistrict: 'วังทอง' }).length; // 9
 * match({ subdistrict: 'วังทอง', province: 'จ.พิษณุโลก' }).map((a) => a.subdistrict.code); // ['650801']
 * match({ subdistrict: 'ต.ตลาด', district: 'อ.เมือง', province: 'สุราษฎร์ธานี' })[0]?.subdistrict.code; // '840101'
 */
export function match(query: MatchQuery): Address[] {
  const name = normalize(query.subdistrict);
  const districtName = query.district ? normalize(query.district) : '';
  const provinceName = query.province ? normalize(query.province) : '';
  const postal = query.postalCode?.trim();
  if (!name) return [];
  return (subdistrictsByName().get(name) ?? []).flatMap((s) => {
    const found = address(s.code);
    if (!found) return [];
    if (postal && !s.postal_codes.includes(postal)) return [];
    if (provinceName && !isProvince(found.province, provinceName)) return [];
    if (districtName && !isDistrict(found.district, districtName)) return [];
    return [found];
  });
}
