import { memo } from "react";
import type { Event } from "../../data";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import { formatDate, formatAddress } from "../../helpers";
import styles from "./event-item.module.css";

interface EventItemProps {
  data: Event;
}

const EventItem = (props: EventItemProps) => {
  const { id, title, image, date, location } = props.data;

  const humanReadableDate = formatDate(date);
  const formattedAddress = formatAddress(location);

  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <img src={`/${image}`} alt="event-image" />

      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>

          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>

          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>

        <div className={styles.actions}>
          <Button href={exploreLink}>
            <span>Explore Event</span>

            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default memo(EventItem);
