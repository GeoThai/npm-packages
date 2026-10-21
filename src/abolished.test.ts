import { expect, test } from 'bun:test';

import { abolishedAreas } from './abolished';
import { subdistrict } from './index';

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
  });
  expect(list.filter((a) => a.name_en === null)).toHaveLength(10);
});

test('no abolished code is still an active subdistrict', () => {
  expect(abolishedAreas().filter((a) => subdistrict(a.code))).toEqual([]);
});
