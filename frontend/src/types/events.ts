import { Bid, PLAYER_COLOR, PlayerGameScore, QUESTION_CATEGORY } from './game';

export enum GameUpdateEvent {
  PlayerJoined = 'PlayerJoined',
  RoundStarted = 'RoundStarted',
  PlayerReady = 'PlayerReady',
  StartBidding = 'StartBidding',
  BidDone = 'BidDone',
  BiddingEnd = 'BiddingEnd',
  QuestionAnswer = 'QuestionAnswer'
}

export enum InvokeEvents {
  JoinGameGroup = 'JoinGameGroup'
}

export interface PlayerJoinedMessage {
  id: string;
  username: string;
  playerColor: PLAYER_COLOR;
}

export interface RoundStartedEvent {
  roundNumber: number;
  category: QUESTION_CATEGORY;
}

export type PlayerReadyEvent = PLAYER_COLOR;

export interface StartBiddingEvent {
  pool: number;
  playerGameScores: Array<PlayerGameScore>;
  bids: Array<Bid>;
}

export interface BidDoneEvent {
  newPool: number;
  newAccountBalance: number;
  playerId: string;
  timestamp: string;
  amount: number;
}

export interface BiddingEndEvent {
  questionText: string;
  answers: string[];
}

export interface QuestionAnswerEvent {
  newPool: number;
  answeringPlayerId: string;
  newAccountBalance: number;
  isAnswerCorrect: boolean;
  newQuestionCategory: QUESTION_CATEGORY;
}
