import React from 'react';
import MoneyGuyWinSVG from './money-guy-win.svg';

interface MoneyGuyWinProps {
  width?: string;
}

export function MoneyGuyWin({ width = '100%' }: MoneyGuyWinProps) {
  return (
    <img
      src={MoneyGuyWinSVG}
      alt="Money cartoon character excited with dollars in eyes"
      style={{ width, maxHeight: '100%' }}
    />
  );
}
