---
"geothai": major
---

### Changed

- **BREAKING:** Migrated data structure from v3 (flat references) to v4
  (nested objects)
- **BREAKING:** `Province.districts` now contains full `District[]` objects
  instead of `Array<number>` codes
- **BREAKING:** `District.subdistricts` now contains full `Subdistrict[]`
  objects instead of `Array<number>` codes
- **BREAKING:** `PostalCode` type completely restructured with new
  `postal_code` field and `addresses: PostalCodeAddress[]` instead of `code`
  and `subdistricts: Array<number>`

### Added

- New `name_en_lower` and `name_th_lower` fields to `Province`, `District`,
  and `Subdistrict` types for improved autocomplete support
- New `PostalCodeAddress` type with full location details (province, district,
  subdistrict names and codes)
- JSDoc documentation for all public API functions
- New export `rawProvinces` from province service

### Migration Guide

**Province Usage:**

```typescript
// Before (v2.0.1)
const province = getProvinceByCode("10");
const districtCodes = province.districts; // Array<number>

// After (v3.0.0)
const province = getProvinceByCode("10");
const districts = province.districts; // District[] - full objects
const firstDistrict = districts[0].name_en; // Direct access
```

**District Usage:**

```typescript
// Before (v2.0.1)
const district = getDistrictByCode("1001");
const subdistrictCodes = district.subdistricts; // Array<number>

// After (v3.0.0)
const district = getDistrictByCode("1001");
const subdistricts = district.subdistricts; // Subdistrict[] - full objects
const firstSubdistrict = subdistricts[0].name_en; // Direct access
```

**PostalCode Usage:**

```typescript
// Before (v2.0.1)
const postal = getPostalCode("10100");
const code = postal.code; // number
const subdistrictCodes = postal.subdistricts; // Array<number>

// After (v3.0.0)
const postal = getPostalCode("10100");
const code = postal.postal_code; // renamed from 'code'
const addresses = postal.addresses; // PostalCodeAddress[] with full details
const firstAddress = addresses[0].province_name_en; // Direct access to names
```
