import React from 'react';
import { ShieldCheck, Target, Award, Users, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-gray-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            About FutureOps-Tech Academy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-poppins">
            Empowering Next-Generation DevOps & Cloud Architects
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            FutureOps-Tech is a premier corporate DevOps academy dedicated to bridging the gap between traditional IT education and real-world Cloud Native production requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-md space-y-4 hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111827]">100% Industry-Ready Curriculum</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              We eliminate theoretical filler. Our curriculum is built directly from real engineering requirements at AWS, Microsoft, and top MNCs, focusing on hands-on terminal command execution.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-md space-y-4 hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111827]">Global Certification Prep</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Prepare directly for industry gold-standard certifications including CKA (Certified Kubernetes Administrator), AWS Solutions Architect, and HashiCorp Terraform Associate.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-md space-y-4 hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111827]">Direct Career Support & Hiring</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              From ATS-compliant resume building to technical mock interviews with Principal DevOps Architects, we stand with you until you get hired in a high-paying role.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
