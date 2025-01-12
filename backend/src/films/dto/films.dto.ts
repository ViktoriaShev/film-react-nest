export class ScheduleDto {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string;
}

export class FilmDto {
  id: string;
  title: string;
  rating: number;
  director: string;
  tags: string;
  image: string;
  cover: string;
  about: string;
  description: string;
  schedule: ScheduleDto[];
}

export type WithTotal<T> = {
  total: number;
  items: T[];
};
