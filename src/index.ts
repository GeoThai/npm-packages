import rows from './data/provinces.ts';

export type Province = { code: string; name_th: string; name_en: string };

const list: Province[] = rows.map(([code, name_th, name_en]) => ({ code, name_th, name_en }));

/** Every province, sorted by code. */
export function provinces(): Province[] {
  return [...list];
}
