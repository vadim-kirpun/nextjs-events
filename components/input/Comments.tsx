import { memo, useCallback, useContext, useState } from 'react';
import axios from 'axios';
import { useHandleError } from 'helpers';
import { NotificationContext } from 'store';
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
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const { showNotification } = useContext(NotificationContext);
  const handleError = useHandleError();

  const apiRoute = `/api/comments/${eventId}`;

  const fetchComments = useCallback(async () => {
    try {
      setIsFetchingComments(true);

      showNotification({
        title: 'Fetching comments',
        message: 'In process...',
        status: 'pending',
      });

      const { data } = await axios.get<CommentWithId[]>(apiRoute);
      setComments(data);

      showNotification({
        title: 'Success!',
        message: 'Successfully got latest comments',
        status: 'success',
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetchingComments(false);
    }
  }, [apiRoute, handleError, showNotification]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);

    if (!showComments) fetchComments();
  };

  const addCommentHandler = useCallback(
    async (newComment: Comment) => {
      try {
        showNotification({
          title: 'Sending comment...',
          message: 'Your comment is currently being stored into a database.',
          status: 'pending',
        });

        const { data } = await axios.post<AddCommentResponse>(
          apiRoute,
          newComment
        );

        showNotification({
          title: 'Success!',
          message: data.message,
          status: 'success',
        });

        setComments((prevComments) => [data.comment, ...prevComments]);
      } catch (error) {
        handleError(error);
      }
    },
    [apiRoute, handleError, showNotification]
  );

  return (
    <section className={styles.comments}>
      <button type='button' onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>

      {showComments && <NewComment onAddComment={addCommentHandler} />}

      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && 'Loading...'}
    </section>
  );
};

export default memo(Comments);
