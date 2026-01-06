import postalLookup from "../data/data/v4/postal_lookup.json";
import type { PostalCode, PostalCodeIndex } from "../types";
import { cache } from "../utils/cache";
import { createService } from "../utils/create-service";
import { recordToArray } from "../utils/record-to-array";

const postalCodes = recordToArray(postalLookup as Record<string, PostalCode>);

export const createPostalCodeService = (data: PostalCode[]) => {
  return createService<PostalCode>(data, "postal_code");
};

const postalCodeService = createService<PostalCode>(postalCodes, "postal_code");

/**
 * Retrieves all postal codes from the database.
 *
 * @returns An array of all postal code objects
 */
export function getAllPostalCodes(): PostalCode[] {
  const key = "postal-codes";
  const cached = cache.get<PostalCode[]>(key);
  if (cached) {
    return cached;
  }
  const allPostalCodes = postalCodeService.getAll();
  cache.set<PostalCode[]>(key, allPostalCodes);
  return allPostalCodes;
}

/**
 * Retrieves a postal code by its unique code.
 *
 * @param code - The unique identifier code of the postal code
 * @returns The postal code object if found, undefined otherwise
 */
export function getPostalCode(code: PostalCodeIndex): PostalCode | undefined {
  const key = `postal-codes-${code}`;
  const cached = cache.get<PostalCode>(key);
  if (cached) {
    return cached;
  }
  const postalCode = postalCodeService.getByCode(code);
  cache.set(key, postalCode);
  return postalCode;
}
