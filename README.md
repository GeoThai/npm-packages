# GeoThai npm-packages

Every province, district, subdistrict and postal code of Thailand, in one small package with types and search.

The package is [`@geothai/core`](https://www.npmjs.com/package/@geothai/core). Until 4.2, it was `geothai`, which now points here.

[👉 Website](https://geothai.fasu.dev) · [👉 Data and changelog](https://github.com/GeoThai/data)

## Features

- 77 provinces, 928 districts and 7,436 subdistricts with Thai and English names and DOPA codes
- Postal codes per subdistrict, and a lookup from a postal code to its subdistricts
- Search by Thai or English name, with or without spaces, hyphens or the word for the level
- Your bundler keeps only the levels you call: `province()` alone adds about 1.4 kB
- Types and autocomplete for every field and every code, from the GeoThai/data schema
- Runs in browsers, Node, Bun, Deno and edge runtimes, with no dependencies

## Install

```sh
npm install @geothai/core
```

The package is ESM. Node 22.12 and later can also load it with `require()`.

## Usage

```ts
import { address, byPostalCode, districts, province, search, subdistricts } from '@geothai/core';

province('84');
// { code: '84', name_th: 'สุราษฎร์ธานี', name_en: 'Surat Thani' }

districts('84').length; // 19
subdistricts('8405').map((s) => s.name_en); // ['Ko Pha-ngan', 'Ban Tai', 'Ko Tao']

byPostalCode('84280').map((s) => s.name_th); // ['เกาะพะงัน', 'บ้านใต้']

const a = address('840503');
// { province: { … 'สุราษฎร์ธานี' }, district: { … 'เกาะพะงัน' }, subdistrict: { … 'เกาะเต่า' } }

search('phangan').map((r) => `${r.level} ${r.area.name_th}`);
// ['district เกาะพะงัน', 'subdistrict เกาะพะงัน']

match({ subdistrict: 'ต.ตลาด', district: 'อ.เมือง', province: 'สุราษฎร์ธานี' })[0]?.subdistrict.code;
// '840101'
```

## API

| Function                     | Returns                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `provinces()`                | All 77 provinces, sorted by code                                                      |
| `province(code)`             | One province, or `undefined`                                                          |
| `districts(provinceCode)`    | The districts of a province, empty for an unknown code                                |
| `district(code)`             | One district, or `undefined`                                                          |
| `subdistricts(districtCode)` | The subdistricts of a district, empty for an unknown code                             |
| `subdistrict(code)`          | One subdistrict, or `undefined`                                                       |
| `address(subdistrictCode)`   | The subdistrict with its district and province, or `undefined`                        |
| `byPostalCode(postalCode)`   | The subdistricts that use a postal code                                               |
| `search(query, { limit })`   | Provinces, districts and subdistricts whose name has the query                        |
| `match(query)`               | The addresses that fit a hand-written subdistrict, district, province and postal code |
| `dataVersion`                | The GeoThai/data release in this package, such as `'2026.10.23'`                      |

Every function takes codes as strings and returns a new array, so you can sort or change it.

`match()` is for addresses typed by hand, such as old records or form input. It reads short forms such as `ต.`, `อ.` and `จ.`, the word `เมือง` for a capital district, and `กทม` for Bangkok. Names must match in full. One result means the address is clear. More than one means you need another field: 795 subdistrict names are used more than once. None means no current subdistrict has the name.

The areas that DOPA abolished have their own entry. The main entry does not hold them, so they stay out of your bundle:

```ts
import { abolishedAreas } from '@geothai/core/abolished';

const bangNa = abolishedAreas().find((a) => a.code === '104701');
bangNa?.abolished_on; // '2022-04-22'
bangNa?.successors; // ['104702', '104703']
bangNa?.successors_basis; // 'notice'
```

`successors` lists the codes that took an abolished area's place. `successors_basis` says how sure the link is: `'notice'` comes from a Royal Gazette notice, with the date and source in `successors_in_force` and `successors_source`. `'name'` is a match by Thai name for codes DOPA dropped in 2006, likely but not proven. When no successor is known, `successors` is empty.

For a name from an old record that `match()` does not find, `matchAbolished()` looks in the abolished subdistricts:

```ts
import { matchAbolished } from '@geothai/core/abolished';

matchAbolished({ subdistrict: 'แขวงบางนา', district: 'เขตบางนา', province: 'กทม' }).map(
  (a) => a.successors,
);
// [['104702', '104703']]
```

For maps on the same codes, use [`@geothai/maps`](https://github.com/GeoThai/maps): SVG maps of every province, district and subdistrict, with React, Vue and Svelte components.

## Types

```ts
import type { Province, ProvinceCode, SearchResult, Subdistrict } from '@geothai/core/types';
```

| Type                                                     | Content                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------- |
| `Province`, `District`, `Subdistrict`, `Abolished`       | One area. Each field has its description from the data schema  |
| `ProvinceCode`, `DistrictCode`, `SubdistrictCode`        | Every code in use, for autocomplete and checks at compile time |
| `Address`, `SearchResult`, `SearchOptions`, `MatchQuery` | What `address()`, `search()` and `match()` take and return     |

The functions take `string`, not the code types. A data release can remove a code, and that must not break your build in a patch update.

## Versions

A new GeoThai/data release ships as a patch version. A change to the API gets a minor or major version. `dataVersion` tells you which data you have. The changes in each data release are at [geothai.fasu.dev/changelog](https://geothai.fasu.dev/changelog/).

## Upgrading from geothai 1.x to 3.x

The old package `geothai` is now `@geothai/core`. The API is new, and the data is new too. Install the new package and remove the old one:

```sh
npm uninstall geothai
npm install @geothai/core
```

```diff
- import { getAllProvinces } from 'geothai';
+ import { provinces } from '@geothai/core';
```

### Codes

Every code is now a string. The digits did not change: they are the DOPA codes, so `10` becomes `'10'` and `100101` becomes `'100101'`. If you stored old codes as numbers, convert them with `String(code)`.

### Functions

| v1                                                  | v2 and v3                                             | `@geothai/core`                                        |
| --------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| `getAllProvinces()`                                 | `getAllProvinces()`                                   | `provinces()`                                          |
| `getProvinceById(10)`                               | `getProvinceByCode(10)`                               | `province('10')`                                       |
| `getAllDistricts()`                                 | `getAllDistricts()`                                   | `provinces().flatMap((p) => districts(p.code))`        |
| `getDistrictById(1001)`                             | `getDistrictByCode(1001)`                             | `district('1001')`                                     |
| `getDistrictsByCriterion({ province_id: 10 })`      | `getDistrictsByCriterion({ province_code: 10 })`      | `districts('10')`                                      |
| `getAllSubdistricts()`                              | `getAllSubdistricts()`                                | `subdistricts()` for each district, as above           |
| `getSubdistrictById(100101)`                        | `getSubdistrictByCode(100101)`                        | `subdistrict('100101')`                                |
| `getSubdistrictsByCriterion({ district_id: 1001 })` | `getSubdistrictsByCriterion({ district_code: 1001 })` | `subdistricts('1001')`                                 |
| `getPostalCode(10200)`                              | `getPostalCode(10200)`                                | `byPostalCode('10200')`                                |
| `getAllPostalCodes()`                               | `getAllPostalCodes()`                                 | No direct match. See [Postal codes](#postal-codes)     |
| `get*ByCriterion({ en: 'Bangkok' })`                | `get*ByCriterion({ name_en: 'Bangkok' })`             | `search('Bangkok')` or `match({ … })`                  |
| `matchCriteria()`                                   | `matchCriteria()`                                     | Removed. Use `.filter()` on a list                     |
| —                                                   | `createProvinceService()` and the others              | Removed. Call the functions directly                   |
| `metadata`                                          | `metadata`                                            | `dataVersion`                                          |
| —                                                   | `rawProvinces` (v3)                                   | `provinces()`, then `districts()` and `subdistricts()` |

`search()` ignores case and spaces. It also finds part of a name. Use it for a search box. `match()` takes a full address that a person typed, and returns the subdistricts that fit it. Use it to clean old records.

### Fields

| v1                     | v2                     | v3                               | `@geothai/core`                    |
| ---------------------- | ---------------------- | -------------------------------- | ---------------------------------- |
| `id` (number)          | `code` (number)        | `code` (number)                  | `code` (string)                    |
| `th`, `en`             | `name_th`, `name_en`   | `name_th`, `name_en`             | `name_th`, `name_en`               |
| —                      | —                      | `name_th_lower`, `name_en_lower` | Removed. `search()` ignores case   |
| `province_id`          | `province_code`        | `province_code`                  | `province_code` (string)           |
| `district_id`          | `district_code`        | `district_code`                  | `district_code` (string)           |
| `districts` (codes)    | `districts` (codes)    | `districts` (objects)            | Removed. Call `districts(code)`    |
| `subdistricts` (codes) | `subdistricts` (codes) | `subdistricts` (objects)         | Removed. Call `subdistricts(code)` |
| `postal_code` (number) | `postal_code` (number) | `postal_code` (number)           | `postal_codes` (array of strings)  |

A subdistrict can have more than one postal code. Old code that read `postal_code` must read `postal_codes[0]`, or show every code in the array.

### Postal codes

The old `PostalCode` object is gone. `byPostalCode()` returns the subdistricts that use a postal code. To get the district and province names too, as the v3 `addresses` gave you, pass each code to `address()`:

```ts
import { address, byPostalCode } from '@geothai/core';

const rows = byPostalCode('84280').map((s) => address(s.code));
rows[0]?.province.name_en; // 'Surat Thani'
```

### Data

The data is newer than in 1.x to 3.x. DOPA abolished some areas and made new ones since then. If you stored codes from the old package, some of them may be gone. `subdistrict(code)` returns `undefined` for such a code. To find the codes that replaced it, use `@geothai/core/abolished`:

```ts
import { subdistrict } from '@geothai/core';
import { abolishedAreas } from '@geothai/core/abolished';

const old = '100205'; // แขวงบางซื่อ of เขตดุสิต, abolished in 2006
if (!subdistrict(old)) {
  const gone = abolishedAreas().find((a) => a.code === old);
  gone?.successors; // ['102901']
}
```

The v3 code is on the [`archive`](https://github.com/GeoThai/npm-packages/tree/archive) branch.

## Why?

The data comes from [GeoThai/data](https://github.com/GeoThai/data). To see how it is built and checked, read [How it is built](https://github.com/GeoThai/data#how-it-is-built).

Address forms in Thailand need the same four lists, and most copies of them are old: merged postal codes, abolished subdistricts, English names on the wrong area. This package ships the data that GeoThai checks against official sources, in a form that costs a browser almost nothing until you call it.

## License

The code is [MIT](./LICENSE). The data is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) © 2026 [Pongsakorn Thipayanate](https://github.com/pyyupsk).

If you show the data, credit "GeoThai". Source credits and the license of thailand-geography-json are in [NOTICE](./NOTICE).
