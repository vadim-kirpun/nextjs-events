import React, { memo, PropsWithChildren } from 'react';
import styles from './styles/logistics-item.module.css';

type Props = PropsWithChildren<{ icon: React.ComponentType }>;

const LogisticsItem = (props: Props) => {
  const { icon: Icon } = props;

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>

      <span className={styles.content}>{props.children}</span>
    </li>
  );
};

export default memo(LogisticsItem);
