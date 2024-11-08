import React, { useEffect, useState } from 'react';
import { X, Play } from 'lucide-react';
import type { MovieDetails } from '../types/tmdb';
import { getMovieDetails } from '../services/tmdb';

interface Props {
  movieId: number;
  onClose: () => void;
}

export default function MovieModal({ movieId, onClose }: Props) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieDetails(movieId);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return null;

  const trailer = movie.videos.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const handlePlay = () => {
    setShowPlayer(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {showPlayer ? (
          <div className="aspect-video w-full">
            <iframe
              src={`https://vidlink.pro/movie/${movie.id}`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            <div className="relative aspect-video">
              {trailer ? (
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
                  <p className="text-gray-400 mt-1">
                    {new Date(movie.release_date).getFullYear()} • {movie.runtime} min
                  </p>
                </div>
                <button
                  onClick={handlePlay}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  <Play className="w-5 h-5" />
                  Play Movie
                </button>
              </div>

              <p className="text-gray-200 text-lg leading-relaxed">{movie.overview}</p>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movie.credits.cast.slice(0, 8).map((actor) => (
                    <div key={actor.id} className="flex items-center gap-3">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{actor.name}</p>
                        <p className="text-gray-400 text-sm">{actor.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}