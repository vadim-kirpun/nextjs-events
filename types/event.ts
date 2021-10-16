interface EventWithoutId {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface Event extends EventWithoutId {
  id: string;
}

export interface EventsData {
  [index: string]: EventWithoutId;
}
