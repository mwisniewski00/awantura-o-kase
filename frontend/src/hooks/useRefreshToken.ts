import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { refreshToken } from '../services/auth-api';
import { AxiosError } from 'axios';

const useRefreshToken = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await refreshToken();

      setAuth({
        token: response.data.jwtToken,
        email: response.data.email,
        username: response.data.userName
      });

      return response.data.jwtToken;
    } catch (error) {
      if ((error as AxiosError).response?.status === 403) {
        setAuth({});
        navigate('/');
      }
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
