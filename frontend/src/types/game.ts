export interface Player {
  id: string;
  username: string;
}

export enum GAME_STATE {
  NOT_STARTED,
  CATEGORY_DRAW,
  BIDDING,
  QUESTION,
  FINISHED
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

export interface Question {
  question: string;
  answers: string[];
}

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
  pool: number;
  currentBiddings: Record<string, number>;
  accountBalances: Record<string, number>;
  currentRoundNumber: number;
  lastBid?: {
    playerId: string;
    timestamp: number;
    amount: number;
  };
  currentQuestion?: Question;
}

export enum QUESTION_CATEGORY {
  GEOGRAPHY,
  ASTRONOMY,
  BIOLOGY,
  CHEMISTRY,
  POLISH_CINEMA,
  FOOTBALL,
  FISHING,
  POLITICS
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
  BIDDING = 'BIDDING',
  QUESTION = 'QUESTION',
  CATEGORY_DRAW = 'CATEGORY_DRAW',
  FINISHED = 'FINISHED'
}

export enum GAME_CONTROLS_SCREEN {
  CATEGORY_DRAW_CONFIRM = 'CATEGORY_DRAW_CONFIRM',
  BIDDING = 'BIDDING',
  QUESTION = 'QUESTION',
  FINISHED = 'FINISHED',
  // temporary screen to mock backend behaviours
  MOCKED_PROGRESS = 'MOCKED_PROGRESS'
}

export interface PlayerGameScore {
  balance: number;
  playerId: string;
}

export interface Bid {
  playerId: string;
  amount: number;
  timeStamp: string;
}

export interface GameApiResponse {
  id: string;
  round: number;
  gameParticipants: {
    bluePlayerId: string;
    greenPlayerId?: string;
    yellowPlayerId?: string;
    isBluePlayerReady: boolean;
    isGreenPlayerReady: boolean;
    isYellowPlayerReady: boolean;
  };
  gameState: GAME_STATE;
  category: QUESTION_CATEGORY | null;
  question: string | null;
  answers: string[] | null;
  pool: number;
  playerGameScores: Array<PlayerGameScore>;
  bids: Array<Bid>;
}
