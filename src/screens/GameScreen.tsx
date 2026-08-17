import type { CSSProperties } from 'react';
import type { Puzzle } from '../domain/types';

interface GameScreenProps {
  puzzle: Puzzle;
  onBack: () => void;
}

export function GameScreen({ puzzle, onBack }: GameScreenProps) {
  const gridStyle = { '--grid-size': puzzle.size } as CSSProperties;

  return (
    <main className="app-frame game-screen">
      <header className="game-header">
        <button type="button" className="back-button" onClick={onBack}>
          ‹ もどる
        </button>
        <div className="game-progress">
          <span>みつけた</span>
          <strong>0 / {puzzle.targets.length}</strong>
        </div>
      </header>

      <div
        className={`word-grid word-grid--${puzzle.size}`}
        style={gridStyle}
        role="grid"
        aria-label={`${puzzle.size}かける${puzzle.size}の文字盤面`}
      >
        {puzzle.grid.flatMap((row, rowIndex) =>
          row.map((character, columnIndex) => (
            <span key={`${rowIndex}-${columnIndex}`} className="word-grid__cell" role="gridcell">
              {character}
            </span>
          )),
        )}
      </div>

      <p className="game-hint">みつけた ことばを ゆびで なぞろう</p>
      <ul className="target-list" aria-label="さがすポケモン">
        {puzzle.targets.map((target) => (
          <li key={target.id}>{target.displayName}</li>
        ))}
      </ul>
    </main>
  );
}
