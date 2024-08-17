import { describe, expect, test } from 'vitest'
import { getAllSubdistricts, getSubdistrictById, getSubdistrictsByCriterion, type Subdistrict } from '../dist'

describe('Subdistrict Service', () => {
    test('should retrieve all subdistricts', () => {
        const subdistricts = getAllSubdistricts()
        expect(subdistricts).toBeInstanceOf(Array)
        expect(subdistricts.length).toBeGreaterThan(0)
    })

    test('should retrieve a subdistrict by ID', () => {
        const id = 100101
        const subdistrict = getSubdistrictById(id)
        expect(subdistrict).toBeDefined()
        expect(subdistrict?.id).toBe(id)
    })

    test('should return undefined for an invalid subdistrict ID', () => {
        const invalidId = 99999
        const subdistrict = getSubdistrictById(invalidId)
        expect(subdistrict).toBeUndefined()
    })

    test('should retrieve subdistricts by a specific criterion', () => {
        const criterion: Partial<Subdistrict> = { en: 'Phra Borom Maha Ratchawang' }
        const subdistricts = getSubdistrictsByCriterion(criterion)
        expect(subdistricts).toBeInstanceOf(Array)
        expect(subdistricts.length).toBeGreaterThan(0)
        expect(subdistricts[0]!.en).toBe('Phra Borom Maha Ratchawang')
    })

    test('should return an empty array for a non-matching criterion', () => {
        const criterion: Partial<Subdistrict> = { en: 'Non-Existent Subdistrict' }
        const subdistricts = getSubdistrictsByCriterion(criterion)
        expect(subdistricts).toBeInstanceOf(Array)
        expect(subdistricts.length).toBe(0)
    })
})
