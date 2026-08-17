import type { PokemonEntry } from '../domain/types';
import { normalizePokemonName } from '../domain/nameNormalizer';

const DISPLAY_NAMES = [
  'ピカチュウ',
  'イーブイ',
  'フシギダネ',
  'ヒトカゲ',
  'ゼニガメ',
  'チコリータ',
  'ヒノアラシ',
  'ワニノコ',
  'キモリ',
  'アチャモ',
  'ミズゴロウ',
  'ナエトル',
  'ヒコザル',
  'ポッチャマ',
  'ニャオハ',
  'ホゲータ',
  'クワッス',
] as const;

export const POKEMON_CATALOG: readonly PokemonEntry[] = DISPLAY_NAMES.map((displayName, index) => ({
  id: `pokemon-${index + 1}`,
  displayName,
  normalizedName: normalizePokemonName(displayName),
}));
