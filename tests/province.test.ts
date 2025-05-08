import { describe, expect, test } from 'vitest'
import { getAllProvinces, getProvinceByCode, getProvincesByCriterion, type Province } from '../dist'

describe('Province Service', () => {
    test('should retrieve all provinces', () => {
        const provinces = getAllProvinces()
        expect(provinces).toBeInstanceOf(Array)
        expect(provinces.length).toBeGreaterThan(0)
    })

    test('should retrieve a province by ID', () => {
        const code = '10'
        const province = getProvinceByCode(code)
        expect(province).toBeDefined()
        expect(province?.code).toBe(Number(code))
    })

    test('should return undefined for an invalid province ID', () => {
        const invalidCode = '99999'
        // @ts-expect-error eslint-disable-next-line @typescript-eslint/ban-ts-comment
        const province = getProvinceByCode(invalidCode)
        expect(province).toBeUndefined()
    })

    test('should retrieve provinces by a specific criterion', () => {
        const criterion: Partial<Province> = { name_en: 'Bangkok' }
        const provinces = getProvincesByCriterion(criterion)
        expect(provinces).toBeInstanceOf(Array)
        expect(provinces.length).toBeGreaterThan(0)
        expect(provinces[0]!.name_en).toBe('Bangkok')
    })

    test('should return an empty array for a non-matching criterion', () => {
        const criterion: Partial<Province> = { name_en: 'Non-Existent Province' }
        const provinces = getProvincesByCriterion(criterion)
        expect(provinces).toBeInstanceOf(Array)
        expect(provinces.length).toBe(0)
    })
})
