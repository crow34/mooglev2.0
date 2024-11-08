import React, { useEffect, useState } from 'react';
import type { Movie, Genre } from './types/tmdb';
import { getTrending, getPopular, searchMovies, getGenres, getMoviesByGenre } from './services/tmdb';
import Navbar from './components/Navbar';
import Jumbotron from './components/Jumbotron';
import MovieRow from './components/MovieRow';
import MovieModal from './components/MovieModal';
import GenreBreadcrumb from './components/GenreBreadcrumb';

function App() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [trendingRes, popularRes, genresRes] = await Promise.all([
          getTrending(),
          getPopular(),
          getGenres(),
        ]);

        setTrendingMovies(trendingRes.data.results);
        setPopularMovies(popularRes.data.results);
        setFeaturedMovie(trendingRes.data.results[0]);
        setGenres(genresRes.data.genres);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (selectedGenre) {
        try {
          const response = await getMoviesByGenre(selectedGenre.id);
          setGenreMovies(response.data.results);
        } catch (error) {
          console.error('Error fetching genre movies:', error);
        }
      }
    };

    fetchGenreMovies();
  }, [selectedGenre]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await searchMovies(query);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleGenreSelect = (genre: Genre | null) => {
    setSelectedGenre(genre);
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onSearch={handleSearch} />
      
      {featuredMovie && !searchResults.length && !selectedGenre && (
        <div onClick={() => setSelectedMovieId(featuredMovie.id)} className="cursor-pointer">
          <Jumbotron movie={featuredMovie} />
        </div>
      )}

      <div className="pt-20">
        <GenreBreadcrumb
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={handleGenreSelect}
        />
        
        <div className="space-y-12 py-12">
          {searchResults.length > 0 ? (
            <MovieRow 
              title="Search Results" 
              movies={searchResults} 
              onSelectMovie={setSelectedMovieId}
            />
          ) : selectedGenre ? (
            <MovieRow 
              title={`${selectedGenre.name} Movies`}
              movies={genreMovies}
              onSelectMovie={setSelectedMovieId}
            />
          ) : (
            <>
              <MovieRow 
                title="Trending Now" 
                movies={trendingMovies} 
                onSelectMovie={setSelectedMovieId}
              />
              <MovieRow 
                title="Popular on Netflix" 
                movies={popularMovies} 
                onSelectMovie={setSelectedMovieId}
              />
            </>
          )}
        </div>
      </div>

      {selectedMovieId && (
        <MovieModal 
          movieId={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}
    </div>
  );
}

export default App;