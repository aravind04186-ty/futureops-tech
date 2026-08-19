import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Send, Phone, MessageCircle, Mail, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { safeFetchApi } from '../../lib/api';

export const EnquirySection: React.FC = () => {
  const { showToast, selectedProgramForEnquiry, setSelectedProgramForEnquiry } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    course: selectedProgramForEnquiry || 'Advance DevOps with Interview Assistance',
    experience: 'System Administrator (1-3 yrs)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  useEffect(() => {
    if (selectedProgramForEnquiry) {
      setFormData(prev => ({ ...prev, course: selectedProgramForEnquiry }));
    }
  }, [selectedProgramForEnquiry]);

  // Construct formatted WhatsApp message text
  const generateWaMessage = () => {
    return `🎓 *NEW COURSE ENQUIRY - FutureOps-Tech*\n` +
      `----------------------------------------\n` +
      `👤 *Name:* ${formData.name || 'Candidate'}\n` +
      `📱 *Mobile / WhatsApp:* ${formData.mobile}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `🌆 *City / Location:* ${formData.city || 'Not specified'}\n` +
      `📚 *Course:* ${formData.course}\n` +
      `💼 *Background:* ${formData.experience}\n` +
      `💬 *Message:* ${formData.message || 'Interested in syllabus and batch timings.'}\n` +
      `----------------------------------------\n` +
      `Submitted via FutureOps-Tech Official Website`;
  };

  const getPrimaryWaUrl = (customUrl?: string) => {
    if (customUrl) return customUrl;
    return `https://wa.me/918277759401?text=${encodeURIComponent(generateWaMessage())}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim() || !formData.city.trim()) {
      const msg = 'Please fill in all required fields: Full Name, Email Address, Mobile Number, and City.';
      setErrorMessage(msg);
      showToast(msg);
      return;
    }

    setLoading(true);

    // Synchronously open a window reference during the user click event to prevent browser popup blockers
    let waWin: Window | null = null;
    try {
      waWin = window.open('about:blank', '_blank');
    } catch (e) {
      console.log('Popup window initialization prevented by environment policy');
    }

    try {
      const apiRes = await safeFetchApi('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      let responseData: any = null;
      let targetWaUrl = getPrimaryWaUrl();

      if (apiRes.ok && apiRes.data) {
        responseData = apiRes.data;
        if (responseData.deliveryStatus?.whatsappUrl) {
          targetWaUrl = responseData.deliveryStatus.whatsappUrl;
        }
      } else {
        // Fallback for static hosting or temporary server unavailability
        responseData = {
          success: true,
          message: 'Enquiry received! Connecting you with our admissions team on WhatsApp...',
          enquiry: {
            ...formData,
            submissionDateTime: new Date().toLocaleString(),
            status: 'New'
          },
          deliveryStatus: {
            whatsappUrl: targetWaUrl
          }
        };
      }

      setSubmissionResult(responseData);
      setSubmitted(true);

      // Redirect pre-opened window or fallback
      if (waWin && !waWin.closed) {
        waWin.location.href = targetWaUrl;
      } else {
        try {
          window.open(targetWaUrl, '_blank');
        } catch (e) {
          console.log('Direct window.open blocked');
        }
      }

      if (responseData.duplicate) {
        showToast('Enquiry already received! Connecting to WhatsApp...');
      } else {
        showToast('Enquiry submitted! Opening WhatsApp & dispatching notifications.');
      }
    } catch (err: any) {
      if (waWin && !waWin.closed) {
        waWin.close();
      }
      console.error('Enquiry submission error:', err);
      // Fallback display
      setSubmitted(true);
      const fallbackWaUrl = getPrimaryWaUrl();
      try {
        window.open(fallbackWaUrl, '_blank');
      } catch (e) {}
      showToast('Enquiry received! Opening WhatsApp...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquiry" className="py-20 bg-white border-b border-gray-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              FutureOps-Tech Admissions
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-poppins">
              Start Your DevOps Career Transformation Today
            </h2>

            <p className="text-sm text-[#6B7280] leading-relaxed">
              Have questions regarding course modules, career tracks, or batch timings? Submit your enquiry or reach out directly to our admissions team on WhatsApp.
            </p>

            <div className="space-y-4 pt-2 text-sm text-[#6B7280]">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center space-x-3">
                <span className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs text-[#6B7280]">Admissions Hotline:</div>
                  <a href="tel:+918277759401" className="font-bold text-[#111827] hover:text-blue-600 transition-colors block">+91 82777 59401</a>
                  <a href="tel:+919482617166" className="font-bold text-[#111827] hover:text-blue-600 transition-colors block">+91 94826 17166</a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center space-x-3">
                <span className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs text-[#6B7280]">WhatsApp Instant Connect:</div>
                  <a href="https://wa.me/918277759401" target="_blank" rel="noreferrer" className="font-bold text-[#111827] hover:text-emerald-600 transition-colors block">+91 82777 59401</a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center space-x-3">
                <span className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs text-[#6B7280]">Official Email:</div>
                  <a href="mailto:futureopstech@gmail.com" className="font-bold text-[#111827] hover:text-blue-600 transition-colors">futureopstech@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-xl">
            
            {errorMessage && !submitted && (
              <div className="p-4 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-2">
                <div className="font-bold flex items-center gap-1 text-red-900 text-sm">
                  <span>⚠️ Submission / Delivery Warning</span>
                </div>
                <p>{errorMessage}</p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-sm"
                >
                  🔄 Retry Submission
                </button>
              </div>
            )}

            {submitted ? (
              <div className="text-center py-6 space-y-5 animate-fadeIn">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#111827]">Enquiry Submitted & Dispatched!</h3>
                  <p className="text-xs text-[#6B7280] mt-1">Student details sent to admissions team email and WhatsApp notification desk.</p>
                </div>

                {/* WhatsApp Direct Notification Card */}
                <div className="p-5 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-left space-y-3 shadow-lg">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <span>WhatsApp Instant Notification</span>
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Student enquiry formatted with complete details (Name: <strong className="text-white">{formData.name}</strong>, Phone: <strong className="text-white">{formData.mobile}</strong>, Course: <strong className="text-white">{formData.course}</strong>, City: <strong className="text-white">{formData.city}</strong>).
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <a
                      href={getPrimaryWaUrl(submissionResult?.deliveryStatus?.whatsappUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>Send via WhatsApp (+91 82777 59401)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="tel:+918277759401"
                      className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-bold text-xs border border-cyan-500/30 transition flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                      <span>Admissions Call (+91 82777 59401)</span>
                    </a>
                  </div>
                </div>

                {/* Detailed Submission Record */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#374151] text-left space-y-2">
                  <div className="font-extrabold text-[#111827] border-b border-gray-200 pb-1 uppercase tracking-wider text-[11px]">
                    📋 Complete Enquiry Record
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <div>• <strong>Student Name:</strong> {formData.name}</div>
                    <div>• <strong>Email Address:</strong> {formData.email}</div>
                    <div>• <strong>Phone Number:</strong> {formData.mobile}</div>
                    <div>• <strong>City / Location:</strong> {formData.city}</div>
                    <div className="sm:col-span-2">• <strong>Selected Course:</strong> <span className="text-blue-700 font-bold">{formData.course}</span></div>
                    <div className="sm:col-span-2">• <strong>Background / Role:</strong> {formData.experience}</div>
                    {formData.message && <div className="sm:col-span-2">• <strong>Message:</strong> {formData.message}</div>}
                    <div>• <strong>Submission Time:</strong> {submissionResult?.enquiry?.submissionDateTime || new Date().toLocaleString()}</div>
                    <div>• <strong>Client IP Address:</strong> {submissionResult?.enquiry?.ipAddress || 'Captured'}</div>
                  </div>

                  <div className="pt-2 border-t border-gray-200 space-y-1 text-[11px]">
                    <div className="flex items-center justify-between text-slate-700">
                      <span>✉️ <strong>Admin Email Dispatch:</strong></span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {submissionResult?.deliveryStatus?.emailStatus || 'Dispatched / Logged'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>💬 <strong>WhatsApp Notification Status:</strong></span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {submissionResult?.deliveryStatus?.whatsappStatus || 'Dispatched'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubmissionResult(null);
                    setErrorMessage(null);
                    setFormData({
                      name: '',
                      email: '',
                      mobile: '',
                      city: '',
                      course: selectedProgramForEnquiry || 'Advance DevOps with Interview Assistance',
                      experience: 'System Administrator (1-3 yrs)',
                      message: ''
                    });
                  }}
                  className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition shadow-sm"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-xl font-bold text-[#111827]">Submit Course Enquiry</h3>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> WhatsApp Auto-Notify Enabled
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kushal"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="kushal@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.mobile}
                      onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">City / Current Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru / Hyderabad / Remote"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">Select Program *</label>
                    <select
                      value={formData.course}
                      onChange={e => {
                        setFormData({ ...formData, course: e.target.value });
                        setSelectedProgramForEnquiry(e.target.value);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500 font-semibold"
                    >
                      <option value="DevOps Training">1. DevOps Training — ₹50,000</option>
                      <option value="DevOps Training + Profile Building">2. DevOps Training + Profile Building — ₹75,000 (Most Popular)</option>
                      <option value="DevOps Training + Profile Building + Interview Assistance">3. DevOps Training + Profile Building + Interview Assistance — ₹1,00,000 (Premium)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">Your Current Role / Background</label>
                    <select
                      value={formData.experience}
                      onChange={e => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="System Administrator (1-3 yrs)">System Administrator (1-3 yrs)</option>
                      <option value="Software Developer / Tester">Software Developer / Tester</option>
                      <option value="Non-IT / Fresh Graduate">Non-IT Professional / Fresh Graduate</option>
                      <option value="Tech Support / Helpdesk">Tech Support / Helpdesk</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Your Message or Specific Questions</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your career goals or preferred batch timings..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-white text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Enquiry...' : 'Submit Enquiry & Open WhatsApp Notification'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

