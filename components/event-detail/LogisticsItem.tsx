import React, { memo, PropsWithChildren } from 'react';
import styles from './styles/logistics-item.module.css';

type Props = PropsWithChildren<{ icon: React.ComponentType }>;

const LogisticsItem = ({ children, icon: Icon }: Props) => (
  <li className={styles.item}>
    <span className={styles.icon}>
      <Icon />
    </span>

    <span className={styles.content}>{children}</span>
  </li>
);

export default memo(LogisticsItem);
