import React from 'react';
import styled from 'styled-components';
import { GameScreen } from './GameScreen';
import { Box } from '@mui/material';
import { GAME_CONTROLS_SCREEN, GAME_SCREEN, GAME_STATE } from '../../types/game';
import { useGameContext } from '../../providers/GameProvider';
import { GameControls } from './GameControls';

const GameContentContainer = styled.div`
  width: 100%;
  height: 850px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GAME_STATE_TO_SCREEN_MAPPING: Record<GAME_STATE, GAME_SCREEN> = {
  [GAME_STATE.NOT_STARTED]: GAME_SCREEN.WAITING_FOR_PLAYERS,
  [GAME_STATE.CATEGORY_DRAW]: GAME_SCREEN.CATEGORY_DRAW,
  [GAME_STATE.QUESTION]: GAME_SCREEN.QUESTION,
  [GAME_STATE.BIDDING]: GAME_SCREEN.BIDDING,
  [GAME_STATE.FINISHED]: GAME_SCREEN.FINISHED
};

const GAME_STATE_TO_CONTROLS_SCREEN_MAPPING: Record<GAME_STATE, GAME_CONTROLS_SCREEN> = {
  [GAME_STATE.NOT_STARTED]: GAME_CONTROLS_SCREEN.MOCKED_PROGRESS,
  [GAME_STATE.CATEGORY_DRAW]: GAME_CONTROLS_SCREEN.CATEGORY_DRAW_CONFIRM,
  [GAME_STATE.QUESTION]: GAME_CONTROLS_SCREEN.QUESTION,
  [GAME_STATE.BIDDING]: GAME_CONTROLS_SCREEN.BIDDING,
  [GAME_STATE.FINISHED]: GAME_CONTROLS_SCREEN.FINISHED
};

export function GameContent() {
  const { game, setIsWheelSpinningDone } = useGameContext();

  if (!game) return;

  const gameScreen = GAME_STATE_TO_SCREEN_MAPPING[game?.state];

  const controlsScreen = GAME_STATE_TO_CONTROLS_SCREEN_MAPPING[game?.state];

  return (
    <GameContentContainer>
      <Box sx={{ height: '50%', width: '100%' }}>
        <GameScreen screenType={gameScreen} onStopSpinning={() => setIsWheelSpinningDone(true)} />
      </Box>
      <Box
        sx={{
          height: '50%',
          width: '100%'
        }}>
        <GameControls controlsScreen={controlsScreen} />
      </Box>
    </GameContentContainer>
  );
}
