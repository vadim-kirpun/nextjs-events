import { memo } from 'react';
import type { Event } from 'types';
import EventItem from './EventItem';
import styles from './styles/event-list.module.css';

type Props = { items: Event[] };

const EventList = (props: Props) => {
  const { items = [] } = props;

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <EventItem key={item.id} data={item} />
      ))}
    </ul>
  );
};

export default memo(EventList);
