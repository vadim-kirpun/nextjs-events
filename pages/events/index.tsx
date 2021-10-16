import { getAllEvents } from 'data';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { EventList, EventsSearch } from 'components';

const AllEventsPage = () => {
  const events = getAllEvents();

  const router = useRouter();

  const findEventsHandler = useCallback((year, month) => {
    router.push(`/events/filter/${year}/${month}`);
  }, []);

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
