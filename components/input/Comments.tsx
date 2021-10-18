import { memo, useState } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './styles/comments.module.css';

type Props = {
  eventId: string;
};

const Comments = ({ eventId }: Props) => {
  const [showComments, setShowComments] = useState(false);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = () => {};

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>

      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
};

export default memo(Comments);
