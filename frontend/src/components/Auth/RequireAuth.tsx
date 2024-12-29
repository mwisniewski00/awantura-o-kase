import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth: React.FC = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuth;
