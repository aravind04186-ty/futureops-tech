import React from 'react';
import { InteractiveTerminal } from '../shared/InteractiveTerminal';
import { RealTimeProjectsSection } from '../home/RealTimeProjectsSection';
import { Workflow, Github, Code2, Terminal } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="space-y-12 py-10 animate-fadeIn">
      
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Real-World Industry Capstones
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins">
            Production-Grade DevOps Capstone Sandbox
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Build, test, and deploy production microservices, Kubernetes clusters, and zero-drift Terraform infrastructure. Store all code in your verified GitHub portfolio.
          </p>
        </div>
      </div>

      {/* Real-Time Projects Cards */}
      <RealTimeProjectsSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#111827] font-poppins flex items-center gap-2">
            <Terminal className="w-6 h-6 text-cyan-600" /> Interactive Terminal Sandbox
          </h2>
          <p className="text-xs text-slate-500">Test real Docker, Kubernetes, and AWS CLI commands directly below.</p>
        </div>
        <InteractiveTerminal />
      </div>

    </div>
  );
};
