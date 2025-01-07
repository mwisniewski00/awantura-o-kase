import styled from 'styled-components';
import { useGameContext } from '../../providers/GameProvider';
import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { getErrorMessage, indexToLetter, PLAYER_COLOR_TEXT } from '../../services/utils';
import { useAuth } from '../../providers/AuthProvider';
import { PLAYER_CSS_COLORS } from '../../utils/styles';
import { PLAYER_COLOR } from '../../types/game';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useErrorNotification } from '../../hooks/useErrorNotification';

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

export function QuestionControls() {
  const {
    game: { currentQuestion, lastBid, players, id: gameId }
  } = useGameContext();
  const {
    auth: { id }
  } = useAuth();
  const [isAnsweringLoading, setIsAnsweringLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const notifyError = useErrorNotification();

  const { answers } = currentQuestion!;

  const isPlayerAnswering = id === lastBid?.playerId;
  const [answeringPlayerColor] =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(players).find(([_, player]) => player.id === lastBid?.playerId) ?? [];

  const onAnswerClick = (answerIndex: number) => {
    if (!isPlayerAnswering || isAnsweringLoading) return;
    void (async () => {
      setIsAnsweringLoading(true);
      try {
        await axiosPrivate.post(`/Games/QuestionAnswer/${gameId}`, answerIndex);
      } catch (error) {
        console.error(error);
        notifyError(getErrorMessage(error));
      } finally {
        setIsAnsweringLoading(false);
      }
    })();
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
            isChoosable={isPlayerAnswering && !isAnsweringLoading}
            onClick={() => onAnswerClick(index)}>
            {indexToLetter(index)}. {answer}
          </QuestionContainer>
        ))}
      </QuestionControlsContainer>
    </>
  );
}
