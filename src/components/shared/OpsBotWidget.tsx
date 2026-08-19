import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { safeFetchApi } from '../../lib/api';
import { getOpsBotAnswer } from '../../lib/opsBotKnowledge';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Terminal, 
  Copy, 
  Check, 
  RefreshCw, 
  HelpCircle,
  Code,
  Layers,
  Award,
  ChevronDown,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const OpsBotWidget: React.FC = () => {
  const { isAIMentorOpen, setIsAIMentorOpen } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `👋 **Hello! I am OpsBot — Your Advanced DevOps Industry Expert & AI Mentor.**

I specialize in **AWS, Azure, GCP, Linux, Docker, Kubernetes, OpenShift, Terraform, Ansible, Jenkins, GitHub Actions, GitLab CI/CD, ArgoCD, Helm, Python, Bash, Nginx, Prometheus, Grafana, ELK, Vault, DevSecOps, SRE, and Cloud Architecture**.

How can I assist your technical learning, code generation, or production troubleshooting today? Select a topic below or type your question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'DevOps Career Roadmap',
    'Multi-Stage Dockerfile Best Practices',
    'Kubernetes Production Manifest',
    'Terraform AWS VPC Module',
    'K8s Pod RCA Troubleshooting',
    'DevSecOps CI/CD Pipeline'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAIMentorOpen) {
      scrollToBottom();
    }
  }, [messages, isAIMentorOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAIMentorOpen) {
        setIsAIMentorOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAIMentorOpen, setIsAIMentorOpen]);

  const handleSend = async (customPrompt?: string) => {
    const userText = (customPrompt || input).trim();
    if (!userText || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const apiRes = await safeFetchApi('/api/ai-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          history: messages.slice(-6).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const botReply = (apiRes.ok && apiRes.data && apiRes.data.reply && typeof apiRes.data.reply === 'string' && apiRes.data.reply.trim()) 
        ? apiRes.data.reply 
        : getOpsBotAnswer(userText);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const fallbackReply = getOpsBotAnswer(userText);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Render markdown code blocks nicely
  const renderFormattedText = (text: string) => {
    // Split by code blocks ```
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const firstLineEnd = part.indexOf('\n');
        const lang = firstLineEnd !== -1 ? part.slice(3, firstLineEnd).trim() : '';
        const code = firstLineEnd !== -1 ? part.slice(firstLineEnd + 1, -3) : part.slice(3, -3);

        return (
          <div key={index} className="my-3 rounded-xl bg-[#1E293B] text-slate-100 overflow-hidden border border-slate-700 text-xs font-mono">
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#0F172A] border-b border-slate-700 text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold uppercase">
                <Terminal className="w-3 h-3" /> {lang || 'code'}
              </span>
              <button
                onClick={() => copyToClipboard(`code-${index}`, code)}
                className="hover:text-white transition flex items-center gap-1"
              >
                {copiedId === `code-${index}` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" /> <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 overflow-x-auto whitespace-pre-wrap leading-relaxed">{code}</pre>
          </div>
        );
      }

      // Render regular text with bold/headings formatting
      const lines = part.split('\n');
      return (
        <div key={index} className="space-y-1.5 leading-relaxed text-sm">
          {lines.map((line, lIdx) => {
            if (line.startsWith('## ')) {
              return <h3 key={lIdx} className="text-base font-bold text-[#111827] dark:text-white mt-3 mb-1">{line.replace('## ', '')}</h3>;
            }
            if (line.startsWith('### ')) {
              return <h4 key={lIdx} className="text-sm font-bold text-[#111827] dark:text-white mt-2 mb-1">{line.replace('### ', '')}</h4>;
            }
            if (line.startsWith('- ') || line.startsWith('* ')) {
              return (
                <div key={lIdx} className="flex items-start gap-2 pl-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{line.substring(2)}</span>
                </div>
              );
            }
            if (line.trim() === '') return <div key={lIdx} className="h-1" />;
            return <p key={lIdx}>{line}</p>;
          })}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom Right */}
      <button
        onClick={() => setIsAIMentorOpen(!isAIMentorOpen)}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-600/40 border border-blue-400 flex items-center space-x-2 transition-all duration-300 hover:scale-105 group"
        title="OpsBot — FutureOps Tech Mentor"
      >
        <div className="relative">
          <Bot className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-blue-600 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-blue-600" />
        </div>
        <span className="font-bold text-xs pr-1 hidden sm:inline">OpsBot AI Mentor</span>
      </button>

      {/* OpsBot Drawer / Modal Window */}
      {isAIMentorOpen && (
        <div className={`fixed z-50 transition-all duration-300 ${
          isExpanded 
            ? 'inset-4 sm:inset-10' 
            : 'bottom-20 right-4 sm:right-6 w-[95vw] sm:w-[460px] h-[600px] max-h-[85vh]'
        }`}>
          <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Header Bar */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm font-poppins">OpsBot</h3>
                    <span className="text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                      FutureOps Tech Mentor
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online • 24/7 DevOps Guidance
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition text-white"
                  title={isExpanded ? "Restore standard size" : "Expand window"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsAIMentorOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition text-white"
                  title="Close OpsBot"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 flex items-center space-x-2 overflow-x-auto shrink-0 scrollbar-none">
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" /> Topics:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-[11px] font-semibold text-[#111827] dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-cyan-400 transition shrink-0 whitespace-nowrap shadow-xs"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-slate-900/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white dark:bg-slate-800 text-[#111827] dark:text-slate-100 border border-gray-200 dark:border-slate-700/80 rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-75">
                      <span className="font-bold uppercase tracking-wider">
                        {msg.sender === 'user' ? 'You' : 'OpsBot AI Mentor'}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className="text-xs">
                      {msg.sender === 'user' ? (
                        <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                      ) : (
                        renderFormattedText(msg.text)
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-gray-200 dark:border-slate-700 flex items-center space-x-3 text-xs text-[#6B7280] shadow-xs">
                    <Bot className="w-4 h-4 text-blue-600 animate-spin" />
                    <span className="font-medium animate-pulse">OpsBot is generating response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 flex items-center space-x-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask OpsBot about Docker, K8s, AWS, Terraform, Roadmaps..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs text-[#111827] dark:text-slate-100 placeholder-[#6B7280] focus:outline-none focus:border-blue-600 dark:focus:border-cyan-400 transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold transition shadow-sm"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};
