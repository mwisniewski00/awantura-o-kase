import React, { useState } from 'react';
import styled from 'styled-components';
import { GameScreen } from './GameScreen';
import { Box } from '@mui/material';
import { GAME_SCREEN, GAME_STATE, Player } from '../../types/game';
import { Button } from '@mui/material';
import { useGameContext } from '../../providers/GameProvider';

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
  [GAME_STATE.QUESTION]: GAME_SCREEN.KRZYCHU,
  [GAME_STATE.BIDDING]: GAME_SCREEN.KRZYCHU,
  [GAME_STATE.FINISHED]: GAME_SCREEN.KRZYCHU
};

export function GameContent() {
  const [isSpinningDone, setIsSpinningDone] = useState(true);
  const { game, setGame } = useGameContext();

  if (!game) return;

  const gameScreen = GAME_STATE_TO_SCREEN_MAPPING[game?.state];

  // Mocked change of game state
  const onProceedClick = () => {
    const numberOfPlayers = Object.keys(game.players).length;
    if (numberOfPlayers == 1) {
      const newPlayer: Player = {
        id: '456',
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
        state: GAME_STATE.CATEGORY_DRAW
      }));
      setIsSpinningDone(false);
      return;
    }
    if (game.state === GAME_STATE.CATEGORY_DRAW) {
      setGame((game) => ({ ...game, state: GAME_STATE.BIDDING }));
    }
  };

  return (
    <GameContentContainer>
      <Box sx={{ height: '50%', width: '100%' }}>
        <GameScreen screenType={gameScreen} onStopSpinning={() => setIsSpinningDone(true)} />
      </Box>
      <Box
        sx={{
          height: '50%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {
          <Button disabled={!isSpinningDone} variant="contained" onClick={onProceedClick}>
            Kontynuuj
          </Button>
        }
      </Box>
    </GameContentContainer>
  );
}
