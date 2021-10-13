import { memo } from "react";
import Button from "ui/button";
import styles from "./event-search.module.css";

const inputs = [
  {
    id: "year",
    options: [
      { value: "2021", label: "2021" },
      { value: "2022", label: "2022" },
    ],
  },
  {
    id: "month",
    options: [
      { value: "1", label: "January" },
      { value: "2", label: "February" },
      { value: "3", label: "March" },
      { value: "4", label: "April" },
      { value: "5", label: "May" },
      { value: "6", label: "June" },
      { value: "7", label: "July" },
      { value: "8", label: "August" },
      { value: "9", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" },
    ],
  },
];

const EventsSearch = () => (
  <form className={styles.form}>
    <div className={styles.controls}>
      {inputs.map(({ id, options }) => (
        <div key={id} className={styles.control}>
          <label htmlFor={id}>{id[0].toUpperCase() + id.substr(1)}</label>

          <select id={id}>
            {options.map(({ value, label }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>

    <Button>Search</Button>
  </form>
);

export default memo(EventsSearch);
