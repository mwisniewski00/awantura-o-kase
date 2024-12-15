import styled from 'styled-components';
import { Krzychu } from '../../images/Krzychu';
import React from 'react';

const ScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const SpeechBubble = styled.div`
  width: 80%;
  height: 90%;
  margin: 20px auto;
  background: white;
  padding: 20px;
  text-align: center;
  font-weight: 900;
  color: black;
  font-family: arial;
  position: relative;

  &::before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid white;
    border-top: 10px solid white;
    border-bottom: 10px solid transparent;
    right: 19px;
    bottom: -19px;
  }
`;

const KrzychuContainer = styled.div`
  display: flex;
  width: 97%;
  justify-content: flex-end;
`;

interface KrzychuScreenProps {
  text: string;
}

export function KrzychuScreen({ text }: KrzychuScreenProps) {
  return (
    <ScreenContainer>
      <SpeechBubble>{text}</SpeechBubble>
      <KrzychuContainer>
        <Krzychu />
      </KrzychuContainer>
    </ScreenContainer>
  );
}
