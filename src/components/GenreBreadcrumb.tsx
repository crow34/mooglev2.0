import React from 'react';
import type { Genre } from '../types/tmdb';
import { ChevronRight } from 'lucide-react';

interface Props {
  genres: Genre[];
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre | null) => void;
}

export default function GenreBreadcrumb({ genres, selectedGenre, onSelectGenre }: Props) {
  return (
    <div className="px-8 py-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
      <button
        onClick={() => onSelectGenre(null)}
        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
          !selectedGenre
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        All Movies
      </button>

      {selectedGenre && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm">
            {selectedGenre.name}
          </span>
        </>
      )}

      <div className="flex items-center gap-2 ml-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedGenre?.id === genre.id
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}