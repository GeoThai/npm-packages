import { describe, expect, test } from "vitest";
import { cache } from "../../src/utils/cache";

describe("Cache", () => {
  const TEST_KEY = "test-key";
  const TEST_VALUE = "test-value";
  const KEY_VALUE = "value";

  test("should set and get a value", () => {
    cache.clear();
    cache.set(TEST_KEY, TEST_VALUE);
    expect(cache.get(TEST_KEY)).toBe(TEST_VALUE);
  });

  test("should return undefined for non-existent key", () => {
    cache.clear();
    expect(cache.get("non-existent")).toBeUndefined();
  });

  test("should check if key exists", () => {
    cache.clear();
    cache.set("exists", "value");
    expect(cache.has("exists")).toBe(true);
    expect(cache.has("does-not-exist")).toBe(false);
  });

  test("should handle expired items", async () => {
    cache.clear();
    // Set with very short TTL (1ms)
    cache.set("expiring-key", KEY_VALUE, 1);

    // Wait for expiration
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(cache.has("expiring-key")).toBe(false);
    expect(cache.get("expiring-key")).toBeUndefined();
  });

  test("should handle non-expired items", () => {
    cache.clear();
    // Set with long TTL
    cache.set("non-expiring", KEY_VALUE, 10000);

    expect(cache.has("non-expiring")).toBe(true);
    expect(cache.get("non-expiring")).toBe(KEY_VALUE);
  });

  test("should clear all cache", () => {
    cache.clear();
    cache.set("key1", "value1");
    cache.set("key2", "value2");

    expect(cache.has("key1")).toBe(true);
    expect(cache.has("key2")).toBe(true);

    cache.clear();

    expect(cache.has("key1")).toBe(false);
    expect(cache.has("key2")).toBe(false);
  });

  test("should handle get on expired item", async () => {
    cache.clear();
    cache.set("will-expire", KEY_VALUE, 1);

    await new Promise((resolve) => setTimeout(resolve, 10));

    const result = cache.get("will-expire");
    expect(result).toBeUndefined();
  });

  test("should use default TTL when not specified", () => {
    cache.clear();
    cache.set("default-ttl", KEY_VALUE);

    // Item should exist (default TTL is 1 hour)
    expect(cache.has("default-ttl")).toBe(true);
    expect(cache.get("default-ttl")).toBe(KEY_VALUE);
  });

  test("should handle item without expiry", () => {
    cache.clear();
    // Mock a cache item without expiry by using a very long TTL
    cache.set("no-expiry", KEY_VALUE, Number.MAX_SAFE_INTEGER);

    expect(cache.has("no-expiry")).toBe(true);
    expect(cache.get("no-expiry")).toBe(KEY_VALUE);
  });

  test("should handle different data types", () => {
    cache.clear();

    cache.set("string", "text");
    cache.set("number", 42);
    cache.set("object", { foo: "bar" });
    cache.set("array", [1, 2, 3]);
    cache.set("boolean", true);

    expect(cache.get("string")).toBe("text");
    expect(cache.get("number")).toBe(42);
    expect(cache.get("object")).toEqual({ foo: "bar" });
    expect(cache.get("array")).toEqual([1, 2, 3]);
    expect(cache.get("boolean")).toBe(true);
  });
});
