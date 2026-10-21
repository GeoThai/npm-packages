import { expect, test } from 'bun:test';

import { district, districts, province, provinces } from './index.ts';

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

test('districts lists the districts of a province', () => {
  const list = districts('84');
  expect(list).toHaveLength(19);
  expect(list[4]).toEqual({
    code: '8405',
    name_th: 'เกาะพะงัน',
    name_en: 'Ko Pha-ngan',
    province_code: '84',
  });
  expect(districts('99')).toEqual([]);
});

test('every province has districts, 928 in all', () => {
  expect(provinces().reduce((n, p) => n + districts(p.code).length, 0)).toBe(928);
});

test('district finds one by code', () => {
  expect(district('1001')).toEqual({
    code: '1001',
    name_th: 'เขตพระนคร',
    name_en: 'Phra Nakhon',
    province_code: '10',
  });
  expect(district('84')).toBeUndefined();
  expect(district('9999')).toBeUndefined();
});
