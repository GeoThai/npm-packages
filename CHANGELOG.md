# GeoThai NPM Packages

## [0.1.0] - 2024-08-13

### Minor Changes

#### Added

-   **New Services**: Split functionality into modular services:
    -   `src/services/province.ts`: Handles all province-related operations.
    -   `src/services/district.ts`: Handles all district-related operations.
    -   `src/services/subdistrict.ts`: Handles all subdistrict-related operations.
-   **Utility Function**: Added `src/utils/criteria-matcher.ts` for consistent criteria-based filtering across services.

#### Changed

-   **Code Refactoring**:
    -   Moved logic from `src/index.ts` to the new service modules.
    -   Simplified `index.ts` by re-exporting the services and utilities.
-   **Test Structure**:
    -   Removed outdated tests (`tests/index.test.ts`).
    -   Introduced new tests for individual services (`tests/district.test.ts`, `tests/province.test.ts`, `tests/subdistrict.test.ts`).

#### Removed

-   **Deprecated Test**: Removed `tests/index.test.ts` in favor of more granular test coverage in new service-specific tests.

#### Improvements

-   Enhanced code organization by modularizing the service logic, improving maintainability and readability.
-   Centralized criteria matching logic in a dedicated utility function, ensuring consistency across different modules.

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
