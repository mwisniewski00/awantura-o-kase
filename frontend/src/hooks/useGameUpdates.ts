import { useGameContext } from '../providers/GameProvider';
import { SignalRContext } from '../providers/GameSignalRContext';
import {
  GameUpdateEvent,
  PlayerJoinedMessage,
  PlayerReadyEvent,
  RoundStartedEvent
} from '../types/events';
import { GAME_STATE } from '../types/game';

export function useGameUpdates() {
  const { setGame } = useGameContext();

  SignalRContext.useSignalREffect(
    GameUpdateEvent.PlayerJoined,
    (player: PlayerJoinedMessage) =>
      setGame((game) => ({
        ...game,
        players: {
          ...game.players,
          [player.playerColor]: {
            id: player.id,
            username: player.username
          }
        }
      })),
    [setGame]
  );

  SignalRContext.useSignalREffect(
    GameUpdateEvent.RoundStarted,
    (event: RoundStartedEvent) =>
      setGame((game) => ({
        ...game,
        currentRoundNumber: event.roundNumber,
        currentCategory: event.category,
        state: GAME_STATE.CATEGORY_DRAW
      })),
    [setGame]
  );

  SignalRContext.useSignalREffect(
    GameUpdateEvent.PlayerReady,
    (playerId: PlayerReadyEvent) =>
      setGame((game) => ({
        ...game,
        playersReadiness: {
          ...game.playersReadiness,
          [playerId]: true
        }
      })),
    [setGame]
  );

  SignalRContext.useSignalREffect(
    GameUpdateEvent.AllPlayersReady,
    () =>
      setGame((game) => ({
        ...game,
        state: GAME_STATE.BIDDING
      })),
    [setGame]
  );
}
