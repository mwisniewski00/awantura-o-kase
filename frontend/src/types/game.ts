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

export enum PLAYER_COLOR {
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow'
}

export const PLAYERS_COLORS: PLAYER_COLOR[] = [
  PLAYER_COLOR.BLUE,
  PLAYER_COLOR.GREEN,
  PLAYER_COLOR.YELLOW
];

export interface Game {
  id: string;
  players: {
    [PLAYER_COLOR.BLUE]: Player;
    [PLAYER_COLOR.GREEN]?: Player;
    [PLAYER_COLOR.YELLOW]?: Player;
  };
  playersReadiness?: Record<string, boolean>;
  state: GAME_STATE;
  currentCategory?: QUESTION_CATEGORY;
}

export enum QUESTION_CATEGORY {
  GEOGRAPHY = 'Geografia',
  ASTRONOMY = 'Astronomia',
  BIOLOGY = 'Biologia',
  CHEMISTRY = 'Chemia',
  POLISH_CINEMA = 'Film polski',
  FOOTBALL = 'Piłka nożna',
  FISHING = 'Wędkarstwo',
  POLITICS = 'Polityka'
}

export const QUESTION_CATEGORIES: QUESTION_CATEGORY[] = [
  QUESTION_CATEGORY.ASTRONOMY,
  QUESTION_CATEGORY.BIOLOGY,
  QUESTION_CATEGORY.CHEMISTRY,
  QUESTION_CATEGORY.FISHING,
  QUESTION_CATEGORY.FOOTBALL,
  QUESTION_CATEGORY.GEOGRAPHY,
  QUESTION_CATEGORY.POLISH_CINEMA,
  QUESTION_CATEGORY.POLITICS
];

export enum GAME_SCREEN {
  WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS',
  KRZYCHU = 'KRZYCHU',
  CATEGORY_DRAW = 'CATEGORY_DRAW'
}

export enum GAME_CONTROLS_SCREEN {
  CATEGORY_DRAW_CONFIRM = 'CATEGORY_DRAW_CONFIRM',
  // temporary screen to mock backend behaviours
  MOCKED_PROGRESS = 'MOCKED_PROGRESS'
}
