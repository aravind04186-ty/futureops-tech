import React from 'react';
import { TestimonialsSection } from '../home/TestimonialsSection';
import { Star, Award, CheckCircle } from 'lucide-react';

export const StudentReviewsPage: React.FC = () => {
  return (
    <div className="space-y-16 py-10 animate-fadeIn">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Alumni Rating: 4.9 / 5.0 (1,200+ Engineer Students)
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins">
            Student Reviews & Success Stories
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Read verified feedback from professionals who successfully transitioned from Non-IT, Technical Support, and Software Development into high-paid DevOps Engineers.
          </p>
        </div>
      </div>

      <TestimonialsSection />

    </div>
  );
};
