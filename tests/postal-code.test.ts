import { describe, expect, test } from 'vitest'
import { getAllPostalCodes, getPostalCode } from '../dist'

describe('PostalCode Service', () => {
    test('should retrieve all postal codes', () => {
        const postalCodes = getAllPostalCodes()
        expect(postalCodes).toBeInstanceOf(Array)
        expect(postalCodes.length).toBeGreaterThan(0)
    })

    test('should retrieve a postal code by code', () => {
        const code = 10200
        const postalCode = getPostalCode(code)
        expect(postalCode).toBeDefined()
        expect(postalCode?.postal_code).toBe(code)
    })

    test('should return undefined for an invalid code', () => {
        const invalidId = 99999
        const postalCode = getPostalCode(invalidId)
        expect(postalCode).toBeUndefined()
    })
})
