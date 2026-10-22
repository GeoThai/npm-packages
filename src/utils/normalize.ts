// Words people type before a name ("อำเภอ…", "เขต…") and the marks English names differ by.
const PREFIX = /^(?:จังหวัด|อำเภอ|เขต|ตำบล|แขวง|กิ่งอำเภอ)/;
// Short forms need their dot: without it, "อ" is the first letter of names such as อ่างทอง.
const SHORT = /^\s*(?:จ|อ|ต)\.\s*/;

/**
 * Puts a name or a query in one form so the two can be compared: lower case,
 * no spaces, dots, apostrophes or hyphens, and no leading word for the level.
 *
 * @param text - A Thai or English name, or what a user typed.
 * @returns The text in compare form. Empty if nothing is left.
 * @example
 * normalize('Ko Pha-ngan'); // 'kophangan'
 * normalize('อำเภอเกาะพะงัน'); // 'เกาะพะงัน'
 * normalize('อ. เกาะพะงัน'); // 'เกาะพะงัน'
 */
export function normalize(text: string): string {
  return text
    .replace(SHORT, '')
    .toLowerCase()
    .replaceAll(/[\s.'-]/g, '')
    .replace(PREFIX, '');
}
