import { FormEvent, memo, useRef, useState } from 'react';
import { checkIfEmailEmpty, checkIfStringEmpty } from 'helpers';
import type { Comment } from 'types';
import styles from './styles/new-comment.module.css';

type Props = {
  onAddComment: (data: Comment) => void;
};

const NewComment = (props: Props) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const sendCommentHandler = (event: FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef?.current?.value;
    const enteredName = nameInputRef?.current?.value;
    const enteredComment = commentInputRef?.current?.value;

    const isEmailInvalid = checkIfEmailEmpty(enteredEmail);
    const isNameInvalid = checkIfStringEmpty(enteredName);
    const isCommentInvalid = checkIfStringEmpty(enteredComment);

    if (isEmailInvalid || isNameInvalid || isCommentInvalid) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });
  };

  return (
    <form className={styles.form} onSubmit={sendCommentHandler}>
      <div className={styles.row}>
        <div className={styles.control}>
          <label htmlFor='email'>
            Your email
            <input type='email' id='email' ref={emailInputRef} />
          </label>
        </div>

        <div className={styles.control}>
          <label htmlFor='name'>
            Your name
            <input type='text' id='name' ref={nameInputRef} />
          </label>
        </div>
      </div>

      <div className={styles.control}>
        <label htmlFor='comment'>
          Your comment
          <textarea id='comment' rows={5} ref={commentInputRef} />
        </label>
      </div>

      {isInvalid && <p>Please enter a valid email address and comment!</p>}

      <button type='submit'>Submit</button>
    </form>
  );
};

export default memo(NewComment);
