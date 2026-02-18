export interface IMovie {
  _id: string;
  title: string;
  director: string;
  year: number;
  genre: string;
  duration: number;
  poster?: string;
  description?: string;
}
