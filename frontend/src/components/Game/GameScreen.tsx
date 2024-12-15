import React, { useMemo } from 'react';
import './gamescreen.css';
import { CategoryDrawScreen } from './CategoryDrawScreen';
import { KrzychuScreen } from './KrzychuScreen';
import { GAME_SCREEN } from '../../types/game';

interface GameScreenProps {
  screenType: GAME_SCREEN;
  onStopSpinning: () => void;
}

export function GameScreen({ screenType, onStopSpinning }: GameScreenProps) {
  const screenComponent = useMemo(() => {
    switch (screenType) {
      case GAME_SCREEN.KRZYCHU:
        return <KrzychuScreen text='Biorę 200 od każdej drużyny i słucham państwa.' />;
      case GAME_SCREEN.CATEGORY_DRAW:
        return <CategoryDrawScreen onStopSpinning={onStopSpinning} />;
    }
  }, [onStopSpinning, screenType]);

  return (
    <div className="tv-frame">
      <div className="tv-screen">{screenComponent}</div>
      <div className="tv-stand"></div>
    </div>
  );
}
