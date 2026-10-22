import { expect, test } from 'bun:test';

import { abolishedAreas } from './abolished';
import { district, subdistrict } from './index';

test('abolishedAreas lists every abolished area with its level and parent', () => {
  const list = abolishedAreas();
  expect(list).toHaveLength(1583);
  expect(list.find((a) => a.code === '100205')).toEqual({
    code: '100205',
    name_th: 'บางซื่อ',
    name_en: 'Bang Sue',
    level: 'subdistrict',
    parent_code: '1002',
    abolished_on: '2006-01-01',
    successors: ['102901'],
    successors_basis: 'name',
    successors_in_force: null,
    successors_source: null,
  });
  expect(list.filter((a) => a.name_en === null)).toHaveLength(10);
});

test('no abolished code is still an active subdistrict', () => {
  expect(abolishedAreas().filter((a) => subdistrict(a.code))).toEqual([]);
});

test('abolished areas carry their successors and the notice behind them', () => {
  const bangNa = abolishedAreas().find((a) => a.code === '104701');
  expect(bangNa).toMatchObject({
    successors: ['104702', '104703'],
    successors_basis: 'notice',
    successors_in_force: '2017-07-26',
  });
  expect(bangNa?.successors_source).toContain('ราชกิจจานุเบกษา เล่ม 134');
  const withSuccessors = abolishedAreas().filter((a) => a.successors?.length);
  expect(withSuccessors).toHaveLength(1182);
  expect(
    withSuccessors
      .flatMap((a) => a.successors ?? [])
      .filter((c) => !(c.length === 4 ? district(c) : subdistrict(c))),
  ).toEqual([]);
});
