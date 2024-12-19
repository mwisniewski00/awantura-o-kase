import React, { useMemo } from 'react';
import './gamescreen.css';
import { CategoryDrawScreen } from './CategoryDrawScreen';
import { KrzychuScreen } from './KrzychuScreen';
import { GAME_SCREEN } from '../../types/game';
import { WaitingForPlayersScreen } from './WaitingForPlayersScreen';
import { useGameContext } from '../../providers/GameProvider';

interface GameScreenProps {
  screenType: GAME_SCREEN;
  onStopSpinning: () => void;
}

export function GameScreen({ screenType, onStopSpinning }: GameScreenProps) {
  const { game } = useGameContext();
  const screenComponent = useMemo(() => {
    switch (screenType) {
      case GAME_SCREEN.WAITING_FOR_PLAYERS:
        return <WaitingForPlayersScreen />;
      case GAME_SCREEN.KRZYCHU:
        return <KrzychuScreen text="Biorę 200 od każdej drużyny i słucham państwa." />;
      case GAME_SCREEN.CATEGORY_DRAW:
        if (!game.currentCategory) return;
        return (
          <CategoryDrawScreen onStopSpinning={onStopSpinning} category={game.currentCategory} />
        );
    }
  }, [onStopSpinning, screenType, game]);

  return (
    <div className="tv-frame">
      <div className="tv-screen">{screenComponent}</div>
      <div className="tv-stand"></div>
    </div>
  );
}
