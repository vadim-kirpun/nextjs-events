import { FormEvent, memo, useContext, useRef } from 'react';
import axios from 'axios';
import { useHandleError } from 'helpers';
import { NotificationContext } from 'store';
import styles from './styles/newsletter-registration.module.css';

type NewsletterResponse = {
  message: string;
};

const NewsletterRegistration = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { showNotification } = useContext(NotificationContext);
  const handleError = useHandleError();

  const registrationHandler = async (event: FormEvent) => {
    event.preventDefault();

    showNotification({
      title: 'Signing up',
      message: 'Registering for newsletter...',
      status: 'pending',
    });

    try {
      const { data } = await axios.post<NewsletterResponse>('/api/newsletter', {
        email: inputRef?.current?.value,
      });

      showNotification({
        title: 'Success!',
        message: data.message,
        status: 'success',
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>

      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            id='email'
            type='email'
            ref={inputRef}
            placeholder='Your email'
            aria-label='Your email'
          />

          <button type='submit'>Register</button>
        </div>
      </form>
    </section>
  );
};

export default memo(NewsletterRegistration);
