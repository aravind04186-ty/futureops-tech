import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  Bot, 
  Award, 
  FileText, 
  Terminal, 
  Zap, 
  ChevronRight,
  UserCheck,
  Send,
  HelpCircle
} from 'lucide-react';
import { TechLogo } from './TechLogo';

export interface PlanItem {
  id: string;
  num: string;
  title: string;
  price: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  duration: string;
  highlights: string[];
  toolsCovered: string[];
  features: string[];
  icon: any;
  popular?: boolean;
}

export const trainingPlans: PlanItem[] = [
  {
    id: 'plan-1',
    num: '01',
    title: 'DevOps Training',
    price: '₹50,000',
    badge: 'CORE TECHNICAL MASTERY',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
    tagline: 'Comprehensive hands-on training covering all essential DevOps tools, cloud architecture, and CI/CD automation.',
    duration: '12-16 Weeks Live Cohort',
    icon: Terminal,
    popular: false,
    highlights: [
      'Complete Hands-on DevOps Tools',
      'Linux, Docker, Kubernetes & AWS',
      '100% Practical Cloud Sandbox Labs',
      'Capstones & Verified Certification'
    ],
    toolsCovered: [
      'Linux', 'Git', 'Jenkins', 'Docker', 'Kubernetes', 'Ansible', 'Terraform', 'AWS', 'Prometheus', 'Grafana', 'SonarQube', 'ArgoCD', 'Python', 'Shell Scripting'
    ],
    features: [
      'Linux Administration, Shell Scripting & Python Automation',
      'Git & GitHub Advanced Version Control & Branching Strategy',
      'Docker Containerization, Multi-Stage Builds & Trivy Security Scans',
      'Kubernetes (EKS) Cluster Deployments, Services & Ingress Controllers',
      'AWS Cloud Infrastructure (EC2, VPC, S3, IAM, Route53)',
      'HashiCorp Terraform Infrastructure as Code (IaC) with State Locking',
      'Ansible Configuration Management & Automation Playbooks',
      'Jenkins CI/CD Pipeline as Code & ArgoCD GitOps Integration',
      'Prometheus, Grafana & Loki Full-Stack Observability',
      'SonarQube Code Quality & Trivy Container Security Scans',
      'Real-Time Production Capstone Projects & Cloud Sandbox Access',
      'Course Completion Certificate & Official Credential Badge'
    ]
  },
  {
    id: 'plan-2',
    num: '02',
    title: 'DevOps Training + Profile Building',
    price: '₹75,000',
    badge: 'MOST POPULAR',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    tagline: 'All essential DevOps tools training paired with expert profile creation, ATS resume overhaul, and recruiter magnet branding.',
    duration: '16-18 Weeks Live Cohort',
    icon: ShieldCheck,
    popular: true,
    highlights: [
      'Includes ALL Tools in DevOps Training',
      'Dedicated Workshop for Profile Building',
      'ATS Resume Built by Our Team',
      'LinkedIn & GitHub Profile Overhaul'
    ],
    toolsCovered: [
      'Linux', 'Git', 'Jenkins', 'Docker', 'Kubernetes', 'Ansible', 'Terraform', 'AWS', 'Prometheus', 'Grafana', 'SonarQube', 'ArgoCD', 'Python', 'Shell Scripting'
    ],
    features: [
      '✨ Includes ALL tools covered in DevOps Training (Git, Linux, Jenkins, Docker, K8s, Ansible, Terraform, AWS, Prometheus, Grafana, SonarQube, ArgoCD)',
      '🎓 Dedicated Workshop for Profile Building & Personal Branding',
      '📄 Professional ATS-Optimized DevOps Resume Built by Our Team',
      '🧲 Recruiter-Magnet LinkedIn Profile Overhaul for Inbound Recruiter DMs',
      '💻 Production-Grade GitHub Project Portfolio & Repositories Setup',
      '🛠️ Real-world Architecture Diagrams & Repository Documentation',
      'Capstone Real-World Production Projects',
      'Course Completion Certificate & Official Credential Badge'
    ]
  },
  {
    id: 'plan-3',
    num: '03',
    title: 'DevOps Training + Profile Building + Interview Assistance',
    price: '₹1,00,000',
    badge: 'PREMIUM — PLACEMENT SUPPORT',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    tagline: 'The ultimate career transformation program with expert interview workshops, mock rounds, and full-time interview support until placement.',
    duration: '20-24 Weeks Elite Program',
    icon: Briefcase,
    popular: false,
    highlights: [
      'All Tools + Complete Profile Building',
      'Interview Workshops by Industry Experts',
      'Unlimited 1-on-1 Mock Interviews',
      'Full-Time Interview Support Until Placement'
    ],
    toolsCovered: [
      'Linux', 'Git', 'Jenkins', 'Docker', 'Kubernetes', 'Ansible', 'Terraform', 'AWS', 'Prometheus', 'Grafana', 'SonarQube', 'ArgoCD', 'Python', 'Shell Scripting'
    ],
    features: [
      '✨ Includes ALL tools covered in DevOps Training',
      '🎓 Dedicated Workshop for Profile Building + Resume, LinkedIn & GitHub Built by Our Team',
      '👨‍💼 Dedicated Workshop for Interview Preparation led by Industry Experts (HR, Managers, Tech Leads)',
      '🎤 Unlimited 1-on-1 Mock Technical Interviews with Senior DevOps Architects',
      '🤝 Full-Time Interview Support Until Placement',
      '🎯 500+ Solved Production Scenario Questions (AWS, K8s, Terraform, CI/CD)',
      '🚨 Incident Management, CrashLoopBackOff & Live Troubleshooting Drills',
      '💼 Direct Referral Drives with 150+ Corporate Hiring Partners',
      '💰 Offer Salary Benchmarking & Executive HR Negotiation Guidance'
    ]
  }
];

export const TrainingPlansSection: React.FC = () => {
  const { setActivePage, setSelectedProgramForEnquiry, showToast } = useAuth();
  
  // Offer is active only until August 31, 2026 at 23:59:59
  const isOfferActive = Date.now() <= new Date('2026-08-31T23:59:59').getTime();
  
  // Track open detail input forms for each plan
  const [activeDetailForm, setActiveDetailForm] = useState<string | null>(null);
  const [userInputs, setUserInputs] = useState<Record<string, { name: string; phone: string; email: string; note: string }>>({
    'plan-1': { name: '', phone: '', email: '', note: '' },
    'plan-2': { name: '', phone: '', email: '', note: '' },
    'plan-3': { name: '', phone: '', email: '', note: '' }
  });

  const handleRedirectToContact = (plan: PlanItem, customDetails?: { name: string; phone: string; email: string; note: string }) => {
    // Save selected program to AuthContext so Enquiry form can pre-fill it
    setSelectedProgramForEnquiry(plan.title);

    let toastMsg = `Selected "${plan.title}". Redirecting to Contact Us Portal...`;
    if (customDetails?.name || customDetails?.phone) {
      toastMsg = `Details recorded for ${plan.title}! Redirecting to Contact Us Portal...`;
    }
    showToast(toastMsg);

    // Switch page to Contact page
    setActivePage('contact');

    // Smooth scroll to top/enquiry form after route change
    setTimeout(() => {
      const enquiryElem = document.getElementById('enquiry');
      if (enquiryElem) {
        enquiryElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  const handleInputChange = (planId: string, field: string, value: string) => {
    setUserInputs(prev => ({
      ...prev,
      [planId]: {
        ...(prev[planId] || { name: '', phone: '', email: '', note: '' }),
        [field]: value
      }
    }));
  };

  return (
    <section id="training-plans" className="py-16 bg-gray-50 text-[#111827] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 uppercase tracking-wider">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Training Programs & Fee Plans</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-poppins text-[#111827] leading-tight">
            Select Your DevOps Career Track
          </h2>

          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Transparent pricing with 100% practical hands-on training. Select any plan below to get started or request personalized career counselor guidance.
          </p>
        </div>

        {/* 3 Pricing Plans Side-by-Side Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {trainingPlans.map((plan) => {
            const IconComp = plan.icon;
            const isFormOpen = activeDetailForm === plan.id;
            const currentInput = userInputs[plan.id] || { name: '', phone: '', email: '', note: '' };

            return (
              <div
                key={plan.id}
                className={`p-6 sm:p-8 rounded-3xl bg-white border transition-all duration-300 relative flex flex-col justify-between ${
                  plan.popular 
                    ? 'border-blue-500 shadow-2xl ring-2 ring-blue-500/20 lg:-translate-y-2' 
                    : 'border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase px-4 py-1 rounded-full shadow-md tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div className="space-y-6">
                  
                  {/* Badge & Number */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-600 font-mono bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      PLAN {plan.num}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#111827] font-poppins leading-snug flex items-start gap-2 min-h-[56px]">
                      <IconComp className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                      <span>{plan.title}</span>
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Callout Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-gray-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Total Program Fee</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-black text-[#111827] font-mono">
                        {plan.price}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        All-Inclusive
                      </span>
                    </div>
                    <div className="text-[11px] text-[#6B7280] pt-1">
                      ⏱️ Duration: <strong className="text-[#111827]">{plan.duration}</strong>
                    </div>
                  </div>

                  {/* Tools Covered Chips */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-blue-600" /> Essential Tools Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.toolsCovered.map((tool, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded-md border border-slate-200 flex items-center gap-1.5">
                          <TechLogo name={tool} className="w-3.5 h-3.5 shrink-0" />
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-600" /> Key Features & Deliverables:
                    </span>
                    <ul className="space-y-2 text-xs text-[#111827]">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom Action Area */}
                <div className="pt-6 space-y-3 mt-6 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedProgramForEnquiry(plan.title);
                      setActivePage('payment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 px-5 rounded-xl font-black text-xs transition-all duration-200 shadow-md flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 uppercase tracking-wide group"
                  >
                    <Zap className="w-4 h-4 text-slate-950" />
                    <span>Pay Online {isOfferActive ? '(50% OFF Offer)' : ''}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleRedirectToContact(plan)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all duration-200 border flex items-center justify-center space-x-2 ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                        : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
                    }`}
                  >
                    <span>Request Callback / Enquiry</span>
                  </button>

                  <button
                    onClick={() => setActiveDetailForm(isFormOpen ? null : plan.id)}
                    className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#111827] text-[11px] font-semibold transition-all duration-200 border border-gray-200 flex items-center justify-center space-x-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isFormOpen ? 'Hide Quick Enquiry' : 'Quick Enquiry Form'}</span>
                  </button>

                  {/* Inline Form inside Card */}
                  {isFormOpen && (
                    <div className="p-4 rounded-2xl bg-gray-50 border border-blue-200 space-y-3 mt-2 animate-fadeIn text-left">
                      <div className="text-[11px] font-bold text-[#111827] border-b border-gray-200 pb-1 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-blue-600" /> Quick Details
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] text-[#111827] font-semibold mb-0.5">Full Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Rahul Sharma"
                            value={currentInput.name}
                            onChange={e => handleInputChange(plan.id, 'name', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-gray-300 text-[#111827] text-xs focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#111827] font-semibold mb-0.5">Mobile / WhatsApp</label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={currentInput.phone}
                            onChange={e => handleInputChange(plan.id, 'phone', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-gray-300 text-[#111827] text-xs focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-[#111827] font-semibold mb-0.5">Specific Query</label>
                          <input
                            type="text"
                            placeholder="e.g. Preferred batch timing..."
                            value={currentInput.note}
                            onChange={e => handleInputChange(plan.id, 'note', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-gray-300 text-[#111827] text-xs focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleRedirectToContact(plan, currentInput)}
                        className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow"
                      >
                        <Send className="w-3 h-3" />
                        <span>Submit & Go to Contact</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Global Footer Banner Callout */}
        <div className="p-8 rounded-3xl bg-white border border-gray-200 text-center space-y-4 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-[#111827] font-poppins">
            Need Help Choosing the Right Program for Your Background?
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mx-auto">
            Our Senior Career Counselors are available 24/7 on WhatsApp & Phone call to evaluate your background and recommend the optimal learning track.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setSelectedProgramForEnquiry('DevOps Training + Profile Building + Interview Assistance');
                setActivePage('contact');
              }}
              className="py-3 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all duration-200 shadow flex items-center gap-2"
            >
              <span>Go to Contact Us Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/918277759401"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all duration-200 flex items-center gap-2 shadow"
            >
              <span>WhatsApp Counselor Hotline (+91 8277759401)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
