import {
  PageTitle,
  EventContent,
  EventSummary,
  EventLogistics,
} from 'components';
import { Event } from 'types/event';
import { getEventById, getFeaturedEvents } from 'helpers/api-util';

type Props = { event: Event };

const EventDetailsPage = ({ event }: Props) => (
  <>
    <PageTitle>Event - {event.title}</PageTitle>

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
// Event data more important than events list, hence it will be updated every 30 seconds.
type Params = {
  params: {
    eventId: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const event = await getEventById(params.eventId);

  if (!event) return { notFound: true };

  return {
    props: { event },
    revalidate: 30,
  };
};

/**
 * Since we don't need to pre-render huge amount of pages,
 * it would be good to pre-render only featured events represented on index page.
 * For others fallback will work.
 */
export const getStaticPaths = async () => {
  const featuredEvents = await getFeaturedEvents();
  const paths = featuredEvents.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
