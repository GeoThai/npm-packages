/**
 * Checks if an item matches the given search criteria.
 *
 * @param item - The item to check against the criteria
 * @param criterion - The partial object containing the criteria to match
 * @returns True if the item matches all criteria, false otherwise
 */
export function matchCriteria<T>(item: T, criterion: Partial<T>): boolean {
  return Object.entries(criterion).every(([key, value]) => {
    return item[key as keyof T] === value;
  });
}
