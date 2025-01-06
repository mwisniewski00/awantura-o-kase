import styled from 'styled-components';
import { useGameContext } from '../../providers/GameProvider';
import React from 'react';
import { Paper } from '@mui/material';
import {
  indexToLetter,
  MOCKED_QUESTIONS_CATEGORIES,
  PLAYER_COLOR_TEXT
} from '../../services/utils';
import { useAuth } from '../../providers/AuthProvider';
import { PLAYER_CSS_COLORS } from '../../utils/styles';
import { GAME_STATE, PLAYER_COLOR } from '../../types/game';
import { NOTIFICATION_TYPE, useGameNotifications } from '../../providers/GameNotificationsProvider';

const QuestionControlsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 5px;
  &:hover {
  }
`;

const QuestionContainer = styled(Paper)<{ isChoosable: boolean }>`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.isChoosable ? '#333' : 'rgb(18, 18, 18)')};
    transform: ${(props) => (props.isChoosable ? 'scale(1.01)' : 'none')};
    cursor: ${(props) => (props.isChoosable ? 'pointer' : 'normal')};
  }
`;

const AnsweringPlayerInfo = styled(Paper)<{ backgroundColor: string }>`
  margin-top: 20px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
`;

const MOCKED_ANSWERS_PER_ROUND: Record<number, number> = {
  1: 1,
  2: 1,
  3: 1,
  4: 2,
  5: 1,
  6: 2,
  7: 1
};

export function QuestionControls() {
  const {
    game: { currentQuestion, currentRoundNumber, lastBid, players, accountBalances },
    setGame
  } = useGameContext();
  const {
    auth: { id }
  } = useAuth();
  const { showNotification } = useGameNotifications();

  const { answers } = currentQuestion!;

  const isPlayerAnswering = id === lastBid?.playerId;
  const [answeringPlayerColor] =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(players).find(([_, player]) => player.id === lastBid?.playerId) ?? [];

  const onAnswerClick = (answerIndex: number) => {
    if (!isPlayerAnswering) return;
    const newPoolAddition =
      Object.values(accountBalances).filter((balance) => balance >= 500).length * 500;
    if (MOCKED_ANSWERS_PER_ROUND[currentRoundNumber] === answerIndex) {
      setGame((game) => ({
        ...game,
        accountBalances: {
          ...game.accountBalances,
          [lastBid!.playerId]: game.accountBalances[lastBid!.playerId] + game.pool - 500
        },
        pool: newPoolAddition
      }));
      showNotification('Gratuluję, poprawna odpowiedź!');
    } else {
      setGame((game) => ({
        ...game,
        pool: game.pool + newPoolAddition
      }));
      showNotification('Nietesty, niepoprawna odpowiedź', NOTIFICATION_TYPE.FAIL);
    }
    const newBiddings = Object.fromEntries(
      Object.values(players).map((player) => [
        player.id,
        accountBalances[player.id] >= 500 ? 500 : 0
      ])
    );
    setGame((game) => ({
      ...game,
      state: game.currentRoundNumber === 7 ? GAME_STATE.FINISHED : GAME_STATE.CATEGORY_DRAW,
      currentRoundNumber:
        game.currentRoundNumber === 7 ? game.currentRoundNumber : game.currentRoundNumber + 1,
      currentCategory: MOCKED_QUESTIONS_CATEGORIES[game.currentRoundNumber],
      lastBid: undefined,
      playersReadiness: undefined,
      currentBiddings: newBiddings
    }));
  };

  return (
    <>
      <AnsweringPlayerInfo
        backgroundColor={PLAYER_CSS_COLORS[answeringPlayerColor as PLAYER_COLOR]}>
        Odpowiadają: {PLAYER_COLOR_TEXT[answeringPlayerColor as PLAYER_COLOR]}
      </AnsweringPlayerInfo>
      <QuestionControlsContainer>
        {answers.map((answer, index) => (
          <QuestionContainer
            key={answer}
            elevation={5}
            isChoosable={isPlayerAnswering}
            onClick={() => onAnswerClick(index)}>
            {indexToLetter(index)}. {answer}
          </QuestionContainer>
        ))}
      </QuestionControlsContainer>
    </>
  );
}
