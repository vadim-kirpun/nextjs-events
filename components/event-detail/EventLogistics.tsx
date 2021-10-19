import { memo } from 'react';
import Image from 'next/image';
import { formatAddress, formatDate } from 'helpers';
import AddressIcon from 'icons/AddressIcon';
import DateIcon from 'icons/DateIcon';
import styles from './styles/event-logistics.module.css';
import LogisticsItem from './LogisticsItem';
import type { Event } from 'types';

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
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} />
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
