import { useCallback } from 'react';
import { Game, GAME_STATE } from '../../../types/game';
import { useAuth } from '../../../providers/AuthProvider';
// import useAxiosPrivate from "../../useAxiosPrivate";

export function useCreateGame() {
  // const axiosPrivate = useAxiosPrivate();
  const {
    auth: { id, username }
  } = useAuth();
  return useCallback(
    () =>
      new Promise<Game>((resolve, reject) =>
        setTimeout(() => {
          if (!id || !username) return reject("Can' create game. User not authorized.");
          resolve({
            id: crypto.randomUUID().toString(),
            players: {
              blue: { id, username }
            },
            state: GAME_STATE.NOT_STARTED
          });
        }, 2000)
      ),
    [id, username]
  );
}
