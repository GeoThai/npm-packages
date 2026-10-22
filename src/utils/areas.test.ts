import { expect, test } from 'bun:test';

import { district, province } from '../index';
import { isDistrict, isProvince } from './areas';
import { normalize } from './normalize';

const bangkok = province('10');
const ayutthaya = province('14');
const mueang = district('8401');
const bangRak = district('1004');

test('isProvince reads full names and short forms', () => {
  if (!bangkok || !ayutthaya) throw new Error('missing test data');
  for (const name of ['จ.กรุงเทพมหานคร', 'Bangkok', 'กทม', 'กรุงเทพ']) {
    expect(isProvince(bangkok, normalize(name))).toBe(true);
  }
  expect(isProvince(ayutthaya, normalize('อยุธยา'))).toBe(true);
  expect(isProvince(bangkok, normalize('อยุธยา'))).toBe(false);
});

test('isDistrict reads the capital district, except in Bangkok', () => {
  if (!mueang || !bangRak) throw new Error('missing test data');
  for (const name of ['อ.เมือง', 'Mueang', 'เมืองสุราษฎร์ธานี']) {
    expect(isDistrict(mueang, normalize(name))).toBe(true);
  }
  expect(isDistrict(bangRak, normalize('เมือง'))).toBe(false);
});
