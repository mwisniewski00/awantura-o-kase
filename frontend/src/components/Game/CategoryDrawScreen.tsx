import styled from 'styled-components';
import React from 'react';
import { Wheel } from 'react-custom-roulette';
import { QUESTION_CATEGORIES } from '../../types/game';

const WheelContainer = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    width: 345px;
    height: 345px;
  }
`;

const WHEEL_OPTIONS = QUESTION_CATEGORIES.map((category) => ({
  option: category
}));

interface CategoryDrawScreen {
  onStopSpinning: () => void;
}

export function CategoryDrawScreen({ onStopSpinning }: CategoryDrawScreen) {
  return (
    <WheelContainer>
      <Wheel data={WHEEL_OPTIONS} prizeNumber={0} mustStartSpinning onStopSpinning={onStopSpinning} />
    </WheelContainer>
  );
}
