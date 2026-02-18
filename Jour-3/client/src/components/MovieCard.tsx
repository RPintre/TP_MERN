import { useState } from 'react';
import type { IMovie } from '../models/IMovie';

type MovieCardProps = {
  movie: IMovie;
  onDelete: (id: string) => void;
  onUpdate: (id: string, payload: { title: string; description: string }) => Promise<void>;
};

const FALLBACK_POSTER =
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80';

function MovieCard({ movie, onDelete, onUpdate }: MovieCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(movie.title);
  const [descriptionDraft, setDescriptionDraft] = useState(movie.description ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(movie._id, {
        title: titleDraft.trim(),
        description: descriptionDraft.trim(),
      });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <article className="movie-card">
      <img
        className="movie-poster"
        src={movie.poster || FALLBACK_POSTER}
        alt={`Affiche ${movie.title}`}
      />
      <div className="movie-body">
        {isEditing ? (
          <div className="movie-edit">
            <input
              className="input-movie"
              value={titleDraft}
              onChange={(e) => setTitleDraft(e.target.value)}
              placeholder="Titre"
            />
            <textarea
              className="input-movie textarea-movie"
              value={descriptionDraft}
              onChange={(e) => setDescriptionDraft(e.target.value)}
              placeholder="Description"
              rows={4}
            />
          </div>
        ) : (
          <>
            <h3>{movie.title}</h3>
            <p className="movie-meta">
              {movie.year} • {movie.genre}
            </p>
            <p className="movie-meta">
              Realisateur: {movie.director} • {movie.duration} min
            </p>
            <p className="movie-description">{movie.description || 'Aucune description.'}</p>
          </>
        )}
      </div>
      <div className="movie-actions">
        {isEditing ? (
          <>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving || !titleDraft.trim()}
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)} disabled={isSaving}>
              Annuler
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
              Editer
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(movie._id)}>
              Supprimer
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
