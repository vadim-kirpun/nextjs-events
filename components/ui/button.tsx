import { memo, PropsWithChildren } from "react";
import Link from "next/link";
import styles from "./button.module.css";

type ButtonProps = PropsWithChildren<{
  href: string;
}>;

const Button = (props: ButtonProps) => (
  <Link href={props.href}>
    <a className={styles.btn}>{props.children}</a>
  </Link>
);

export default memo(Button);
