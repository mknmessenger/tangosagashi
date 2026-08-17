import { BOARD_PRESETS, DIFFICULTY_LABELS } from '../config/gameConfig';
import type { BoardPresetKey, Difficulty } from '../domain/types';

interface TitleScreenProps {
  difficulty: Difficulty;
  preset: BoardPresetKey;
  totalFound: number;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onPresetChange: (preset: BoardPresetKey) => void;
  onStart: () => void;
}

const DIFFICULTIES = Object.keys(DIFFICULTY_LABELS) as Difficulty[];
const PRESETS = Object.keys(BOARD_PRESETS) as BoardPresetKey[];

export function TitleScreen({
  difficulty,
  preset,
  totalFound,
  onDifficultyChange,
  onPresetChange,
  onStart,
}: TitleScreenProps) {
  return (
    <main className="app-frame title-screen">
      <header className="title-screen__hero">
        <div className="search-mark" aria-hidden="true">
          🔎
        </div>
        <p className="eyebrow">みつけて なぞろう！</p>
        <h1>
          ポケモン
          <br />
          ことばさがし
        </h1>
      </header>

      <div className="total-card" aria-label={`あつめたポケモン ${totalFound}ひき`}>
        <span>あつめた ポケモン</span>
        <strong>{totalFound}ひき</strong>
      </div>

      <fieldset className="choice-group">
        <legend>むずかしさ</legend>
        <div className="difficulty-choices">
          {DIFFICULTIES.map((value) => (
            <button
              key={value}
              type="button"
              className="choice-button"
              aria-pressed={difficulty === value}
              onClick={() => onDifficultyChange(value)}
            >
              {DIFFICULTY_LABELS[value]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="choice-group">
        <legend>ばんめんの おおきさ</legend>
        <div className="size-choices">
          {PRESETS.map((key) => {
            const option = BOARD_PRESETS[key];
            return (
              <button
                key={key}
                type="button"
                className="size-button"
                aria-pressed={preset === key}
                onClick={() => onPresetChange(key)}
              >
                <strong>{option.label}</strong>
                <span>
                  {option.size}×{option.size}
                </span>
                <small>{option.targetCount}ひき</small>
              </button>
            );
          })}
        </div>
      </fieldset>

      <button type="button" className="primary-button" onClick={onStart}>
        ゲームスタート
      </button>
      <button type="button" className="text-button" disabled>
        せってい（つぎのBoltで追加）
      </button>
    </main>
  );
}
