import { memo } from 'react';
import type { CommentWithId } from 'types';
import styles from './styles/comment-list.module.css';

type Props = {
  items: CommentWithId[];
};

const CommentList = ({ items }: Props) => (
  <ul className={styles.comments}>
    {items.map((item) => (
      <li key={item.id}>
        <p>{item.text}</p>
        <div>
          By <address>{item.name}</address>
        </div>
      </li>
    ))}
  </ul>
);

export default memo(CommentList);
