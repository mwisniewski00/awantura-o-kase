import React from 'react';
import { Game } from '../../types/game';
import { Chip, ChipOwnProps } from '@mui/material';
import styled from 'styled-components';

const PLAYER_COLOR_TO_CHIP_COLOR_MAPPING: Record<string, ChipOwnProps['color']> = {
  blue: 'primary',
  green: 'success',
  yellow: 'warning'
};

const PlayersContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export function Players() {
  const mockedPlayers: Game['players'] = {
    blue: {
      id: '123',
      username: 'BlueWarrior'
    },
    green: {
      id: '456',
      username: 'GreenGiant'
    },
    yellow: {
      id: '789',
      username: 'YellowFlash'
    }
  };

  return (
    <PlayersContainer>
      {Object.entries(mockedPlayers).map(([playerColor, player]) => (
        <Chip
          key={player.id}
          label={player.username}
          color={PLAYER_COLOR_TO_CHIP_COLOR_MAPPING[playerColor]}
        />
      ))}
    </PlayersContainer>
  );
}
