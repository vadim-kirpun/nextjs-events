import { memo } from 'react';
import EventItem from './EventItem';
import styles from './styles/event-list.module.css';
import { Event } from 'types/event';

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
