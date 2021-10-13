import React, { memo, PropsWithChildren } from "react";
import styles from "./styles/logistics-item.module.css";

type LogisticsItemProps = PropsWithChildren<{
  icon: React.ComponentType;
}>;

const LogisticsItem = (props: LogisticsItemProps) => {
  const { icon: Icon } = props;

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>

      <span className={styles.content}>{props.children}</span>
    </li>
  );
};

export default memo(LogisticsItem);
