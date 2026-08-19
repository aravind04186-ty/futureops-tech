import React from 'react';
import { placementPartnersData } from '../../data/reviewsData';
import { Briefcase, Building2, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

export const PlacementPartners: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 border-b border-gray-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Target Employers Across Major IT Hubs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-poppins">
            Connecting Graduates with Leading Technology Companies Across Bengaluru, Hyderabad, Chennai, Mumbai &amp; Pune
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Placement opportunities are available across major IT hubs, including Bengaluru, Hyderabad, Chennai, Mumbai, and Pune. Our live training programs prepare graduates to build successful careers as DevOps, Cloud, and SRE Engineers at top technology enterprises.
          </p>
        </div>

        {/* Marquee Ticker of Target Companies */}
        <div className="overflow-hidden py-4 bg-white rounded-2xl border border-gray-200 shadow-xs">
          <div className="animate-marquee flex space-x-8 items-center">
            {[...placementPartnersData, ...placementPartnersData].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 px-6 py-2.5 rounded-xl bg-gray-50 border border-gray-200/80 shrink-0 text-[#111827] font-bold text-sm hover:border-blue-400 transition"
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Employer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {placementPartnersData.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm text-center space-y-2 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs font-mono group-hover:scale-105 transition-transform">
                {p.logo}
              </div>
              <h3 className="text-sm font-bold text-[#111827] group-hover:text-blue-600 transition-colors leading-tight">
                {p.name}
              </h3>
              <div className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full inline-block border border-blue-100">
                Target Employer
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Notice */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-center text-xs text-amber-900 leading-relaxed max-w-4xl mx-auto">
          <strong className="font-bold">Disclaimer / Transparency Note:</strong> The organizations listed above represent target employers and enterprise technology companies across major IT hubs, including Bengaluru, Hyderabad, Chennai, Mumbai, and Pune, where our graduates build their careers. Listing these companies indicates career transition target roles and does not imply an official placement partnership or direct endorsement.
        </div>

        {/* Career Support Features Bar */}
        <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6 text-[#6B7280] text-xs">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111827] text-sm block mb-1">ATS Resume Optimization</strong>
              <span>Tailored DevOps resumes with bullet metrics that pass corporate HR keyword filters.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111827] text-sm block mb-1">HR &amp; Behavioural Rounds</strong>
              <span>Practice communication, notice period answers, and career gap explanations.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111827] text-sm block mb-1">Technical Mock Interviews</strong>
              <span>5 technical rounds evaluated by Principal DevOps Architects across Bengaluru, Hyderabad, Chennai, Mumbai, and Pune.</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111827] text-sm block mb-1">Interview Prep & Guidance</strong>
              <span>Get expert guidance to prepare for and clear top corporate interview rounds.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
