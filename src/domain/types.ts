export type Difficulty = 'easy' | 'normal';
export type BoardPresetKey = 'small' | 'medium' | 'large' | 'extraLarge' | 'space';

export interface BoardPreset {
  label: string;
  size: number;
  targetCount: number;
}

export interface Direction {
  row: -1 | 0 | 1;
  column: -1 | 0 | 1;
}

export interface Coordinate {
  row: number;
  column: number;
}

export interface PokemonEntry {
  id: string;
  displayName: string;
  normalizedName: string;
  isStarter: boolean;
}

export interface PlacedTarget extends PokemonEntry {
  cells: Coordinate[];
}

export interface PlacedDecoy {
  sourcePokemonId: string;
  sourceName: string;
  normalizedSourceName: string;
  decoyWord: string;
  cells: Coordinate[];
}

export interface Puzzle {
  id: string;
  size: number;
  difficulty: Difficulty;
  preset: BoardPresetKey;
  grid: string[][];
  targets: PlacedTarget[];
  decoys: PlacedDecoy[];
}

export interface GameSettings {
  difficulty: Difficulty;
  preset: BoardPresetKey;
  soundEnabled: boolean;
}

export interface SavedGame {
  puzzle: Puzzle;
  foundTargetIds: string[];
}

export interface CreatePuzzleOptions {
  difficulty: Difficulty;
  preset: BoardPresetKey;
  random?: () => number;
}
