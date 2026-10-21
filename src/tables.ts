import districtRows from './data/districts';
import provinceRows from './data/provinces';
import subdistrictRows from './data/subdistricts';
import type { District, Province, SearchResult, Subdistrict } from './types';
import { normalize } from './utils/normalize';
import { once } from './utils/once';

type Table<T> = () => T;

export const provinceList: Table<Province[]> = /* @__PURE__ */ once(() =>
  provinceRows.map(([code, name_th, name_en]) => ({ code, name_th, name_en })),
);

export const provinceByCode: Table<Map<string, Province>> = /* @__PURE__ */ once(
  () => new Map(provinceList().map((p) => [p.code, p])),
);

export const districtList: Table<District[]> = /* @__PURE__ */ once(() =>
  districtRows.map(([code, name_th, name_en]) => ({
    code,
    name_th,
    name_en,
    province_code: code.slice(0, 2),
  })),
);

export const districtsBy: Table<Map<string, District[]>> = /* @__PURE__ */ once(() =>
  Map.groupBy(districtList(), (d) => d.province_code),
);

export const districtByCode: Table<Map<string, District>> = /* @__PURE__ */ once(
  () => new Map(districtList().map((d) => [d.code, d])),
);

export const subdistrictList: Table<Subdistrict[]> = /* @__PURE__ */ once(() =>
  subdistrictRows.map(([code, name_th, name_en, postal]) => ({
    code,
    name_th,
    name_en,
    district_code: code.slice(0, 4),
    province_code: code.slice(0, 2),
    postal_codes: postal.split(' '),
  })),
);

export const subdistrictsBy: Table<Map<string, Subdistrict[]>> = /* @__PURE__ */ once(() =>
  Map.groupBy(subdistrictList(), (s) => s.district_code),
);

export const subdistrictByCode: Table<Map<string, Subdistrict>> = /* @__PURE__ */ once(
  () => new Map(subdistrictList().map((s) => [s.code, s])),
);

export const subdistrictsByPostal: Table<Map<string, Subdistrict[]>> = /* @__PURE__ */ once(() => {
  const map = new Map<string, Subdistrict[]>();
  for (const s of subdistrictList()) {
    for (const code of s.postal_codes) map.set(code, [...(map.get(code) ?? []), s]);
  }
  return map;
});

export const searchIndex: Table<{ result: SearchResult; keys: string[] }[]> = /* @__PURE__ */ once(
  () =>
    [
      ...provinceList().map((area): SearchResult => ({ level: 'province', area })),
      ...districtList().map((area): SearchResult => ({ level: 'district', area })),
      ...subdistrictList().map((area): SearchResult => ({ level: 'subdistrict', area })),
    ].map((result) => ({
      result,
      keys: [normalize(result.area.name_th), normalize(result.area.name_en)],
    })),
);
