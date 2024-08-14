import subdistrictsData from '../data/subdistricts.json'
import type { Subdistrict } from '../types'
import { matchCriteria } from '../utils/criteria-matcher'

const subdistricts = new Map<number, Subdistrict>(
    subdistrictsData.map((subdistrict) => [subdistrict.subdistrict_id, subdistrict])
)

export function getAllSubdistricts(): Subdistrict[] {
    return Array.from(subdistricts.values())
}

export function getSubdistrictById(subdistrictId: number): Subdistrict | undefined {
    return subdistricts.get(subdistrictId)
}

export function getSubdistrictsByCriterion(criterion: Partial<Subdistrict>): Subdistrict[] {
    return Array.from(subdistricts.values()).filter((subdistrict) => {
        return matchCriteria(subdistrict, criterion)
    })
}
