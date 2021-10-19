import { memo } from 'react';
import Image from 'next/image';
import DateIcon from 'icons/DateIcon';
import AddressIcon from 'icons/AddressIcon';
import ArrowRightIcon from 'icons/ArrowRightIcon';
import { formatDate, formatAddress } from 'helpers';
import styles from './styles/event-item.module.css';
import type { Event } from 'types';
import Button from '../ui/Button';

type Props = { data: Event };

const EventItem = (props: Props) => {
  const { id, title, image, date, location } = props.data;

  const humanReadableDate = formatDate(date);
  const formattedAddress = formatAddress(location);

  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <Image src={`/${image}`} alt='event-image' width={360} height={240} />

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
