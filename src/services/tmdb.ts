import axios from 'axios';
import type { MovieResponse, MovieDetails, GenreResponse } from '../types/tmdb';

const API_KEY = '194d885d6be15594b97e2d1f3b2526be';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrending = () => 
  tmdb.get<MovieResponse>('/trending/movie/week');

export const getPopular = () => 
  tmdb.get<MovieResponse>('/movie/popular');

export const searchMovies = (query: string) =>
  tmdb.get<MovieResponse>('/search/movie', {
    params: { query },
  });

export const getMovieDetails = (movieId: number) =>
  tmdb.get<MovieDetails>(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos,credits',
    },
  });

export const getGenres = () =>
  tmdb.get<GenreResponse>('/genre/movie/list');

export const getMoviesByGenre = (genreId: number) =>
  tmdb.get<MovieResponse>('/discover/movie', {
    params: {
      with_genres: genreId,
    },
  });