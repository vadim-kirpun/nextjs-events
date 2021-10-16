import { memo } from 'react';
import EventItem from './EventItem';
import styles from './styles/event-list.module.css';
import { Event } from 'types/event';

interface EventListProps {
  items: Event[];
}

const EventList = (props: EventListProps) => {
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
