import { useState } from 'react';
import { ConfirmDialog } from '../components/ConfirmDialog';

interface SettingsScreenProps {
  soundEnabled: boolean;
  totalFound: number;
  onSoundChange: (enabled: boolean) => void;
  onReset: () => void;
  onBack: () => void;
}

export function SettingsScreen({
  soundEnabled,
  totalFound,
  onSoundChange,
  onReset,
  onBack,
}: SettingsScreenProps) {
  const [showResetDialog, setShowResetDialog] = useState(false);
  return (
    <main className="app-frame settings-screen">
      <header className="section-header">
        <button type="button" className="back-button" onClick={onBack}>
          ‹ もどる
        </button>
        <h1>せってい</h1>
      </header>

      <section className="settings-card">
        <div>
          <strong>おと</strong>
          <span>{soundEnabled ? 'あり' : 'なし'}</span>
        </div>
        <button
          type="button"
          className="switch-button"
          role="switch"
          aria-checked={soundEnabled}
          onClick={() => onSoundChange(!soundEnabled)}
        >
          <span />
        </button>
      </section>

      <section className="settings-card settings-card--record">
        <span>あつめた ポケモン</span>
        <strong>{totalFound}ひき</strong>
        <button
          type="button"
          className="danger-text-button"
          onClick={() => setShowResetDialog(true)}
        >
          きろくを けす
        </button>
      </section>

      {showResetDialog && (
        <ConfirmDialog
          title="あつめた きろくを けす？"
          cancelLabel="けさない"
          confirmLabel="けす"
          destructive
          onCancel={() => setShowResetDialog(false)}
          onConfirm={() => {
            onReset();
            setShowResetDialog(false);
          }}
        />
      )}
    </main>
  );
}
