import type { BoardPresetKey } from '../domain/types';

// 本物と一文字だけ違う「ニアミス語」を盤面へ混ぜる数。
export const DECOY_COUNT_BY_PRESET: Readonly<Record<BoardPresetKey, number>> = {
  small: 1,
  medium: 2,
  large: 3,
};
