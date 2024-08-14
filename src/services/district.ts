import districtsData from '../data/districts.json'
import type { District } from '../types'
import { matchCriteria } from '../utils/criteria-matcher'

const districts = new Map<number, District>(districtsData.map((district) => [district.district_id, district]))

export function getAllDistricts(): District[] {
    return Array.from(districts.values())
}

export function getDistrictById(districtId: number): District | undefined {
    return districts.get(districtId)
}

export function getDistrictsByCriterion(criterion: Partial<District>): District[] {
    return Array.from(districts.values()).filter((district) => {
        return matchCriteria(district, criterion)
    })
}
