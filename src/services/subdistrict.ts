import subdistrictsData from '../data/subdistricts.json'
import type { Subdistrict } from '../types'
import { cache } from '../utils/cache'
import { createService } from '../utils/create-service'

const subdistrictService = createService<Subdistrict>(subdistrictsData, 'id')

export function getAllSubdistricts(): Subdistrict[] {
    const key = 'subdistricts'
    if (cache.has(key)) {
        return cache.get<Subdistrict[]>(key)!
    }
    const subdistricts = subdistrictService.getAll()
    cache.set<Subdistrict[]>(key, subdistricts)
    return subdistricts
}

export function getSubdistrictById(subdistrictId: number): Subdistrict | undefined {
    const key = `subdistrict-${subdistrictId}`
    if (cache.has(key)) {
        return cache.get<Subdistrict>(key)!
    }
    const subdistrict = subdistrictService.getById(subdistrictId)
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
