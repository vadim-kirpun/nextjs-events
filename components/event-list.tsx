import EventItem from "./event-item";
import type { Event } from "../data";
import styles from "./event-list.module.css";

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

export default EventList;
