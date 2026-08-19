import React from 'react';
import { EnquirySection } from '../home/EnquirySection';
import { MapPin, Phone, MessageCircle, Mail, Clock, Globe } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="space-y-16 py-10 animate-fadeIn">
      
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Get in Touch With FutureOps-Tech
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins">
            We Are Here to Guide Your Cloud Career
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Visit our corporate training campus or talk to our senior career advisors online. We answer all questions regarding eligibility, batch timings, and scholarships.
          </p>
        </div>
      </div>

      <EnquirySection />

      {/* Campus Map & Locations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-[#111827] font-poppins">Corporate Academy Campus</h2>
          <p className="text-xs text-[#6B7280]">Chandra Layout, Bangalore — India's Premier Cloud Tech Hub</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Simulated Google Map View */}
          <div className="lg:col-span-7 h-80 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="absolute inset-0 bg-tech-grid-dark opacity-40" />
            <div className="relative z-10 w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center ring-8 ring-cyan-500/10 animate-pulse">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="relative z-10 space-y-1">
              <h3 className="font-bold text-white text-lg">FutureOps-Tech Training Institute</h3>
              <p className="text-xs text-slate-300">#113, 5th Cross, Basaveshwara Layout, Near BSNL Office, Chandra Layout, Bangalore - 560040</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="relative z-10 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md"
            >
              Open in Google Maps
            </a>
          </div>

          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" /> Academy Working Hours
              </h4>
              <p className="text-xs text-slate-300">Monday - Saturday: 7:00 AM - 9:00 PM IST</p>
              <p className="text-xs text-slate-400">Sunday: 9:00 AM - 5:00 PM IST (Weekend Cohorts)</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" /> Online Overseas Enquiries
              </h4>
              <p className="text-xs text-slate-300">We train students globally across US, UK, UAE, and Singapore with timezone-aligned live batches.</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
