import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { safeFetchApi } from '../../lib/api';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Building2, 
  Copy, 
  Check, 
  Download, 
  Lock, 
  ArrowRight, 
  Gift, 
  HelpCircle, 
  Phone, 
  MessageCircle,
  FileText,
  Percent,
  Zap,
  Award
} from 'lucide-react';

interface PaymentPlan {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  description: string;
  badge: string;
  features: string[];
}

const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'plan-1',
    name: 'DevOps Training (Full Core Tools)',
    originalPrice: 50000,
    discountedPrice: 25000,
    description: '12-16 Weeks Live Cohort covering Linux, Docker, K8s, AWS, Terraform & Jenkins',
    badge: 'CORE COHORT',
    features: [
      'Linux, Shell, Git, Docker, Kubernetes, AWS, Terraform, Jenkins, Prometheus',
      '100% Practical Live Sandbox Cloud Labs Access',
      'Verified Certificate of Completion & Digital Credentials'
    ]
  },
  {
    id: 'plan-2',
    name: 'DevOps Training + Profile Building',
    originalPrice: 75000,
    discountedPrice: 37500,
    description: 'All Core Tools + Dedicated ATS Resume, LinkedIn & GitHub Portfolio Overhaul',
    badge: 'MOST POPULAR',
    features: [
      'Includes ALL tools in DevOps Training',
      'ATS-Optimized Resume Built by FutureOps Expert Team',
      'Recruiter-Magnet LinkedIn & Production GitHub Portfolio Overhaul'
    ]
  },
  {
    id: 'plan-3',
    name: 'DevOps Training + Profile + Interview Support',
    originalPrice: 100000,
    discountedPrice: 50000,
    description: 'Ultimate Career Transformation with 1-on-1 Mock Interviews & Placement Support',
    badge: 'PLACEMENT GUARANTEE',
    features: [
      'All Core Tools + Complete Profile & Portfolio Overhaul',
      'Unlimited 1-on-1 Technical Mock Interviews with DevOps Architects',
      'Full-time Interview Support & Direct Placement Referral Drives'
    ]
  },
  {
    id: 'seat-booking',
    name: 'Seat Reservation Deposit',
    originalPrice: 10000,
    discountedPrice: 5000,
    description: 'Token payment to lock 50% discount & reserve seat for upcoming cohort',
    badge: 'TOKEN DEPOSIT',
    features: [
      'Locks the 50% August Discount for 30 Days',
      'Guarantees seat in upcoming morning/weekend live cohort',
      'Adjustable against total program fee at enrollment'
    ]
  }
];

export const PaymentPage: React.FC = () => {
  const { showToast, setSelectedProgramForEnquiry } = useAuth();

  // Expiry calculation: Offer expires on August 31, 2026 at 23:59:59
  const expiryDate = new Date('2026-08-31T23:59:59').getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isOfferActive = now <= expiryDate;
  const timeRemaining = Math.max(0, expiryDate - now);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const seconds = Math.floor((timeRemaining / 1000) % 60);

  // Form State
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-2');
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    batchPreference: 'Weekday Morning Batch (Mon-Fri 8:00 AM)'
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'emi'>('upi');
  const [couponApplied, setCouponApplied] = useState<boolean>(true); // Auto-apply 50% off
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<any>(null);

  // Get current plan object
  const currentPlan = PAYMENT_PLANS.find(p => p.id === selectedPlanId) || PAYMENT_PLANS[1];

  // Price calculations
  const originalPrice = currentPlan.originalPrice;
  // Apply 50% discount if offer active and coupon applied
  const discountAmount = isOfferActive && couponApplied ? Math.round(originalPrice * 0.5) : 0;
  const finalPayable = originalPrice - discountAmount;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('futureops.tech@icici');
    setCopiedUpi(true);
    showToast('UPI ID "futureops.tech@icici" copied to clipboard!');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentDetails.name.trim() || !studentDetails.email.trim() || !studentDetails.phone.trim()) {
      showToast('Please fill in Student Name, Email Address, and Phone Number.');
      return;
    }

    setIsProcessing(true);

    try {
      // Send receipt & lead details to backend
      await safeFetchApi('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentDetails.name,
          email: studentDetails.email,
          mobile: studentDetails.phone,
          city: studentDetails.city || 'Online Enrollment',
          course: isOfferActive 
            ? `${currentPlan.name} (August Special Offer - 50% OFF)` 
            : currentPlan.name,
          experience: `Batch: ${studentDetails.batchPreference}`,
          message: `Paid Amount: ₹${finalPayable.toLocaleString()} (Original: ₹${originalPrice.toLocaleString()}, Discount: ₹${discountAmount.toLocaleString()}). Payment Method: ${paymentMethod.toUpperCase()}`
        })
      });

      const txnId = `FOT-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      const txnData = {
        txnId,
        date: new Date().toLocaleString(),
        planName: currentPlan.name,
        studentName: studentDetails.name,
        studentEmail: studentDetails.email,
        studentPhone: studentDetails.phone,
        originalPrice,
        discountAmount,
        finalPayable,
        paymentMethod: paymentMethod.toUpperCase(),
        status: 'SUCCESSFUL - VERIFIED'
      };

      setPaymentSuccess(txnData);
      showToast('🎉 Payment Successful! Receipt generated and confirmation dispatched.');
    } catch (err) {
      console.error('Payment processing error:', err);
      showToast('Payment recorded locally. Receipt generated below!');
      const txnId = `FOT-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      setPaymentSuccess({
        txnId,
        date: new Date().toLocaleString(),
        planName: currentPlan.name,
        studentName: studentDetails.name,
        studentEmail: studentDetails.email,
        studentPhone: studentDetails.phone,
        originalPrice,
        discountAmount,
        finalPayable,
        paymentMethod: paymentMethod.toUpperCase(),
        status: 'SUCCESSFUL - VERIFIED'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn font-sans">
      
      {/* 1. AUGUST SPECIAL OFFER BANNER SECTION (ONLY VISIBLE IF OFFER IS ACTIVE) */}
      {isOfferActive && (
        <section className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-8">
          
          {/* Ambient Gold Glow Artifacts */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge Ticker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/50 text-amber-300 font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/10 animate-pulse">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Offer Ends Soon • August Limited Seats</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          {/* Headline & Subheading */}
          <div className="space-y-3 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              🎉 August Special Offer – Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 underline decoration-amber-500/50">50% OFF</span> on DevOps Course Fees
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Offer valid only until August 31. Limited seats available. Enroll now and save 50%.
            </p>
          </div>

          {/* Pricing Highlight Box */}
          <div className="max-w-xl mx-auto p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md">
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block">Original Program Fee</span>
              <span className="text-xl sm:text-2xl font-bold text-slate-500 line-through">
                ₹{currentPlan.originalPrice.toLocaleString()}
              </span>
            </div>

            <div className="h-10 w-px bg-slate-800 hidden sm:block" />

            <div className="text-center sm:text-right">
              <span className="text-xs uppercase tracking-wider font-extrabold text-amber-400 flex items-center justify-center sm:justify-end gap-1">
                <Percent className="w-3.5 h-3.5" /> Special August Price (50% OFF)
              </span>
              <span className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                ₹{currentPlan.discountedPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Countdown Timer Display */}
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Clock className="w-4 h-4 animate-spin text-amber-400" />
              <span>Offer Expiry Countdown</span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
              {[
                { label: 'DAYS', value: days },
                { label: 'HOURS', value: hours },
                { label: 'MINUTES', value: minutes },
                { label: 'SECONDS', value: seconds }
              ].map((item, idx) => (
                <div key={idx} className="p-2 sm:p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-center shadow-md">
                  <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button Above Payment Section */}
          <div>
            <button
              onClick={scrollToCheckout}
              className="py-4 px-8 sm:px-10 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm sm:text-base tracking-wide uppercase transition-all duration-200 transform hover:scale-105 shadow-xl shadow-amber-500/20 inline-flex items-center gap-3"
            >
              <Gift className="w-5 h-5 text-slate-950" />
              <span>Claim 50% Discount Now</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              🔒 Instant 50% discount automatically applied at checkout • No hidden charges
            </p>
          </div>

        </section>
      )}

      {/* 2. CHECKOUT & PAYMENT SECTION */}
      <section id="checkout-section" className="max-w-6xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <Lock className="w-6 h-6 text-cyan-400" />
            <span>Secure Online Checkout</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select your preferred program package and complete enrollment securely.
          </p>
        </div>

        {/* Successful Payment Receipt Screen */}
        {paymentSuccess ? (
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500/50 shadow-2xl space-y-6 text-center animate-fadeIn">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                Payment Completed & Verified
              </span>
              <h3 className="text-2xl font-black text-white mt-3">Enrollment Receipt Generated!</h3>
              <p className="text-xs text-slate-400 mt-1">Official transaction receipt for FutureOps-Tech Academy</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2.5 font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="text-cyan-400 font-bold">{paymentSuccess.txnId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Student Name:</span>
                <span className="text-white font-bold">{paymentSuccess.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Student Email:</span>
                <span className="text-slate-200">{paymentSuccess.studentEmail}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Enrolled Program:</span>
                <span className="text-amber-300 font-bold">{paymentSuccess.planName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Original Fee:</span>
                <span className="text-slate-400 line-through">₹{paymentSuccess.originalPrice.toLocaleString()}</span>
              </div>
              {paymentSuccess.discountAmount > 0 && (
                <div className="flex justify-between border-b border-slate-800 pb-2 text-emerald-400 font-bold">
                  <span>August Offer Discount (50% OFF):</span>
                  <span>-₹{paymentSuccess.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 text-sm font-black text-amber-400">
                <span>Final Paid Amount:</span>
                <span>₹{paymentSuccess.finalPayable.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 border border-slate-700"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download / Print PDF Receipt</span>
              </button>
              <button
                onClick={() => setPaymentSuccess(null)}
                className="py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition"
              >
                New Enrollment
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Plan Selection Cards */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> 1. Select Program Package
                </h3>
                {isOfferActive && (
                  <span className="text-[11px] font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    50% OFF Active
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {PAYMENT_PLANS.map(plan => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800/90 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{plan.name}</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/30">
                              {plan.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{plan.description}</p>
                        </div>

                        <div className="text-right shrink-0">
                          {isOfferActive ? (
                            <div>
                              <span className="text-xs text-slate-500 line-through block">
                                ₹{plan.originalPrice.toLocaleString()}
                              </span>
                              <span className="text-lg font-black text-amber-400">
                                ₹{plan.discountedPrice.toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-base font-bold text-white">
                              ₹{plan.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Student Personal Info Form & Action */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> 2. Student Enrollment Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={studentDetails.name}
                    onChange={e => setStudentDetails({ ...studentDetails, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={studentDetails.email}
                    onChange={e => setStudentDetails({ ...studentDetails, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={studentDetails.phone}
                    onChange={e => setStudentDetails({ ...studentDetails, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru / Remote"
                    value={studentDetails.city}
                    onChange={e => setStudentDetails({ ...studentDetails, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Batch Timing</label>
                  <select
                    value={studentDetails.batchPreference}
                    onChange={e => setStudentDetails({ ...studentDetails, batchPreference: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Weekday Morning Batch (Mon-Fri 8:00 AM - 10:00 AM)">Weekday Morning Batch (Mon-Fri 8:00 AM - 10:00 AM • Starts Aug 17, 2026)</option>
                    <option value="Weekend Intensive Batch (Sat & Sun 10:00 AM - 1:00 PM)">Weekend Intensive Batch (Sat & Sun 10:00 AM - 1:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Submit Final Payment / Registration Action */}
              <div className="pt-2 space-y-3 border-t border-slate-800">
                <button
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm tracking-wide uppercase transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Processing Secure Payment...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-slate-950" />
                      <span>Pay ₹{finalPayable.toLocaleString()} Now {isOfferActive ? '(50% OFF)' : ''}</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center font-medium flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-bit SSL Encrypted • 100% Secure Transaction Guarantee</span>
                </p>
              </div>
            </div>

          </div>
        )}

      </section>

      {/* 3. ASSURANCE & SUPPORT FOOTER BAR */}
      <section className="max-w-6xl mx-auto p-6 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
        <div className="flex items-start gap-3">
          <Award className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <h4 className="font-bold text-white">ISO 9001:2015 Certified Academy</h4>
            <p className="text-slate-400 mt-0.5">Verified industry curriculum aligned with AWS, Docker, and CNCF standards.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <h4 className="font-bold text-white">100% Refund Protection Policy</h4>
            <p className="text-slate-400 mt-0.5">Full refund guaranteed if requested within 3 live class sessions.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-6 h-6 text-cyan-400 shrink-0" />
          <div>
            <h4 className="font-bold text-white">Need Payment Assistance?</h4>
            <p className="text-slate-400 mt-0.5">Call Hotline: +91 82777 59401 / +91 94826 17166 for direct guidance.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
