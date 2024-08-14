import provincesData from '../data/provinces.json'
import type { Province } from '../types'
import { matchCriteria } from '../utils/criteria-matcher'

const provinces = new Map<number, Province>(provincesData.map((province) => [province.province_id, province]))

export function getAllProvinces(): Province[] {
    return Array.from(provinces.values())
}

export function getProvinceById(provinceId: number): Province | undefined {
    return provinces.get(provinceId)
}

export function getProvincesByCriterion(criterion: Partial<Province>): Province[] {
    return Array.from(provinces.values()).filter((province) => {
        return matchCriteria(province, criterion)
    })
}
