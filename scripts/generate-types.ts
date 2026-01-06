#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "src/data/data/v4");
const TYPES_DIR = join(process.cwd(), "src/types");

// Read data files
const geoData = JSON.parse(readFileSync(join(DATA_DIR, "geo.json"), "utf-8"));
const postalLookup = JSON.parse(
  readFileSync(join(DATA_DIR, "postal_lookup.json"), "utf-8"),
);

// Extract codes
const provinceCodes = new Set<number>();
const districtCodes = new Set<number>();
const subdistrictCodes = new Set<number>();

for (const province of geoData) {
  provinceCodes.add(province.code);
  for (const district of province.districts) {
    districtCodes.add(district.code);
    for (const subdistrict of district.subdistricts) {
      subdistrictCodes.add(subdistrict.code);
    }
  }
}

const postalCodes = Object.keys(postalLookup);

// Generate type unions
const provinceIndexType = Array.from(provinceCodes)
  .sort((a, b) => a - b)
  .map((code) => `"${code}"`)
  .join(" | ");

const districtIndexType = Array.from(districtCodes)
  .sort((a, b) => a - b)
  .map((code) => `"${code}"`)
  .join(" | ");

const subdistrictIndexType = Array.from(subdistrictCodes)
  .sort((a, b) => a - b)
  .map((code) => `"${code}"`)
  .join(" | ");

const postalCodeIndexType = postalCodes
  .sort()
  .map((code) => `"${code}"`)
  .join(" | ");

// Update Province.ts
const provinceContent = `import type { District } from "./District";

export type Province = {
  code: number;
  name_en: string;
  name_th: string;
  name_en_lower: string;
  name_th_lower: string;
  districts: District[];
};

export type ProvinceIndex = ${provinceIndexType};
`;

// Update District.ts
const districtContent = `import type { Subdistrict } from "./Subdistrict";

export type District = {
  code: number;
  name_en: string;
  name_th: string;
  name_en_lower: string;
  name_th_lower: string;
  province_code: number;
  subdistricts: Subdistrict[];
};

export type DistrictIndex = ${districtIndexType};
`;

// Update Subdistrict.ts
const subdistrictContent = `export type Subdistrict = {
  code: number;
  name_en: string;
  name_th: string;
  name_en_lower: string;
  name_th_lower: string;
  district_code: number;
  province_code: number;
  postal_code: number;
};

export type SubdistrictIndex = ${subdistrictIndexType};
`;

// Update PostalCode.ts
const postalCodeContent = `export type PostalCodeAddress = {
  province_code: number;
  province_name_en: string;
  province_name_th: string;
  district_code: number;
  district_name_en: string;
  district_name_th: string;
  subdistrict_code: number;
  subdistrict_name_en: string;
  subdistrict_name_th: string;
};

export type PostalCode = {
  postal_code: number;
  addresses: PostalCodeAddress[];
};

export type PostalCodeIndex = ${postalCodeIndexType};
`;

// Write files
writeFileSync(join(TYPES_DIR, "Province.ts"), provinceContent);
writeFileSync(join(TYPES_DIR, "District.ts"), districtContent);
writeFileSync(join(TYPES_DIR, "Subdistrict.ts"), subdistrictContent);
writeFileSync(join(TYPES_DIR, "PostalCode.ts"), postalCodeContent);

console.log("✅ Generated type definitions:");
console.log(`   - ${provinceCodes.size} province codes`);
console.log(`   - ${districtCodes.size} district codes`);
console.log(`   - ${subdistrictCodes.size} subdistrict codes`);
console.log(`   - ${postalCodes.length} postal codes`);
