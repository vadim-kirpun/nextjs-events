import EventList from "components/events/EventList";
import EventsSearch from "components/events/EventsSearch";
import { getAllEvents } from "data";

const AllEventsPage = () => {
  const events = getAllEvents();

  return (
    <>
      <EventsSearch />
      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
