import { describe, expect, it } from 'vitest'
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
} from '../build'

describe('test', () => {
    const provinces = getAllProvinces()
    const districts = getAllDistricts()
    const subdistricts = getAllSubdistricts()

    it('getAllProvinces', () => {
        expect(provinces.length).toBeGreaterThan(0)
    })

    it('getAllDistricts', () => {
        expect(districts.length).toBeGreaterThan(0)
    })

    it('getAllSubdistricts', () => {
        expect(subdistricts.length).toBeGreaterThan(0)
    })

    it('getProvinceById', () => {
        const province = provinces[0]
        expect(getProvinceById(province!.province_id)).toBe(province)
    })

    it('getDistrictById', () => {
        const district = districts[0]
        expect(getDistrictById(district!.district_id)).toBe(district)
    })

    it('getSubdistrictById', () => {
        const subdistrict = subdistricts[0]
        expect(getSubdistrictById(subdistrict!.subdistrict_id)).toBe(subdistrict)
    })

    it('getProvincesByCriterion', () => {
        const criterion = { province_name_th: 'กรุงเทพมหานคร' }
        const provinces = getProvincesByCriterion(criterion)
        expect(provinces.length).toBeGreaterThan(0)
        provinces.forEach((province) => {
            expect(province.province_name_th).toBe(criterion.province_name_th)
        })
    })

    it('getDistrictsByCriterion', () => {
        const criterion = { district_name_th: 'พระนคร' }
        const districts = getDistrictsByCriterion(criterion)
        expect(districts.length).toBeGreaterThan(0)
        districts.forEach((district) => {
            expect(district.district_name_th).toBe(criterion.district_name_th)
        })
    })

    it('getSubdistrictsByCriterion', () => {
        const criterion = { subdistrict_name_th: 'พระบรมมหาราชวัง' }
        const subdistricts = getSubdistrictsByCriterion(criterion)
        expect(subdistricts.length).toBeGreaterThan(0)
        subdistricts.forEach((subdistrict) => {
            expect(subdistrict.subdistrict_name_th).toBe(criterion.subdistrict_name_th)
        })
    })
})
