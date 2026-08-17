import { BOARD_PRESETS, DIRECTIONS, FILLER_CHARACTERS } from '../config/gameConfig';
import { DECOY_COUNT_BY_PRESET } from '../config/decoyConfig';
import { POKEMON_CATALOG } from '../data/pokemonCatalog';
import type {
  Coordinate,
  CreatePuzzleOptions,
  Direction,
  PlacedDecoy,
  PlacedTarget,
  PokemonEntry,
  Puzzle,
} from './types';

const MAX_PUZZLE_ATTEMPTS = 50;
const MAX_FILL_ATTEMPTS = 100;
const CATALOG_NAMES = new Set(POKEMON_CATALOG.map((pokemon) => pokemon.normalizedName));

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

function placeWord(
  grid: (string | null)[][],
  word: string,
  directions: readonly Direction[],
  random: () => number,
): Coordinate[] | null {
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
    const cells = cellsForWord(size, start, direction, word.length);
    if (!cells || !canPlace(grid, word, cells)) continue;

    cells.forEach((cell, index) => {
      grid[cell.row][cell.column] = word[index];
    });
    return cells;
  }

  return null;
}

function placeTarget(
  grid: (string | null)[][],
  pokemon: PokemonEntry,
  directions: readonly Direction[],
  random: () => number,
): PlacedTarget | null {
  const cells = placeWord(grid, pokemon.normalizedName, directions, random);
  return cells ? { ...pokemon, cells } : null;
}

function createDecoyWord(pokemon: PokemonEntry, random: () => number): Omit<PlacedDecoy, 'cells'> {
  const positions = shuffled(
    Array.from({ length: pokemon.normalizedName.length }, (_, index) => index),
    random,
  );
  for (const position of positions) {
    for (const replacement of shuffled(FILLER_CHARACTERS, random)) {
      if (replacement === pokemon.normalizedName[position]) continue;
      const characters = Array.from(pokemon.normalizedName);
      characters[position] = replacement;
      const decoyWord = characters.join('');
      if (!CATALOG_NAMES.has(decoyWord)) {
        return {
          sourcePokemonId: pokemon.id,
          sourceName: pokemon.displayName,
          normalizedSourceName: pokemon.normalizedName,
          decoyWord,
        };
      }
    }
  }
  throw new Error(`Unable to create a decoy for ${pokemon.displayName}.`);
}

function fillEmptyCells(grid: (string | null)[][], random: () => number): string[][] {
  return grid.map((row) =>
    row.map(
      (cell) => cell ?? FILLER_CHARACTERS[Math.floor(random() * FILLER_CHARACTERS.length)] ?? 'ア',
    ),
  );
}

export function countWordOccurrences(grid: readonly string[][], word: string): number {
  let occurrences = 0;
  for (let row = 0; row < grid.length; row += 1) {
    for (let column = 0; column < grid.length; column += 1) {
      for (const direction of DIRECTIONS.normal) {
        const cells = cellsForWord(grid.length, { row, column }, direction, word.length);
        if (cells && cells.map((cell) => grid[cell.row][cell.column]).join('') === word) {
          occurrences += 1;
        }
      }
    }
  }
  return occurrences;
}

function fillWithoutDuplicateTargets(
  grid: (string | null)[][],
  targets: readonly PlacedTarget[],
  random: () => number,
): string[][] | null {
  for (let attempt = 0; attempt < MAX_FILL_ATTEMPTS; attempt += 1) {
    const filled = fillEmptyCells(grid, random);
    if (targets.every((target) => countWordOccurrences(filled, target.normalizedName) === 1)) {
      return filled;
    }
  }
  return null;
}

export function createPuzzle({
  difficulty,
  preset,
  random = Math.random,
}: CreatePuzzleOptions): Puzzle {
  const config = BOARD_PRESETS[preset];
  const decoyCount = DECOY_COUNT_BY_PRESET[preset];
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
    const decoys: PlacedDecoy[] = [];

    for (const pokemon of selected) {
      const placed = placeTarget(grid, pokemon, DIRECTIONS[difficulty], random);
      if (!placed) break;
      targets.push(placed);
    }

    if (targets.length !== config.targetCount) continue;

    const selectedIds = new Set(selected.map((pokemon) => pokemon.id));
    const usedDecoyWords = new Set<string>();
    for (const pokemon of shuffled(
      candidates.filter((candidate) => !selectedIds.has(candidate.id)),
      random,
    )) {
      const decoy = createDecoyWord(pokemon, random);
      if (usedDecoyWords.has(decoy.decoyWord)) continue;
      const cells = placeWord(grid, decoy.decoyWord, DIRECTIONS[difficulty], random);
      if (!cells) continue;
      usedDecoyWords.add(decoy.decoyWord);
      decoys.push({ ...decoy, cells });
      if (decoys.length === decoyCount) break;
    }

    if (decoys.length === decoyCount) {
      const filledGrid = fillWithoutDuplicateTargets(grid, targets, random);
      if (!filledGrid) continue;
      return {
        id: `puzzle-${Date.now()}-${Math.floor(random() * 1_000_000)}`,
        size: config.size,
        difficulty,
        preset,
        grid: filledGrid,
        targets,
        decoys,
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
