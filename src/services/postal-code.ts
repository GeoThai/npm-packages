import postal_codes from '../data/postal_codes.json'
import type { PostalCode, PostalCodeIndex } from '../types'
import { cache } from '../utils/cache'
import { createService } from '../utils/create-service'
import { recordToArray } from '../utils/record-to-array'

export const createPostalCodeService = (data: Record<PostalCodeIndex, PostalCode>) => {
    const postalCodes = recordToArray(data)
    return createService<PostalCode>(postalCodes, 'code')
}

const postalCodeService = createService<PostalCode>(recordToArray(postal_codes), 'code')

export function getAllPostalCodes(): PostalCode[] {
    const key = 'postal-codes'
    if (cache.has(key)) {
        return cache.get<PostalCode[]>(key)!
    }
    const postalCodes = postalCodeService.getAll()
    cache.set<PostalCode[]>(key, postalCodes)
    return postalCodes
}

export function getPostalCode(code: PostalCodeIndex): PostalCode | undefined {
    const key = `postal-codes-${code}`
    if (cache.has(key)) {
        return cache.get<PostalCode>(key)!
    }
    const postalCode = postalCodeService.getByCode(code)
    cache.set(key, postalCode)
    return postalCode
}

export function getPostalCodesByCriterion(criterion: Partial<PostalCode>): PostalCode[] {
    const key = `postal-codes-${JSON.stringify(criterion)}`
    if (cache.has(key)) {
        return cache.get<PostalCode[]>(key)!
    }
    const postalCodes = postalCodeService.getByCriterion(criterion)
    cache.set(key, postalCodes)
    return postalCodes
}
