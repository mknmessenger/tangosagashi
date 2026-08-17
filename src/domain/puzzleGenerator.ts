import { BOARD_PRESETS, DIRECTIONS, FILLER_CHARACTERS } from '../config/gameConfig';
import { POKEMON_CATALOG } from '../data/pokemonCatalog';
import type {
  Coordinate,
  CreatePuzzleOptions,
  Direction,
  PlacedTarget,
  PokemonEntry,
  Puzzle,
} from './types';

const MAX_PUZZLE_ATTEMPTS = 50;

function shuffled<T>(values: readonly T[], random: () => number): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function cellsForWord(
  size: number,
  start: Coordinate,
  direction: Direction,
  length: number,
): Coordinate[] | null {
  const cells = Array.from({ length }, (_, index) => ({
    row: start.row + direction.row * index,
    column: start.column + direction.column * index,
  }));

  const isInside = cells.every(
    (cell) => cell.row >= 0 && cell.row < size && cell.column >= 0 && cell.column < size,
  );
  return isInside ? cells : null;
}

function canPlace(grid: (string | null)[][], word: string, cells: readonly Coordinate[]): boolean {
  return cells.every((cell, index) => {
    const current = grid[cell.row][cell.column];
    return current === null || current === word[index];
  });
}

function placeTarget(
  grid: (string | null)[][],
  pokemon: PokemonEntry,
  directions: readonly Direction[],
  random: () => number,
): PlacedTarget | null {
  const size = grid.length;
  const starts = shuffled(
    Array.from({ length: size * size }, (_, index) => ({
      row: Math.floor(index / size),
      column: index % size,
    })),
    random,
  );
  const placements = starts.flatMap((start) =>
    shuffled(directions, random).map((direction) => ({ start, direction })),
  );

  for (const { start, direction } of placements) {
    const cells = cellsForWord(size, start, direction, pokemon.normalizedName.length);
    if (!cells || !canPlace(grid, pokemon.normalizedName, cells)) continue;

    cells.forEach((cell, index) => {
      grid[cell.row][cell.column] = pokemon.normalizedName[index];
    });
    return { ...pokemon, cells };
  }

  return null;
}

function fillEmptyCells(grid: (string | null)[][], random: () => number): string[][] {
  return grid.map((row) =>
    row.map(
      (cell) => cell ?? FILLER_CHARACTERS[Math.floor(random() * FILLER_CHARACTERS.length)] ?? 'ア',
    ),
  );
}

export function createPuzzle({
  difficulty,
  preset,
  random = Math.random,
}: CreatePuzzleOptions): Puzzle {
  const config = BOARD_PRESETS[preset];
  const candidates = POKEMON_CATALOG.filter(
    (pokemon) => pokemon.normalizedName.length <= config.size,
  );

  if (candidates.length < config.targetCount) {
    throw new Error(`Not enough Pokemon names for the ${preset} preset.`);
  }

  for (let attempt = 0; attempt < MAX_PUZZLE_ATTEMPTS; attempt += 1) {
    const grid = Array.from({ length: config.size }, () =>
      Array<string | null>(config.size).fill(null),
    );
    const selected = shuffled(candidates, random)
      .slice(0, config.targetCount)
      .sort((left, right) => right.normalizedName.length - left.normalizedName.length);
    const targets: PlacedTarget[] = [];

    for (const pokemon of selected) {
      const placed = placeTarget(grid, pokemon, DIRECTIONS[difficulty], random);
      if (!placed) break;
      targets.push(placed);
    }

    if (targets.length === config.targetCount) {
      return {
        size: config.size,
        difficulty,
        preset,
        grid: fillEmptyCells(grid, random),
        targets,
      };
    }
  }

  throw new Error('Unable to generate a puzzle with the current configuration.');
}

export function createSeededRandom(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let mixed = value;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4_294_967_296;
  };
}
