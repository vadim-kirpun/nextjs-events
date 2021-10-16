import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import EventSummary from 'components/event-detail/EventSummary';
import EventLogistics from 'components/event-detail/EventLogistics';
import EventContent from 'components/event-detail/EventContent';
import { getAllEvents, getEventById } from 'helpers/api-util';
import type { Event } from 'types';

type EventDetailsPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const EventDetailsPage = ({ event }: EventDetailsPageProps) => (
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

/**
 * This page is open and should be available for web-crawlers.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const allEvents = await getAllEvents();
  return {
    paths: allEvents.map((event) => ({ params: { eventId: event.id } })),
    fallback: false,
  };
};

interface StaticPathParams extends ParsedUrlQuery {
  eventId: string;
}

type EventDetailsProps = {
  event: Event;
};

export const getStaticProps: GetStaticProps<
  EventDetailsProps,
  StaticPathParams
> = async (context) => {
  const eventId = context.params!.eventId;
  const event = await getEventById(eventId);

  if (!event) return { notFound: true };

  return { props: { event } };
};
