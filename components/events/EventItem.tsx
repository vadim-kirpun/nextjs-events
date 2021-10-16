import { memo } from 'react';
import DateIcon from 'icons/DateIcon';
import AddressIcon from 'icons/AddressIcon';
import ArrowRightIcon from 'icons/ArrowRightIcon';
import { formatDate, formatAddress } from 'helpers';
import Button from 'ui/Button';
import styles from './styles/event-item.module.css';
import { Event } from 'types/event';

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
      <img src={`/${image}`} alt='event-image' />

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
          <Button link={exploreLink}>
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
