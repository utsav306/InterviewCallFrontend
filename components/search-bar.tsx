'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RootState, AppDispatch } from '@/store/movie-store';
import { setSearchQuery, setFilters, searchMovies } from '@/store/movie-store';
import { useDebounce } from '@/hooks/use-debounce';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, filters } = useSelector((state: RootState) => state.movies);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(localQuery, 500);

  useEffect(() => {
    if (debouncedQuery.trim() && debouncedQuery !== searchQuery) {
      dispatch(setSearchQuery(debouncedQuery));
      dispatch(searchMovies({ 
        query: debouncedQuery, 
        page: 1, 
        year: filters.year,
        type: filters.type
      }));
    }
  }, [debouncedQuery, dispatch, searchQuery, filters]);

  const handleClearSearch = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { [filterType]: value };
    dispatch(setFilters(newFilters));
    
    if (searchQuery.trim()) {
      dispatch(searchMovies({ 
        query: searchQuery, 
        page: 1, 
        year: filterType === 'year' ? value : filters.year,
        type: filterType === 'type' ? value : filters.type
      }));
    }
  };

  const clearFilters = () => {
    dispatch(setFilters({ year: '', type: 'all' }));
    if (searchQuery.trim()) {
      dispatch(searchMovies({ query: searchQuery, page: 1, year: '', type: 'all' }));
    }
  };

  const activeFiltersCount = [filters.year, filters.type !== 'all' ? filters.type : ''].filter(Boolean).length;

  const popularSearches = ['Inception', 'The Dark Knight', 'Interstellar', 'Pulp Fiction', 'The Matrix'];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Search Bar */}
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className={`relative glass-effect rounded-lg overflow-hidden transition-all duration-300 ${
          isFocused ? 'ring-2 ring-primary/50 shadow-2xl shadow-primary/20' : 'shadow-xl'
        }`}>
          <div className="relative flex items-center">
            <div className="absolute left-4 z-10">
              <Search className={`h-5 w-5 transition-all duration-300 ${
                isFocused ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
              }`} />
            </div>
            
            <Input
              placeholder="Search for movies, TV shows, actors..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-12 pr-20 h-14 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
            />
            
            <div className="absolute right-3 flex items-center space-x-2">
              <AnimatePresence>
                {localQuery && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearSearch}
                      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-8 w-8 p-0 rounded-full transition-all duration-300 ${
                  showFilters ? 'bg-primary/20 text-primary' : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                <Filter className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <div className="h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{activeFiltersCount}</span>
                    </div>
                  </motion.div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Popular Searches */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-3 justify-center"
      >
        <span className="text-sm text-gray-600 dark:text-gray-400">Popular:</span>
        {popularSearches.map((search, index) => (
          <motion.button
            key={search}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => setLocalQuery(search)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-full transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-white/10"
          >
            {search}
          </motion.button>
        ))}
      </motion.div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="glass-effect rounded-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    Release Year
                    {filters.year && (
                      <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
                        {filters.year}
                      </Badge>
                    )}
                  </label>
                  <Select value={filters.year} onValueChange={(value) => handleFilterChange('year', value)}>
                    <SelectTrigger className="h-12 bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                      <SelectValue placeholder="Any year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="">Any year</SelectItem>
                      {Array.from({ length: 30 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    Content Type
                    {filters.type !== 'all' && (
                      <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30 capitalize">
                        {filters.type}
                      </Badge>
                    )}
                  </label>
                  <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                    <SelectTrigger className="h-12 bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="movie">Movies</SelectItem>
                      <SelectItem value="series">TV Series</SelectItem>
                      <SelectItem value="episode">Episodes</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}