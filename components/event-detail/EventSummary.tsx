import { memo } from 'react';
import styles from './styles/event-summary.module.css';

type Props = { title: string };

const EventSummary = ({ title }: Props) => (
  <section className={styles.summary}>
    <h1>{title}</h1>
  </section>
);

export default memo(EventSummary);
