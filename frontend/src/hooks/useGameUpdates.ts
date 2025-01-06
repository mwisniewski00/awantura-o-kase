import { useGameContext } from '../providers/GameProvider';
import { SignalRContext } from '../providers/GameSignalRContext';
import {
  BiddingEndEvent,
  BidDoneEvent,
  GameUpdateEvent,
  PlayerJoinedMessage,
  PlayerReadyEvent,
  RoundStartedEvent,
  StartBiddingEvent
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
    GameUpdateEvent.StartBidding,
    (event: StartBiddingEvent) => {
      const accountBalances = Object.fromEntries(
        event.playerGameScores.map((playerGameScore) => [
          playerGameScore.playerId,
          playerGameScore.balance
        ])
      );
      const currentBiddings = Object.fromEntries(
        event.bids.map((bid) => [bid.playerId, bid.amount])
      );
      setGame((game) => ({
        ...game,
        state: GAME_STATE.BIDDING,
        pool: event.pool,
        accountBalances,
        currentBiddings
      }));
    },
    [setGame]
  );

  SignalRContext.useSignalREffect(
    GameUpdateEvent.BidDone,
    (event: BidDoneEvent) => {
      setGame((game) => {
        const currentBiddings = {
          ...game.currentBiddings,
          [event.playerId]: event.amount
        };
        const accountBalances = {
          ...game.accountBalances,
          [event.playerId]: event.newAccountBalance
        };
        const lastBid = {
          playerId: event.playerId,
          amount: event.amount,
          timestamp: new Date(event.timestamp).getTime()
        };
        return {
          ...game,
          currentBiddings,
          accountBalances,
          lastBid,
          pool: event.newPool
        };
      });
    },
    [setGame]
  );

  SignalRContext.useSignalREffect(
    GameUpdateEvent.BiddingEnd,
    (event: BiddingEndEvent) =>
      setGame((game) => ({
        ...game,
        state: GAME_STATE.QUESTION,
        currentBiddings: {},
        currentQuestion: {
          question: event.questionText,
          answers: event.answers
        }
      })),
    [setGame]
  );
}
