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

test('normalize drops a short form only with its dot', () => {
  expect(normalize('จ.สุราษฎร์ธานี')).toBe('สุราษฎร์ธานี');
  expect(normalize(' อ. เกาะพะงัน')).toBe('เกาะพะงัน');
  expect(normalize('ต.เกาะเต่า')).toBe('เกาะเต่า');
  expect(normalize('อ่างทอง')).toBe('อ่างทอง');
  expect(normalize('ตราด')).toBe('ตราด');
});

test('normalize leaves nothing for blank text', () => {
  expect(normalize('  - ')).toBe('');
});
