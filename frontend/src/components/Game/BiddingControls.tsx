import styled from 'styled-components';
import { useAuth } from '../../providers/AuthProvider';
import { useGameContext } from '../../providers/GameProvider';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NumberInput } from '../Reusable/NumberInput';
import { PLAYER_COLOR_TO_BUTTON_COLOR_MAPPING } from './PlayerReadinessStatus';
import { PLAYER_COLOR } from '../../types/game';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { LoadingButton } from '@mui/lab';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { getErrorMessage } from '../../services/utils';

interface BiddingControlsProps {
  playerId: string;
  playerColor: PLAYER_COLOR;
}

const BiddingControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`;

const QuickAddButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  row-gap: 4px;
  gap: 4px;
`;

const QUICK_ADD_OPTIONS = [200, 500, 1000, 2000];

const OutOfMoneyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  flex-direction: column;
  font-weight: bold;
`;

export function BiddingControls({ playerId, playerColor }: BiddingControlsProps) {
  const [amountToBid, setAmountToBid] = useState(600);
  const [isMakingBidLoading, setIsMakingBidLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const notifyError = useErrorNotification();
  const {
    auth: { id }
  } = useAuth();

  const {
    game: { accountBalances, lastBid, currentBiddings, id: gameId }
  } = useGameContext();

  const currentUserAccountBalance = accountBalances[playerId];
  const currentUserBid = currentBiddings[playerId];
  const lastBidAmount = lastBid?.amount ?? 500;

  useEffect(() => setAmountToBid(lastBidAmount + 100), [lastBidAmount]);

  const onBidClick = () => {
    void (async () => {
      setIsMakingBidLoading(true);
      try {
        await axiosPrivate.post(`/Bids/MakeBid/${gameId}/${amountToBid}`);
      } catch (error) {
        console.error(error);
        notifyError(getErrorMessage(error));
      } finally {
        setIsMakingBidLoading(false);
      }
    })();
  };

  if (id !== playerId) return <BiddingControlsContainer />;

  const areMoneyGone = currentUserAccountBalance + currentUserBid <= lastBidAmount + 100;

  if (areMoneyGone) {
    return (
      <OutOfMoneyContainer>
        <MoneyOffIcon />
        <div>Skończyły Ci się pieniążki :(</div>
      </OutOfMoneyContainer>
    );
  }

  return (
    <BiddingControlsContainer>
      <QuickAddButtonsContainer>
        {QUICK_ADD_OPTIONS.map((option) => (
          <Button
            key={option}
            disabled={
              option + amountToBid > currentUserAccountBalance + currentUserBid ||
              isMakingBidLoading
            }
            variant="outlined"
            onClick={() => setAmountToBid((amount) => amount + option)}>
            +{option}
          </Button>
        ))}
        <Button
          variant="outlined"
          disabled={isMakingBidLoading}
          onClick={() => setAmountToBid(currentUserAccountBalance + currentUserBid)}>
          Va Banque!
        </Button>
      </QuickAddButtonsContainer>
      <NumberInput
        min={lastBidAmount + 100}
        max={currentUserAccountBalance + currentUserBid}
        value={amountToBid}
        step={100}
        disabled={isMakingBidLoading}
        onChange={(_, value) => value !== null && setAmountToBid(value)}
      />
      <LoadingButton
        variant="contained"
        color={PLAYER_COLOR_TO_BUTTON_COLOR_MAPPING[playerColor]}
        loading={isMakingBidLoading}
        onClick={onBidClick}>
        Licytuj ({amountToBid})
      </LoadingButton>
    </BiddingControlsContainer>
  );
}
