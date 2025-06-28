const OMDB_API_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export class MovieAPI {
  private static buildUrl(params: Record<string, string>): string {
    if (!API_KEY) {
      throw new Error('OMDB API key is not configured. Please set NEXT_PUBLIC_OMDB_API_KEY in your .env.local file.');
    }
    
    const searchParams = new URLSearchParams({
      apikey: API_KEY,
      ...params,
    });
    return `${OMDB_API_URL}?${searchParams.toString()}`;
  }

  static async searchMovies(query: string, page: number = 1, year?: string, type?: string) {
    try {
      const params: Record<string, string> = {
        s: query,
        page: page.toString(),
      };

      if (year) params.y = year;
      if (type && type !== 'all') params.type = type;

      const response = await fetch(this.buildUrl(params));
      const data = await response.json();

      if (data.Response === 'False') {
        // Handle "Movie not found!" as a valid empty result instead of an error
        if (data.Error === 'Movie not found!') {
          return {
            Search: [],
            totalResults: '0',
            Response: 'True'
          };
        }
        throw new Error(data.Error || 'Failed to fetch movies');
      }

      return data;
    } catch (error) {
      console.error('Search movies error:', error);
      throw error;
    }
  }

  static async getMovieDetails(imdbID: string) {
    try {
      const response = await fetch(this.buildUrl({ i: imdbID }));
      const data = await response.json();

      if (data.Response === 'False') {
        throw new Error(data.Error || 'Failed to fetch movie details');
      }

      return data;
    } catch (error) {
      console.error('Get movie details error:', error);
      throw error;
    }
  }

  static async getMovieSuggestions(query: string) {
    try {
      const response = await fetch(this.buildUrl({ s: query, page: '1' }));
      const data = await response.json();

      if (data.Response === 'False') {
        return [];
      }

      return data.Search?.slice(0, 5) || [];
    } catch (error) {
      console.error('Get movie suggestions error:', error);
      return [];
    }
  }
}