# GeoThai NPM Packages

![NPM Version](https://img.shields.io/npm/v/geothai)
![License](https://img.shields.io/badge/license-MIT-green)

Welcome to the **GeoThai NPM Packages** repository! 🌟 This repository provides an npm package for Node.js that allows you to retrieve detailed geographic data of provinces, districts, and subdistricts in Thailand.

## 📦 Overview

This package includes functions to access and retrieve data about:

-   **Provinces**
-   **Districts**
-   **Subdistricts**

The data is sourced from comprehensive JSON files included in the package.

## 📊 Features

-   **Retrieve All Provinces**: Fetch a list of all provinces in Thailand.
-   **Retrieve Province by ID**: Get details of a specific province using its ID.
-   **Retrieve All Districts**: Fetch a list of all districts.
-   **Retrieve District by ID**: Get details of a specific district using its ID.
-   **Retrieve All Subdistricts**: Fetch a list of all subdistricts.
-   **Retrieve Subdistrict by ID**: Get details of a specific subdistrict using its ID.
-   **Filter by Criterion**: Retrieve entities based on specific criteria.

## 🚀 Installation

You can install the package via npm:

```bash
npm install geothai
```

## 🛠️ Usage

Here’s a quick guide on how to use the package:

```typescript
import {
    getAllDistricts,
    getAllProvinces,
    getAllSubdistricts,
    getDistrictById,
    getDistrictsByCriterion,
    getProvinceById,
    getProvincesByCriterion,
    getSubdistrictById,
    getSubdistrictsByCriterion
} from 'geothai'

// Retrieve all provinces
const provinces = getAllProvinces()
console.log(provinces)

// Retrieve a single province by ID
const province = getProvinceById(10)
console.log(province)

// Retrieve provinces by a specific criterion
const filteredProvinces = getProvincesByCriterion({ province_name_th: 'กรุงเทพมหานคร' })
console.log(filteredProvinces)
```

## 🔍 Examples

**Retrieve All Provinces**

```typescript
const provinces = getAllProvinces()
console.log(provinces)
```

**Retrieve Province by ID**

```typescript
const province = getProvinceById(10)
console.log(province)
```

**Retrieve Districts by Criterion**

```typescript
const districts = getDistrictsByCriterion({ district_name_th: 'พระนคร' })
console.log(districts)
```

## 🤝 Contributing

We welcome contributions to enhance this package. Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## 📝 License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

## 🙋‍♂️ Contact

For any questions or support, please open an issue or contact us at [pyyupsk@proton.me](mailto:pyyupsk@proton.me).

Happy coding! 🎉
