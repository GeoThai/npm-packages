import districtRows from './data/districts.ts';
import rows from './data/provinces.ts';

export type Province = { code: string; name_th: string; name_en: string };
export type District = Province & { province_code: string };

const list: Province[] = rows.map(([code, name_th, name_en]) => ({ code, name_th, name_en }));
const byCode = new Map(list.map((p) => [p.code, p]));
const districtsBy = Map.groupBy(
  districtRows.map(([code, name_th, name_en]): District => ({
    code,
    name_th,
    name_en,
    province_code: code.slice(0, 2),
  })),
  (d) => d.province_code,
);

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
