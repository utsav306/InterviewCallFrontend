"use client";

import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "@/components/search-bar";
import { MovieGrid } from "@/components/movie-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Film,
  Search,
  TrendingUp,
  Star,
  Award,
  Bell,
  User,
  Home,
  Tv,
  List,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RootState, AppDispatch } from "@/store/movie-store";
import {
  setActiveCategory,
  clearMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchAwardWinners,
} from "@/store/movie-store";

export default function MoviesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { activeCategory, currentView } = useSelector(
    (state: RootState) => state.movies,
  );

  const handleNavClick = (category: string) => {
    dispatch(setActiveCategory(category));
    if (category === "home") {
      dispatch(clearMovies());
    }
  };

  const handleCategoryClick = (category: string) => {
    dispatch(setActiveCategory(category));
    switch (category) {
      case "trending":
        dispatch(fetchTrendingMovies());
        break;
      case "top-rated":
        dispatch(fetchTopRatedMovies());
        break;
      case "award-winners":
        dispatch(fetchAwardWinners());
        break;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case "trending":
        return "Trending Now";
      case "top-rated":
        return "Top Rated Movies";
      case "award-winners":
        return "Award Winners";
      case "search":
        return "Search Results";
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black">
      {/* Netflix-style Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-white/95 to-white/80 dark:from-black/80 dark:to-transparent backdrop-blur-sm border-b border-gray-200/50 dark:border-transparent"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavClick("home")}
              >
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center shadow-lg">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  CineSearch
                </span>
              </motion.div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => handleNavClick("home")}
                  className={`flex items-center space-x-2 transition-colors font-medium px-3 py-2 rounded-md ${
                    activeCategory === "home"
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                ></button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 light-hero-bg dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12 mt-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Unlimited movies,
              <br />
              <span className="gradient-text">TV shows & more</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Search anywhere. Discover your next favorite movie or series with
              our powerful search engine.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button className="netflix-button text-lg px-8 py-4">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="netflix-secondary-button text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="py-8 bg-gray-50 dark:bg-transparent"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 mb-8">
            <motion.button
              onClick={() => handleCategoryClick("trending")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full backdrop-blur-sm transition-all shadow-md border ${
                activeCategory === "trending"
                  ? "bg-primary text-white border-primary shadow-primary/25"
                  : "bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp
                className={`w-5 h-5 ${
                  activeCategory === "trending"
                    ? "text-white"
                    : "text-green-500"
                }`}
              />
              <span className="font-medium">Trending Now</span>
            </motion.button>

            <motion.button
              onClick={() => handleCategoryClick("top-rated")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full backdrop-blur-sm transition-all shadow-md border ${
                activeCategory === "top-rated"
                  ? "bg-primary text-white border-primary shadow-primary/25"
                  : "bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star
                className={`w-5 h-5 ${
                  activeCategory === "top-rated"
                    ? "text-white"
                    : "text-yellow-500"
                }`}
              />
              <span className="font-medium">Top Rated</span>
            </motion.button>

            <motion.button
              onClick={() => handleCategoryClick("award-winners")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full backdrop-blur-sm transition-all shadow-md border ${
                activeCategory === "award-winners"
                  ? "bg-primary text-white border-primary shadow-primary/25"
                  : "bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Award
                className={`w-5 h-5 ${
                  activeCategory === "award-winners"
                    ? "text-white"
                    : "text-purple-500"
                }`}
              />
              <span className="font-medium">Award Winners</span>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Content Section with Dynamic Title */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="container mx-auto px-4 pb-16"
      >
        {getViewTitle() && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {getViewTitle()}
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full"></div>
          </motion.div>
        )}
        <MovieGrid />
      </motion.main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-black/50 border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shadow-md">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  CineSearch
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your ultimate destination for discovering amazing movies and TV
                shows.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
                Browse
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>
                  <button
                    onClick={() => handleNavClick("movies")}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Movies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick("tv-shows")}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    TV Shows
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Documentaries
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Kids
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
                Support
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
                Connect
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 CineSearch. All rights reserved. Built with Next.js and
              shadcn/ui.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
