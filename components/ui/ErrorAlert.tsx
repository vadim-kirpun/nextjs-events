import { memo, PropsWithChildren } from 'react';
import styles from './styles/error-alert.module.css';

const ErrorAlert = (props: PropsWithChildren<{}>) => (
  <div className={styles.alert}>{props.children}</div>
);

export default memo(ErrorAlert);
