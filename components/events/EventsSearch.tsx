import { memo, useCallback, useRef } from 'react';
import Button from 'ui/Button';
import styles from './styles/events-search.module.css';

const inputs = [
  {
    id: 'year',
    label: 'Year',
    options: [
      { value: '2021', label: '2021' },
      { value: '2022', label: '2022' },
    ],
  },
  {
    id: 'month',
    label: 'Month',
    options: [
      { value: '1', label: 'January' },
      { value: '2', label: 'February' },
      { value: '3', label: 'March' },
      { value: '4', label: 'April' },
      { value: '5', label: 'May' },
      { value: '6', label: 'June' },
      { value: '7', label: 'July' },
      { value: '8', label: 'August' },
      { value: '9', label: 'September' },
      { value: '10', label: 'October' },
      { value: '11', label: 'November' },
      { value: '12', label: 'December' },
    ],
  },
];

type Props = {
  onSearch: (year: string, month: string) => void;
};

const EventsSearch = (props: Props) => {
  const yearRef = useRef<HTMLSelectElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);

  const submitHandler = useCallback((event) => {
    event.preventDefault();

    if (yearRef.current && monthRef.current) {
      const selectedYear = yearRef.current.value;
      const selectedMonth = monthRef.current.value;

      props.onSearch(selectedYear, selectedMonth);
    }
  }, []);

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controls}>
        {inputs.map(({ id, label, options }) => (
          <div key={id} className={styles.control}>
            <label htmlFor={id}>{label}</label>

            <select id={id} ref={id === 'year' ? yearRef : monthRef}>
              {options.map(({ value, label }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <Button>Find Events</Button>
    </form>
  );
};

export default memo(EventsSearch);
