import { memo, useContext } from 'react';
import { getEnterHandler } from 'helpers';
import NotificationContext from 'store/notification-context';
import type { INotification } from 'types';
import styles from './styles/notification.module.css';

const Notification = (props: INotification) => {
  const { hideNotification } = useContext(NotificationContext);

  const { title, message, status } = props;

  const activeStyles = `${styles.notification} ${styles[status]}`;

  return (
    <div
      role='button'
      tabIndex={0}
      onKeyPress={getEnterHandler(hideNotification)}
      className={activeStyles}
      onClick={hideNotification}
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default memo(Notification);
