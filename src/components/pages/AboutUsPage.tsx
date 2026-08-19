import React from 'react';
import { AboutSection } from '../home/AboutSection';
import { Award, ShieldCheck, Users, Building, Terminal, CheckCircle2 } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="space-y-16 py-10 animate-fadeIn">
      
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Official DevOps Academy Story
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins">
            Building Industry-Ready Cloud & DevOps Leaders
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Founded by Principal Cloud Architects, FutureOps-Tech was created to replace theoretical textbooks with real terminal commands, live AWS production clusters, and 1-on-1 career mentorship.
          </p>
        </div>
      </div>

      <AboutSection />

    </div>
  );
};
