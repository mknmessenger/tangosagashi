import { Confetti } from '../components/Confetti';

interface CompleteScreenProps {
  foundThisGame: number;
  totalFound: number;
  onReplay: () => void;
  onTitle: () => void;
}

export function CompleteScreen({
  foundThisGame,
  totalFound,
  onReplay,
  onTitle,
}: CompleteScreenProps) {
  return (
    <main className="app-frame complete-screen">
      <Confetti large />
      <div className="complete-badge" aria-hidden="true">
        ★
      </div>
      <p className="eyebrow">ぜんぶ みつけた！</p>
      <h1>クリア！</h1>
      <div className="complete-stats">
        <p>
          <span>こんかい</span>
          <strong>{foundThisGame}ひき</strong>
        </p>
        <p>
          <span>ぜんぶで</span>
          <strong>{totalFound}ひき</strong>
        </p>
      </div>
      <button type="button" className="primary-button" onClick={onReplay}>
        もういっかい
      </button>
      <button type="button" className="text-button" onClick={onTitle}>
        タイトルに もどる
      </button>
    </main>
  );
}
