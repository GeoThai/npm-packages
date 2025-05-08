import subdistricts from '../data/subdistricts.json'
import type { Subdistrict, SubdistrictIndex } from '../types'
import { cache } from '../utils/cache'
import { createService } from '../utils/create-service'
import { recordToArray } from '../utils/record-to-array'

export const createSubdistrictService = (data: Record<SubdistrictIndex, Subdistrict>) => {
    const subdistricts = recordToArray(data)
    return createService<Subdistrict>(subdistricts, 'code')
}

const subdistrictService = createService<Subdistrict>(recordToArray(subdistricts), 'code')

export function getAllSubdistricts(): Subdistrict[] {
    const key = 'subdistricts'
    if (cache.has(key)) {
        return cache.get<Subdistrict[]>(key)!
    }
    const subdistricts = subdistrictService.getAll()
    cache.set<Subdistrict[]>(key, subdistricts)
    return subdistricts
}

export function getSubdistrictByCode(code: SubdistrictIndex): Subdistrict | undefined {
    const key = `subdistrict-${code}`
    if (cache.has(key)) {
        return cache.get<Subdistrict>(key)!
    }
    const subdistrict = subdistrictService.getByCode(code)
    cache.set(key, subdistrict)
    return subdistrict
}

export function getSubdistrictsByCriterion(criterion: Partial<Subdistrict>): Subdistrict[] {
    const key = `subdistricts-${JSON.stringify(criterion)}`
    if (cache.has(key)) {
        return cache.get<Subdistrict[]>(key)!
    }
    const subdistricts = subdistrictService.getByCriterion(criterion)
    cache.set(key, subdistricts)
    return subdistricts
}
