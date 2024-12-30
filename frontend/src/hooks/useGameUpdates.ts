import { useGameContext } from '../providers/GameProvider';
import { SignalRContext } from '../providers/GameSignalRContext';
import { GameUpdateEvent, PlayerJoinedMessage } from '../types/events';

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
}
