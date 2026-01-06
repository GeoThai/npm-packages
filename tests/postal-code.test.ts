import { describe, expect, test } from "vitest";
import { getAllPostalCodes, getPostalCode } from "../src";

describe("PostalCode Service", () => {
  test("should retrieve all postal codes", () => {
    const postalCodes = getAllPostalCodes();
    expect(postalCodes).toBeInstanceOf(Array);
    expect(postalCodes.length).toBeGreaterThan(0);
  });

  test("should retrieve a postal code by code", () => {
    const code = "10200";
    const postalCode = getPostalCode(code);
    expect(postalCode).toBeDefined();
    expect(postalCode?.code).toBe(Number(code));
  });

  test("should return undefined for an invalid code", () => {
    const invalidId = "99999";
    // @ts-expect-error eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const postalCode = getPostalCode(invalidId);
    expect(postalCode).toBeUndefined();
  });
});
