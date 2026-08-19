import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

interface Props {
  type: 'privacy' | 'terms' | 'refund';
}

export const LegalPage: React.FC<Props> = ({ type }) => {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    refund: 'Refund & Cancellation Policy'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-8 animate-fadeIn text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 text-center">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          Official Institutional Compliance
        </span>
        <h1 className="text-3xl font-extrabold text-white font-poppins">{titles[type]}</h1>
        <p className="text-xs text-slate-400">Effective Date: January 1, 2026 • FutureOps-Tech Education</p>
      </div>

      <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
        
        {type === 'privacy' && (
          <>
            <h3 className="text-base font-bold text-white">1. Data Collection & Student Rights</h3>
            <p>FutureOps-Tech collects student contact information, educational history, and cloud lab performance metrics solely for delivering training, issuing verified credentials, and facilitating corporate placement drives.</p>
            
            <h3 className="text-base font-bold text-white">2. Confidentiality</h3>
            <p>We do not sell student data to third-party advertisers. Data shared with hiring partners is strictly governed by student placement consent forms.</p>
          </>
        )}

        {type === 'terms' && (
          <>
            <h3 className="text-base font-bold text-white">1. Code of Conduct & Cloud Lab Usage</h3>
            <p>Students must adhere to ethical cloud usage guidelines. Cloud sandbox environments are dedicated to curriculum coursework, Docker building, and Kubernetes exercises.</p>

            <h3 className="text-base font-bold text-white">2. Intellectual Property</h3>
            <p>All FutureOps-Tech lecture slides, HD video recordings, and lab guides remain protected intellectual property. Lifetime LMS access is granted for personal non-commercial learning.</p>
          </>
        )}

        {type === 'refund' && (
          <>
            <h3 className="text-base font-bold text-white">1. 7-Day Money-Back Satisfaction Guarantee</h3>
            <p>FutureOps-Tech offers a 100% no-questions-asked refund policy if requested within 7 days of live class commencement or demo onboarding.</p>

            <h3 className="text-base font-bold text-white">2. Batch Transfer Flexibility</h3>
            <p>Students may request a free batch transfer (e.g. from Weekday to Weekend) anytime with 48-hour prior notice to the admissions cell.</p>
          </>
        )}

      </div>

    </div>
  );
};
