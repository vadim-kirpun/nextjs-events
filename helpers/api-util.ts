import axios from 'axios';
import config from 'config.json';
import type { ErrorResponse, DateFilter, Event, EventsData } from 'types';

export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const { data } = await axios.get(config.baseUrl);

    return Object.entries(data as EventsData).map(([key, data]) => ({
      id: key,
      ...data,
    }));
  } catch (error) {
    return [];
  }
};

export const getFeaturedEvents = async () =>
  (await getAllEvents()).filter((event) => event.isFeatured);

export const getEventById = async (id: string): Promise<Event | undefined> =>
  (await getAllEvents()).find((event) => event.id === id);

export const getFilteredEvents = async (dateFilter: DateFilter) => {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  return allEvents.filter((event) => {
    const date = new Date(event.date);
    return date.getFullYear() === year && date.getMonth() === month - 1;
  });
};

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    alert((error.response as ErrorResponse).data.message);
  }
};
