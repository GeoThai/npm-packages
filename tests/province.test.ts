import { describe, expect, test } from 'vitest'
import { getAllProvinces, getProvinceById, getProvincesByCriterion, type Province } from '../dist'

describe('Province Service', () => {
    test('should retrieve all provinces', () => {
        const provinces = getAllProvinces()
        expect(provinces).toBeInstanceOf(Array)
        expect(provinces.length).toBeGreaterThan(0)
    })

    test('should retrieve a province by ID', () => {
        const provinceId = 10
        const province = getProvinceById(provinceId)
        expect(province).toBeDefined()
        expect(province?.province_id).toBe(provinceId)
    })

    test('should return undefined for an invalid province ID', () => {
        const invalidProvinceId = 99999
        const province = getProvinceById(invalidProvinceId)
        expect(province).toBeUndefined()
    })

    test('should retrieve provinces by a specific criterion', () => {
        const criterion: Partial<Province> = { province_name_en: 'Bangkok' }
        const provinces = getProvincesByCriterion(criterion)
        expect(provinces).toBeInstanceOf(Array)
        expect(provinces.length).toBeGreaterThan(0)
        expect(provinces[0]!.province_name_en).toBe('Bangkok')
    })

    test('should return an empty array for a non-matching criterion', () => {
        const criterion: Partial<Province> = { province_name_en: 'Non-Existent Province' }
        const provinces = getProvincesByCriterion(criterion)
        expect(provinces).toBeInstanceOf(Array)
        expect(provinces.length).toBe(0)
    })
})
