import { useNotifications } from '@toolpad/core';
import { useCallback } from 'react';

export function useErrorNotification() {
  const notifications = useNotifications();

  return useCallback(
    (text: string) => notifications.show(text, { severity: 'error' }),
    [notifications]
  );
}
