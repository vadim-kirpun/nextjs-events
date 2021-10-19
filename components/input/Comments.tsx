import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import type { Comment, CommentWithId } from 'types';
import { handleError } from 'helpers';
import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './styles/comments.module.css';

type Props = {
  eventId: string;
};

type AddCommentResponse = {
  message: string;
  comment: CommentWithId;
};

const Comments = ({ eventId }: Props) => {
  const [comments, setComments] = useState<CommentWithId[]>([]);
  const [showComments, setShowComments] = useState(false);

  const apiRoute = `/api/comments/${eventId}`;

  const fetchComments = async () => {
    const { data } = await axios.get<CommentWithId[]>(apiRoute);
    setComments(data);
  };

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (newComment: Comment) => {
    try {
      const { data } = await axios.post<AddCommentResponse>(
        apiRoute,
        newComment
      );
      alert(data.message);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>

      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default memo(Comments);
