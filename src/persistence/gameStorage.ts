import type { BoardPresetKey, Difficulty, GameSettings, SavedGame } from '../domain/types';

const STORAGE_KEY = 'tangosagashi:v1';
const DEFAULT_SETTINGS: GameSettings = {
  difficulty: 'easy',
  preset: 'small',
  soundEnabled: true,
};

export interface StoredState {
  version: 1;
  settings: GameSettings;
  totalFound: number;
  activeGame: SavedGame | null;
}

export const DEFAULT_STORED_STATE: StoredState = {
  version: 1,
  settings: DEFAULT_SETTINGS,
  totalFound: 0,
  activeGame: null,
};

const isDifficulty = (value: unknown): value is Difficulty =>
  value === 'easy' || value === 'normal';
const isPreset = (value: unknown): value is BoardPresetKey =>
  value === 'small' || value === 'medium' || value === 'large';

function isSavedGame(value: unknown): value is SavedGame {
  if (!value || typeof value !== 'object') return false;
  const game = value as Partial<SavedGame>;
  const puzzle = game.puzzle;
  return Boolean(
    puzzle &&
    typeof puzzle.id === 'string' &&
    typeof puzzle.size === 'number' &&
    isDifficulty(puzzle.difficulty) &&
    isPreset(puzzle.preset) &&
    Array.isArray(puzzle.grid) &&
    puzzle.grid.length === puzzle.size &&
    puzzle.grid.every(
      (row) =>
        Array.isArray(row) &&
        row.length === puzzle.size &&
        row.every((cell) => typeof cell === 'string'),
    ) &&
    Array.isArray(puzzle.targets) &&
    Array.isArray(game.foundTargetIds) &&
    game.foundTargetIds.every((id) => typeof id === 'string'),
  );
}

export function loadStoredState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORED_STATE;
    const value = JSON.parse(raw) as Partial<StoredState>;
    const settings = value.settings;
    if (
      value.version !== 1 ||
      !settings ||
      !isDifficulty(settings.difficulty) ||
      !isPreset(settings.preset) ||
      typeof settings.soundEnabled !== 'boolean' ||
      typeof value.totalFound !== 'number' ||
      value.totalFound < 0
    ) {
      return DEFAULT_STORED_STATE;
    }
    return {
      version: 1,
      settings,
      totalFound: Math.floor(value.totalFound),
      activeGame: isSavedGame(value.activeGame) ? value.activeGame : null,
    };
  } catch {
    return DEFAULT_STORED_STATE;
  }
}

export function saveStoredState(state: StoredState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Safariのプライベートブラウズ等で保存できなくても、ゲーム自体は継続する。
  }
}
