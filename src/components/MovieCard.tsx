import React from 'react';
import type { Movie } from '../types/tmdb';
import { Calendar, Star } from 'lucide-react';

interface Props {
  movie: Movie;
  onSelect: (movieId: number) => void;
}

export default function MovieCard({ movie, onSelect }: Props) {
  // Ensure we have valid data before rendering
  if (!movie || typeof movie.id !== 'number') {
    return null;
  }

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : null;

  const rating = typeof movie.vote_average === 'number' 
    ? movie.vote_average.toFixed(1) 
    : null;

  return (
    <div 
      className="relative group cursor-pointer"
      onClick={() => onSelect(movie.id)}
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full rounded-md transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="aspect-[2/3] bg-zinc-800 rounded-md flex items-center justify-center">
          <span className="text-gray-400 text-center p-2">{movie.title}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-white font-semibold">{movie.title}</h3>
          <div className="flex items-center justify-center gap-3 mt-2 text-gray-300 text-sm">
            {releaseYear && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{releaseYear}</span>
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}