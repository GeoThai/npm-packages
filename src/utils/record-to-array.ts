export function recordToArray<K extends string | number | symbol, T>(districtJson: Record<K, T>): T[] {
    return Object.values(districtJson)
}
