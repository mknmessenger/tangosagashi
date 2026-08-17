const SMALL_TO_LARGE: Readonly<Record<string, string>> = {
  ァ: 'ア',
  ィ: 'イ',
  ゥ: 'ウ',
  ェ: 'エ',
  ォ: 'オ',
  ッ: 'ツ',
  ャ: 'ヤ',
  ュ: 'ユ',
  ョ: 'ヨ',
  ヮ: 'ワ',
  ヵ: 'カ',
  ヶ: 'ケ',
};

export function normalizePokemonName(name: string): string {
  return Array.from(name, (character) => SMALL_TO_LARGE[character] ?? character).join('');
}
