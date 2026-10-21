import { expect, test } from 'bun:test';

import { province, provinces } from './index.ts';

test('provinces lists all 77, sorted by code', () => {
  const list = provinces();
  expect(list).toHaveLength(77);
  expect(list[0]).toEqual({ code: '10', name_th: 'กรุงเทพมหานคร', name_en: 'Bangkok' });
  expect(list.map((p) => p.code)).toEqual(list.map((p) => p.code).toSorted());
});

test('provinces returns a new array each call', () => {
  provinces().pop();
  expect(provinces()).toHaveLength(77);
});

test('province finds one by code', () => {
  expect(province('84')).toEqual({ code: '84', name_th: 'สุราษฎร์ธานี', name_en: 'Surat Thani' });
  expect(province('99')).toBeUndefined();
});
