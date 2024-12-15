import React from 'react';
import AppLogoSVG from './app-logo.svg';
import { useNavigate } from 'react-router-dom';

export default function AppLogo() {
  const navigate = useNavigate();
  return (
    <img width="125px" src={AppLogoSVG} alt="Awantura o kasę logo" onClick={() => navigate('/')} style={{ cursor: "pointer"}} />
  );
}
