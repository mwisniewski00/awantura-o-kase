import { Box } from '@mui/material';
import React, { useLayoutEffect, useRef, useState } from 'react';
import DollarCoinIcon from '../../images/DollarCoinIcon';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';
import { ROUTES } from '../Navigation/constants';
import { useNavigate } from 'react-router-dom';
import { useCreateGame } from '../../hooks/api/game/useCreateGame';
import { LoadingPage } from '../Reusable/LoadingPage';

const DOLLAR_ICON_CLASS = '.dollar-icon';

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WelcomeMessageTitle = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 2.5rem;
`;

interface BUTTON_OPTION {
  callback: () => void;
  text: string;
}

type BUTTON_OPTION_KEY = 'LOGIN' | 'PLAY_NOW';

export function Main() {
  const { isLoggedIn } = useAuth();
  const scope = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const createGame = useCreateGame();
  const [isCreatingGame, setIsCreatingGame] = useState(false);

  const BUTTON_OPTIONS: Record<BUTTON_OPTION_KEY, BUTTON_OPTION> = {
    LOGIN: {
      callback: () => navigate(ROUTES.SIGN_IN),
      text: 'Zaloguj się by zagrać'
    },
    PLAY_NOW: {
      callback: () => {
        void (async () => {
          setIsCreatingGame(true);
          await createGame();
          setIsCreatingGame(false);
        })();
      },
      text: 'Stwórz grę'
    }
  };

  useLayoutEffect(() => {
    const animation = gsap.context(() => {
      gsap
        .timeline({ repeat: -1 })
        .fromTo(
          DOLLAR_ICON_CLASS,
          {
            y: -20,
            visibility: 1
          },
          {
            duration: 2.5,
            ease: 'power1.inOut',
            y: 20
          }
        )
        .fromTo(
          DOLLAR_ICON_CLASS,
          {
            y: 20
          },
          {
            duration: 2.5,
            ease: 'power1.inOut',
            y: -20
          }
        );
    }, scope);

    return () => {
      animation.revert();
    };
  }, []);

  const buttonOption = isLoggedIn ? BUTTON_OPTIONS.PLAY_NOW : BUTTON_OPTIONS.LOGIN;

  if (isCreatingGame) {
    return <LoadingPage text="Creating game..." />;
  }

  return (
    <PageWrapper>
      <ContentWrapper ref={scope}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#E6E6FA' }}>
          <WelcomeMessageTitle>Zagraj w Awanturę o Kasę online!</WelcomeMessageTitle>
          <div>
            Poczuj emocje kultowego teleturnieju w wersji online! Odpowiadaj na pytania, rywalizuj o
            wirtualne pieniądze i podejmuj strategiczne decyzje. Czy masz to, czego potrzeba, by
            wygrać? Rozpocznij rozgrywkę i przekonaj się!
          </div>
          <div>
            <Button variant="contained" color="warning" onClick={buttonOption.callback}>
              {buttonOption.text}
            </Button>
          </div>
        </Box>
        <DollarCoinIcon />
      </ContentWrapper>
    </PageWrapper>
  );
}
