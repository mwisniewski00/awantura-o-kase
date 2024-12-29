import { useCallback } from 'react';
import useAxiosPrivate from '../../useAxiosPrivate';
import { getErrorMessage } from '../../../services/utils';
import { useErrorNotification } from '../../useErrorNotification';
import { useNavigate } from 'react-router-dom';

export function useCreateGame() {
  const axiosPrivate = useAxiosPrivate();
  const showErrorFlag = useErrorNotification();
  const navigate = useNavigate();
  return useCallback(async () => {
    try {
      const { data } = await axiosPrivate.post('/Games/CreateGame');
      navigate(`game/${data}`);
    } catch (error) {
      const message = getErrorMessage(error);
      showErrorFlag(message);
    }
  }, [axiosPrivate, navigate, showErrorFlag]);
}
