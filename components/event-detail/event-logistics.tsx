import { memo } from "react";
import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import type { Event } from "../../data";
import { formatAddress, formatDate } from "../../helpers";
import LogisticsItem from "./logistics-item";
import styles from "./event-logistics.module.css";

type EventLogisticsProps = Pick<Event, "date" | "image"> & {
  imageAlt: string;
  address: string;
};

const EventLogistics = (props: EventLogisticsProps) => {
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
