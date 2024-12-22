import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useGameContext } from '../../providers/GameProvider';
import { Player, PLAYER_COLOR } from '../../types/game';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Button, ButtonOwnProps } from '@mui/material';
import styled from 'styled-components';

interface PlayerReadinessStatusProps {
  player: Player;
  playerColor: PLAYER_COLOR;
  isSpinningDone: boolean;
}

const iconStyles = { width: '50px', height: '50px' };

const SuccessIcon = <CheckCircleOutlineIcon color="success" sx={iconStyles} />;

const WaitIcon = <HourglassBottomIcon color="action" sx={iconStyles} />;

export const PLAYER_COLOR_TO_BUTTON_COLOR_MAPPING: Record<string, ButtonOwnProps['color']> = {
  blue: 'primary',
  green: 'success',
  yellow: 'warning'
};

const ButtonContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function PlayerReadinessStatus({
  player,
  playerColor,
  isSpinningDone
}: PlayerReadinessStatusProps) {
  const { game, setGame } = useGameContext();
  const {
    auth: { id }
  } = useAuth();

  const onButtonClick = () =>
    setGame((game) => ({
      ...game,
      playersReadiness: {
        ...(game.playersReadiness ?? {}),
        [player.id]: true
      }
    }));

  const isPlayerCurrentUser = id === player.id;
  const isPlayerReady = game.playersReadiness?.[player.id];

  if (!isPlayerCurrentUser) {
    return isPlayerReady ? SuccessIcon : WaitIcon;
  }

  if (isPlayerCurrentUser && !isPlayerReady) {
    return (
      <ButtonContainer>
        <Button
          variant="contained"
          color={PLAYER_COLOR_TO_BUTTON_COLOR_MAPPING[playerColor]}
          onClick={onButtonClick}
          disabled={!isSpinningDone}>
          Gotowy!
        </Button>
      </ButtonContainer>
    );
  }

  return SuccessIcon;
}
