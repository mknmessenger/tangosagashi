import { useEffect, useReducer } from 'react';
import { createPuzzle } from './domain/puzzleGenerator';
import type { BoardPresetKey, Difficulty, GameSettings, SavedGame } from './domain/types';
import { loadStoredState, saveStoredState } from './persistence/gameStorage';
import { CompleteScreen } from './screens/CompleteScreen';
import { GameScreen } from './screens/GameScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { TitleScreen } from './screens/TitleScreen';

type Screen = 'title' | 'game' | 'settings' | 'complete';

interface AppState {
  screen: Screen;
  settings: GameSettings;
  totalFound: number;
  activeGame: SavedGame | null;
}

type Action =
  | { type: 'setDifficulty'; value: Difficulty }
  | { type: 'setPreset'; value: BoardPresetKey }
  | { type: 'setSound'; value: boolean }
  | { type: 'start'; game: SavedGame }
  | { type: 'found'; targetId: string }
  | { type: 'showSettings' }
  | { type: 'showTitle' }
  | { type: 'resetTotal' };

function initialState(): AppState {
  const stored = loadStoredState();
  return {
    screen: stored.activeGame
      ? stored.activeGame.foundTargetIds.length === stored.activeGame.puzzle.targets.length
        ? 'complete'
        : 'game'
      : 'title',
    settings: stored.settings,
    totalFound: stored.totalFound,
    activeGame: stored.activeGame,
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'setDifficulty':
      return { ...state, settings: { ...state.settings, difficulty: action.value } };
    case 'setPreset':
      return { ...state, settings: { ...state.settings, preset: action.value } };
    case 'setSound':
      return { ...state, settings: { ...state.settings, soundEnabled: action.value } };
    case 'start':
      return { ...state, screen: 'game', activeGame: action.game };
    case 'found': {
      if (!state.activeGame || state.activeGame.foundTargetIds.includes(action.targetId))
        return state;
      const foundTargetIds = [...state.activeGame.foundTargetIds, action.targetId];
      return {
        ...state,
        screen:
          foundTargetIds.length === state.activeGame.puzzle.targets.length ? 'complete' : 'game',
        totalFound: state.totalFound + 1,
        activeGame: { ...state.activeGame, foundTargetIds },
      };
    }
    case 'showSettings':
      return { ...state, screen: 'settings' };
    case 'showTitle':
      return { ...state, screen: 'title', activeGame: null };
    case 'resetTotal':
      return { ...state, totalFound: 0 };
  }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  useEffect(() => {
    saveStoredState({
      version: 1,
      settings: state.settings,
      totalFound: state.totalFound,
      activeGame: state.activeGame,
    });
  }, [state.settings, state.totalFound, state.activeGame]);

  const startGame = () => {
    dispatch({
      type: 'start',
      game: { puzzle: createPuzzle(state.settings), foundTargetIds: [] },
    });
  };

  if (state.screen === 'game' && state.activeGame) {
    return (
      <GameScreen
        game={state.activeGame}
        soundEnabled={state.settings.soundEnabled}
        onFound={(targetId) => dispatch({ type: 'found', targetId })}
        onBack={() => dispatch({ type: 'showTitle' })}
      />
    );
  }

  if (state.screen === 'complete' && state.activeGame) {
    return (
      <CompleteScreen
        foundThisGame={state.activeGame.foundTargetIds.length}
        totalFound={state.totalFound}
        onReplay={startGame}
        onTitle={() => dispatch({ type: 'showTitle' })}
      />
    );
  }

  if (state.screen === 'settings') {
    return (
      <SettingsScreen
        soundEnabled={state.settings.soundEnabled}
        totalFound={state.totalFound}
        onSoundChange={(value) => dispatch({ type: 'setSound', value })}
        onReset={() => dispatch({ type: 'resetTotal' })}
        onBack={() => dispatch({ type: 'showTitle' })}
      />
    );
  }

  return (
    <TitleScreen
      difficulty={state.settings.difficulty}
      preset={state.settings.preset}
      totalFound={state.totalFound}
      onDifficultyChange={(value) => dispatch({ type: 'setDifficulty', value })}
      onPresetChange={(value) => dispatch({ type: 'setPreset', value })}
      onStart={startGame}
      onSettings={() => dispatch({ type: 'showSettings' })}
    />
  );
}
