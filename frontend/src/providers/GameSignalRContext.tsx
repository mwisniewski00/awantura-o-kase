import React, { PropsWithChildren } from 'react';
import { createSignalRContext } from 'react-signalr/signalr';
import { useAuth } from './AuthProvider';
import { useGameUpdates } from '../hooks/useGameUpdates';
import { InvokeEvents } from '../types/events';
import { useParams } from 'react-router-dom';

export const SignalRContext = createSignalRContext();

function SignalREventsListener({ children }: PropsWithChildren<object>) {
  useGameUpdates();

  return children;
}

export function GameSignalRContext({ children }: PropsWithChildren) {
  const { auth } = useAuth();
  const { id } = useParams();
  return (
    <SignalRContext.Provider
      connectEnabled={Boolean(auth.token)}
      accessTokenFactory={() => auth.token ?? ''}
      dependencies={[auth.token]}
      onOpen={() => void SignalRContext.invoke(InvokeEvents.JoinGameGroup, id)}
      url="/gamehub">
      <SignalREventsListener>{children}</SignalREventsListener>
    </SignalRContext.Provider>
  );
}
