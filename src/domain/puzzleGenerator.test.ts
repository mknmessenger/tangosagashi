import { describe, expect, it } from 'vitest';
import { BOARD_PRESETS, DIRECTIONS } from '../config/gameConfig';
import { DECOY_COUNT_BY_PRESET } from '../config/decoyConfig';
import { POKEMON_CATALOG, STARTER_NAMES } from '../data/pokemonCatalog';
import { countWordOccurrences, createPuzzle, createSeededRandom } from './puzzleGenerator';

describe('createPuzzle', () => {
  it('creates the small preset with four placed targets', () => {
    const puzzle = createPuzzle({
      difficulty: 'easy',
      preset: 'small',
      random: createSeededRandom(42),
    });

    expect(puzzle.grid).toHaveLength(BOARD_PRESETS.small.size);
    expect(puzzle.grid.every((row) => row.length === BOARD_PRESETS.small.size)).toBe(true);
    expect(puzzle.targets).toHaveLength(BOARD_PRESETS.small.targetCount);
  });

  it.each(['small', 'medium', 'large'] as const)(
    'places each target into the grid for the %s preset',
    (preset) => {
      const puzzle = createPuzzle({
        difficulty: 'normal',
        preset,
        random: createSeededRandom(100 + BOARD_PRESETS[preset].size),
      });

      for (const target of puzzle.targets) {
        const placedWord = target.cells.map((cell) => puzzle.grid[cell.row][cell.column]).join('');
        expect(placedWord).toBe(target.normalizedName);
        expect(countWordOccurrences(puzzle.grid, target.normalizedName)).toBe(1);
      }

      expect(puzzle.decoys).toHaveLength(DECOY_COUNT_BY_PRESET[preset]);
      const catalogNames = new Set(POKEMON_CATALOG.map((pokemon) => pokemon.normalizedName));
      for (const decoy of puzzle.decoys) {
        const placedWord = decoy.cells.map((cell) => puzzle.grid[cell.row][cell.column]).join('');
        const differenceCount = Array.from(decoy.decoyWord).filter(
          (character, index) => character !== decoy.normalizedSourceName[index],
        ).length;
        expect(placedWord).toBe(decoy.decoyWord);
        expect(decoy.decoyWord).toHaveLength(decoy.normalizedSourceName.length);
        expect(differenceCount).toBe(1);
        expect(catalogNames.has(decoy.decoyWord)).toBe(false);
      }
    },
  );

  it('uses only the four allowed directions in easy mode', () => {
    const puzzle = createPuzzle({
      difficulty: 'easy',
      preset: 'small',
      random: createSeededRandom(7),
    });
    const allowed = new Set(
      DIRECTIONS.easy.map((direction) => `${direction.row},${direction.column}`),
    );

    for (const target of puzzle.targets) {
      const first = target.cells[0];
      const second = target.cells[1];
      const direction = `${second.row - first.row},${second.column - first.column}`;
      expect(allowed.has(direction)).toBe(true);
    }
  });

  it('contains roughly one hundred distinct candidates and every starter', () => {
    expect(POKEMON_CATALOG).toHaveLength(108);
    expect(STARTER_NAMES).toHaveLength(27);
    expect(new Set(POKEMON_CATALOG.map((pokemon) => pokemon.displayName)).size).toBe(
      POKEMON_CATALOG.length,
    );
    for (const starter of STARTER_NAMES) {
      expect(POKEMON_CATALOG.some((pokemon) => pokemon.displayName === starter)).toBe(true);
    }
    for (const unreleasedStarter of ['ハブロウ', 'ポムケン', 'ミオリー']) {
      expect(POKEMON_CATALOG.some((pokemon) => pokemon.displayName === unreleasedStarter)).toBe(
        false,
      );
    }
  });
});
