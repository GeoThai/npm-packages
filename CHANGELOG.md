# GeoThai NPM Packages Changelog

## 1.0.0 - 2024-08-17

### Added

-   **Integrated Data Structure**: Replaced individual JSON files with a more integrated data structure, featuring nested relationships among provinces, districts, and subdistricts. Added additional postal code data with `src/data/postal_codes.json`.
-   **Metadata**: Introduced `src/data/metadata.json` to provide detailed information about data versioning and statistics.
-   **Postal Code Service**: Added new service `src/services/postal-code.ts` to handle postal code data, including retrieval functions.
-   **New Type Definitions**: Added new TypeScript types for metadata and postal codes:
    -   `src/types/Metadata.ts`
    -   `src/types/PostalCode.ts`

### Changed

-   **Data Files**: Updated data files for provinces, districts, and subdistricts to reflect the new integrated structure and added postal code data.
-   **Service Implementations**: Refactored existing services (`province.ts`, `district.ts`, `subdistrict.ts`) to accommodate the new data structure:
    -   Updated identifiers from `province_id`, `district_id`, `subdistrict_id` to `id`.
    -   Adjusted data retrieval logic to work with the new nested data format.
-   **Index and Exports**: Updated `src/index.ts` to include the new postal code service and metadata.
-   **Test Updates**: Revised tests to match the updated data structure and identifiers. Added new tests for postal codes and metadata.

### Improvements

-   **Data Integration**: Enhanced data organization by integrating related entities and adding postal code information, improving data accessibility and usability.
-   **Performance**: Improved service performance and consistency with the updated data structure and new caching mechanisms.

## 0.2.0 - 2024-08-15

### Minor Changes

#### Added

-   **Caching**: Introduced `src/utils/cache.ts` to cache results and improve performance for frequently accessed data.
-   **Service Creation Utility**: Added `src/utils/create-service.ts` to simplify the creation of data services with caching and lookup functionality.

#### Changed

-   **District Service**: Updated to use caching and the `createService` utility. Functions now cache results for better performance.
-   **Province Service**: Refactored to leverage caching and the `createService` utility. Improved performance with result caching.
-   **Subdistrict Service**: Enhanced with caching and the `createService` utility. Optimized data retrieval with cached results.

#### Improvements

-   Improved data retrieval performance across services by integrating caching mechanisms.
-   Modularized service creation with `createService` utility, promoting code reuse and consistency.
-   Enhanced maintainability and performance by centralizing caching logic in `src/utils/cache.ts`.

## 0.1.0 - 2024-08-14

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

## 0.0.2 - 2024-08-13

### Patch Changes

#### Improvements

-   Added TypeScript type annotations to `Map` objects for provinces, districts, and subdistricts to enhance type safety.
-   Replaced spread operator with `Array.from()` for converting `Map` values to arrays for consistency and readability.
-   Refined filtering logic in `getProvincesByCriterion`, `getDistrictsByCriterion`, and `getSubdistrictsByCriterion` functions to use appropriate TypeScript type assertions.

#### Code Cleanup

-   Enhanced type safety and clarity in `src/index.ts`.

## 0.0.1 - 2024-08-13

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
