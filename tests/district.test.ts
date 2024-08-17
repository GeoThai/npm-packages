import { describe, expect, test } from 'vitest'
import { getAllDistricts, getDistrictById, getDistrictsByCriterion, type District } from '../dist'

describe('District Service', () => {
    test('should retrieve all districts', () => {
        const districts = getAllDistricts()
        expect(districts).toBeInstanceOf(Array)
        expect(districts.length).toBeGreaterThan(0)
    })

    test('should retrieve a district by ID', () => {
        const id = 1001
        const district = getDistrictById(id)
        expect(district).toBeDefined()
        expect(district?.id).toBe(id)
    })

    test('should return undefined for an invalid district ID', () => {
        const invalidId = 99999
        const district = getDistrictById(invalidId)
        expect(district).toBeUndefined()
    })

    test('should retrieve districts by a specific criterion', () => {
        const criterion: Partial<District> = { en: 'Phra Nakhon' }
        const districts = getDistrictsByCriterion(criterion)
        expect(districts).toBeInstanceOf(Array)
        expect(districts.length).toBeGreaterThan(0)
        expect(districts[0]!.en).toBe('Phra Nakhon')
    })

    test('should return an empty array for a non-matching criterion', () => {
        const criterion: Partial<District> = { en: 'Non-Existent District' }
        const districts = getDistrictsByCriterion(criterion)
        expect(districts).toBeInstanceOf(Array)
        expect(districts.length).toBe(0)
    })
})
