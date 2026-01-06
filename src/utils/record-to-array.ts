/**
 * Converts a record object to an array of its values.
 *
 * @param record - The record object to convert
 * @returns An array containing all values from the record
 */
export function recordToArray<K extends string | number | symbol, T>(
  record: Record<K, T>,
): T[] {
  return Object.values(record);
}
