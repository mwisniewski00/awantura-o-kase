export interface Player {
  id: string;
  username: string;
}

export enum GAME_STATE {
  NOT_STARTED = 'NOT_STARTED',
  CATEGORY_DRAW = 'CATEGORY_DRAW',
  BIDDING = 'BIDDING',
  QUESTION = 'QUESTION',
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

export const QUESTION_CATEGORIES = [
  'Geografia',
  'Astronomia',
  'Biologia',
  'Chemia',
  'Film polski',
  'Piłka nożna',
  'Wędkarstwo',
  'Polityka'
];

export enum GAME_SCREEN {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  KRZYCHU = 'KRZYCHU',
  CATEGORY_DRAW = 'CATEGORY_DRAW'
}
