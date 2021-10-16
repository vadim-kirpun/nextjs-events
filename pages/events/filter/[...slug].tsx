import { getFilteredEvents } from 'helpers/api-util';
import { Button, ErrorAlert, EventList, ResultsTitle } from 'components';
import type { Event } from 'types/event';
import { DateFilter } from 'types/date';

interface Success {
  filteredEvents: Event[];
  dateFilter: DateFilter;
}

interface Fail {
  hasError: boolean;
}

type Props = Success | Fail;

const isError = (props: Props): props is Fail => 'hasError' in props;

const FilteredEventsPage = (props: Props) => {
  if (isError(props)) {
    return (
      <div className='center'>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>

        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  const { filteredEvents, dateFilter } = props;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className='center'>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>

        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  const { year, month } = dateFilter;
  const date = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;

/**
 * Here is no way to use SSG here because of 'year' and 'month' params,
 * which are dynamic. Instead, SSR can be used.
 *
 * The second approach may be even better and faster -
 * client side fetching using SWR for example.
 */
interface Params {
  params: { slug: string[] };
}

export const getServerSideProps = async ({ params }: Params) => {
  const [year, month] = params.slug;

  const numYear = Number(year);
  const numMonth = Number(month);

  const hasError =
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1;

  if (hasError) return { props: { hasError } };

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      dateFilter: {
        year: numYear,
        month: numMonth,
      },
      filteredEvents,
    },
  };
};
