import { Request, Response } from 'express';
import ConnectDB from '../config/database';
import Movie, { IMovie } from '../models/movie.model';

ConnectDB();

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: Record<string, any> = {};
    const sortOption: Record<string, 1 | -1> = {};

    if (typeof req.query.title === 'string' && req.query.title.trim()) {
      filter.title = { $regex: req.query.title.trim(), $options: 'i' };
    }

    if (typeof req.query.genre === 'string' && req.query.genre.trim()) {
      filter.genre = req.query.genre.trim();
    }

    if (req.query.sort === 'year') {
      sortOption.year = -1;
    }

    if (req.query.sort === 'year_asc') {
      sortOption.year = 1;
    }

    const movies = await Movie.find(filter).sort(sortOption);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recuperation des films', error });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: 'Film non trouve' });
      return;
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recuperation du film', error });
  }
};

export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieData: IMovie = req.body;
    const movie = new Movie(movieData);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la creation du film', error });
  }
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieData: IMovie = req.body;
    const movie = await Movie.findByIdAndUpdate(req.params.id, movieData, { new: true });
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    res.json(movie);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    res.json({ message: 'Movie deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
