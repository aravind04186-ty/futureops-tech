import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Award, Download, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';

export const CertificateGeneratorModal: React.FC = () => {
  const { isCertificateModalOpen, setIsCertificateModalOpen, user, showToast } = useAuth();
  const [candidateName, setCandidateName] = useState(user ? user.name : 'Kushal');
  const [certId] = useState('FOT-DEVOPS-2026-90821');

  if (!isCertificateModalOpen) return null;

  const handleDownloadCertificate = () => {
    showToast(`Verified Certificate for ${candidateName} downloaded successfully!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-white">FutureOps-Tech Certified DevOps Professional</h3>
              <p className="text-xs text-slate-400">Verifiable Cloud Industry Credential</p>
            </div>
          </div>
          <button
            onClick={() => setIsCertificateModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Editable Name Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700/60">
            <label className="text-xs font-semibold text-slate-300 whitespace-nowrap">Certificate Recipient Name:</label>
            <input
              type="text"
              value={candidateName}
              onChange={e => setCandidateName(e.target.value)}
              className="w-full sm:w-auto flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm font-semibold focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Graphical Certificate Preview Card */}
          <div className="relative p-8 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-4 border-amber-500/30 shadow-2xl text-center space-y-6 overflow-hidden">
            
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Award className="w-96 h-96 text-amber-400" />
            </div>

            {/* Certificate Branding */}
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-white text-xs">
                  FOT
                </div>
                <div className="text-left">
                  <span className="font-bold text-sm tracking-wider text-white">FutureOps-Tech</span>
                  <p className="text-[10px] text-slate-400">Official DevOps Academy</p>
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <span>Credential ID: <strong className="text-amber-400 font-mono">{certId}</strong></span>
              </div>
            </div>

            {/* Main Certificate Title */}
            <div className="space-y-2 py-2">
              <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Official Certificate of Completion</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Master DevOps & DevSecOps Engineering</h2>
              <p className="text-xs text-slate-400">This credential certifies that</p>
            </div>

            {/* Candidate Highlight */}
            <div className="py-2 border-y border-amber-500/20 max-w-md mx-auto">
              <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300 font-poppins">
                {candidateName || 'Candidate Name'}
              </span>
            </div>

            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              has successfully completed 160+ hours of rigorous coursework, hands-on cloud labs, and real-time production capstone projects covering AWS, Linux, Docker, Kubernetes, Terraform, Jenkins, and GitOps.
            </p>

            {/* Signatures & QR Code */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-700/60">
              <div className="text-left space-y-1">
                <div className="font-serif italic text-amber-300 text-base">Director</div>
                <div className="text-[10px] text-slate-400 border-t border-slate-700 pt-1">Director & Chief Mentor</div>
              </div>

              <div className="flex items-center space-x-2 bg-slate-900/80 p-2 rounded-lg border border-slate-700/80">
                <QrCode className="w-10 h-10 text-cyan-400" />
                <div className="text-[10px] text-left text-slate-400">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> VERIFIED
                  </span>
                  <span>Scan to verify on futureops-tech.com</span>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="font-serif italic text-amber-300 text-base">DevOps Board</div>
                <div className="text-[10px] text-slate-400 border-t border-slate-700 pt-1">FutureOps Certification Board</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> LinkedIn Shareable & Recruiter Verifiable
            </span>
            <button
              onClick={handleDownloadCertificate}
              className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 font-semibold text-slate-950 transition flex items-center justify-center space-x-2 shadow-lg glow-cyan"
            >
              <Download className="w-4 h-4" />
              <span>Download Verified PDF Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
