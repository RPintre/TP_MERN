import { useEffect, useMemo, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import type { IMovie } from './models/IMovie';
import { createMovie, deleteMovie, getAllMovies, updateMovie } from './services/api';

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState<'year' | 'year_asc' | ''>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [newMovie, setNewMovie] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    duration: '',
    poster: '',
    description: '',
  });

  const loadGenres = async () => {
    const all = await getAllMovies();
    const uniqueGenres = Array.from(new Set(all.map((movie) => movie.genre))).sort();
    setGenres(uniqueGenres);
  };

  const loadMovies = async () => {
    try {
      const data = await getAllMovies({
        title: search,
        genre,
        sort: sort || undefined,
      });
      setMovies(data);
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(`Impossible de charger les films: ${error.message}`);
    }
  };

  useEffect(() => {
    void loadMovies();
  }, [search, genre, sort]);

  useEffect(() => {
    void loadGenres();
  }, []);

  const canSubmit = useMemo(() => {
    return (
      newMovie.title.trim() &&
      newMovie.director.trim() &&
      newMovie.year.trim() &&
      newMovie.genre.trim() &&
      newMovie.duration.trim()
    );
  }, [newMovie]);

  const handleAddMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      await createMovie({
        title: newMovie.title.trim(),
        director: newMovie.director.trim(),
        year: Number(newMovie.year),
        genre: newMovie.genre.trim(),
        duration: Number(newMovie.duration),
        poster: newMovie.poster.trim() || undefined,
        description: newMovie.description.trim() || undefined,
      });

      setNewMovie({
        title: '',
        director: '',
        year: '',
        genre: '',
        duration: '',
        poster: '',
        description: '',
      });

      await loadMovies();
      await loadGenres();
    } catch (error: any) {
      setErrorMessage(`Impossible d'ajouter le film: ${error.message}`);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      await deleteMovie(id);
      await loadMovies();
      await loadGenres();
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(`Impossible de supprimer le film: ${error.message}`);
    }
  };

  const handleUpdateMovie = async (id: string, payload: { title: string; description: string }) => {
    try {
      await updateMovie(id, payload);
      await loadMovies();
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(`Impossible de modifier le film: ${error.message}`);
    }
  };

  return (
    <div className="app-shell">
      <section className="container">
        <header className="header">
          <h1>Cine Explore</h1>
          <p>Recherchez, filtrez et gerez vos films.</p>
        </header>

        {errorMessage && (
          <div className="error-banner" role="alert">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage('')}>x</button>
          </div>
        )}

        <form onSubmit={handleAddMovie} className="form-grid">
          <input
            className="input-movie"
            type="text"
            placeholder="Titre"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          />
          <input
            className="input-movie"
            type="text"
            placeholder="Realisateur"
            value={newMovie.director}
            onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
          />
          <input
            className="input-movie"
            type="number"
            placeholder="Annee"
            value={newMovie.year}
            onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
          />
          <input
            className="input-movie"
            type="text"
            placeholder="Genre"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          />
          <input
            className="input-movie"
            type="number"
            placeholder="Duree (min)"
            value={newMovie.duration}
            onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
          />
          <input
            className="input-movie"
            type="url"
            placeholder="Poster URL (optionnel)"
            value={newMovie.poster}
            onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })}
          />
          <textarea
            className="input-movie textarea-movie"
            rows={3}
            placeholder="Description (optionnelle)"
            value={newMovie.description}
            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
          />
          <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
            Ajouter
          </button>
        </form>

        <div className="controls">
          <input
            className="input-movie"
            type="text"
            placeholder="Rechercher un film..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="input-movie" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Tous les genres</option>
            {genres.map((genreOption) => (
              <option key={genreOption} value={genreOption}>
                {genreOption}
              </option>
            ))}
          </select>
          <select className="input-movie" value={sort} onChange={(e) => setSort(e.target.value as 'year' | 'year_asc' | '')}>
            <option value="">Sans tri</option>
            <option value="year">Plus recents</option>
            <option value="year_asc">Plus anciens</option>
          </select>
        </div>

        {movies.length === 0 ? (
          <p className="empty-state">Aucun film trouve.</p>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onDelete={handleDeleteMovie} onUpdate={handleUpdateMovie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
