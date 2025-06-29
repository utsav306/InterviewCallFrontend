"use client";

import { Movie } from "@/types/movie";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Film, Star, Play, Info, Plus, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export function MovieCard({ movie, index }: MovieCardProps) {
  const isValidPoster = movie.Poster !== "N/A" && movie.Poster;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="group h-full"
    >
      <Card className="overflow-hidden h-full bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 movie-card-hover group-hover:border-primary/50 dark:group-hover:border-gray-600 transition-all duration-300 backdrop-blur-sm shadow-lg">
        <div className="relative aspect-[2/3] overflow-hidden">
          {/* Poster Image */}
          {isValidPoster ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
              <Film className="w-16 h-16 text-gray-400 dark:text-gray-600" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="capitalize bg-white/90 dark:bg-black/70 text-gray-900 dark:text-white border-0 backdrop-blur-sm text-xs shadow-md"
            >
              {movie.Type}
            </Badge>
          </div>

          {/* Year Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="outline"
              className="bg-white/90 dark:bg-black/70 text-gray-900 dark:text-white border-gray-300 dark:border-white/30 backdrop-blur-sm text-xs shadow-md"
            >
              {movie.Year}
            </Badge>
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link
              href={`/movies/${movie.imdbID}`}
              className="w-full h-full flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/30"
              >
                <Play className="w-8 h-8 text-white fill-white" />
              </motion.div>
            </Link>
          </div>

          {/* Bottom Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-gray-200 rounded-full w-8 h-8 p-0 shadow-md"
                >
                  <Play className="w-4 h-4 fill-black" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-white/50 text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-white/50 text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"
                >
                  <ThumbsUp className="w-4 h-4" />
                </Button>
              </div>
              <Link href={`/movies/${movie.imdbID}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-white/50 text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"
                >
                  <Info className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300 text-gray-900 dark:text-white">
              {movie.Title}
            </h3>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{movie.Year}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
