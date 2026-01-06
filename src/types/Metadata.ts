export type Metadata = {
  version: string;
  last_updated: string;
  source: string;
  stats: {
    provinces: number;
    districts: number;
    subdistricts: number;
    postal_codes: number;
  };
};
