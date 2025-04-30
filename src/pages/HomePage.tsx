import React from 'react';
import FeedbackForm from '../components/forms/FeedbackForm';
import { MessageSquare } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
      <div className="max-w-xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">We Value Your Feedback</h1>
          <p className="text-muted-foreground leading-relaxed">
            Help us improve our services by sharing your thoughts and suggestions. 
            Your feedback is important to us!
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow-lg border border-border p-6 md:p-8">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;