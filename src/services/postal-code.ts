import postal_codes from "../data/data/v3/postal_codes.json";
import type { PostalCode, PostalCodeIndex } from "../types";
import { cache } from "../utils/cache";
import { createService } from "../utils/create-service";
import { recordToArray } from "../utils/record-to-array";

export const createPostalCodeService = (
  data: Record<PostalCodeIndex, PostalCode>,
) => {
  const postalCodes = recordToArray(data);
  return createService<PostalCode>(postalCodes, "code");
};

const postalCodeService = createService<PostalCode>(
  recordToArray(postal_codes),
  "code",
);

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
  const postalCodes = postalCodeService.getAll();
  cache.set<PostalCode[]>(key, postalCodes);
  return postalCodes;
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
