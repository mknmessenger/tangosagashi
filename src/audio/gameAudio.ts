let audioContext: AudioContext | null = null;

function playNotes(notes: readonly number[]): void {
  const AudioContextClass =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  audioContext ??= new AudioContextClass();
  const start = audioContext.currentTime;
  notes.forEach((frequency, index) => {
    const oscillator = audioContext!.createOscillator();
    const gain = audioContext!.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start + index * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.14, start + index * 0.09 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + index * 0.09 + 0.16);
    oscillator.connect(gain).connect(audioContext!.destination);
    oscillator.start(start + index * 0.09);
    oscillator.stop(start + index * 0.09 + 0.18);
  });
}

export function playFoundSound(enabled: boolean): void {
  if (!enabled) return;
  try {
    playNotes([659, 784]);
  } catch {
    // 音声APIが利用できない環境でも発見処理は止めない。
  }
}

export function playCompleteSound(enabled: boolean): void {
  if (!enabled) return;
  try {
    playNotes([523, 659, 784, 1047]);
  } catch {
    // 音声APIが利用できない環境でもクリア処理は止めない。
  }
}
