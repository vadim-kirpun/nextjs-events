import { memo, PropsWithChildren } from 'react';
import styles from './styles/error-alert.module.css';

const ErrorAlert = ({ children }: PropsWithChildren<{}>) => (
  <div className={styles.alert}>{children}</div>
);

export default memo(ErrorAlert);
