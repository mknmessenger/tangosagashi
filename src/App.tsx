import { useState } from 'react';
import type { BoardPresetKey, Difficulty, Puzzle } from './domain/types';
import { createPuzzle } from './domain/puzzleGenerator';
import { GameScreen } from './screens/GameScreen';
import { TitleScreen } from './screens/TitleScreen';

type Screen = 'title' | 'game';

export function App() {
  const [screen, setScreen] = useState<Screen>('title');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [preset, setPreset] = useState<BoardPresetKey>('small');
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);

  const startGame = () => {
    setPuzzle(createPuzzle({ difficulty, preset }));
    setScreen('game');
  };

  if (screen === 'game' && puzzle) {
    return <GameScreen puzzle={puzzle} onBack={() => setScreen('title')} />;
  }

  return (
    <TitleScreen
      difficulty={difficulty}
      preset={preset}
      totalFound={0}
      onDifficultyChange={setDifficulty}
      onPresetChange={setPreset}
      onStart={startGame}
    />
  );
}
