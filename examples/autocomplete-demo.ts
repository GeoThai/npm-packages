// This file demonstrates auto-completion for province, district, subdistrict, and postal codes
import {
  getDistrictByCode,
  getPostalCode,
  getProvinceByCode,
  getSubdistrictByCode,
} from "../src";

// Province code auto-completion - try typing "1" and you'll see suggestions
const bangkok = getProvinceByCode("10"); // ✓ Auto-complete works!
const chiangMai = getProvinceByCode("50"); // ✓ Auto-complete works!

// District code auto-completion
const phraNakhon = getDistrictByCode("1001"); // ✓ Auto-complete works!

// Subdistrict code auto-completion
const subdistrict = getSubdistrictByCode("100101"); // ✓ Auto-complete works!

// Postal code auto-completion
const postal = getPostalCode("10100"); // ✓ Auto-complete works!

console.log({ bangkok, chiangMai, phraNakhon, subdistrict, postal });
