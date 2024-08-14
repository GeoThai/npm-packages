export function matchCriteria<T>(item: T, criterion: Partial<T>): boolean {
    return Object.entries(criterion).every(([key, value]) => {
        return item[key as keyof T] === value
    })
}
