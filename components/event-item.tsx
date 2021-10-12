import { memo } from "react";
import type { Event } from "../data";
import Button from "./ui/button";
import styles from "./event-item.module.css";

interface EventItemProps {
  data: Event;
}

const EventItem = (props: EventItemProps) => {
  const { id, title, image, date, location } = props.data;

  const humanReadableDate = new Date(date).toLocaleDateString("en-EN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <img src={`/${image}`} alt="event-image" />

      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>

          <div className={styles.date}>
            <time>{humanReadableDate}</time>
          </div>

          <div className={styles.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className={styles.actions}>
          <Button href={exploreLink}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
};

export default memo(EventItem);
