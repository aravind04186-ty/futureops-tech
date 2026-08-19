import React, { useState } from 'react';
import { blogPostsData } from '../../data/blogData';
import { BlogPost } from '../../types';
import { BookOpen, Clock, User, Tag, ArrowRight, X } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="space-y-16 py-10 animate-fadeIn">
      
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            DevOps Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins">
            Technical Guides, Roadmaps & Interview Cheatsheets
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stay updated with cutting-edge cloud insights, Kubernetes tutorials, Terraform practices, and career advice written by FutureOps-Tech Senior Mentors.
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPostsData.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-cyan-500/40 transition group flex flex-col justify-between"
            >
              <div className="space-y-4 p-6">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 text-cyan-400 text-xs font-bold backdrop-blur">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-cyan-400" /> {post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-200 text-xs font-bold transition flex items-center justify-center space-x-2 border border-slate-700"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-lg bg-cyan-600/20 text-cyan-400">
                  <BookOpen className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-white">{selectedPost.title}</h3>
                  <p className="text-xs text-slate-400">{selectedPost.author} • {selectedPost.date}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-56 object-cover rounded-xl border border-slate-800"
                referrerPolicy="no-referrer"
              />

              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {selectedPost.content}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold transition"
                >
                  Close Article
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
