import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { safeFetchApi } from '../../lib/api';
import { X, Calendar, Clock, CheckCircle2, Video, Send, MessageCircle, ExternalLink } from 'lucide-react';

export const DemoBookingModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, showToast } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    batch: 'Weekday Morning Batch (Mon-Fri 8:00 AM - 10:00 AM)',
    preferredDate: 'Aug 17, 2026 - Live Online Cohort'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isDemoModalOpen) return null;

  const generateDemoWaMessage = () => {
    return `📹 *FREE DEMO CLASS BOOKING - FutureOps-Tech*\n` +
      `----------------------------------------\n` +
      `👤 *Name:* ${formData.name || 'Candidate'}\n` +
      `📱 *Mobile / WhatsApp:* ${formData.mobile}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📅 *Date:* ${formData.preferredDate}\n` +
      `⏰ *Batch:* ${formData.batch}\n` +
      `----------------------------------------\n` +
      `Requesting Google Meet / Zoom link on WhatsApp`;
  };

  const getWaDemoUrl = () => {
    return `https://wa.me/918277759401?text=${encodeURIComponent(generateDemoWaMessage())}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      showToast('Please fill in required fields: Name, Email, and Mobile.');
      return;
    }

    setLoading(true);

    let waWin: Window | null = null;
    try {
      waWin = window.open('about:blank', '_blank');
    } catch (e) {
      console.log('Popup window initialization blocked');
    }

    try {
      await safeFetchApi('/api/demo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          whatsappNotificationText: generateDemoWaMessage()
        })
      });

      const waUrl = getWaDemoUrl();
      if (waWin && !waWin.closed) {
        waWin.location.href = waUrl;
      } else {
        try {
          window.open(waUrl, '_blank');
        } catch (e) {
          console.log('Direct window open blocked');
        }
      }
    } catch (err) {
      if (waWin && !waWin.closed) {
        waWin.close();
      }
      console.error('Demo booking error:', err);
    } finally {
      setLoading(false);
      setIsSubmitted(true);
      showToast('Free Live Demo booked! Details dispatched to WhatsApp.');
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsDemoModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden text-[#111827]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Video className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-[#111827]">Book Free DevOps Live Demo</h3>
              <p className="text-xs text-[#6B7280]">Experience our interactive Cloud Lab teaching methodology</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#111827]">Demo Spot Confirmed!</h4>
                <p className="text-xs text-[#6B7280] mt-1">
                  We have registered your details for <strong className="text-blue-600">{formData.email}</strong>.
                </p>
              </div>

              {/* WhatsApp Callout */}
              <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-left space-y-2 text-white">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <MessageCircle className="w-4 h-4" />
                  <span>Receive Joining Link on WhatsApp</span>
                </div>
                <p className="text-[11px] text-emerald-100">
                  Click below to send your demo seat confirmation directly to our WhatsApp counselor desk (+91 8277759401).
                </p>
                <a
                  href={getWaDemoUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Demo Confirmation on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl text-left text-xs space-y-2 border border-gray-200">
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-600" /> Date:</span>
                  <span className="font-semibold text-[#111827]">{formData.preferredDate}</span>
                </div>
                <div className="flex items-center justify-between text-[#6B7280]">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-600" /> Selected Batch:</span>
                  <span className="font-semibold text-[#111827]">{formData.batch}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-colors duration-200 shadow-sm"
              >
                Back to FutureOps-Tech
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.mobile}
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-1">Select Batch Timing</label>
                <select
                  value={formData.batch}
                  onChange={e => setFormData({ ...formData, batch: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="Weekday Morning Batch (Mon-Fri 8:00 AM - 10:00 AM)">Weekday Morning Batch (Mon-Fri 8:00 AM - 10:00 AM • Starts Aug 17, 2026)</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                ⚡ <strong>What happens in the Live Demo?</strong> Live interaction with Senior DevOps Mentor, interactive Kubernetes architecture demo, and Q&A on placement assistance.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Booking Your Seat...' : 'Confirm Demo & Send WhatsApp Notification'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

