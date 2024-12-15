export interface Player {
  id: string;
  username: string;
}

export enum GAME_STATE {
  NOT_STARTED = 'NOT_STARTED',
  FIRST_ROUND = 'FIRST_ROUND',
  SECOND_ROUND = 'SECOND_ROUND',
  FINISHED = 'FINISHED'
}

export interface Game {
  id: string;
  players: {
    blue: Player;
    green?: Player;
    yellow?: Player;
  };
  state: GAME_STATE;
}

export const QUESTION_CATEGORIES = ['GEOGRAPHY', 'ASTRONOMY', 'BIOLOGY', 'CHEMISTRY'];

export enum GAME_SCREEN {
  KRZYCHU = 'KRZYCHU',
  CATEGORY_DRAW = 'CATEGORY_DRAW'
}
