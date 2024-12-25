import React from 'react';
import styled from 'styled-components';
import { useGameContext } from '../../providers/GameProvider';
import { useAuth } from '../../providers/AuthProvider';
import { MoneyGuyWin } from '../../images/MoneyGuyWin';
import { MoneyGuyFail } from '../../images/MoneyGuyFail';

const ScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const MessageContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding: 10px;
`;

const MoneyGuyContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WINNER_MESSAGE = 'Gratulacje, wygranko jest twoje :)';
const LOSER_MESSAGE = 'Bardzo się starałeś, ale pieniążki przegrałeś :(';

export function FinishedGameScreen() {
  const {
    game: { accountBalances }
  } = useGameContext();
  const {
    auth: { id }
  } = useAuth();

  const winnerAccountId = Object.entries(accountBalances).reduce<[string | undefined, number]>(
    ([currentPlayerId, currentMaxBalance], [playerId, playerAccountBalance]) => {
      if (playerAccountBalance > currentMaxBalance) {
        return [playerId, playerAccountBalance];
      }
      return [currentPlayerId, currentMaxBalance];
    },
    [undefined, 0]
  )[0];

  const isCurrentUserWinner = id === winnerAccountId;

  const message = isCurrentUserWinner ? WINNER_MESSAGE : LOSER_MESSAGE;

  return (
    <ScreenContainer>
      <MessageContainer>{message}</MessageContainer>
      <MoneyGuyContainer>
        {isCurrentUserWinner ? <MoneyGuyWin /> : <MoneyGuyFail />}
      </MoneyGuyContainer>
    </ScreenContainer>
  );
}
