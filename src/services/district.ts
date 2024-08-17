import districtsData from '../data/districts.json'
import type { District } from '../types'
import { cache } from '../utils/cache'
import { createService } from '../utils/create-service'

const districtService = createService<District>(districtsData, 'id')

export function getAllDistricts(): District[] {
    const key = 'districts'
    if (cache.has(key)) {
        return cache.get<District[]>(key)!
    }
    const districts = districtService.getAll()
    cache.set<District[]>(key, districts)
    return districts
}

export function getDistrictById(districtId: number): District | undefined {
    const key = `district-${districtId}`
    if (cache.has(key)) {
        return cache.get<District>(key)!
    }
    const district = districtService.getById(districtId)
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
