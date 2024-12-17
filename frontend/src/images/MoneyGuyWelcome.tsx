import React from 'react';
import MoneyWelcomeSVG from './money-welcome.svg';

interface MoneyGuyWelcomProps {
  width?: string;
}

export function MoneyGuyWelcome({ width = '100%' }: MoneyGuyWelcomProps) {
  return <img src={MoneyWelcomeSVG} alt="Money cartoon character waving" style={{ width, maxHeight: "100%" }} />;
}
