import districts from '../data/districts.json'
import type { District, DistrictIndex } from '../types'
import { cache } from '../utils/cache'
import { createService } from '../utils/create-service'
import { recordToArray } from '../utils/record-to-array'

export const createDistrictService = (data: Record<DistrictIndex, District>) => {
    const districts = recordToArray(data)
    return createService<District>(districts, 'code')
}

const districtService = createService<District>(recordToArray(districts), 'code')

export function getAllDistricts(): District[] {
    const key = 'districts'
    if (cache.has(key)) {
        return cache.get<District[]>(key)!
    }
    const districts = districtService.getAll()
    cache.set<District[]>(key, districts)
    return districts
}

export function getDistrictByCode(code: DistrictIndex): District | undefined {
    const key = `district-${code}`
    if (cache.has(key)) {
        return cache.get<District>(key)!
    }
    const district = districtService.getByCode(code)
    cache.set(key, district)
    return district
}

export function getDistrictsByCriterion(criterion: Partial<District>): District[] {
    const key = `districts-${JSON.stringify(criterion)}`
    if (cache.has(key)) {
        return cache.get<District[]>(key)!
    }
    const districts = districtService.getByCriterion(criterion)
    cache.set(key, districts)
    return districts
}
