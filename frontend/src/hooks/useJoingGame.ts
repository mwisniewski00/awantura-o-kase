import { useCallback } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import { useParams } from 'react-router-dom';

export function useJoinGame() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  return useCallback(async () => {
    try {
      await axiosPrivate.post(`/Games/JoinGame/${id}`);
    } catch {
      throw new Error('Failed to join game.');
    }
  }, [axiosPrivate, id]);
}
