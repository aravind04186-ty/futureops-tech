import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Homepage Components
import { HeroSection } from './components/home/HeroSection';
import { AboutSection } from './components/home/AboutSection';
import { PlacementPartners } from './components/home/PlacementPartners';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { FAQSection } from './components/home/FAQSection';
import { EnquirySection } from './components/home/EnquirySection';
import { AIBotSection } from './components/home/AIBotSection';
import { RealTimeProjectsSection } from './components/home/RealTimeProjectsSection';

// Sub Pages
import { CoursePage } from './components/pages/CoursePage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { PlacementsPage } from './components/pages/PlacementsPage';
import { StudentReviewsPage } from './components/pages/StudentReviewsPage';
import { BlogPage } from './components/pages/BlogPage';
import { DevOpsGuidePage } from './components/pages/DevOpsGuidePage';
import { ContactPage } from './components/pages/ContactPage';
import { StudentPortal } from './components/pages/StudentPortal';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { LegalPage } from './components/pages/LegalPage';
import { PaymentPage } from './components/pages/PaymentPage';

// Shared Modals
import { DemoBookingModal } from './components/shared/DemoBookingModal';
import { BrochureModal } from './components/shared/BrochureModal';
import { CertificateGeneratorModal } from './components/shared/CertificateGeneratorModal';
import { WhatsAppChatModal } from './components/shared/WhatsAppChatModal';
import { CredentialsModal } from './components/shared/CredentialsModal';
import { TrainingPlansSection } from './components/shared/TrainingPlansSection';
import { OpsBotWidget } from './components/shared/OpsBotWidget';

import { Sparkles, CheckCircle2, MessageCircle, KeyRound } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activePage, 
    toastMessage, 
    setIsDemoModalOpen, 
    setIsWhatsAppModalOpen,
    isCredentialsModalOpen,
    setIsCredentialsModalOpen
  } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-[#111827] flex flex-col font-sans transition-colors duration-300 w-full max-w-full overflow-x-hidden">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-4 left-4 sm:left-auto sm:right-6 max-w-md z-50 p-4 rounded-2xl bg-slate-900 border border-cyan-500/50 text-cyan-200 text-xs font-semibold shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="break-words">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <Header />

      {/* Main Page Routing */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <AboutSection />
            <AIBotSection />
            <RealTimeProjectsSection />
            <TrainingPlansSection />
            <PlacementPartners />
            <FAQSection />
            <EnquirySection />
          </>
        )}

        {activePage === 'course' && <CoursePage />}
        {activePage === 'about' && <AboutUsPage />}
        {activePage === 'projects' && <ProjectsPage />}
        {activePage === 'placements' && <PlacementsPage />}
        {activePage === 'reviews' && <StudentReviewsPage />}
        {activePage === 'blog' && <BlogPage />}
        {activePage === 'guide' && <DevOpsGuidePage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'portal' && <StudentPortal />}
        {activePage === 'admin' && <AdminDashboard />}
        {activePage === 'privacy' && <LegalPage type="privacy" />}
        {activePage === 'terms' && <LegalPage type="terms" />}
        {activePage === 'refund' && <LegalPage type="refund" />}
        {activePage === 'payment' && <PaymentPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Shared Modals */}
      <DemoBookingModal />
      <BrochureModal />
      <CertificateGeneratorModal />
      <WhatsAppChatModal />
      <CredentialsModal isOpen={isCredentialsModalOpen} onClose={() => setIsCredentialsModalOpen(false)} />
      <OpsBotWidget />

      {/* Floating Action Buttons (Mobile & Desktop) */}
      <div className="fixed bottom-5 left-4 z-40 flex items-center space-x-2">
        <button
          onClick={() => setIsWhatsAppModalOpen(true)}
          className="p-3 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:scale-105 transition-all flex items-center gap-2 text-xs font-bold"
          title="WhatsApp Advisor Chat"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="hidden md:inline">WhatsApp Advisor</span>
        </button>
      </div>

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
