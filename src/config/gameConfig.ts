import type { BoardPreset, BoardPresetKey, Difficulty, Direction } from '../domain/types';

export const BOARD_PRESETS: Record<BoardPresetKey, BoardPreset> = {
  small: { label: '小', size: 8, targetCount: 4 },
  medium: { label: '中', size: 12, targetCount: 8 },
  large: { label: '大', size: 16, targetCount: 12 },
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'かんたん',
  normal: 'ふつう',
};

export const DIRECTIONS: Record<Difficulty, readonly Direction[]> = {
  easy: [
    { row: 0, column: 1 },
    { row: 0, column: -1 },
    { row: 1, column: 0 },
    { row: -1, column: 0 },
  ],
  normal: [
    { row: 0, column: 1 },
    { row: 0, column: -1 },
    { row: 1, column: 0 },
    { row: -1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: -1 },
    { row: -1, column: 1 },
    { row: -1, column: -1 },
  ],
};

export const FILLER_CHARACTERS = Array.from(
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン',
);
