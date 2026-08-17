import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { BOARD_PRESETS } from './config/gameConfig';
import { createPuzzle, createSeededRandom } from './domain/puzzleGenerator';
import { saveStoredState } from './persistence/gameStorage';

describe('App', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('starts with the approved easy and small defaults', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: 'かんたん' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    const small = BOARD_PRESETS.small;
    expect(
      screen.getByRole('button', {
        name: `${small.label}${small.size}×${small.size}${small.targetCount}ひき`,
      }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('opens a small game with four targets', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'ゲームスタート' }));
    expect(screen.getAllByRole('gridcell')).toHaveLength(BOARD_PRESETS.small.size ** 2);
    expect(screen.getByText(`0 / ${BOARD_PRESETS.small.targetCount}`)).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'さがすポケモン' }).children).toHaveLength(
      BOARD_PRESETS.small.targetCount,
    );
  });

  it('changes and persists the sound preference', () => {
    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'せってい' }));
    fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    unmount();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'せってい' }));
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('keeps the solved board behind a temporary clear overlay', () => {
    vi.useFakeTimers();
    const puzzle = createPuzzle({
      difficulty: 'easy',
      preset: 'small',
      random: createSeededRandom(2026),
    });
    saveStoredState({
      version: 1,
      settings: { difficulty: 'easy', preset: 'small', soundEnabled: false },
      totalFound: BOARD_PRESETS.small.targetCount,
      activeGame: { puzzle, foundTargetIds: puzzle.targets.map((target) => target.id) },
    });

    render(<App />);
    expect(screen.getAllByRole('gridcell')).toHaveLength(BOARD_PRESETS.small.size ** 2);
    expect(screen.getByText('クリア！')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(3200));
    expect(screen.queryByText('クリア！')).not.toBeInTheDocument();
    expect(screen.getAllByRole('gridcell')).toHaveLength(BOARD_PRESETS.small.size ** 2);
    expect(screen.getByRole('button', { name: 'もういっかい' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'タイトルに もどる' })).toBeInTheDocument();
  });
});
