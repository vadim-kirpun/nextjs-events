import { EventList, EventsSearch, PageTitle } from 'components';
import { getAllEvents } from 'helpers';
import type { Event } from 'types';

type Props = { events: Event[] };

const AllEventsPage = ({ events }: Props) => (
  <>
    <PageTitle>All Events</PageTitle>
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
