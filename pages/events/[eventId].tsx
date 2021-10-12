import { useRouter } from "next/router";
import { getEventById } from "../../data";

const EventDetailsPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const event = getEventById(eventId as string);

  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <div>
      <h1>Event Details</h1>
    </div>
  );
};

export default EventDetailsPage;
