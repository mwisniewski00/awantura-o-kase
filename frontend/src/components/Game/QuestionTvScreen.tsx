import React from 'react';
import { useGameContext } from '../../providers/GameProvider';
import { KrzychuScreen } from './KrzychuScreen';

export function QuestionTvScreen() {
  const {
    game: { questions, currentRoundNumber }
  } = useGameContext();

  const currentQuestion = questions[currentRoundNumber];

  return <KrzychuScreen text={currentQuestion.question} />;
}
