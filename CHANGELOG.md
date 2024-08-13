# GeoThai NPM Packages

## [0.0.2] - 2024-08-13

### Patch Changes

#### Improvements

-   Added TypeScript type annotations to `Map` objects for provinces, districts, and subdistricts to enhance type safety.
-   Replaced spread operator with `Array.from()` for converting `Map` values to arrays for consistency and readability.
-   Refined filtering logic in `getProvincesByCriterion`, `getDistrictsByCriterion`, and `getSubdistrictsByCriterion` functions to use appropriate TypeScript type assertions.

#### Code Cleanup

-   Enhanced type safety and clarity in `src/index.ts`.

## [0.0.1] - 2024-08-13

### Initial Release

-   **Data Integration**: Imported and initialized data for provinces, districts, and subdistricts from JSON files.
-   **Data Storage**: Created `Map` objects to efficiently store and access provinces, districts, and subdistricts by their IDs.
-   **APIs Implemented**:
    -   `getAllProvinces()`: Retrieves all provinces.
    -   `getProvinceById(provinceId: number)`: Retrieves a single province by its ID.
    -   `getAllDistricts()`: Retrieves all districts.
    -   `getDistrictById(districtId: number)`: Retrieves a single district by its ID.
    -   `getAllSubdistricts()`: Retrieves all subdistricts.
    -   `getSubdistrictById(subdistrictId: number)`: Retrieves a single subdistrict by its ID.
    -   `getProvincesByCriterion(criterion: Partial<Province>)`: Retrieves provinces matching a specific criterion.
    -   `getDistrictsByCriterion(criterion: Partial<District>)`: Retrieves districts matching a specific criterion.
    -   `getSubdistrictsByCriterion(criterion: Partial<Subdistrict>)`: Retrieves subdistricts matching a specific criterion.
-   **Type Definitions**: Utilized TypeScript types for provinces, districts, and subdistricts for better type safety and code clarity.
