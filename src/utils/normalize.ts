// Words people type before a name ("อำเภอ…", "เขต…") and the marks English names differ by.
const PREFIX = /^(?:จังหวัด|อำเภอ|เขต|ตำบล|แขวง|กิ่งอำเภอ)/;

/**
 * Puts a name or a query in one form so the two can be compared: lower case,
 * no spaces, dots, apostrophes or hyphens, and no leading word for the level.
 *
 * @param text - A Thai or English name, or what a user typed.
 * @returns The text in compare form. Empty if nothing is left.
 * @example
 * normalize('Ko Pha-ngan'); // 'kophangan'
 * normalize('อำเภอเกาะพะงัน'); // 'เกาะพะงัน'
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[\s.'-]/g, '')
    .replace(PREFIX, '');
}
