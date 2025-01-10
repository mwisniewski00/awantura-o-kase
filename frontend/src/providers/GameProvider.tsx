import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Game, GameApiResponse, GAME_STATE, PLAYER_COLOR, Question } from '../types/game';
import { LoadingPage } from '../components/Reusable/LoadingPage';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import { getErrorMessage } from '../services/utils';
import { useErrorNotification } from '../hooks/useErrorNotification';
import { UserResponse } from '../types/users';
import { useJoinGame } from '../hooks/useJoingGame';

interface GameContext {
  isLoading: boolean;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  game: Game;
  isWheelSpinningDone: boolean;
  setIsWheelSpinningDone: (isDone: boolean) => void;
}

const GameContext = createContext<GameContext | null>(null);

const getInitialMockedGame = () => ({
  id: '',
  players: {
    blue: {
      id: '',
      username: ''
    }
  },
  state: GAME_STATE.NOT_STARTED,
  pool: 0,
  currentBiddings: {},
  accountBalances: {},
  currentRoundNumber: 0,
  questions: {}
});

export function GameProvider({ children }: PropsWithChildren<object>) {
  const [game, setGame] = useState<Game>(getInitialMockedGame());
  const [isWheelSpinningDone, setIsWheelSpinningDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const notifyError = useErrorNotification();
  const joinGame = useJoinGame();
  const navigate = useNavigate();

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      try {
        await joinGame();
        const { data } = await axiosPrivate.get<GameApiResponse>(`/Games/GetGame/${id}`);
        const playersDataRequests = Object.entries(data.gameParticipants)
          .filter(([key]) => ['bluePlayerId', 'greenPlayerId', 'yellowPlayerId'].includes(key))
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(([_, value]) => value)
          .filter(Boolean)
          .map((playerId) => axiosPrivate.get<UserResponse>(`/Users/${playerId}`));
        const playerReadiness = {
          [data.gameParticipants.bluePlayerId]: data.gameParticipants.isBluePlayerReady,
          ...(data.gameParticipants.greenPlayerId
            ? { [data.gameParticipants.greenPlayerId]: data.gameParticipants.isGreenPlayerReady }
            : {}),
          ...(data.gameParticipants.yellowPlayerId
            ? { [data.gameParticipants.yellowPlayerId]: data.gameParticipants.isYellowPlayerReady }
            : {})
        };
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
        const currentCategory = data.category ?? undefined;
        const currentQuestions: Question | undefined =
          data.question && data.answers
            ? { question: data.question, answers: data.answers }
            : undefined;
        const accountBalances = Object.fromEntries(
          data.playerGameScores.map((playerGameScore) => [
            playerGameScore.playerId,
            playerGameScore.balance
          ])
        );
        const currentBiddings = Object.fromEntries(
          data.bids.map((bid) => [bid.playerId, bid.amount])
        );
        const lastBid = data.bids
          .filter((bid) => bid.amount > 500)
          .toSorted((b) => new Date(b.timeStamp).getTime())[0];
        const currentQuestion =
          data.answers && data.question
            ? { question: data.question, answers: data.answers }
            : undefined;
        setGame((game) => ({
          ...game!,
          id: data.id,
          state: data.gameState,
          currentRoundNumber: data.round,
          players,
          playerReadiness,
          currentCategory,
          currentQuestions,
          pool: data.pool,
          accountBalances,
          currentBiddings,
          currentQuestion,
          lastBid: lastBid
            ? {
                amount: lastBid.amount,
                timestamp: new Date(lastBid.timeStamp).getTime(),
                playerId: lastBid.playerId
              }
            : undefined
        }));
      } catch (error) {
        console.error(error);
        notifyError(getErrorMessage(error));
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [axiosPrivate, id, joinGame, navigate, notifyError]);

  const contextValue = useMemo(
    () => ({
      game: game,
      isLoading,
      setGame,
      isWheelSpinningDone,
      setIsWheelSpinningDone
    }),
    [game, isLoading, isWheelSpinningDone]
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
