import provincesData from '../data/provinces.json'
import type { Province } from '../types'
import { cache } from '../utils/cache'
import { createService } from '../utils/create-service'

const provinceService = createService<Province>(provincesData, 'id')

export function getAllProvinces(): Province[] {
    const key = 'provinces'
    if (cache.has(key)) {
        return cache.get<Province[]>(key)!
    }
    const provinces = provinceService.getAll()
    cache.set<Province[]>(key, provinces)
    return provinces
}

export function getProvinceById(provinceId: number): Province | undefined {
    const key = `province-${provinceId}`
    if (cache.has(key)) {
        return cache.get<Province>(key)!
    }
    const province = provinceService.getById(provinceId)
    cache.set(key, province)
    return province
}

export function getProvincesByCriterion(criterion: Partial<Province>): Province[] {
    const key = `provinces-${JSON.stringify(criterion)}`
    if (cache.has(key)) {
        return cache.get<Province[]>(key)!
    }
    const provinces = provinceService.getByCriterion(criterion)
    cache.set(key, provinces)
    return provinces
}
