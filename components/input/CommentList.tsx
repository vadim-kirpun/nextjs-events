import { memo } from 'react';
import styles from './styles/comment-list.module.css';

const CommentList = () => (
  <ul className={styles.comments}>
    <li>
      <p>My comment is amazing!</p>
      <div>
        By <address>Vadim</address>
      </div>
    </li>
    <li>
      <p>My comment is amazing!</p>
      <div>
        By <address>Vadim</address>
      </div>
    </li>
  </ul>
);

export default memo(CommentList);
