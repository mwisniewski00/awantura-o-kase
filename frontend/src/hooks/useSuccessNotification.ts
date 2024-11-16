import { useNotifications } from '@toolpad/core';
import { useCallback } from 'react';

export function useSuccessNotification() {
  const notifications = useNotifications();

  return useCallback(
    (text: string) => notifications.show(text, { severity: 'success' }),
    [notifications]
  );
}
