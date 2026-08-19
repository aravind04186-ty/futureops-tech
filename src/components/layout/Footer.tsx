import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ActivePage } from '../../types';
import logoImg from '../../assets/images/futureops_new_logo_1785916070990.jpg';
import { 
  Terminal, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  ArrowUp,
  Globe,
  Github,
  Linkedin,
  Youtube,
  Twitter
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setIsDemoModalOpen, setIsBrochureModalOpen } = useAuth();

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-[#6B7280] border-t border-gray-200 transition-colors">
      
      {/* Top CTA Bar */}
      <div className="bg-blue-50 border-b border-gray-200 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Transform Your IT Career</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Ready to Become a High-Paid DevOps Engineer?</h3>
            <p className="text-sm text-[#6B7280]">Join our upcoming live batch. Master AWS, Kubernetes, Terraform & CI/CD with real projects.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white text-sm transition-colors duration-200 shadow-sm"
            >
              Book Free Demo Session
            </button>
            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="py-3 px-6 rounded-xl bg-white hover:bg-gray-100 text-[#111827] font-semibold text-sm border border-gray-300 transition-colors duration-200 shadow-sm"
            >
              Download Course Brochure
            </button>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 p-0.5 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
              <img 
                src={logoImg} 
                alt="FutureOps-Tech Logo" 
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xl font-black text-[#111827] font-poppins">FutureOps<span className="text-blue-600">-Tech</span></span>
              <p className="text-[10px] font-semibold text-[#6B7280] tracking-wider">BUILD • AUTOMATE • DEPLOY • SCALE</p>
            </div>
          </div>

          <p className="text-xs text-[#6B7280] leading-relaxed pr-4">
            FutureOps-Tech is a premier corporate DevOps Training Academy delivering industry-ready hands-on education in Cloud Computing, CI/CD Pipelines, Kubernetes Orchestration, Terraform IaC, DevSecOps, and Site Reliability Engineering.
          </p>

          <div className="flex items-center space-x-3 text-[#6B7280] pt-2">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 hover:text-blue-600 transition-colors border border-gray-200">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 hover:text-blue-600 transition-colors border border-gray-200">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 hover:text-rose-600 transition-colors border border-gray-200">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 hover:text-blue-600 transition-colors border border-gray-200">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>ISO 9001:2025 Certified Corporate Tech Training Institute</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-xs text-[#6B7280]">
            {['home', 'course', 'payment', 'projects', 'placements', 'guide', 'blog', 'about', 'contact'].map((p) => (
              <li key={p}>
                <button 
                  onClick={() => handleNav(p as ActivePage)}
                  className="hover:text-blue-600 transition-colors capitalize flex items-center gap-1"
                >
                  › {p === 'course' ? 'DevOps Course' : p === 'payment' ? 'Fee Payment (50% OFF)' : p === 'guide' ? 'Career Guide' : p}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* DevOps Curriculum Technologies */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Key Modules</h4>
          <ul className="space-y-1.5 text-xs text-[#6B7280]">
            <li>• Linux & Shell Automation</li>
            <li>• Docker & Microservices</li>
            <li>• Kubernetes Orchestration</li>
            <li>• AWS Cloud & Amazon EKS</li>
            <li>• Terraform IaC Infrastructure</li>
            <li>• Jenkins CI/CD Automation</li>
            <li>• GitOps with ArgoCD</li>
            <li>• Prometheus & Grafana</li>
            <li>• DevSecOps & Security Scans</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Contact Academy</h4>
          <div className="space-y-2.5 text-xs text-[#6B7280]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>#113, 5th Cross, Basaveshwara Layout, Near BSNL Office, Chandra Layout, Bangalore - 560040</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <a href="tel:+918277759401" className="hover:text-[#111827] transition-colors">+91 82777 59401</a>
                <a href="tel:+919482617166" className="hover:text-[#111827] transition-colors">+91 94826 17166</a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <a href="https://wa.me/918277759401" target="_blank" rel="noreferrer" className="hover:text-[#111827] transition-colors">+91 82777 59401 (WhatsApp)</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <a href="mailto:futureopstech@gmail.com" className="hover:text-[#111827] transition-colors">futureopstech@gmail.com</a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-gray-200 bg-gray-50 py-6 px-4 sm:px-8 text-xs text-[#6B7280]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FutureOps-Tech.com. All Rights Reserved. Designed for DevOps Excellence.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => handleNav('privacy')} className="hover:text-[#111827] transition-colors">Privacy Policy</button>
            <button onClick={() => handleNav('terms')} className="hover:text-[#111827] transition-colors">Terms & Conditions</button>
            <button onClick={() => handleNav('refund')} className="hover:text-[#111827] transition-colors">Refund Policy</button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded bg-white border border-gray-200 hover:bg-gray-100 text-[#111827] transition-colors shadow-sm"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
