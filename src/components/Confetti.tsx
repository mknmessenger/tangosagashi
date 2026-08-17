import { useState, type CSSProperties } from 'react';

interface ConfettiProps {
  large?: boolean;
}

const COLORS = ['#ed7251', '#4daea1', '#efbd48', '#6d8fd0', '#d56db0', '#f19a55'];

export function Confetti({ large = false }: ConfettiProps) {
  const count = large ? 180 : 60;
  const [pieces] = useState(() =>
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      delay: Math.random() * (large ? 0.55 : 1.05),
      drift: (Math.random() - 0.5) * 180,
      duration: large ? 1.8 + Math.random() * 0.8 : 2.2 + Math.random() * 1.2,
      width: 0.34 + Math.random() * 0.4,
      height: 0.55 + Math.random() * 0.65,
      startRotation: Math.random() * 180,
      spin: 420 + Math.random() * 720,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      round: Math.random() > 0.76,
    })),
  );
  return (
    <div className={`confetti ${large ? 'confetti--large' : ''}`} aria-hidden="true">
      {pieces.map((piece, index) => (
        <i
          key={index}
          style={
            {
              '--confetti-x': `${piece.x}%`,
              '--confetti-delay': `${piece.delay}s`,
              '--confetti-drift': `${piece.drift}px`,
              '--confetti-duration': `${piece.duration}s`,
              '--confetti-size': `${piece.width}rem`,
              '--confetti-height': `${piece.height}rem`,
              '--confetti-start-rotation': `${piece.startRotation}deg`,
              '--confetti-spin': `${piece.spin}deg`,
              '--confetti-color': piece.color,
              borderRadius: piece.round ? '50%' : '2px',
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
