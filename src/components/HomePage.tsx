'use client';

import React from 'react';
import FeedbackForm from './forms/FeedbackForm';
import { Users, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="mb-14 text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            variants={item}
            className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-5"
          >
            <Users className="h-7 w-7 text-primary" />
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Connect Through Common Interests
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Share your passions and interests with us. It'll help us connect you with 
            like-minded people to foster collaboration, friendship, and growth through 
            shared experiences and knowledge.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary/10 mr-3">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Shared Passions</h3>
            </div>
            <p className="text-muted-foreground">
              Get matched with others who share your interests and goals. Form meaningful connections with people who understand and appreciate your passion.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-secondary/10 mr-3">
                <BookOpen className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg">Collaborative Growth</h3>
            </div>
            <p className="text-muted-foreground">
              Learn together, grow together. Joining others with similar interests creates opportunities for knowledge sharing, mutual support, and collective achievement.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-card rounded-lg shadow-lg border border-border p-6 md:p-8"
        >
          <h2 className="text-xl font-semibold mb-6 text-center">Share Your Interest</h2>
          <FeedbackForm />
        </motion.div>
      </div>
    </div>
  );
} 