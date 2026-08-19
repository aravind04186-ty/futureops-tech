import React, { useState } from 'react';
import { studentReviewsData } from '../../data/reviewsData';
import { Star, Quote, TrendingUp, CheckCircle, Play } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [filterRole, setFilterRole] = useState<'All' | 'Non-IT' | 'SysAdmin' | 'Developer'>('All');

  const filteredReviews = studentReviewsData.filter(r => {
    if (filterRole === 'All') return true;
    if (filterRole === 'Non-IT') return r.previousRole.includes('Non-IT') || r.previousRole.includes('Manual');
    if (filterRole === 'SysAdmin') return r.previousRole.includes('Linux') || r.previousRole.includes('Support');
    if (filterRole === 'Developer') return r.previousRole.includes('Developer') || r.previousRole.includes('Fresher');
    return true;
  });

  return (
    <section className="py-20 bg-slate-900/60 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Verified Student Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-poppins">
            Real Career Transitions & Salary Hikes
          </h2>
          <p className="text-sm text-slate-300">
            Read how our alumni transitioned from Non-IT, System Admin, and Developer roles into high-paying DevOps positions.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['All', 'Non-IT', 'SysAdmin', 'Developer'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterRole(f as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                filterRole === f
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-md glow-cyan'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {f === 'All' ? 'All Alumni Reviews' : `${f} Background`}
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-lg group"
            >
              <div className="space-y-4">
                
                {/* Header Rating & Hike */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +{rev.hikePercent}% Hike
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{rev.testimonial}"
                </p>

                {/* Transition Flow Badge */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                  <div className="text-slate-400">Previous: <span className="text-slate-200 font-medium">{rev.previousRole}</span></div>
                  <div className="text-cyan-400 font-semibold flex items-center gap-1">
                    <span>Target Role:</span> <strong className="text-white">{rev.currentRole} @ {rev.company}</strong>
                  </div>
                </div>

              </div>

              {/* Alumni Profile Footer */}
              <div className="flex items-center space-x-3 pt-3 border-t border-slate-800/80">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-500/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                    {rev.name} <CheckCircle className="w-3.5 h-3.5 text-cyan-400 inline" />
                  </h4>
                  <p className="text-[11px] text-slate-400">{rev.batchYear} • Verified Alumni</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
