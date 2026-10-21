import rows from './data/abolished';
import type { Abolished } from './types';
import { once } from './utils/once';

const LEVELS = { 2: 'province', 4: 'district', 6: 'subdistrict' } as const;

const list: () => Abolished[] = /* @__PURE__ */ once(() =>
  rows.map(([code, name_th, name_en, abolished_on]) => {
    const level = LEVELS[code.length as keyof typeof LEVELS];
    if (!level) throw new Error(`abolished area ${code} has no level`);
    return {
      code,
      name_th,
      name_en,
      level,
      parent_code: level === 'province' ? null : code.slice(0, -2),
      abolished_on,
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
