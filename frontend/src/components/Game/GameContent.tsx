import React, { useState } from 'react';
import styled from 'styled-components';
import { GameScreen } from './GameScreen';
import { Box } from '@mui/material';
import { GAME_SCREEN } from '../../types/game';
import { Button } from '@mui/material';

const GameContentContainer = styled.div`
  width: 100%;
  height: 850px;
  opacity: 0.5;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export function GameContent() {
  const [currentScreen, setCurrentScreen] = useState<GAME_SCREEN>(GAME_SCREEN.CATEGORY_DRAW);
  const [isSpinningDone, setIsSpinningDone] = useState(false);

  return (
    <GameContentContainer>
      <Box sx={{ height: '50%', width: '100%' }}>
        <GameScreen screenType={currentScreen} onStopSpinning={() => setIsSpinningDone(true)} />
      </Box>
      <Box
        sx={{
          height: '50%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {currentScreen === GAME_SCREEN.CATEGORY_DRAW && (
          <Button disabled={!isSpinningDone} variant="contained" onClick={() => setCurrentScreen(GAME_SCREEN.KRZYCHU)}>
            Proceed
          </Button>
        )}
      </Box>
    </GameContentContainer>
  );
}
