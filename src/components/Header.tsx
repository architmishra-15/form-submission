'use client';

import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Users, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-6 w-6 text-primary" />
            <Users className="h-5 w-5 text-accent" />
          </div>
          <h1 className="text-lg font-bold text-foreground">InterestConnect</h1>
        </motion.div>
        
        <motion.div 
          className="flex items-center"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
}