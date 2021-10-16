import axios from 'axios';
import config from 'config.json';
import type { Event, EventsData } from 'types';

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
