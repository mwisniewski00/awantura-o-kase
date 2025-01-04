import { PLAYER_COLOR, QUESTION_CATEGORY } from './game';

export enum GameUpdateEvent {
  PlayerJoined = 'PlayerJoined',
  RoundStarted = 'RoundStarted',
  PlayerReady = 'PlayerReady',
  AllPlayersReady = 'AllPlayersReady'
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
