import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { safeFetchApi } from '../../lib/api';
import { X, Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export const BrochureModal: React.FC = () => {
  const { isBrochureModalOpen, setIsBrochureModalOpen, showToast } = useAuth();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  if (!isBrochureModalOpen) return null;

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
    showToast('FutureOps-Tech DevOps Master Syllabus PDF Downloaded!');

    try {
      await safeFetchApi('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0] || 'Brochure Lead',
          email,
          mobile,
          city: 'Brochure Download',
          course: 'Master DevOps Syllabus Download',
          experience: 'Brochure Lead',
          message: 'Requested 32-page Master Syllabus PDF Download'
        })
      });
    } catch (e) {
      console.warn('Background brochure lead submission note:', e);
    }
  };

  const handleClose = () => {
    setDownloaded(false);
    setIsBrochureModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden text-[#111827]">
        
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-[#111827]">Download DevOps Course Brochure</h3>
              <p className="text-xs text-[#6B7280]">Comprehensive Detailed Syllabus + Real Project Specifications</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {downloaded ? (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 ring-8 ring-blue-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-[#111827]">Brochure Download Triggered!</h4>
              <p className="text-sm text-[#6B7280]">
                FutureOps-Tech_Master_DevOps_Syllabus_2026.pdf has been dispatched to <span className="text-blue-600 font-semibold">{email}</span>.
              </p>
              
              <div className="p-4 bg-gray-50 rounded-xl text-left text-xs space-y-2 border border-gray-200">
                <p className="font-semibold text-[#111827] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Brochure Includes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[#6B7280] pl-1">
                  <li>Week-by-week 160-Hour Course Roadmap</li>
                  <li>Architecture diagrams of Production Projects</li>
                  <li>Detailed Cloud Lab Exercises & Command Cheatsheets</li>
                  <li>Placement Statistics & Salary Breakdown by Experience</li>
                </ul>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-colors duration-200 shadow-sm"
              >
                Close & Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-[#6B7280] space-y-1">
                <div className="flex justify-between text-[#6B7280]">
                  <span>File Format:</span>
                  <span className="font-medium text-[#111827]">PDF (Vector HD)</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Pages:</span>
                  <span className="font-medium text-[#111827]">32 Pages (Detailed)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Get Instant Syllabus PDF</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
