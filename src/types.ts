import type { District, Province, Subdistrict } from './data/types';

export type {
  Abolished,
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

/** What `match()` takes: names as people write them, in Thai or English. */
export type MatchQuery = {
  /** Subdistrict name, such as `'ต.เกาะเต่า'` or `'Ko Tao'`. */
  subdistrict: string;
  /** District name. `'เมือง'` or `'Mueang'` matches the capital district of the province. */
  district?: string;
  /** Province name. `'กทม'` and `'กรุงเทพ'` match Bangkok, `'อยุธยา'` matches Phra Nakhon Si Ayutthaya. */
  province?: string;
  /** Five-digit postal code. */
  postalCode?: string;
};
