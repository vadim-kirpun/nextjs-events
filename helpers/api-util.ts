import { useCallback, useContext } from 'react';
import axios from 'axios';
import config from 'config.json';
import { NotificationContext } from 'store';
import type { ErrorResponse, DateFilter, Event, EventsData } from 'types';

export const getAllEvents = async (): Promise<Event[]> => {
  try {
    const { data } = await axios.get<EventsData>(config.baseUrl);

    return Object.entries(data).map(([key, eventData]) => ({
      id: key,
      ...eventData,
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

export const useHandleError = () => {
  const { showNotification } = useContext(NotificationContext);

  return useCallback(
    (error: any) => {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response as ErrorResponse).data.message ??
          'Something went wrong!';

        showNotification({
          title: 'Error!',
          message,
          status: 'error',
        });
      }
    },
    [showNotification]
  );
};
