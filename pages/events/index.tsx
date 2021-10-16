import { EventList, EventsSearch } from 'components';
import { getAllEvents } from 'helpers/api-util';
import type { Event } from 'types/event';

type Props = { events: Event[] };

const AllEventsPage = ({ events }: Props) => (
  <>
    <EventsSearch />
    <EventList items={events} />
  </>
);

export default AllEventsPage;

export const getStaticProps = async () => ({
  props: {
    events: await getAllEvents(),
  },
  revalidate: 60,
});
