import { Button, Paper } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { useGameContext } from '../../providers/GameProvider';
import { GAME_STATE, PLAYER_COLOR } from '../../types/game';
import { PLAYER_CSS_COLORS } from '../../utils/styles';
import { PlayerReadinessStatus } from './PlayerReadinessStatus';

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnnouncementBanner = styled(Paper)<{ show: boolean }>`
  width: 100%;
  height: 60px;
  opacity: ${(props) => (props.show ? '1' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease-in-out;
`;

const PlayerReadinessControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const PlayerReadinessCard = styled.div`
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PlayerLabel = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  height: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding-inline: 4px;

  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

interface CategoryDrawConfirm {
  isSpinningDone: boolean;
}

export function CategoryDrawConfirm({ isSpinningDone }: CategoryDrawConfirm) {
  const { game, setGame } = useGameContext();

  const onContinueClick = () =>
    setGame((game) => ({
      ...game,
      state: GAME_STATE.BIDDING,
      playersReadiness: {
        ...(game.playersReadiness ?? {}),
        [game.players[PLAYER_COLOR.BLUE].id]: true,
        [game.players[PLAYER_COLOR.GREEN]?.id ?? '']: true,
        [game.players[PLAYER_COLOR.YELLOW]?.id ?? '']: true
      }
    }));

  return (
    <Container>
      <AnnouncementBanner show={isSpinningDone} elevation={8}>
        Kategoria: {game.currentCategory}
      </AnnouncementBanner>
      <PlayerReadinessControlsContainer>
        {Object.entries(game.players).map(([playerColor, player]) => (
          <PlayerReadinessCard key={player.id}>
            <PlayerLabel
              key={player.id}
              backgroundColor={PLAYER_CSS_COLORS[playerColor as PLAYER_COLOR]}>
              <span>{player.username}</span>
            </PlayerLabel>
            <PlayerReadinessStatus player={player} playerColor={playerColor as PLAYER_COLOR} />
          </PlayerReadinessCard>
        ))}
      </PlayerReadinessControlsContainer>
      <Button variant="contained" onClick={onContinueClick}>
        Kontynuuj
      </Button>
    </Container>
  );
}
