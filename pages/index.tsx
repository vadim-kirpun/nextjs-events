import { InferGetStaticPropsType } from 'next';
import EventList from 'components/events/EventList';
import { getAllEvents } from 'helpers/api-util';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const HomePage = ({ featuredEvents }: Props) => (
  <div>
    <EventList items={featuredEvents} />
  </div>
);

export default HomePage;

/**
 * This page is opened and does not contain any user specific data.
 * So it would be good to prerender it for web-crawlers and SEO.
 *
 * List of events is not changing frequently,
 * so revalidate it every 60 seconds is enough.
 */
export const getStaticProps = async () => {
  const allEvents = await getAllEvents();
  const featuredEvents = allEvents.filter((event) => event.isFeatured);

  return {
    props: { featuredEvents },
    revalidate: 60,
  };
};
