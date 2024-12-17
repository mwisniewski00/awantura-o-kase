import React from 'react';
import styled from 'styled-components';
import { MoneyGuyWelcome } from '../../images/MoneyGuyWelcome';
import { useGameContext } from '../../providers/GameProvider';

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

export function WaitingForPlayersScreen() {
  const { game } = useGameContext();

  const numberOfPlayers = Object.keys(game.players).length;
  const playersLeft = 3 - numberOfPlayers;
  const friendsForm = playersLeft == 2 ? 'znajomych' : 'znajomego';

  return (
    <ScreenContainer>
      <MessageContainer>
        Siemaneczko, zaproś jeszcze {3 - numberOfPlayers} {friendsForm} wysyłając link gry, by pod okiem
        mojego kolegi Krzycha stoczyć bój o pieniądze jakich świat nie widział.
      </MessageContainer>
      <MoneyGuyContainer>
        <MoneyGuyWelcome />
      </MoneyGuyContainer>
    </ScreenContainer>
  );
}
