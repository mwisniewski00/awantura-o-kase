import React from 'react';
import { PLAYER_COLOR } from '../../types/game';
import styled from 'styled-components';
import { PLAYER_CSS_COLORS } from '../../utils/styles';
import { useGameContext } from '../../providers/GameProvider';
import { useAuth } from '../../providers/AuthProvider';

interface BiddingCellProps {
  playerId: string;
  playerColor: PLAYER_COLOR;
}

const BiddingCellContainer = styled.div<{ backgroundColor: string; isCurrentPlayer: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => (props.isCurrentPlayer ? '5px solid #FFB703' : 'none')};
`;

export function BiddingCell({ playerId, playerColor }: BiddingCellProps) {
  const {
    game: { currentBiddings }
  } = useGameContext();

  const {
    auth: { id }
  } = useAuth();

  const isCurrentPlayer = playerId === id;

  return (
    <BiddingCellContainer
      backgroundColor={PLAYER_CSS_COLORS[playerColor]}
      isCurrentPlayer={isCurrentPlayer}>
      {currentBiddings[playerId]}
    </BiddingCellContainer>
  );
}
