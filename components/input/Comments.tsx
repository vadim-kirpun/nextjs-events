import { memo, useEffect, useState } from 'react';
import { useHandleError } from 'helpers';
import axios from 'axios';
import type { Comment, CommentWithId } from 'types';
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

  const handleError = useHandleError();

  const apiRoute = `/api/comments/${eventId}`;

  const fetchComments = async () => {
    try {
      const { data } = await axios.get<CommentWithId[]>(apiRoute);
      setComments(data);
    } catch (error) {
      handleError(error);
    }
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
      <button type='button' onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>

      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default memo(Comments);
