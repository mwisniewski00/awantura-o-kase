import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './components/Navigation/constants';
import { SignInForm } from './components/AuthForm/SignInForm';
import { SignUpForm } from './components/AuthForm/SignUpForm';
import PersistLogin from './components/Auth/PersistLogin';
import Logout from './components/Auth/Logout';
import { Main } from './components/Main/Main';
import { Game } from './components/Game/Game';
import RequireAuth from './components/Auth/RequireAuth';

export default function Routing() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" Component={Main} />
        <Route path={ROUTES.SIGN_IN} Component={SignInForm} />
        <Route path={ROUTES.SIGN_UP} Component={SignUpForm} />
        <Route path={ROUTES.LOG_OUT} Component={Logout} />
        <Route element={<RequireAuth />}>
          <Route path="/game/:id" Component={Game} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
