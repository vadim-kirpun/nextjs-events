import EventSummary from 'components/event-detail/EventSummary';
import EventLogistics from 'components/event-detail/EventLogistics';
import EventContent from 'components/event-detail/EventContent';
import { getAllEvents, getEventById } from 'helpers/api-util';
import { Event } from 'types/event';

type Props = { event: Event };

const EventDetailsPage = ({ event }: Props) => (
  <>
    <EventSummary title={event.title} />

    <EventLogistics
      date={event.date}
      address={event.location}
      image={event.image}
      imageAlt={event.title}
    />

    <EventContent>
      <p>{event.description}</p>
    </EventContent>
  </>
);

export default EventDetailsPage;

// This page is open and should be available for web-crawlers.
type Params = {
  params: {
    eventId: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const event = await getEventById(params.eventId);

  if (!event) return { notFound: true };
  return { props: { event } };
};

export const getStaticPaths = async () => {
  const allEvents = await getAllEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return { paths, fallback: false };
};
