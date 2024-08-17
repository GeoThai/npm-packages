import postalCodesData from '../data/postal_codes.json'
import type { PostalCode } from '../types'
import { cache } from '../utils/cache'
import { createService } from '../utils/create-service'

const postalCodeService = createService<PostalCode>(postalCodesData, 'postal_code')

export function getAllPostalCodes(): PostalCode[] {
    const key = 'postal-codes'
    if (cache.has(key)) {
        return cache.get<PostalCode[]>(key)!
    }
    const postalCodes = postalCodeService.getAll()
    cache.set<PostalCode[]>(key, postalCodes)
    return postalCodes
}

export function getPostalCode(postalCodeId: number): PostalCode | undefined {
    const key = `postal-codes-${postalCodeId}`
    if (cache.has(key)) {
        return cache.get<PostalCode>(key)!
    }
    const postalCode = postalCodeService.getById(postalCodeId)
    cache.set(key, postalCode)
    return postalCode
}
