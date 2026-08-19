import React, { useState } from 'react';
import { InteractiveTerminal } from '../shared/InteractiveTerminal';
import { TrainingPlansSection } from '../shared/TrainingPlansSection';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Download, 
  Video, 
  User, 
  Award, 
  Terminal,
  ArrowRight,
  Flame
} from 'lucide-react';

export const CoursePage: React.FC = () => {
  const { setIsDemoModalOpen, setIsBrochureModalOpen } = useAuth();
  const [selectedBatch, setSelectedBatch] = useState('Weekday Morning Batch');

  return (
    <div className="space-y-16 py-10 animate-fadeIn">
      
      {/* Course Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-950 border border-blue-500/30 shadow-2xl relative overflow-hidden space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/20">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>GLOBAL CERTIFICATION READY • 100% HANDS-ON CLOUD LABS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins leading-tight">
            Master DevOps & DevSecOps Engineering Program
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            An intensive 16-20 week enterprise-level program covering Linux, Networking, Docker, Kubernetes, AWS Cloud, Terraform, Jenkins, GitOps (ArgoCD), Prometheus, and DevSecOps with real-time production projects.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-200 pt-2">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">DURATION</span>
              <span className="text-cyan-400 text-sm font-bold">16 - 20 Weeks</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">HANDS-ON LABS</span>
              <span className="text-cyan-400 text-sm font-bold">50+ Cloud Labs</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">PROJECTS</span>
              <span className="text-cyan-400 text-sm font-bold">Production Capstones</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">PLACEMENT SUPPORT</span>
              <span className="text-emerald-400 text-sm font-bold">1-on-1 Assistance</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="py-3 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-bold text-white text-sm transition shadow-lg glow-cyan flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Book Free Live Demo</span>
            </button>
            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Download 32-Page Syllabus PDF</span>
            </button>
          </div>

        </div>
      </div>

      {/* Batch Schedule Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <h2 className="text-2xl font-bold text-[#111827] font-poppins flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" /> Upcoming Live Cohort Batches
        </h2>

        <div className="max-w-xl mx-auto">
          {[
            {
              title: 'Weekday Morning Batch',
              time: 'Monday - Friday: 8:00 AM - 10:00 AM',
              date: 'Aug 17, 2026',
              seatsLeft: 6,
              badge: 'Upcoming Live Cohort'
            }
          ].map((b, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedBatch(b.title)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                selectedBatch === b.title
                  ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/30 shadow-xl'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  {b.badge}
                </span>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Only {b.seatsLeft} Seats Left
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{b.title}</h3>
              <div className="text-xs text-slate-300 space-y-1">
                <div><strong>Timing:</strong> {b.time}</div>
                <div><strong>Start Date:</strong> {b.date}</div>
              </div>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-200 text-xs font-bold transition border border-slate-700"
              >
                Reserve Seat in {b.title}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Training Programs Section */}
      <TrainingPlansSection />

      {/* Interactive Cloud Lab Shell Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#111827] font-poppins flex items-center gap-2">
            <Terminal className="w-6 h-6 text-blue-600" /> Interactive Cloud Terminal Lab Preview
          </h2>
          <p className="text-xs text-[#6B7280]">Experience our 100% hands-on terminal learning methodology directly in your browser.</p>
        </div>
        <InteractiveTerminal />
      </div>

    </div>
  );
};
