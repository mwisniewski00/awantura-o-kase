import React from 'react';
import { Chip, ChipOwnProps } from '@mui/material';
import styled from 'styled-components';
import { useGameContext } from '../../providers/GameProvider';

export const PLAYER_COLOR_TO_CHIP_COLOR_MAPPING: Record<string, ChipOwnProps['color']> = {
  blue: 'primary',
  green: 'success',
  yellow: 'warning'
};

const PlayersContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export function Players() {
  const {
    game: { players }
  } = useGameContext();

  return (
    <PlayersContainer>
      {Object.entries(players).map(([playerColor, player]) => (
        <Chip
          key={player.id}
          label={player.username}
          color={PLAYER_COLOR_TO_CHIP_COLOR_MAPPING[playerColor]}
        />
      ))}
    </PlayersContainer>
  );
}
