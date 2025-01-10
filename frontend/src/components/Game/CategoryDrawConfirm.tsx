import React from 'react';
import styled from 'styled-components';
import { useGameContext } from '../../providers/GameProvider';
import { PLAYER_COLOR } from '../../types/game';
import { PLAYER_CSS_COLORS } from '../../utils/styles';
import { PlayerReadinessStatus } from './PlayerReadinessStatus';
import { AnnouncementBanner } from '../Reusable/AnnouncmentBanner';
import { CATEGORIES_NAMES } from '../Navigation/constants';

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export function CategoryDrawConfirm() {
  const { game, isWheelSpinningDone } = useGameContext();

  return (
    <Container>
      <AnnouncementBanner show={isWheelSpinningDone} elevation={8}>
        Kategoria: {CATEGORIES_NAMES[game.currentCategory!]}
      </AnnouncementBanner>
      <PlayerReadinessControlsContainer>
        {Object.entries(game.players).map(([playerColor, player]) => (
          <PlayerReadinessCard key={player.id}>
            <PlayerLabel
              key={player.id}
              backgroundColor={PLAYER_CSS_COLORS[playerColor as PLAYER_COLOR]}>
              <span>{player.username}</span>
            </PlayerLabel>
            <PlayerReadinessStatus
              player={player}
              playerColor={playerColor as PLAYER_COLOR}
              isSpinningDone={isWheelSpinningDone}
            />
          </PlayerReadinessCard>
        ))}
      </PlayerReadinessControlsContainer>
    </Container>
  );
}
