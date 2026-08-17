import { describe, expect, it } from 'vitest';
import { createSnappedSelection, pathsMatch } from './selection';

describe('selection', () => {
  it('snaps easy selections to the dominant horizontal or vertical axis', () => {
    expect(createSnappedSelection({ row: 2, column: 2 }, { row: 3, column: 6 }, 'easy', 8)).toEqual(
      [
        { row: 2, column: 2 },
        { row: 2, column: 3 },
        { row: 2, column: 4 },
        { row: 2, column: 5 },
        { row: 2, column: 6 },
      ],
    );
  });

  it('creates diagonal selections in normal mode', () => {
    expect(
      createSnappedSelection({ row: 1, column: 1 }, { row: 4, column: 4 }, 'normal', 8),
    ).toHaveLength(4);
  });

  it('allows a little finger drift without turning a straight line diagonal', () => {
    const path = createSnappedSelection({ row: 2, column: 2 }, { row: 3, column: 7 }, 'normal', 8);
    expect(path.every((cell) => cell.row === 2)).toBe(true);
  });

  it('accepts a target path in either drag direction', () => {
    const path = [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
    ];
    expect(pathsMatch(path, [...path].reverse())).toBe(true);
  });
});
