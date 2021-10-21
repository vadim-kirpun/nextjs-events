import { memo, useContext } from 'react';
import { getEnterHandler } from 'helpers';
import type { INotification } from 'types';
import { NotificationContext } from 'store';
import styles from './styles/notification.module.css';

const Notification = (props: INotification) => {
  const { title, message, status } = props;

  const { hideNotification } = useContext(NotificationContext);

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
