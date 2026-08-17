import type { CSSProperties } from 'react';

interface ConfettiProps {
  large?: boolean;
}

export function Confetti({ large = false }: ConfettiProps) {
  const count = large ? 180 : 60;
  return (
    <div className={`confetti ${large ? 'confetti--large' : ''}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={
            {
              '--confetti-index': index,
              '--confetti-x': `${(index * 37) % 100}%`,
              '--confetti-delay': `${(index % 24) * 0.045}s`,
              '--confetti-drift': `${((index * 29) % 120) - 60}px`,
              '--confetti-duration': `${1.4 + (index % 9) * 0.12}s`,
              '--confetti-size': `${0.38 + (index % 5) * 0.08}rem`,
              '--confetti-height': `${0.65 + (index % 6) * 0.1}rem`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
