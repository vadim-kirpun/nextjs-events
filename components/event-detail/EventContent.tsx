import { memo, PropsWithChildren } from "react";
import styles from "./event-content.module.css";

const EventContent = (props: PropsWithChildren<{}>) => (
  <section className={styles.content}>{props.children}</section>
);

export default memo(EventContent);