import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Sparkles, KeyRound, ShieldCheck, UserCheck, Clock, Copy, Check, ExternalLink, Smartphone } from 'lucide-react';

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CredentialsModal: React.FC<CredentialsModalProps> = ({ isOpen, onClose }) => {
  const { loginWithCredentials, loginAsStudent, loginAsAdmin, setActivePage, showToast } = useAuth();
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDirectLoginApproved = () => {
    loginAsStudent();
    showToast('Logged in as Approved Student (Kushal)');
    setActivePage('portal');
    onClose();
  };

  const handleDirectLoginPending = () => {
    loginWithCredentials('ananya.s@gmail.com', 'password123', true);
    showToast('Switched to Pending Student (Ananya Sharma)');
    setActivePage('portal');
    onClose();
  };

  const handleDirectLoginAdmin = () => {
    loginAsAdmin();
    showToast('Logged in as Admin (Director)');
    setActivePage('admin');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white font-poppins">Demo Login Credentials</h2>
              <p className="text-xs text-slate-400">Choose a profile below for 1-click access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Quick Notice Banner */}
          <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Use these credentials to test student LMS, attendance marking, cloud labs, and admin features.</span>
            </div>
          </div>

          {/* Role 1: Approved Student */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 hover:border-emerald-500/50 transition space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-extrabold text-sm text-emerald-300 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-400" /> Approved Student Account
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                ACTIVE STUDENT
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Name: <strong>Kushal</strong> | Course: DevOps & Cloud Master Program | Progress: 78% | Batch: Cohort #42
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Email / ID:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('kushal.devops@futureops-tech.com', 'Approved Student Email')}
                  className="text-cyan-300 hover:text-cyan-200 text-[11px] font-bold flex items-center gap-1"
                >
                  kushal.devops@futureops-tech.com {copiedField === 'Approved Student Email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Password:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('password123', 'Password')}
                  className="text-cyan-300 hover:text-cyan-200 text-[11px] font-bold flex items-center gap-1"
                >
                  password123 {copiedField === 'Password' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleDirectLoginApproved}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>1-Click Login as Approved Student (Kushal)</span>
            </button>
          </div>

          {/* Role 2: Admin Dashboard */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 hover:border-blue-500/50 transition space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-extrabold text-sm text-blue-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> Director / Admin Portal
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                FULL ACCESS
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Name: <strong>Director</strong> | Full LMS management, student approval queue, batch allocations & course builder.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Email / ID:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('admin@futureops-tech.com', 'Admin Email')}
                  className="text-cyan-300 hover:text-cyan-200 text-[11px] font-bold flex items-center gap-1"
                >
                  admin@futureops-tech.com {copiedField === 'Admin Email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Password:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('admin123', 'Admin Password')}
                  className="text-cyan-300 hover:text-cyan-200 text-[11px] font-bold flex items-center gap-1"
                >
                  admin123 {copiedField === 'Admin Password' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleDirectLoginAdmin}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>1-Click Login as Admin (Director)</span>
            </button>
          </div>

          {/* Role 3: Pending Student */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 hover:border-amber-500/50 transition space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-extrabold text-sm text-amber-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" /> Pending Approval Candidate
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                PENDING REVIEW
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Name: <strong>Ananya Sharma</strong> | Demonstrates the "Awaiting Admin Approval" state when trying to login before admin approval.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Email / ID:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('ananya.s@gmail.com', 'Pending Email')}
                  className="text-cyan-300 hover:text-cyan-200 text-[11px] font-bold flex items-center gap-1"
                >
                  ananya.s@gmail.com {copiedField === 'Pending Email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Password:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('password123', 'Password')}
                  className="text-cyan-300 hover:text-cyan-200 text-[11px] font-bold flex items-center gap-1"
                >
                  password123 {copiedField === 'Password' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleDirectLoginPending}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>Test Pending Student Login (Ananya)</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
