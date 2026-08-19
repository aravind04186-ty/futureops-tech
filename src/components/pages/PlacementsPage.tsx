import React from 'react';
import { PlacementPartners } from '../home/PlacementPartners';
import { Briefcase, TrendingUp, Award, CheckCircle2, FileText, UserCheck } from 'lucide-react';

export const PlacementsPage: React.FC = () => {
  return (
    <div className="space-y-16 py-10 animate-fadeIn">
      
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Dedicated Placement Cell & Corporate Drives
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins">
            98.4% Verified Career Placement Track Record
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Placement opportunities are available across major IT hubs, including Bengaluru, Hyderabad, Chennai, Mumbai, and Pune. We don't just teach code—we guarantee comprehensive career support, from ATS resume rebuilding to technical mock interviews with recruiters at leading enterprise tech companies.
          </p>
        </div>
      </div>

      <PlacementPartners />

    </div>
  );
};
