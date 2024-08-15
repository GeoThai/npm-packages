import { matchCriteria } from './criteria-matcher'

export function createService<T>(data: T[], idKey: keyof T) {
    const dataMap = new Map<number, T>(data.map((item) => [item[idKey] as unknown as number, item]))

    return {
        getAll: (): T[] => Array.from(dataMap.values()),
        getById: (id: number): T | undefined => dataMap.get(id),
        getByCriterion: (criterion: Partial<T>): T[] => {
            return Array.from(dataMap.values()).filter((item) => matchCriteria(item, criterion))
        }
    }
}
