import { memo } from 'react';
import AddressIcon from 'icons/AddressIcon';
import DateIcon from 'icons/DateIcon';
import { formatAddress, formatDate } from 'helpers';
import LogisticsItem from './LogisticsItem';
import styles from './styles/event-logistics.module.css';
import { Event } from 'types/event';

type Props = Pick<Event, 'date' | 'image'> & {
  imageAlt: string;
  address: string;
};

const EventLogistics = (props: Props) => {
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = formatDate(date);
  const addressText = formatAddress(address);

  return (
    <section className={styles.logistics}>
      <div className={styles.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>

      <ul className={styles.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>

        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default memo(EventLogistics);
