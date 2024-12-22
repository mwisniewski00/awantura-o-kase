import React, { useEffect } from 'react';
import { useCreateGame } from '../../hooks/api/game/useCreateGame';
import { LoadingPage } from '../Reusable/LoadingPage';
import { useNavigate } from 'react-router-dom';
import { useSuccessNotification } from '../../hooks/useSuccessNotification';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { getErrorMessage } from '../../services/utils';

export function CreateGame() {
  const createGame = useCreateGame();
  const navigate = useNavigate();
  const notifySuccess = useSuccessNotification();
  const notifyError = useErrorNotification();

  useEffect(() => {
    (async () => {
      try {
        const gameId = await createGame();
        notifySuccess('Game created');
        navigate(`/game/${gameId}`);
      } catch (error) {
        notifyError(`Failed to create game, ${getErrorMessage(error)}`);
      }
    })();
  }, [createGame, navigate, notifyError, notifySuccess]);

  return <LoadingPage text="Creating game..." />;
}
