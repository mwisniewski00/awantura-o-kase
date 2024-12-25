import React from 'react';
import MoneyGuyFailSVG from './money-guy-fail.svg';

interface MoneyGuyFailProps {
  width?: string;
}

export function MoneyGuyFail({ width = '100%' }: MoneyGuyFailProps) {
  return (
    <img
      src={MoneyGuyFailSVG}
      alt="Money cartoon character disappointed"
      style={{ width, maxHeight: '100%' }}
    />
  );
}
