import { expect, test } from 'bun:test';

import { district, districts, province, provinces, subdistrict, subdistricts } from './index.ts';

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

test('subdistricts lists the subdistricts of a district', () => {
  const list = subdistricts('8405');
  expect(list.map((s) => s.code)).toEqual(['840501', '840502', '840503']);
  expect(list[0]).toEqual({
    code: '840501',
    name_th: 'เกาะพะงัน',
    name_en: 'Ko Pha-ngan',
    district_code: '8405',
    province_code: '84',
    postal_codes: ['84280'],
  });
  expect(subdistricts('9999')).toEqual([]);
});

test('every district has subdistricts, 7,436 in all', () => {
  const all = provinces().flatMap((p) => districts(p.code).flatMap((d) => subdistricts(d.code)));
  expect(all).toHaveLength(7436);
});

test('subdistrict finds one by code', () => {
  expect(subdistrict('840503')?.name_en).toBe('Ko Tao');
  expect(subdistrict('100608')?.postal_codes).toEqual(['10240', '10250']);
  expect(subdistrict('8405')).toBeUndefined();
  expect(subdistrict('999999')).toBeUndefined();
});
