import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Game, GAME_STATE, GameApiResponse, PLAYER_COLOR } from '../types/game';
import { LoadingPage } from '../components/Reusable/LoadingPage';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';
import { getErrorMessage } from '../services/utils';
import { useErrorNotification } from '../hooks/useErrorNotification';
import { UserResponse } from '../types/users';

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
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const notifyError = useErrorNotification();

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosPrivate.get<GameApiResponse>(`/Games/GetGame/${id}`);
        const playersDataRequests = Object.values(data.gameParticipants)
          .filter(Boolean)
          .map((playerId) => axiosPrivate.get<UserResponse>(`/Users/${playerId}`));
        const playersData = (await Promise.all(playersDataRequests)).map(({ data }) => data);
        const players = Object.fromEntries(
          [PLAYER_COLOR.BLUE, PLAYER_COLOR.GREEN, PLAYER_COLOR.YELLOW]
            .map((color, index) => [
              color,
              playersData[index]
                ? {
                    id: playersData[index].id,
                    username: playersData[index].userName
                  }
                : undefined
            ])
            .filter((entry) => entry[1])
        ) as Game['players'];
        setGame((game) => ({
          ...game,
          id: data.id,
          state: data.gameState,
          currentRoundNumber: data.round,
          players
        }));
      } catch (error) {
        notifyError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [axiosPrivate, id, notifyError]);

  useEffect(() => {
    console.log('game', game);
  }, [game]);

  const contextValue = useMemo(
    () => ({
      game,
      isLoading,
      setGame
    }),
    [game, isLoading]
  );

  if (isLoading || !game) return <LoadingPage text="Loading game..." />;

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const contextValue = useContext(GameContext);
  if (contextValue === null) {
    throw new Error('Game context value is missing. Probably context was not initialized.');
  }
  return contextValue;
}
