import React, { memo, PropsWithChildren } from 'react';
import Link from 'next/link';
import styles from './styles/button.module.css';

type Props = PropsWithChildren<{
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}>;

const Button = (props: Props) => {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    );
  }

  return <button onClick={props.onClick}>{props.children}</button>;
};

export default memo(Button);
