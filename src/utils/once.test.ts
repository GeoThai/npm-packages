import { expect, test } from 'bun:test';

import { once } from './once';

test('once runs make on the first call only', () => {
  let calls = 0;
  const value = once(() => ++calls);
  expect([value(), value(), value()]).toEqual([1, 1, 1]);
  expect(calls).toBe(1);
});
