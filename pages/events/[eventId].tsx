import { useRouter } from 'next/router';
import { getEventById } from 'data';
import EventSummary from 'components/event-detail/EventSummary';
import EventLogistics from 'components/event-detail/EventLogistics';
import EventContent from 'components/event-detail/EventContent';
import ErrorAlert from 'ui/ErrorAlert';

const EventDetailsPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const event = getEventById(eventId as string);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }

  return (
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
};

export default EventDetailsPage;
