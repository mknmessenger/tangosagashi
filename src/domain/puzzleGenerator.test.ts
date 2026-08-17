import { describe, expect, it } from 'vitest';
import { BOARD_PRESETS, DIRECTIONS } from '../config/gameConfig';
import { createPuzzle, createSeededRandom } from './puzzleGenerator';

describe('createPuzzle', () => {
  it('creates the small preset with four placed targets', () => {
    const puzzle = createPuzzle({
      difficulty: 'easy',
      preset: 'small',
      random: createSeededRandom(42),
    });

    expect(puzzle.grid).toHaveLength(8);
    expect(puzzle.grid.every((row) => row.length === 8)).toBe(true);
    expect(puzzle.targets).toHaveLength(4);
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
});
