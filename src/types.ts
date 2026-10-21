import type { District, Province, Subdistrict } from './data/types';

export type {
  District,
  DistrictCode,
  Province,
  ProvinceCode,
  Subdistrict,
  SubdistrictCode,
} from './data/types';

/** A subdistrict together with the district and province it is in. */
export type Address = { province: Province; district: District; subdistrict: Subdistrict };

/** One match from `search()`. Check `level` to know which kind of area `area` is. */
export type SearchResult =
  | { level: 'province'; area: Province }
  | { level: 'district'; area: District }
  | { level: 'subdistrict'; area: Subdistrict };

/** Options for `search()`. */
export type SearchOptions = {
  /** Most results to return. Default 10. */
  limit?: number;
};
