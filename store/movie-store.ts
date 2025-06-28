import { configureStore, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MovieAPI } from '@/lib/movie-api';
import { Movie, MovieDetails, MovieState } from '@/types/movie';

// Async thunks
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (params: { query: string; page?: number; year?: string; type?: string }) => {
    const { query, page = 1, year, type } = params;
    const response = await MovieAPI.searchMovies(query, page, year, type);
    return response;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID: string) => {
    const response = await MovieAPI.getMovieDetails(imdbID);
    return response;
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrendingMovies',
  async () => {
    const trendingQueries = ['Marvel', 'Batman', 'Star Wars', 'Harry Potter', 'Fast'];
    const randomQuery = trendingQueries[Math.floor(Math.random() * trendingQueries.length)];
    const response = await MovieAPI.searchMovies(randomQuery, 1);
    return response;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async () => {
    const topRatedQueries = ['Godfather', 'Shawshank', 'Dark Knight', 'Pulp Fiction', 'Inception'];
    const randomQuery = topRatedQueries[Math.floor(Math.random() * topRatedQueries.length)];
    const response = await MovieAPI.searchMovies(randomQuery, 1);
    return response;
  }
);

export const fetchAwardWinners = createAsyncThunk(
  'movies/fetchAwardWinners',
  async () => {
    const awardQueries = ['Oscar', 'Academy', 'Golden Globe', 'Cannes', 'Emmy'];
    const randomQuery = awardQueries[Math.floor(Math.random() * awardQueries.length)];
    const response = await MovieAPI.searchMovies(randomQuery, 1);
    return response;
  }
);

// Load user ratings from localStorage
const loadUserRatings = (): Record<string, number> => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('movieRatings');
    return saved ? JSON.parse(saved) : {};
  }
  return {};
};

// Save user ratings to localStorage
const saveUserRatings = (ratings: Record<string, number>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('movieRatings', JSON.stringify(ratings));
  }
};

const initialState: MovieState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,
  searchQuery: '',
  totalResults: 0,
  currentPage: 1,
  filters: {
    year: '',
    type: 'all',
  },
  userRatings: loadUserRatings(),
  activeCategory: 'home',
  currentView: 'home',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentView = action.payload ? 'search' : 'home';
    },
    setFilters: (state, action: PayloadAction<{ year?: string; type?: string }>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
    setUserRating: (state, action: PayloadAction<{ movieId: string; rating: number }>) => {
      const { movieId, rating } = action.payload;
      state.userRatings[movieId] = rating;
      saveUserRatings(state.userRatings);
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
      state.currentView = action.payload;
      if (action.payload === 'home') {
        state.searchQuery = '';
        state.movies = [];
      }
    },
    clearMovies: (state) => {
      state.movies = [];
      state.searchQuery = '';
      state.totalResults = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults) || 0;
        state.currentView = 'search';
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search movies';
        state.movies = [];
        state.totalResults = 0;
      })
      // Fetch movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie details';
        state.currentMovie = null;
      })
      // Trending movies
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults) || 0;
        state.activeCategory = 'trending';
        state.currentView = 'trending';
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trending movies';
      })
      // Top rated movies
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults) || 0;
        state.activeCategory = 'top-rated';
        state.currentView = 'top-rated';
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch top rated movies';
      })
      // Award winners
      .addCase(fetchAwardWinners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAwardWinners.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults) || 0;
        state.activeCategory = 'award-winners';
        state.currentView = 'award-winners';
      })
      .addCase(fetchAwardWinners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch award winners';
      });
  },
});

export const { 
  setSearchQuery, 
  setFilters, 
  setCurrentPage, 
  clearError, 
  clearCurrentMovie,
  setUserRating,
  setActiveCategory,
  clearMovies
} = movieSlice.actions;

export const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;