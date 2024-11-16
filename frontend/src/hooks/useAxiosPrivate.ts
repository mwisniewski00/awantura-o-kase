import AxiosClient from '../services/AxiosClient';
import { useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const reqInterception = AxiosClient.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterception = AxiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const interceptedRequest = error?.config;
        if (error?.response?.status === 403 && !interceptedRequest?.sent) {
          interceptedRequest.sent = true;
          const newAccessToken = await refresh();
          interceptedRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return AxiosClient(interceptedRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      AxiosClient.interceptors.request.eject(reqInterception);
      AxiosClient.interceptors.response.eject(resInterception);
    };
  }, [auth, refresh]);

  return AxiosClient;
};

export default useAxiosPrivate;
