'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Star, 
  Users, 
  Film,
  Award,
  Globe,
  DollarSign,
  Play,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

import { RootState, AppDispatch } from '@/store/movie-store';
import { fetchMovieDetails, clearCurrentMovie, setUserRating } from '@/store/movie-store';
import { StarRating } from '@/components/star-rating';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { currentMovie, loading, error, userRatings } = useSelector((state: RootState) => state.movies);

  const movieId = params.id as string;
  const userRating = userRatings[movieId] || 0;

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId));
    }

    return () => {
      dispatch(clearCurrentMovie());
    };
  }, [movieId, dispatch]);

  const handleRating = (rating: number) => {
    dispatch(setUserRating({ movieId, rating }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="glass-effect border border-destructive/20 rounded-2xl p-8 max-w-md mx-auto">
              <Film className="w-12 h-12 mx-auto text-destructive mb-4" />
              <h3 className="text-xl font-bold text-destructive mb-2">
                Error Loading Movie
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                {error}
              </p>
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentMovie) {
    return null;
  }

  const isValidPoster = currentMovie.Poster !== 'N/A' && currentMovie.Poster;
  const imdbRating = parseFloat(currentMovie.imdbRating) || 0;
  const hasBoxOffice = currentMovie.BoxOffice && currentMovie.BoxOffice !== 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/5 to-orange-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-effect border-b border-white/20 dark:border-white/10 sticky top-0 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="hover:bg-primary/10 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75" />
                  <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <Film className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="font-bold gradient-text text-lg">
                  CineSearch
                </span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
          >
            {/* Poster */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative aspect-[2/3] max-w-sm mx-auto lg:mx-0 group"
              >
                {isValidPoster ? (
                  <Image
                    src={currentMovie.Poster}
                    alt={currentMovie.Title}
                    fill
                    className="object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 rounded-2xl">
                    <Film className="w-20 h-20 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </motion.div>
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2 text-white space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-6xl font-bold leading-tight"
              >
                {currentMovie.Title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">{currentMovie.Year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg">{currentMovie.Runtime}</span>
                </div>
                <Badge className="bg-primary/90 hover:bg-primary text-lg px-4 py-2">
                  {currentMovie.Rated}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white text-lg px-4 py-2">
                  {currentMovie.Type}
                </Badge>
              </motion.div>

              {/* Ratings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-white/70">IMDb Rating</h3>
                  <div className="flex items-center space-x-3">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{currentMovie.imdbRating}</span>
                    <span className="text-white/70">/10</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-white/70">Your Rating</h3>
                  <StarRating
                    rating={userRating}
                    onRatingChange={handleRating}
                    size="lg"
                  />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8">
                  <Play className="w-5 h-5 mr-2 fill-white" />
                  Watch Trailer
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Favorites
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Watchlist
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </motion.div>

              {/* Genres */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <h3 className="text-sm font-medium text-white/70">Genres</h3>
                <div className="flex flex-wrap gap-3">
                  {currentMovie.Genre.split(', ').map((genre) => (
                    <Badge key={genre} variant="secondary" className="bg-white/10 text-white border-0 px-4 py-2 text-sm">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Plot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-3"
              >
                <h3 className="text-xl font-bold">Plot</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  {currentMovie.Plot}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Cast & Crew */}
          <Card className="glass-effect border-white/20 dark:border-white/10 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                <Users className="w-6 h-6 mr-3" />
                Cast & Crew
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Director</h4>
                  <p className="text-muted-foreground">{currentMovie.Director}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-bold text-lg mb-2">Writer</h4>
                  <p className="text-muted-foreground">{currentMovie.Writer}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-bold text-lg mb-2">Actors</h4>
                  <p className="text-muted-foreground">{currentMovie.Actors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="glass-effect border-white/20 dark:border-white/10 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                <Globe className="w-6 h-6 mr-3" />
                Additional Information
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Release Date</h4>
                  <p className="text-muted-foreground">{currentMovie.Released}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-bold text-lg mb-2">Language</h4>
                  <p className="text-muted-foreground">{currentMovie.Language}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-bold text-lg mb-2">Country</h4>
                  <p className="text-muted-foreground">{currentMovie.Country}</p>
                </div>
                {hasBoxOffice && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-bold text-lg mb-2 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2" />
                        Box Office
                      </h4>
                      <p className="text-muted-foreground">{currentMovie.BoxOffice}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Awards */}
        {currentMovie.Awards && currentMovie.Awards !== 'N/A' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <Card className="glass-effect border-white/20 dark:border-white/10 rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text">
                  <Award className="w-6 h-6 mr-3" />
                  Awards & Recognition
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {currentMovie.Awards}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}