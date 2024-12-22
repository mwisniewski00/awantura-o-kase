import { useCallback } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
// import useAxiosPrivate from "../../useAxiosPrivate";

export function useCreateGame() {
  // const axiosPrivate = useAxiosPrivate();
  const {
    auth: { id, username }
  } = useAuth();
  return useCallback(
    () =>
      new Promise<string>((resolve, reject) =>
        setTimeout(() => {
          if (!id || !username) return reject("Can' create game. User not authorized.");
          resolve(crypto.randomUUID().toString());
        }, 2000)
      ),
    [id, username]
  );
}
