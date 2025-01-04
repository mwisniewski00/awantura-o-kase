import { Paper } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useGameContext } from '../../providers/GameProvider';
import { BiddingCell } from './BiddingCell';
import { GAME_STATE, PLAYER_COLOR } from '../../types/game';
import { AccountBalanceCell } from './AccountBalanceCell';
import { BiddingControls } from './BiddingControls';
import { AnnouncementBanner } from '../Reusable/AnnouncmentBanner';
import { Timer } from './Timer';
import { CATEGORIES_NAMES } from '../Navigation/constants';

const SectionHeader = styled(Paper)`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BiddinScreenContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BiddingSectionContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-top: 10px;
`;

const BiddinCellsContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
`;

const BlackCell = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  color: white;
`;

const AccountBalanceCellsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const BiddingControlsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const TimerCellsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export function BiddingScreen() {
  const {
    game: { players, pool, currentCategory, currentRoundNumber, lastBid },
    setGame
  } = useGameContext();

  const onTimeEnd = () =>
    setGame((game) => ({
      ...game,
      state: GAME_STATE.QUESTION,
      currentBiddings: {}
    }));

  return (
    <BiddinScreenContainer>
      <AnnouncementBanner show elevation={8}>
        Kategoria: {CATEGORIES_NAMES[currentCategory!]}
      </AnnouncementBanner>
      <BiddingSectionContainer>
        <SectionHeader>Licytacja</SectionHeader>
        <SectionHeader>Pula</SectionHeader>
        <BiddinCellsContainer>
          {Object.entries(players).map(([playerColor, player]) => (
            <BiddingCell
              key={player.id}
              playerColor={playerColor as PLAYER_COLOR}
              playerId={player.id}
            />
          ))}
        </BiddinCellsContainer>
        <BlackCell>{pool}</BlackCell>
      </BiddingSectionContainer>
      <BiddingSectionContainer>
        <SectionHeader>Stan konta</SectionHeader>
        <SectionHeader>Numer rundy</SectionHeader>
        <AccountBalanceCellsContainer>
          {Object.entries(players).map(([playerColor, player]) => (
            <AccountBalanceCell
              key={player.id}
              playerColor={playerColor as PLAYER_COLOR}
              playerId={player.id}
            />
          ))}
        </AccountBalanceCellsContainer>
        <BlackCell>{currentRoundNumber}/7</BlackCell>
      </BiddingSectionContainer>
      <BiddingSectionContainer>
        <BiddingControlsContainer>
          {Object.entries(players).map(([playerColor, player]) => (
            <BiddingControls
              key={player.id}
              playerId={player.id}
              playerColor={playerColor as PLAYER_COLOR}
            />
          ))}
        </BiddingControlsContainer>
        {lastBid && (
          <TimerCellsContainer>
            <SectionHeader>Pozostały czas (s)</SectionHeader>
            <Timer
              timeToCountInMs={11000}
              startTimestamp={lastBid?.timestamp}
              onTimeEnd={onTimeEnd}
            />
          </TimerCellsContainer>
        )}
      </BiddingSectionContainer>
    </BiddinScreenContainer>
  );
}
