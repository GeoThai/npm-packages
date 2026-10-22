# GeoThai npm-packages

Every province, district, subdistrict and postal code of Thailand, in one small package with types and search.

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
npm install geothai
```

The package is ESM. Node 22.12 and later can also load it with `require()`.

## Usage

```ts
import { address, byPostalCode, districts, province, search, subdistricts } from 'geothai';

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
| `dataVersion`                | The GeoThai/data release in this package, such as `'2026.10.22'`                      |

Every function takes codes as strings and returns a new array, so you can sort or change it.

`match()` is for addresses typed by hand, such as old records or form input. It reads short forms such as `ต.`, `อ.` and `จ.`, the word `เมือง` for a capital district, and `กทม` for Bangkok. Names must match in full. One result means the address is clear. More than one means you need another field: 795 subdistrict names are used more than once. None means no current subdistrict has the name.

The areas that DOPA abolished have their own entry. The main entry does not hold them, so they stay out of your bundle:

```ts
import { abolishedAreas } from 'geothai/abolished';

const bangNa = abolishedAreas().find((a) => a.code === '104701');
bangNa?.abolished_on; // '2022-04-22'
bangNa?.successors; // ['104702', '104703']
bangNa?.successors_basis; // 'notice'
```

`successors` lists the codes that took an abolished area's place. `successors_basis` says how sure the link is: `'notice'` comes from a Royal Gazette notice, with the date and source in `successors_in_force` and `successors_source`. `'name'` is a match by Thai name for codes DOPA dropped in 2006, likely but not proven. When no successor is known, `successors` is empty.

## Types

```ts
import type { Province, ProvinceCode, SearchResult, Subdistrict } from 'geothai/types';
```

| Type                                                     | Content                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------- |
| `Province`, `District`, `Subdistrict`, `Abolished`       | One area. Each field has its description from the data schema  |
| `ProvinceCode`, `DistrictCode`, `SubdistrictCode`        | Every code in use, for autocomplete and checks at compile time |
| `Address`, `SearchResult`, `SearchOptions`, `MatchQuery` | What `address()`, `search()` and `match()` take and return     |

The functions take `string`, not the code types. A data release can remove a code, and that must not break your build in a patch update.

## Versions

A new GeoThai/data release ships as a patch version. A change to the API gets a minor or major version. `dataVersion` tells you which data you have. The changes in each data release are at [geothai.fasu.dev/changelog](https://geothai.fasu.dev/changelog/).

## Upgrading from v3

Version 4 is a rewrite on new data. Codes are now strings, and a subdistrict has `postal_codes`, an array.

| v3                                                           | v4                                      |
| ------------------------------------------------------------ | --------------------------------------- |
| `getAllProvinces()`                                          | `provinces()`                           |
| `getProvinceByCode(10)`                                      | `province('10')`                        |
| `getAllDistricts()`, `getAllSubdistricts()`                  | `districts(code)`, `subdistricts(code)` |
| `getDistrictByCode()`, `getSubdistrictByCode()`              | `district()`, `subdistrict()`           |
| `getPostalCode(code)`                                        | `byPostalCode(code)`                    |
| `getProvincesByCriterion({ … })` and the other `ByCriterion` | `.filter()` on the list                 |

The v3 code is on the [`archive`](https://github.com/GeoThai/npm-packages/tree/archive) branch.

## Why?

Address forms in Thailand need the same four lists, and most copies of them are old: merged postal codes, abolished subdistricts, English names on the wrong area. This package ships the data that GeoThai checks against official sources, in a form that costs a browser almost nothing until you call it.

## License

The code is [MIT](./LICENSE). The data is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) © 2026 [Pongsakorn Thipayanate](https://github.com/pyyupsk).

If you show the data, credit "GeoThai". Source credits and the license of thailand-geography-json are in [NOTICE](./NOTICE).
