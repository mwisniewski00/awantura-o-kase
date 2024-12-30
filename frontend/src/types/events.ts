import { PLAYER_COLOR } from './game';

export enum GameUpdateEvent {
  PlayerJoined = 'PlayerJoined'
}

export enum InvokeEvents {
  JoinGameGroup = 'JoinGameGroup'
}

export interface PlayerJoinedMessage {
  id: string;
  username: string;
  playerColor: PLAYER_COLOR;
}
