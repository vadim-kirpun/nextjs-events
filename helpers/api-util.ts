import axios from 'axios';
import config from 'config.json';
import { Event, EventsData } from 'types/event';

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
