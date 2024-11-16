import { useAuth } from '../providers/AuthProvider';
import { logout } from '../services/auth-api';

const useLogout = () => {
  const { setAuth } = useAuth();

  return async () => {
    setAuth({});
    await logout();
  };
};

export default useLogout;
