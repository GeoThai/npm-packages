import { expect, test } from 'bun:test';

import { normalize } from './normalize';

test('normalize drops case, spaces and marks', () => {
  expect(normalize('Ko Pha-ngan')).toBe('kophangan');
  expect(normalize("Ban Na'ng. Rong")).toBe('bannangrong');
});

test('normalize drops a leading word for the level', () => {
  for (const word of ['จังหวัด', 'อำเภอ', 'เขต', 'ตำบล', 'แขวง', 'กิ่งอำเภอ']) {
    expect(normalize(`${word}พระนคร`)).toBe('พระนคร');
  }
  expect(normalize('บางเขต')).toBe('บางเขต');
});

test('normalize leaves nothing for blank text', () => {
  expect(normalize('  - ')).toBe('');
});
