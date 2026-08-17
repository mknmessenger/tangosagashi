import type { Coordinate, Difficulty } from './types';

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function createSnappedSelection(
  start: Coordinate,
  end: Coordinate,
  difficulty: Difficulty,
  size: number,
): Coordinate[] {
  const rowDelta = end.row - start.row;
  const columnDelta = end.column - start.column;
  if (rowDelta === 0 && columnDelta === 0) return [start];

  let rowStep: -1 | 0 | 1 = Math.sign(rowDelta) as -1 | 0 | 1;
  let columnStep: -1 | 0 | 1 = Math.sign(columnDelta) as -1 | 0 | 1;
  let distance: number;

  if (difficulty === 'easy') {
    if (Math.abs(columnDelta) >= Math.abs(rowDelta)) {
      rowStep = 0;
      distance = Math.abs(columnDelta);
    } else {
      columnStep = 0;
      distance = Math.abs(rowDelta);
    }
  } else {
    const absoluteRow = Math.abs(rowDelta);
    const absoluteColumn = Math.abs(columnDelta);
    if (absoluteRow * 2 < absoluteColumn) {
      rowStep = 0;
      distance = absoluteColumn;
    } else if (absoluteColumn * 2 < absoluteRow) {
      columnStep = 0;
      distance = absoluteRow;
    } else {
      distance = Math.max(absoluteRow, absoluteColumn);
    }
  }

  const limits = [
    rowStep > 0 ? size - 1 - start.row : rowStep < 0 ? start.row : Number.POSITIVE_INFINITY,
    columnStep > 0
      ? size - 1 - start.column
      : columnStep < 0
        ? start.column
        : Number.POSITIVE_INFINITY,
  ];
  const maximumDistance = Math.min(...limits);
  const safeDistance = clamp(distance, 0, maximumDistance);

  return Array.from({ length: safeDistance + 1 }, (_, index) => ({
    row: start.row + rowStep * index,
    column: start.column + columnStep * index,
  })).filter((cell) => cell.row >= 0 && cell.row < size && cell.column >= 0 && cell.column < size);
}

export function pathsMatch(left: readonly Coordinate[], right: readonly Coordinate[]): boolean {
  if (left.length !== right.length) return false;
  const forward = left.every(
    (cell, index) => cell.row === right[index].row && cell.column === right[index].column,
  );
  if (forward) return true;
  return left.every((cell, index) => {
    const other = right[right.length - 1 - index];
    return cell.row === other.row && cell.column === other.column;
  });
}

export function coordinateKey(coordinate: Coordinate): string {
  return `${coordinate.row}-${coordinate.column}`;
}
