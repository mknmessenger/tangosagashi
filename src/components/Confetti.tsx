import type { CSSProperties } from 'react';

interface ConfettiProps {
  large?: boolean;
}

export function Confetti({ large = false }: ConfettiProps) {
  const count = large ? 36 : 12;
  return (
    <div className={`confetti ${large ? 'confetti--large' : ''}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={
            {
              '--confetti-index': index,
              '--confetti-x': `${(index * 37) % 100}%`,
              '--confetti-delay': `${(index % 7) * 0.04}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
