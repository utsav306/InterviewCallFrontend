'use client';

import { motion } from 'framer-motion';
import { Film, Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        {/* Animated Icon */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 rounded-full opacity-20 blur-xl" />
            <div className="relative w-full h-full bg-gradient-to-r from-primary to-red-600 rounded-full flex items-center justify-center">
              <Film className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold gradient-text"
          >
            Searching Movies
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400"
          >
            Finding the perfect matches for you<span className="loading-dots"></span>
          </motion.p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-red-600 rounded-full"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}