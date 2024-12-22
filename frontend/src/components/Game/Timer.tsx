import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface TimerProps {
  startTimestamp: number;
  timeToCountInMs: number;
  onTimeEnd: () => void;
}

const StyledTimer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: 1px solid black;
  font-weight: 700;
  height: 40px;
`;

export function Timer({ startTimestamp, timeToCountInMs, onTimeEnd }: TimerProps) {
  const calculateTimeRemaining = useCallback(() => {
    const remainingTime = timeToCountInMs - (Date.now() - startTimestamp);
    return remainingTime < 0 ? 0 : remainingTime;
  }, [startTimestamp, timeToCountInMs]);

  const [timeRemaining, setTimeRemaining] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining());

    const createInterval = () =>
      setInterval(
        () =>
          setTimeRemaining((time) => {
            const timeLeft = time - 1000 < 0 ? 0 : time - 1000;
            if (!timeLeft) {
              onTimeEnd();
              if (intervalRef.current) clearInterval(intervalRef.current);
            }
            return timeLeft;
          }),
        1000
      );

    intervalRef.current = createInterval();
    let timestampBeforeTabHidden: number | null = null;

    const listener = () => {
      if (document.hidden) {
        timestampBeforeTabHidden = Date.now();
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
      } else if (timestampBeforeTabHidden) {
        const passedTime = Date.now() - timestampBeforeTabHidden;
        setTimeRemaining((prev) => (prev > 0 ? prev - passedTime : 0));
        timestampBeforeTabHidden = null;
        intervalRef.current = createInterval();
      }
    };

    document.addEventListener('visibilitychange', listener);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', listener);
    };
  }, [calculateTimeRemaining, onTimeEnd]);

  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const seconds = Math.floor((timeRemaining / 1000) % 60);

  return <StyledTimer>{`${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`}</StyledTimer>;
}
