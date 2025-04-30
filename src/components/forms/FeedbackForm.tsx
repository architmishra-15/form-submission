'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormData as CustomFormData } from '../../types';
import { toast } from 'sonner';
import { Send, Loader2, CheckCircle2, Sparkles, Search, X } from 'lucide-react';
import { submitFeedback } from '../../services/feedbackService';
import categories from '../../data/categories.json';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<CustomFormData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [otherCategory, setOtherCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CustomFormData>();
  
  // Watch for category changes
  const watchedCategory = watch('category');
  
  // Update selected category when it changes
  useEffect(() => {
    setSelectedCategory(watchedCategory || '');
  }, [watchedCategory]);
  
  // Set custom category when "Other" is selected
  useEffect(() => {
    if (selectedCategory === 'Other' && otherCategory) {
      setValue('customCategory', otherCategory);
    } else {
      setValue('customCategory', '');
    }
  }, [selectedCategory, otherCategory, setValue]);
  
  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories.categories;
    
    return categories.categories.filter(category => 
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  const onSubmit = async (data: CustomFormData) => {
    setIsSubmitting(true);
    
    // If "Other" category is selected, use the customCategory field
    if (data.category === 'Other' && data.customCategory) {
      data.category = data.customCategory;
    }
    
    try {
      await submitFeedback(data);
      setSubmittedData(data);
      setIsSuccess(true);
      toast.success('Your interest has been submitted successfully!');
      reset();
      setOtherCategory('');
      setSearchTerm('');
    } catch (error) {
      console.error('Error submitting interest:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSuccess) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Background with gradient and animation */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-800 dark:from-indigo-950 dark:via-purple-950 dark:to-fuchsia-950"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              background: [
                'linear-gradient(to bottom right, rgb(49, 46, 129), rgb(88, 28, 135), rgb(134, 25, 143))',
                'linear-gradient(to bottom right, rgb(67, 56, 202), rgb(109, 40, 217), rgb(147, 51, 234))',
                'linear-gradient(to bottom right, rgb(79, 70, 229), rgb(124, 58, 237), rgb(167, 139, 250))',
                'linear-gradient(to bottom right, rgb(49, 46, 129), rgb(88, 28, 135), rgb(134, 25, 143))'
              ]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                initial={{ 
                  x: `${Math.random() * 100}%`, 
                  y: `${Math.random() * 100}%`,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: Math.random() * 0.5 + 0.3
                }}
                animate={{ 
                  y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  opacity: [0.2, 0.8, 0.2]
                }}
                transition={{ 
                  duration: Math.random() * 20 + 10, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
                style={{
                  width: `${Math.random() * 30 + 10}px`,
                  height: `${Math.random() * 30 + 10}px`,
                }}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-lg w-full mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                damping: 8, 
                stiffness: 100, 
                delay: 0.2 
              }}
              className="mb-8 mx-auto"
            >
              <div className="relative inline-block">
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-80"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear"
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <motion.h2 
                className="text-4xl font-bold text-white mb-4 tracking-tight"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                Thank You!
              </motion.h2>
              
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                  className="mr-1"
                >
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                </motion.div>
                <p className="text-xl font-medium text-white">
                  We've received your interest
                </p>
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [5, -5, 5]
                  }}
                  transition={{ 
                    duration: 2.2, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                  className="ml-1"
                >
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-12 p-6 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <motion.p 
                className="text-lg text-white/90"
                animate={{ y: [0, 3, 0] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                You've selected <span className="font-bold text-white">{submittedData?.category}</span> as your interest. We'll connect you with people who share the same passion!
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1.2,
                type: "spring",
                stiffness: 300,
                damping: 15
              }}
            >
              <motion.button
                onClick={() => setIsSuccess(false)}
                className="px-8 py-4 rounded-full text-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{ 
                  y: [0, -6, 0],
                  boxShadow: [
                    "0 10px 15px -3px rgba(99, 102, 241, 0.3)",
                    "0 15px 20px -3px rgba(99, 102, 241, 0.4)",
                    "0 10px 15px -3px rgba(99, 102, 241, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                Submit Another Interest
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="animate-fadeIn">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">Your Name</label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              {...register('name', { 
                required: 'Name is required',
                maxLength: {
                  value: 100,
                  message: 'Name cannot exceed 100 characters'
                }
              })}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          
          <div>
            <span className="form-label">Your Primary Interest/Passion</span>
            <p className="text-sm text-muted-foreground mb-3">
              Select the field that most interests you for potential collaboration with like-minded people
            </p>
            
            {/* Search bar for categories */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for an interest category..."
                className="form-input pl-10 pr-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            
            <div className="max-h-60 overflow-y-auto pr-2 rounded-md border border-border">
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 p-4">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="radio"
                        value={category}
                        className="h-4 w-4 text-primary border-border focus:ring-primary"
                        {...register('category', { required: 'Please select an interest category' })}
                      />
                      <label 
                        htmlFor={`category-${category}`} 
                        className="ml-3 block text-sm text-foreground cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-4 text-center text-muted-foreground">
                    No matching categories found
                  </div>
                )}
              </div>
            </div>
            
            {errors.category && <p className="form-error mt-2">{errors.category.message}</p>}
            
            <AnimatePresence>
              {selectedCategory === 'Other' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <label htmlFor="otherCategory" className="form-label">Please specify your interest</label>
                  <input
                    id="otherCategory"
                    type="text"
                    className="form-input"
                    placeholder="Enter your specific interest or passion"
                    value={otherCategory}
                    onChange={(e) => setOtherCategory(e.target.value)}
                    required={selectedCategory === 'Other'}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <label htmlFor="suggestions" className="form-label">Why are you interested in this field?</label>
            <textarea
              id="suggestions"
              rows={5}
              className="form-input resize-none"
              placeholder="Share a bit about your passion for this field and what you hope to learn or contribute..."
              {...register('suggestions', {
                maxLength: {
                  value: 1000,
                  message: 'Response cannot exceed 1000 characters'
                }
              })}
            />
            {errors.suggestions && <p className="form-error">{errors.suggestions.message}</p>}
          </div>
          
          <div>
            <motion.button
              type="submit"
              disabled={isSubmitting || (selectedCategory === 'Other' && !otherCategory)}
              className="button button-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Interest
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}