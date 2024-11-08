import React from 'react';
import type { Movie } from '../types/tmdb';
import { Play, Info } from 'lucide-react';

interface Props {
  movie: Movie;
}

export default function Jumbotron({ movie }: Props) {
  return (
    <div className="relative h-[85vh] w-full">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 p-8 md:p-16 space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white">{movie.title}</h1>
        <p className="text-lg text-gray-200">{movie.overview}</p>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded hover:bg-gray-200 transition">
            <Play className="w-5 h-5" />
            Play
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-gray-500/70 text-white rounded hover:bg-gray-500/90 transition">
            <Info className="w-5 h-5" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}