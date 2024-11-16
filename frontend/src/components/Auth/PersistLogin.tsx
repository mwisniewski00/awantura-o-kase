import { useAuth } from '../../providers/AuthProvider';
import useRefreshToken from '../../hooks/useRefreshToken';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import React from 'react';

const PersistLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh().then(() => {
        setIsLoading(false);
      });
    };

    if (Object.keys(auth).length === 0) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};

export default PersistLogin;
