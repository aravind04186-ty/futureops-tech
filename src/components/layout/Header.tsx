import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ActivePage } from '../../types';
import logoImg from '../../assets/images/futureops_new_logo_1785916070990.jpg';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Sun, 
  Moon, 
  UserCheck, 
  Search, 
  Menu, 
  X, 
  Terminal, 
  Sparkles,
  Award,
  Video,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Flame,
  Bot,
  KeyRound
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    user, 
    setIsDemoModalOpen, 
    setIsBrochureModalOpen, 
    setIsCertificateModalOpen,
    setIsAIMentorOpen,
    setIsWhatsAppModalOpen,
    setIsCredentialsModalOpen,
    searchQuery,
    setSearchQuery,
    loginAsStudent,
    loginAsAdmin
  } = useAuth();

  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Automatically active only until August 31, 2026 at 23:59:59
  const isOfferActive = Date.now() <= new Date('2026-08-31T23:59:59').getTime();

  // Close mobile menu on screen resize to desktop or ESC key press, and manage body scroll lock
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-300">
      
      {/* Top Banner Alert Ticker & Contact Info */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-b border-slate-800 text-slate-200 text-xs py-1.5 px-2.5 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-2">
          
          {/* Ticker Notice */}
          <div className="flex items-center space-x-2 overflow-hidden w-full md:w-auto justify-between md:justify-start">
            <span className="flex items-center gap-1 font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[10px] sm:text-[11px] shrink-0">
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse" /> ADMISSIONS OPEN
            </span>
            <p className="truncate text-[10px] sm:text-xs text-slate-300">
              🔥 Next Batch starts next Monday! <span className="hidden sm:inline text-cyan-400 font-medium">Limited 15 Seats per Cohort for 1-on-1 Mentor Support.</span>
            </p>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-[10px] sm:text-[11px] text-slate-300 shrink-0 w-full md:w-auto overflow-x-auto no-scrollbar py-0.5">
            <a href="tel:+918277759401" className="hover:text-cyan-400 transition flex items-center gap-1 shrink-0">
              <Phone className="w-3 h-3 text-cyan-400" /> +91 82777 59401
            </a>
            <a href="tel:+919482617166" className="hover:text-cyan-400 transition items-center gap-1 hidden xl:flex shrink-0">
              <Phone className="w-3 h-3 text-cyan-400" /> +91 94826 17166
            </a>
            <button onClick={() => setIsWhatsAppModalOpen(true)} className="hover:text-emerald-400 transition flex items-center gap-1 shrink-0">
              <MessageCircle className="w-3 h-3 text-emerald-400" /> WhatsApp
            </button>
            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="hover:text-amber-300 transition underline underline-offset-2 hidden lg:inline shrink-0"
            >
              Download Brochure
            </button>
            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="hover:text-amber-300 transition flex items-center gap-1 hidden lg:flex shrink-0"
            >
              <Award className="w-3 h-3 text-amber-400" /> Certificate
            </button>
          </div>

        </div>
      </div>

      {/* Main Corporate Header Bar */}
      <div className="bg-white/95 dark:bg-slate-950/95 border-b border-gray-200 dark:border-slate-800/80 px-2.5 sm:px-8 py-2.5 sm:py-3 transition-colors shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group min-w-0 shrink"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-gray-200 dark:border-slate-800 p-0.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img 
                src={logoImg} 
                alt="FutureOps-Tech Logo" 
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <span className="text-base sm:text-xl font-black tracking-tight text-gray-900 dark:text-white font-poppins truncate">
                  FutureOps<span className="text-blue-600 dark:text-cyan-400">-Tech</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded bg-blue-100 dark:bg-cyan-500/20 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/30 shrink-0">
                  OFFICIAL
                </span>
              </div>
              <p className="text-[8px] sm:text-[10px] font-semibold text-gray-500 dark:text-slate-400 tracking-wider uppercase truncate">
                Build • Automate • Deploy • Scale
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'course', label: 'DevOps Course' },
              { id: 'payment', label: 'Fee Payment' },
              { id: 'projects', label: 'Real Projects' },
              { id: 'placements', label: 'Placements' },
              { id: 'guide', label: 'Career Guide' },
              { id: 'blog', label: 'Blog' },
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Contact' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id as ActivePage)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                  activePage === link.id
                    ? 'text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700/80 font-bold'
                    : link.id === 'payment'
                    ? 'text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
                    : 'text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/40'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'payment' && isOfferActive && (
                  <span className="text-[9px] font-black bg-amber-500 text-slate-950 px-1 rounded animate-pulse">
                    50%
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Control Action Items */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            
            {/* Search Input Toggle */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search tools, modules, projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-44 lg:w-56 px-3.5 py-1.5 pl-9 rounded-xl bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 text-xs text-gray-900 dark:text-slate-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:w-64 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 transition shrink-0"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-gray-700" />}
            </button>

            {/* Portal Login / User Status */}
            {user ? (
              <button
                onClick={() => handleNavClick(user.role === 'admin' ? 'admin' : 'portal')}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-600/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-600/30 transition shrink-0"
              >
                <UserCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="max-w-[70px] sm:max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center space-x-1.5">
                <button
                  onClick={() => handleNavClick('portal')}
                  className="px-2.5 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-blue-600 dark:text-cyan-300 border border-gray-200 dark:border-slate-700 text-xs font-bold transition flex items-center gap-1"
                  title="Student Portal Login"
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>Student Login</span>
                </button>
                <button
                  onClick={loginAsAdmin}
                  className="p-1.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400 hover:text-gray-900 border border-gray-200 dark:border-slate-700 text-[10px] font-semibold transition"
                  title="Admin Dashboard"
                >
                  Admin
                </button>
              </div>
            )}

            {/* OpsBot AI Mentor Button */}
            <button
              onClick={() => setIsAIMentorOpen(true)}
              className="p-1.5 sm:py-2 sm:px-3 rounded-xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-slate-700 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0"
              title="OpsBot — FutureOps Tech AI Mentor"
            >
              <Bot className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
              <span className="hidden lg:inline">OpsBot AI</span>
            </button>

            {/* Book Free Demo CTA Button */}
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors duration-200 shadow-md shadow-blue-600/20 flex items-center gap-1 sm:gap-1.5 shrink-0"
            >
              <Video className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Book Free Demo</span>
              <span className="sm:hidden text-[11px]">Demo</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="xl:hidden min-w-[38px] min-h-[38px] sm:min-w-[44px] sm:min-h-[44px] p-2 sm:p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-100 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 transition-transform active:scale-95 flex items-center justify-center shrink-0 shadow-xs"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-gray-900 dark:text-white" /> : <Menu className="w-5 h-5 text-gray-900 dark:text-white" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <>
          {/* Tap-outside Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 xl:hidden transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute top-full left-0 right-0 z-50 xl:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 sm:px-6 py-5 space-y-4 animate-fadeIn max-h-[80vh] overflow-y-auto shadow-2xl">
            
            {/* Mobile Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search DevOps courses & topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-gray-400 dark:text-slate-400 absolute left-3.5 top-3" />
            </div>

            {/* Navigation Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-semibold">
              {[
                { id: 'home', label: 'Home' },
                { id: 'course', label: 'DevOps Course' },
                { id: 'payment', label: 'Fee Payment', highlight: true },
                { id: 'projects', label: 'Real Projects' },
                { id: 'placements', label: 'Placements' },
                { id: 'guide', label: 'Career Guide' },
                { id: 'blog', label: 'Blog & Roadmap' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact Us' },
                { id: 'portal', label: 'Student Portal (LMS)' },
                { id: 'admin', label: 'Admin Dashboard' }
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id as ActivePage)}
                  className={`p-3 rounded-xl text-left transition flex items-center justify-between min-h-[44px] ${
                    activePage === link.id
                      ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-500/30 font-bold'
                      : link.highlight
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 font-bold hover:bg-amber-500/20'
                      : 'bg-gray-50 dark:bg-slate-800/60 text-gray-800 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{link.label}</span>
                    {link.id === 'payment' && isOfferActive && (
                      <span className="text-[10px] font-black bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded animate-pulse shrink-0">
                        50% OFF
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 dark:text-slate-500 shrink-0" />
                </button>
              ))}
            </div>

            {/* Mobile Quick Action Tools & Shortcuts */}
            <div className="pt-3 border-t border-gray-200 dark:border-slate-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => { setIsAIMentorOpen(true); setMobileMenuOpen(false); }}
                className="py-2.5 px-3 min-h-[44px] rounded-xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-slate-700 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span className="truncate">OpsBot AI</span>
              </button>
              <button
                onClick={() => { setIsCertificateModalOpen(true); setMobileMenuOpen(false); }}
                className="py-2.5 px-3 min-h-[44px] rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">Verify Certificate</span>
              </button>
            </div>

            {/* Mobile Main CTA Buttons */}
            <div className="pt-2 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => { setIsBrochureModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 min-h-[44px] rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 text-xs font-semibold text-center border border-gray-200 dark:border-slate-700"
              >
                Download 32-Page Brochure
              </button>
              <button
                onClick={() => { setIsDemoModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full py-2.5 min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center shadow-lg shadow-blue-600/20"
              >
                Book Free Live Demo Seat
              </button>
            </div>

          </div>
        </>
      )}

    </header>
  );
};
