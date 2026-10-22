import type { District, Province } from '../types';
import { normalize } from './normalize';

const PROVINCE_ALIASES: Record<string, string> = {
  กทม: '10',
  กรุงเทพ: '10',
  อยุธยา: '14',
  ayutthaya: '14',
};

/**
 * Tells if a name is this province: its Thai or English name, or a short form people use.
 *
 * @param p - The province to compare with.
 * @param name - A name already in `normalize()` form.
 * @returns `true` if the name is this province.
 * @example
 * isProvince(province('10'), normalize('กทม')); // true
 */
export function isProvince(p: Province, name: string): boolean {
  return (
    name === normalize(p.name_th) ||
    name === normalize(p.name_en) ||
    PROVINCE_ALIASES[name] === p.code
  );
}

/**
 * Tells if a name is this district. People write the capital district "อ.เมือง" without the
 * province name, so "เมือง" and "Mueang" match the capital, which is always the code XX01.
 * Bangkok has no capital district.
 *
 * @param d - The district to compare with.
 * @param name - A name already in `normalize()` form.
 * @returns `true` if the name is this district.
 * @example
 * isDistrict(district('8401'), normalize('อ.เมือง')); // true
 */
export function isDistrict(d: District, name: string): boolean {
  if (name === normalize(d.name_th) || name === normalize(d.name_en)) return true;
  return (
    d.code.endsWith('01') && d.province_code !== '10' && (name === 'เมือง' || name === 'mueang')
  );
}
