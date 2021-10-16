import { memo } from 'react';
import styles from './styles/event-summary.module.css';

type EventSummaryProps = {
  title: string;
};

const EventSummary = ({ title }: EventSummaryProps) => (
  <section className={styles.summary}>
    <h1>{title}</h1>
  </section>
);

export default memo(EventSummary);
