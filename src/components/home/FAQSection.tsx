import React, { useState } from 'react';
import { faqsData } from '../../data/faqsData';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Eligibility', 'General', 'Curriculum', 'Placement', 'Schedule', 'Certification'];

  const filteredFaqs = faqsData.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-20 bg-white border-b border-gray-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-poppins">
            Got Questions? We Have Clear Answers
          </h2>
          <p className="text-sm text-[#6B7280]">
            Find everything you need to know about eligibility, course duration, placement support, and live class timings.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQ questions (e.g. coding required, placement, batch timing)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-xl bg-gray-50 border border-gray-200 text-[#111827] text-sm placeholder-[#6B7280] focus:outline-none focus:border-blue-500"
            />
            <Search className="w-5 h-5 text-[#6B7280] absolute left-4 top-3.5" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 border ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-[#6B7280] border-gray-200 hover:bg-gray-50 hover:text-[#111827]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 text-[#6B7280] text-sm">
              No matching FAQ questions found. Please try another search term or contact our advisors.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-white border border-gray-100 shadow-md overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-bold text-[#111827] text-sm sm:text-base">{faq.question}</span>
                    <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#6B7280] leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
