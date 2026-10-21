import rows from './data/provinces.ts';

export type Province = { code: string; name_th: string; name_en: string };

const list: Province[] = rows.map(([code, name_th, name_en]) => ({ code, name_th, name_en }));
const byCode = new Map(list.map((p) => [p.code, p]));

/** Every province, sorted by code. */
export function provinces(): Province[] {
  return [...list];
}

/** The province with this two-digit code, or undefined. */
export function province(code: string): Province | undefined {
  return byCode.get(code);
}
