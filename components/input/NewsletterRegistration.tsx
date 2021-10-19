import { FormEvent, memo, useRef } from 'react';
import axios from 'axios';
import { handleError } from 'helpers';
import styles from './styles/newsletter-registration.module.css';

type NewsletterResponse = {
  message: string;
};

const NewsletterRegistration = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const registrationHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await axios.post<NewsletterResponse>('/api/newsletter', {
        email: inputRef?.current?.value,
      });

      alert(data.message);
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

          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default memo(NewsletterRegistration);
