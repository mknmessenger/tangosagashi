import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { playCompleteSound, playFoundSound } from '../audio/gameAudio';
import { Confetti } from '../components/Confetti';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { coordinateKey, createSnappedSelection, pathsMatch } from '../domain/selection';
import type { Coordinate, SavedGame } from '../domain/types';

interface GameScreenProps {
  game: SavedGame;
  soundEnabled: boolean;
  onFound: (targetId: string) => void;
  onBack: () => void;
}

const TARGET_COLORS = [
  '#ffb38a',
  '#8ed8c2',
  '#a9c8ff',
  '#f6cf72',
  '#c9b2f4',
  '#f5a6c7',
  '#8fd6e8',
  '#c5dc87',
  '#ffcf9f',
  '#b5c6d8',
  '#d8b58f',
  '#a7d7a9',
] as const;

function backgroundFor(colors: readonly string[]): string | undefined {
  if (colors.length === 0) return undefined;
  if (colors.length === 1) return colors[0];
  const slice = 100 / colors.length;
  return `linear-gradient(135deg, ${colors
    .map((color, index) => `${color} ${index * slice}% ${(index + 1) * slice}%`)
    .join(', ')})`;
}

export function GameScreen({ game, soundEnabled, onFound, onBack }: GameScreenProps) {
  const { puzzle, foundTargetIds } = game;
  const gridRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<Coordinate | null>(null);
  const selectionRef = useRef<Coordinate[]>([]);
  const [selection, setSelection] = useState<Coordinate[]>([]);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: 'success' | 'wrong'; key: number } | null>(null);
  const gridStyle = { '--grid-size': puzzle.size } as CSSProperties;
  const selectedKeys = new Set(selection.map(coordinateKey));

  const coordinateFromPoint = (clientX: number, clientY: number): Coordinate | null => {
    const element = document
      .elementFromPoint(clientX, clientY)
      ?.closest<HTMLElement>('[data-cell]');
    if (!element || !gridRef.current?.contains(element)) return null;
    const row = Number(element.dataset.row);
    const column = Number(element.dataset.column);
    return Number.isInteger(row) && Number.isInteger(column) ? { row, column } : null;
  };

  const updateSelection = (end: Coordinate) => {
    if (!dragStart.current) return;
    const next = createSnappedSelection(dragStart.current, end, puzzle.difficulty, puzzle.size);
    selectionRef.current = next;
    setSelection(next);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = coordinateFromPoint(event.clientX, event.clientY);
    if (!start) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = start;
    selectionRef.current = [start];
    setSelection([start]);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const end = coordinateFromPoint(event.clientX, event.clientY);
    if (end) updateSelection(end);
  };

  const finishSelection = () => {
    if (!dragStart.current) return;
    const path = selectionRef.current;
    const match = puzzle.targets.find(
      (target) => !foundTargetIds.includes(target.id) && pathsMatch(path, target.cells),
    );
    if (match) {
      const completesGame = foundTargetIds.length + 1 === puzzle.targets.length;
      if (completesGame) playCompleteSound(soundEnabled);
      else playFoundSound(soundEnabled);
      setFeedback({ kind: 'success', key: Date.now() });
      onFound(match.id);
    } else if (path.length > 1) {
      setFeedback({ kind: 'wrong', key: Date.now() });
    }
    dragStart.current = null;
    selectionRef.current = [];
    setSelection([]);
  };

  return (
    <main className="app-frame game-screen">
      <header className="game-header">
        <button type="button" className="back-button" onClick={() => setShowExitDialog(true)}>
          ‹ もどる
        </button>
        <div className="game-progress" aria-live="polite">
          <span>みつけた</span>
          <strong>
            {foundTargetIds.length} / {puzzle.targets.length}
          </strong>
        </div>
      </header>

      <div className="grid-stage">
        {feedback?.kind === 'success' && <Confetti key={feedback.key} />}
        <div
          ref={gridRef}
          className={`word-grid word-grid--${puzzle.size} ${feedback?.kind === 'wrong' ? 'word-grid--shake' : ''}`}
          key={feedback?.kind === 'wrong' ? feedback.key : 'grid'}
          style={gridStyle}
          role="grid"
          aria-label={`${puzzle.size}かける${puzzle.size}の文字盤面`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishSelection}
          onPointerCancel={finishSelection}
        >
          {puzzle.grid.flatMap((row, rowIndex) =>
            row.map((character, columnIndex) => {
              const key = `${rowIndex}-${columnIndex}`;
              const foundColors = puzzle.targets.flatMap((target, index) =>
                foundTargetIds.includes(target.id) &&
                target.cells.some((cell) => coordinateKey(cell) === key)
                  ? [TARGET_COLORS[index % TARGET_COLORS.length]]
                  : [],
              );
              return (
                <span
                  key={key}
                  data-cell
                  data-row={rowIndex}
                  data-column={columnIndex}
                  className={`word-grid__cell ${selectedKeys.has(key) ? 'word-grid__cell--selected' : ''}`}
                  style={{ background: backgroundFor(foundColors) }}
                  role="gridcell"
                >
                  {character}
                </span>
              );
            }),
          )}
        </div>
      </div>

      <p className="game-hint">みつけた ことばを ゆびで なぞろう</p>
      <ul className="target-list" aria-label="さがすポケモン">
        {puzzle.targets.map((target, index) => {
          const found = foundTargetIds.includes(target.id);
          return (
            <li
              key={target.id}
              className={found ? 'target-list__item--found' : ''}
              style={
                found
                  ? ({
                      '--target-color': TARGET_COLORS[index % TARGET_COLORS.length],
                    } as CSSProperties)
                  : undefined
              }
            >
              {target.displayName}
            </li>
          );
        })}
      </ul>

      {showExitDialog && (
        <ConfirmDialog
          title="ゲームを やめる？"
          cancelLabel="やめない"
          confirmLabel="やめる"
          onCancel={() => setShowExitDialog(false)}
          onConfirm={onBack}
        />
      )}
    </main>
  );
}
