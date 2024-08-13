import districtsData from './data/districts.json'
import provincesData from './data/provinces.json'
import subdistrictsData from './data/subdistricts.json'
import type { District, Province, Subdistrict } from './types'

const provinces = new Map(provincesData.map((province) => [province.province_id, province]))
const districts = new Map(districtsData.map((district) => [district.district_id, district]))
const subdistricts = new Map(subdistrictsData.map((subdistrict) => [subdistrict.subdistrict_id, subdistrict]))

/**
 * Retrieve all provinces
 */
export function getAllProvinces(): Province[] {
    return [...provinces.values()]
}

/**
 * Retrieve a single province by ID
 * @param provinceId The ID of the province to retrieve
 */
export function getProvinceById(provinceId: number): Province | undefined {
    return provinces.get(provinceId)
}

/**
 * Retrieve all districts
 */
export function getAllDistricts(): District[] {
    return [...districts.values()]
}

/**
 * Retrieve a single district by ID
 * @param districtId The ID of the district to retrieve
 */
export function getDistrictById(districtId: number): District | undefined {
    return districts.get(districtId)
}

/**
 * Retrieve all subdistricts
 */
export function getAllSubdistricts(): Subdistrict[] {
    return [...subdistricts.values()]
}

/**
 * Retrieve a single subdistrict by ID
 * @param subdistrictId The ID of the subdistrict to retrieve
 */
export function getSubdistrictById(subdistrictId: number): Subdistrict | undefined {
    return subdistricts.get(subdistrictId)
}

/**
 * Retrieve provinces by a specific criterion
 * @param criterion The criterion to match
 */
export function getProvincesByCriterion(criterion: Partial<Province>): Province[] {
    return [...provinces.values()].filter((province) => {
        return Object.entries(criterion).every(([key, value]) => {
            return (province as never)[key] === value
        })
    })
}

/**
 * Retrieve districts by a specific criterion
 * @param criterion The criterion to match
 */
export function getDistrictsByCriterion(criterion: Partial<District>): District[] {
    return [...districts.values()].filter((district) => {
        return Object.entries(criterion).every(([key, value]) => {
            return (district as never)[key] === value
        })
    })
}

/**
 * Retrieve subdistricts by a specific criterion
 * @param criterion The criterion to match
 */
export function getSubdistrictsByCriterion(criterion: Partial<Subdistrict>): Subdistrict[] {
    return [...subdistricts.values()].filter((subdistrict) => {
        return Object.entries(criterion).every(([key, value]) => {
            return (subdistrict as never)[key] === value
        })
    })
}
