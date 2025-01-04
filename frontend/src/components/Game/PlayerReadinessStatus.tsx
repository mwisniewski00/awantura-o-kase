import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { useGameContext } from '../../providers/GameProvider';
import { Player, PLAYER_COLOR } from '../../types/game';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Button, ButtonOwnProps } from '@mui/material';
import styled from 'styled-components';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { getErrorMessage } from '../../services/utils';

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
  const { game } = useGameContext();
  const {
    auth: { id }
  } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const notifyError = useErrorNotification();

  const isPlayerCurrentUser = id === player.id;
  const isPlayerReady = game.playersReadiness?.[player.id];

  const onReadyClick = () =>
    void (async () => {
      try {
        await axiosPrivate.put(`/Games/PlayerReady/${game.id}`);
      } catch (error) {
        console.error(error);
        notifyError('Failed to set readiness. ' + getErrorMessage(error));
      }
    })();

  if (!isPlayerCurrentUser) {
    return isPlayerReady ? SuccessIcon : WaitIcon;
  }

  if (isPlayerCurrentUser && !isPlayerReady) {
    return (
      <ButtonContainer>
        <Button
          variant="contained"
          color={PLAYER_COLOR_TO_BUTTON_COLOR_MAPPING[playerColor]}
          onClick={onReadyClick}
          disabled={!isSpinningDone}>
          Gotowy!
        </Button>
      </ButtonContainer>
    );
  }

  return SuccessIcon;
}
