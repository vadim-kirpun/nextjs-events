import React, { memo, PropsWithChildren } from 'react';
import Link from 'next/link';
import styles from './styles/button.module.css';

type Props = PropsWithChildren<{
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}>;

const Button = ({ children, link, onClick }: Props) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={styles.btn}>{children}</a>
      </Link>
    );
  }

  return (
    <button type='button' onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(Button);
