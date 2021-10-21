import { memo, useContext } from 'react';
import { NotificationContext } from 'store';
import type { PropsWithChildren } from 'react';
import Notification from '../ui/Notification';
import MainHeader from './MainHeader';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { notification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />

      <main>{children}</main>

      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
};

export default memo(Layout);
