import { EventList, EventsSearch } from 'components';
import { getAllEvents } from 'helpers/api-util';
import type { Event } from 'types/event';
import Head from 'next/head';

type Props = { events: Event[] };

const AllEventsPage = ({ events }: Props) => (
  <>
    <Head>
      <title>All Events</title>
    </Head>

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
