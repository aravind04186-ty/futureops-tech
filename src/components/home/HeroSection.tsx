import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Terminal, 
  Cloud, 
  Layers, 
  Box, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Video, 
  Sparkles,
  Users,
  Award,
  TrendingUp,
  Workflow
} from 'lucide-react';
import { TechLogo } from '../shared/TechLogo';

export const HeroSection: React.FC = () => {
  const { setActivePage, setIsDemoModalOpen, setIsBrochureModalOpen } = useAuth();

  const techBadges = [
    { name: 'AWS Cloud', tech: 'aws', color: 'text-amber-800 border-amber-200 bg-amber-50' },
    { name: 'Docker', tech: 'docker', color: 'text-cyan-800 border-cyan-200 bg-cyan-50' },
    { name: 'Kubernetes', tech: 'kubernetes', color: 'text-blue-800 border-blue-200 bg-blue-50' },
    { name: 'Jenkins CI/CD', tech: 'jenkins', color: 'text-rose-800 border-rose-200 bg-rose-50' },
    { name: 'Terraform IaC', tech: 'terraform', color: 'text-purple-800 border-purple-200 bg-purple-50' },
    { name: 'Linux Admin', tech: 'linux', color: 'text-emerald-800 border-emerald-200 bg-emerald-50' },
    { name: 'DevSecOps', tech: 'trivy', color: 'text-indigo-800 border-indigo-200 bg-indigo-50' },
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-16 lg:py-24 border-b border-gray-200">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          
          {/* Admissions Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>OFFICIAL DEVOPS ACADEMY • 100% HANDS-ON CLOUD LABS</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.15] font-poppins">
            Become a Professional <br className="hidden sm:inline" />
            <span className="text-blue-600">
              DevOps Engineer
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#6B7280] font-normal leading-relaxed max-w-2xl mx-auto">
            Master AWS, Linux, Docker, Kubernetes, Jenkins, Terraform, Git, CI/CD, Ansible, Python, Monitoring, and DevSecOps with real-world projects and expert mentorship.
          </p>

          {/* Key Value Bullets */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#111827] pt-2 font-medium max-w-2xl mx-auto text-left">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Online Classes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Real-Time Industry Projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>1-on-1 Placement Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>24/7 Cloud Lab Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Mock Technical Interviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Lifetime LMS Access</span>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActivePage('course')}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-sm transition-colors duration-200 shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 group"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white hover:bg-gray-50 text-blue-600 font-bold text-sm border border-blue-200 transition-colors duration-200 shadow-sm flex items-center justify-center space-x-2"
            >
              <Video className="w-4 h-4 text-blue-600" />
              <span>Book Free Demo</span>
            </button>

            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white hover:bg-gray-50 text-[#111827] font-semibold text-sm border border-gray-200 transition-colors duration-200 shadow-sm flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4 text-[#6B7280]" />
              <span>Brochure</span>
            </button>
          </div>

          {/* Floating Tech Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-bold text-[#6B7280] uppercase mr-2">Core Tools:</span>
            {techBadges.map((badge, idx) => (
              <div
                key={idx}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${badge.color}`}
              >
                <TechLogo name={badge.tech} className="w-4 h-4 shrink-0" />
                <span>{badge.name}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Global Key Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-poppins">800+</div>
            <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Engineer Students</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-poppins">92%</div>
            <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Placement Success</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-poppins">20+</div>
            <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Hiring Companies</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-poppins">4.4 / 5</div>
            <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Student Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
};
