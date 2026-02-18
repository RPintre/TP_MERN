import type { IMovie } from '../models/IMovie';

const API_URL = '/api/movies';

type MoviesQuery = {
  title?: string;
  genre?: string;
  sort?: 'year' | 'year_asc';
};

export const getAllMovies = async (query: MoviesQuery = {}): Promise<IMovie[]> => {
  const params = new URLSearchParams();

  if (query.title?.trim()) {
    params.set('title', query.title.trim());
  }

  if (query.genre?.trim()) {
    params.set('genre', query.genre.trim());
  }

  if (query.sort) {
    params.set('sort', query.sort);
  }

  const url = params.toString() ? `${API_URL}?${params.toString()}` : API_URL;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Erreur lors de la recuperation des films');
  }

  return response.json();
};

export const createMovie = async (movie: Omit<IMovie, '_id'>): Promise<IMovie> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la creation du film');
  }

  return response.json();
};

export const updateMovie = async (
  id: string,
  payload: Partial<Pick<IMovie, 'title' | 'description'>>
): Promise<IMovie> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la modification du film');
  }

  return response.json();
};

export const deleteMovie = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression du film');
  }
};
