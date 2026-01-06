import { matchCriteria } from "./criteria-matcher";

/**
 *
 * @param data
 * @param idKey
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
