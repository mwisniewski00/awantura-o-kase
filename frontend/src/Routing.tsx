import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './components/Navigation/constants';
import { SignInForm } from './components/AuthForm/SignInForm';
import { SignUpForm } from './components/AuthForm/SignUpForm';
import PersistLogin from './components/Auth/PersistLogin';
import Logout from './components/Auth/Logout';
import UserProfile from './components/UserProfile/UserProfile';

export default function Routing() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" />
        <Route path={ROUTES.SIGN_IN} Component={SignInForm} />
        <Route path={ROUTES.SIGN_UP} Component={SignUpForm} />
        <Route path={ROUTES.LOG_OUT} Component={Logout} />
        <Route path={ROUTES.ACCOUNT} Component={UserProfile} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
