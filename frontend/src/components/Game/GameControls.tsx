import { useCallback, useMemo } from 'react';
import { GAME_CONTROLS_SCREEN, GAME_STATE, Player, QUESTION_CATEGORIES } from '../../types/game';
import { CategoryDrawConfirm } from './CategoryDrawConfirm';
import React from 'react';
import { Button } from '@mui/material';
import { useGameContext } from '../../providers/GameProvider';
import styled from 'styled-components';
import { useAuth } from '../../providers/AuthProvider';

interface GameControlsProps {
  controlsScreen: GAME_CONTROLS_SCREEN;
  isSpinningDone: boolean;
  setIsSpinningDone: (isDone: boolean) => void;
}

const ContinueButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export function GameControls({
  controlsScreen,
  setIsSpinningDone,
  isSpinningDone
}: GameControlsProps) {
  const { game, setGame } = useGameContext();
  const {
    auth: { id }
  } = useAuth();

  // Mocked change of game state
  const onProceedClick = useCallback(() => {
    const numberOfPlayers = Object.keys(game.players).length;
    if (numberOfPlayers == 1) {
      const newPlayer: Player = {
        id: id!,
        username: 'ZielonyBronisław'
      };
      return setGame((game) => ({
        ...game,
        players: {
          ...game.players,
          green: newPlayer
        }
      }));
    }
    if (numberOfPlayers == 2) {
      const newPlayer: Player = {
        id: '567',
        username: 'SzmaragdowyZbigniew'
      };
      setGame((game) => ({
        ...game,
        players: {
          ...game.players,
          yellow: newPlayer
        },
        state: GAME_STATE.CATEGORY_DRAW,
        currentCategory: QUESTION_CATEGORIES[0]
      }));
      setIsSpinningDone(false);
      return;
    }
    if (game.state === GAME_STATE.CATEGORY_DRAW) {
      setGame((game) => ({ ...game, state: GAME_STATE.BIDDING }));
    }
  }, [game.players, game.state, id, setGame, setIsSpinningDone]);

  const currentScreen = useMemo(() => {
    switch (controlsScreen) {
      case GAME_CONTROLS_SCREEN.CATEGORY_DRAW_CONFIRM:
        return <CategoryDrawConfirm isSpinningDone={isSpinningDone} />;
      default:
        return (
          <ContinueButtonContainer>
            <Button disabled={!isSpinningDone} variant="contained" onClick={onProceedClick}>
              Kontynuuj
            </Button>
          </ContinueButtonContainer>
        );
    }
  }, [controlsScreen, isSpinningDone, onProceedClick]);

  return currentScreen;
}
