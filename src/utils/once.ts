/**
 * Wraps a function so it runs on the first call only, then returns the saved result.
 * Each data table is built this way, so bundlers can drop the tables an app never calls.
 *
 * @param make - Builds the value. Runs at most once.
 * @returns A function that gives the value.
 * @example
 * const table = once(() => new Map(rows));
 * table() === table(); // true, built once
 */
export function once<T>(make: () => T): () => T {
  let value: T | undefined;
  return () => (value ??= make());
}
