import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bot, Sparkles, Terminal, CheckCircle2, ArrowRight, Code, Cpu } from 'lucide-react';

export const AIBotSection: React.FC = () => {
  const { setIsAIMentorOpen } = useAuth();

  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-y border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-50 via-gray-50 to-cyan-50 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border border-blue-200 dark:border-blue-500/30 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-cyan-300 text-xs font-bold border border-blue-200 dark:border-blue-500/30 uppercase tracking-wider">
                <Bot className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>AI-Powered DevOps Career & Technical Assistant</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-white font-poppins leading-tight">
                Meet <span className="text-blue-600 dark:text-cyan-400">OpsBot</span> — Your 24/7 FutureOps Tech AI Mentor
              </h2>

              <p className="text-sm sm:text-base text-[#6B7280] dark:text-slate-300 leading-relaxed">
                Stuck on a Kubernetes manifest error? Need a custom Terraform AWS script or an instant mock interview drill? OpsBot is trained on enterprise DevOps workflows to guide your learning 24/7.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#111827] dark:text-slate-200">
                {[
                  'Instant Kubernetes & Docker Diagnostics',
                  'Terraform & AWS HCL Code Generation',
                  'DevOps Interview Prep & Mock Questions',
                  'Tailored 2026 Learning Roadmaps'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-white dark:bg-slate-800/80 p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsAIMentorOpen(true)}
                  className="py-3.5 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all duration-200 shadow-md flex items-center space-x-2 group"
                >
                  <Bot className="w-5 h-5 text-white" />
                  <span>Launch OpsBot AI Mentor Chat</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Interactive Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0F172A] p-5 border border-slate-700 shadow-2xl text-slate-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 font-mono text-[11px] text-slate-400">opsbot-ai-mentor.sh</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">ONLINE</span>
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="text-cyan-400 font-bold mb-1">User Ask:</p>
                    <p className="text-slate-200">"OpsBot, how do I resolve ImagePullBackOff in Kubernetes?"</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-blue-500/30 space-y-2">
                    <p className="text-blue-400 font-bold flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5" /> OpsBot Mentor:
                    </p>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      ImagePullBackOff happens when K8s cannot fetch your container image. Troubleshoot in 3 steps:
                    </p>
                    <div className="p-2 rounded bg-[#1E293B] text-[10px] text-cyan-300 overflow-x-auto">
                      kubectl describe pod &lt;pod-name&gt; -n &lt;namespace&gt;
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsAIMentorOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition text-center"
                >
                  Click to Ask OpsBot Your Question →
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
