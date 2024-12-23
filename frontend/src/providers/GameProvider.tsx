import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { Game, GAME_STATE } from '../types/game';

interface GameContext {
  isLoading: boolean;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  game: Game;
}

const GameContext = createContext<GameContext | null>(null);

const getInitialMockedGame = () => ({
  id: '123',
  players: {
    blue: {
      id: '123',
      username: 'BlueWarrior'
    }
  },
  state: GAME_STATE.NOT_STARTED,
  pool: 1500,
  currentBiddings: {
    '123': 500
  },
  accountBalances: {
    '123': 9500
  },
  currentRoundNumber: 1,
  questions: {}
});

export function GameProvider({ children }: PropsWithChildren<object>) {
  const [game, setGame] = useState<Game>(getInitialMockedGame());
  const [isLoading, setIsLoading] = useState(false);

  const contextValue = useMemo(
    () => ({
      game,
      isLoading,
      setGame
    }),
    [game, isLoading]
  );

  if (isLoading || !game) return <div>Loading...</div>;

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const contextValue = useContext(GameContext);
  if (contextValue === null) {
    throw new Error('Game context value is missing. Probably context was not initialized.');
  }
  return contextValue;
}
