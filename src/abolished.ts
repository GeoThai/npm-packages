import rows from './data/abolished';
import sources from './data/abolished-sources';
import { districtByCode, provinceByCode } from './tables';
import type { Abolished, MatchQuery } from './types';
import { isDistrict, isProvince } from './utils/areas';
import { normalize } from './utils/normalize';
import { once } from './utils/once';

const LEVELS = { 2: 'province', 4: 'district', 6: 'subdistrict' } as const;

const list: () => Abolished[] = /* @__PURE__ */ once(() =>
  rows.map(([code, name_th, name_en, abolished_on, successors, basis, inForce, source]) => {
    const level = LEVELS[code.length as keyof typeof LEVELS];
    if (!level) throw new Error(`abolished area ${code} has no level`);
    return {
      code,
      name_th,
      name_en,
      level,
      parent_code: level === 'province' ? null : code.slice(0, -2),
      abolished_on,
      successors: successors ? successors.split(' ') : [],
      successors_basis: basis,
      successors_in_force: inForce,
      successors_source: source === null ? null : (sources[source] ?? null),
    };
  }),
);

/**
 * Lists the areas DOPA abolished, sorted by code. Their codes are no longer in use,
 * but old records may still hold them.
 *
 * @returns A new array of abolished districts and subdistricts, with the date each one ended.
 * @example
 * import { abolishedAreas } from 'geothai/abolished';
 * abolishedAreas().find((a) => a.code === '100205')?.abolished_on; // '2006-01-01'
 */
export function abolishedAreas(): Abolished[] {
  return [...list()];
}

/**
 * Finds abolished subdistricts by the name an old record holds, and the current addresses that
 * took their place. Use it when `match()` finds nothing for a name from an old record.
 *
 * The district and the province narrow the list as in `match()`. A district that no longer
 * exists is not checked. Postal codes are not checked, because old records often hold the code
 * of the new area.
 *
 * @param query - The names as the old record has them. See {@link MatchQuery}.
 * @returns Every abolished subdistrict that fits. Its `successors` are the current codes: pass
 *   one to `address()` from `geothai` for the full address.
 * @example
 * import { matchAbolished } from 'geothai/abolished';
 * matchAbolished({ subdistrict: 'แขวงบางนา', district: 'เขตบางนา', province: 'กทม' })[0]?.successors;
 * // ['104702', '104703']
 */
export function matchAbolished(query: MatchQuery): Abolished[] {
  const name = normalize(query.subdistrict);
  if (!name) return [];
  const districtName = query.district ? normalize(query.district) : '';
  const provinceName = query.province ? normalize(query.province) : '';
  return list().filter((a) => {
    if (a.level !== 'subdistrict') return false;
    if (normalize(a.name_th) !== name && normalize(a.name_en ?? '') !== name) return false;
    const p = provinceByCode().get(a.code.slice(0, 2));
    if (provinceName && !(p && isProvince(p, provinceName))) return false;
    const d = districtByCode().get(a.code.slice(0, 4));
    return !(districtName && d && !isDistrict(d, districtName));
  });
}
