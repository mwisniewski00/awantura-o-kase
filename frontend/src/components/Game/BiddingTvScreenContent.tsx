import { useMemo } from 'react';
import { useGameContext } from '../../providers/GameProvider';
import { KrzychuScreen } from './KrzychuScreen';
import React from 'react';
import { PLAYER_COLOR } from '../../types/game';

const PLAYER_COLOR_TEXT: Record<PLAYER_COLOR, string> = {
  blue: 'Niebiescy',
  green: 'Zieloni',
  yellow: 'Żółci'
};

export function BiddingTvScreenContent() {
  const {
    game: { lastBid, players, currentBiddings }
  } = useGameContext();

  const text = useMemo(() => {
    if (!lastBid) {
      return 'Biorę 500 od każdej drużyny i słucham państwa.';
    }
    const [_, lastBidAmount] =
      Object.entries(currentBiddings).find(([playerId, _]) => playerId === lastBid?.playerId) ?? [];
    const [foundPlayer] =
      Object.entries(players).find(([_, player]) => player.id === lastBid.playerId) ?? [];
    return `${PLAYER_COLOR_TEXT[foundPlayer as PLAYER_COLOR]} ${lastBidAmount}!`;
  }, [currentBiddings, lastBid, players]);
  return <KrzychuScreen text={text} />;
}
