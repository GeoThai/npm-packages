import { expect, expectTypeOf, test } from 'bun:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  address,
  dataVersion,
  search,
  byPostalCode,
  district,
  districts,
  match,
  province,
  provinces,
  subdistrict,
  subdistricts,
} from './index';
import type { ProvinceCode, SubdistrictCode } from './types';

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

test('address gives the full chain of a subdistrict', () => {
  const found = address('840503');
  expect(found?.subdistrict.name_en).toBe('Ko Tao');
  expect(found?.district.name_en).toBe('Ko Pha-ngan');
  expect(found?.province.name_en).toBe('Surat Thani');
  expect(address('8405')).toBeUndefined();
});

test('every subdistrict has a full address', () => {
  const codes = provinces().flatMap((p) =>
    districts(p.code).flatMap((d) => subdistricts(d.code).map((s) => s.code)),
  );
  expect(codes.every((code) => address(code))).toBe(true);
});

test('byPostalCode finds every subdistrict that uses a code', () => {
  expect(byPostalCode('84280').map((s) => s.code)).toEqual(['840501', '840502']);
  expect(byPostalCode('10250').map((s) => s.code)).toContain('100608');
  expect(byPostalCode('00000')).toEqual([]);
});

test('code types list only real codes', () => {
  expectTypeOf<'84'>().toMatchTypeOf<ProvinceCode>();
  expectTypeOf<'840503'>().toMatchTypeOf<SubdistrictCode>();
  // @ts-expect-error 99 is not a province code
  expectTypeOf<'99'>().toMatchTypeOf<ProvinceCode>();
});

const found = (query: string, limit?: number) =>
  search(query, { limit }).map((r) => `${r.level} ${r.area.code}`);

test('search finds a name in Thai or English, with or without marks', () => {
  for (const query of ['พะงัน', 'phangan', 'Pha-ngan', 'pha ngan']) {
    expect(found(query)).toEqual(['district 8405', 'subdistrict 840501']);
  }
});

test('search puts names that start with the query first, then by level', () => {
  expect(found('สุราษฎร์', 3)).toEqual(['province 84', 'district 8401', 'subdistrict 700403']);
});

test('search ignores the word for the level', () => {
  expect(found('อำเภอเกาะพะงัน')).toEqual(found('เกาะพะงัน'));
  expect(found('เขตพระนคร')).toContain('district 1001');
});

test('search returns nothing for an empty query and respects the limit', () => {
  expect(search('  ')).toEqual([]);
  expect(search('a', { limit: 5 })).toHaveLength(5);
});

const codes = (q: Parameters<typeof match>[0]) => match(q).map((a) => a.subdistrict.code);

test('match narrows a shared subdistrict name by province, district and postal code', () => {
  expect(codes({ subdistrict: 'วังทอง' })).toHaveLength(9);
  expect(codes({ subdistrict: 'วังทอง', province: 'จ.พิษณุโลก' })).toEqual(['650801']);
  expect(codes({ subdistrict: 'บางใหญ่', postalCode: '11140' })).toEqual(['120305']);
  expect(codes({ subdistrict: 'Ko Tao', district: 'Ko Pha-ngan' })).toEqual(['840503']);
});

test('match reads the forms people write', () => {
  expect(codes({ subdistrict: 'แขวงสีลม', district: 'เขตบางรัก', province: 'กทม' })).toEqual([
    '100402',
  ]);
  expect(codes({ subdistrict: 'ต.ตลาด', district: 'อ.เมือง', province: 'สุราษฎร์ธานี' })).toEqual([
    '840101',
  ]);
  expect(codes({ subdistrict: 'Pratu Chai', district: 'Mueang', province: 'Ayutthaya' })).toEqual([
    '140101',
  ]);
  expect(codes({ subdistrict: 'พระบรมมหาราชวัง', district: 'เมือง', province: 'กรุงเทพ' })).toEqual(
    [],
  );
});

test('match ignores empty fields and finds nothing for a part of a name', () => {
  expect(codes({ subdistrict: 'สีลม', district: '', province: ' ', postalCode: '' })).toEqual([
    '100402',
  ]);
  expect(codes({ subdistrict: 'สี' })).toEqual([]);
  expect(codes({ subdistrict: ' ' })).toEqual([]);
});

test('dataVersion matches data.version', async () => {
  expect(`v${dataVersion}`).toBe((await Bun.file('data.version').text()).trim());
});

test('an app that only calls province() does not bundle the other levels', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'geothai-shake-'));
  try {
    const entry = join(dir, 'app.ts');
    await Bun.write(
      entry,
      `import { province } from '${import.meta.dir}/index';\nconsole.log(province('84'));\n`,
    );
    const out = await Bun.build({ entrypoints: [entry], minify: true });
    const size = (await out.outputs[0]?.text())?.length ?? 0;
    expect(size).toBeLessThan(10_000);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
