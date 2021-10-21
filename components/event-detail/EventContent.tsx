import { memo, PropsWithChildren } from 'react';
import styles from './styles/event-content.module.css';

const EventContent = ({ children }: PropsWithChildren<{}>) => (
  <section className={styles.content}>{children}</section>
);

export default memo(EventContent);
