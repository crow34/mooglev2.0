import React from 'react';
import type { Movie } from '../types/tmdb';
import MovieCard from './MovieCard';

interface Props {
  title: string;
  movies: Movie[];
  onSelectMovie: (movieId: number) => void;
}

export default function MovieRow({ title, movies, onSelectMovie }: Props) {
  const validMovies = movies.filter(movie => 
    movie && 
    typeof movie.id === 'number' && 
    typeof movie.title === 'string'
  );

  return (
    <div className="px-8 space-y-4">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {validMovies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onSelect={onSelectMovie}
          />
        ))}
      </div>
    </div>
  );
}