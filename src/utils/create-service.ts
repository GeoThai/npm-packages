import { matchCriteria } from "./criteria-matcher";

/**
 * Creates a service for managing and querying a collection of data items.
 *
 * @param data - The array of data items to manage
 * @param idKey - The key to use as the unique identifier for each item
 * @returns An object with methods to query the data collection
 */
export function createService<T>(data: T[], idKey: keyof T) {
  const dataMap = new Map<number, T>(
    data.map((item) => [item[idKey] as number, item]),
  );

  return {
    getAll: (): T[] => Array.from(dataMap.values()),
    getByCode: (code: string): T | undefined => dataMap.get(Number(code)),
    getByCriterion: (criterion: Partial<T>): T[] => {
      return Array.from(dataMap.values()).filter((item) =>
        matchCriteria(item, criterion),
      );
    },
  };
}
