import { memo } from 'react';
import Button from 'ui/Button';
import classes from './styles/results-title.module.css';

type ResultsTitleProps = {
  date: Date;
};

const ResultsTitle = (props: ResultsTitleProps) => {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link='/events'>Show all events</Button>
    </section>
  );
};

export default memo(ResultsTitle);
