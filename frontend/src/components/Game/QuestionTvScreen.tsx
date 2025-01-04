import React from 'react';
import { useGameContext } from '../../providers/GameProvider';
import { KrzychuScreen } from './KrzychuScreen';

export function QuestionTvScreen() {
  const {
    game: { currentQuestion }
  } = useGameContext();

  return <KrzychuScreen text={currentQuestion!.question} />;
}
