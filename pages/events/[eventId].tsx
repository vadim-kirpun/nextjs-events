import { useRouter } from "next/router";
import { getEventById } from "data";
import EventSummary from "components/event-detail/EventSummary";
import EventLogistics from "components/event-detail/EventLogistics";
import EventContent from "components/event-detail/EventContent";

const EventDetailsPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const event = getEventById(eventId as string);

  if (!event) {
    return <p>No event found</p>;
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
