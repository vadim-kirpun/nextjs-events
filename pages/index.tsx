import { InferGetStaticPropsType } from 'next';
import { getFeaturedEvents } from 'helpers/api-util';
import { EventList } from 'components';

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
 * so revalidate it every half an hour is enough.
 */
export const getStaticProps = async () => ({
  props: {
    featuredEvents: await getFeaturedEvents(),
  },
  revalidate: 1800,
});
