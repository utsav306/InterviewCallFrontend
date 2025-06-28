'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/movie-store';
import { MovieCard } from './movie-card';
import { LoadingSpinner } from './loading-spinner';
import { motion } from 'framer-motion';
import { Film, Search, TrendingUp, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function MovieGrid() {
  const { movies, loading, error, searchQuery, currentView, activeCategory } = useSelector((state: RootState) => state.movies);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="glass-effect border border-red-200 dark:border-red-500/20 rounded-lg p-8 max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-2">
            Error Loading Content
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {error}
          </p>
          <Button variant="outline" className="border-red-300 dark:border-red-500/50 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </motion.div>
    );
  }

  // Show welcome screen for home view when no search is active
  if (currentView === 'home' && !searchQuery.trim()) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative mx-auto w-32 h-32"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-red-600/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-full h-full bg-gradient-to-r from-primary to-red-600 rounded-full flex items-center justify-center shadow-2xl">
              <Film className="w-16 h-16 text-white" />
            </div>
          </motion.div>
          
          {/* Main Content */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold gradient-text"
            >
              Welcome to CineSearch
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
            >
              Search for your favorite movies, TV series, and episodes or explore our curated collections. 
              Use the search bar above or click on the category buttons to get started.
            </motion.p>
          </div>
          
          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              { icon: TrendingUp, title: "Trending", desc: "Discover what's popular", color: "text-green-500" },
              { icon: Star, title: "Top Rated", desc: "Find critically acclaimed", color: "text-yellow-500" },
              { icon: Award, title: "Award Winners", desc: "Explore award-winning", color: "text-purple-500" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass-effect rounded-lg p-6 text-center hover:scale-105 transition-all duration-300"
              >
                <feature.icon className={`w-8 h-8 mx-auto mb-3 ${feature.color}`} />
                <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Show empty state for categories or search with no results
  if (movies.length === 0) {
    const getEmptyStateContent = () => {
      switch (currentView) {
        case 'trending':
          return {
            title: 'No Trending Movies Found',
            description: 'Unable to load trending movies at the moment. Please try again later.',
            icon: TrendingUp
          };
        case 'top-rated':
          return {
            title: 'No Top Rated Movies Found',
            description: 'Unable to load top rated movies at the moment. Please try again later.',
            icon: Star
          };
        case 'award-winners':
          return {
            title: 'No Award Winners Found',
            description: 'Unable to load award-winning movies at the moment. Please try again later.',
            icon: Award
          };
        case 'search':
          return {
            title: 'No Results Found',
            description: `We couldn't find any movies matching "${searchQuery}". Try adjusting your search terms or filters.`,
            icon: Search
          };
        default:
          return {
            title: 'No Content Available',
            description: 'No content available for this section.',
            icon: Film
          };
      }
    };

    const emptyState = getEmptyStateContent();
    const IconComponent = emptyState.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="glass-effect rounded-lg p-8 max-w-md mx-auto">
          <div className="mb-6">
            <IconComponent className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {emptyState.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {emptyState.description}
          </p>
          {currentView === 'search' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">Try different keywords</Badge>
              <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">Check spelling</Badge>
              <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">Use filters</Badge>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="text-sm bg-primary/20 text-primary border-primary/30">
            {movies.length} {movies.length === 1 ? 'result' : 'results'}
          </Badge>
        </div>
      </motion.div>
      
      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={movie.imdbID} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
}