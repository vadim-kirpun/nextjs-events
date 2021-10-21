import { memo, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { INotification, INotificationContext } from 'types';
import NotificationContext from './notification-context';

const NotificationProvider = ({ children }: PropsWithChildren<{}>) => {
  const [activeNotification, setActiveNotification] =
    useState<INotification | null>(null);

  const status = activeNotification?.status ?? '';

  const showNotification = (notificationData: INotification) => {
    setActiveNotification(notificationData);
  };

  const hideNotification = () => {
    setActiveNotification(null);
  };

  useEffect(() => {
    if (['success', 'error'].includes(status)) {
      const timer = setTimeout(hideNotification, 3000);
      return () => clearTimeout(timer);
    }

    return () => {};
  }, [status]);

  const context: INotificationContext = {
    notification: activeNotification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default memo(NotificationProvider);
