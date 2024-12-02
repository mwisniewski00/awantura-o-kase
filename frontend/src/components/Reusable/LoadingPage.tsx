import { CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const LoadingPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

const LoadingText = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

interface LoadingPageProps {
  text?: string;
}

export function LoadingPage({ text }: LoadingPageProps) {
  return (
    <LoadingPageContainer>
      <CircularProgress size={75} color="warning" />
      <LoadingText>{text}</LoadingText>
    </LoadingPageContainer>
  );
}
