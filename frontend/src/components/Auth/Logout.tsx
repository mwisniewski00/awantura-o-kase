import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { getErrorMessage } from '../../services/utils';

export default function Logout() {
  const navigate = useNavigate();
  const logout = useLogout();
  const notifyError = useErrorNotification();

  useEffect(() => {
    try {
      logout();
      navigate('/');
    } catch (error) {
      notifyError(`Failed to logout: ${getErrorMessage(error)}`);
    }
  }, [logout, navigate, notifyError]);

  return null;
}
