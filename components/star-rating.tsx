'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = 'md' 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (newRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const displayRating = readonly ? rating : (hoverRating || rating);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} 
                     transition-all duration-200 ${readonly ? '' : 'hover:drop-shadow-sm'}`}
          whileHover={readonly ? {} : { scale: 1.1 }}
          whileTap={readonly ? {} : { scale: 0.95 }}
        >
          <Star
            className={`${sizeClasses[size]} transition-all duration-200 ${
              star <= displayRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-transparent text-slate-300 dark:text-slate-600'
            }`}
          />
        </motion.button>
      ))}
      {readonly && (
        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}