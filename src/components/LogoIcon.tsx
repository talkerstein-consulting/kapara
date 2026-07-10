import React from 'react';

interface LogoIconProps {
  className?: string;
}

const KAPARA_GRIDS: Record<string, number[][]> = {
  K: [
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1]
  ],
  A: [
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 1, 1]
  ],
  P: [
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0]
  ],
  R: [
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1]
  ]
};

const SUBTITLE_GRIDS: Record<string, number[][]> = {
  B: [
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0]
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 0]
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  R: [
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 1]
  ],
  O: [
    [0, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 0]
  ],
  "&": [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 1]
  ],
  G: [
    [0, 1, 1],
    [1, 0, 0],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 1]
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1]
  ]
};

export function LogoIcon({ className = 'w-auto h-8' }: LogoIconProps) {
  // Render KAPARA letter paths
  const rects: React.ReactNode[] = [];

  const kaparaLetters = ['K', 'A', 'P', 'A', 'R', 'A'];
  const kaparaOffsets = [2, 22, 42, 62, 82, 102];

  kaparaLetters.forEach((char, letterIdx) => {
    const grid = KAPARA_GRIDS[char];
    const startX = kaparaOffsets[letterIdx];
    const startY = 2;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (grid[r][c] === 1) {
          // Each pixel is 2x2 units
          rects.push(
            <rect
              key={`k-${letterIdx}-${r}-${c}`}
              x={startX + c * 2}
              y={startY + r * 2}
              width="2"
              height="2"
              fill="currentColor"
            />
          );
        }
      }
    }
  });

  // Render BISTRO & GRILL
  const subtitleChars = [
    'B', 'I', 'S', 'T', 'R', 'O', ' ', '&', ' ', 'G', 'R', 'I', 'L', 'L'
  ];
  const subtitleOffsets = [
    11, 19, 27, 35, 43, 51, -1, 63, -1, 75, 83, 91, 99, 107
  ];

  subtitleChars.forEach((char, charIdx) => {
    if (char === ' ') return;
    const grid = SUBTITLE_GRIDS[char];
    if (!grid) return;
    const startX = subtitleOffsets[charIdx];
    const startY = 24;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 3; c++) {
        if (grid[r][c] === 1) {
          rects.push(
            <rect
              key={`s-${charIdx}-${r}-${c}`}
              x={startX + c * 2}
              y={startY + r * 2}
              width="2"
              height="2"
              fill="currentColor"
            />
          );
        }
      }
    }
  });

  return (
    <svg
      id="kapara-logo-svg"
      viewBox="0 0 120 36"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {rects}
    </svg>
  );
}
