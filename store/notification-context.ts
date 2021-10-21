import { createContext } from 'react';
import type { INotificationContext } from 'types';

const NotificationContext = createContext<INotificationContext>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export default NotificationContext;
