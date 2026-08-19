import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Send, Phone, CheckCheck, Bot, Sparkles, RefreshCw, ExternalLink, MessageSquare, ShieldCheck, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  phoneNumber?: string;
}

const GREETINGS_REGEX = /^(hi|hii|hiii|hello|hai|hey|helo|namaste|start|info|hola|greetings)/i;

const RANDOM_PHONE_NUMBERS = [
  '+91 98765 43210',
  '+91 82777 59401',
  '+91 91234 56789',
  '+91 88888 99999',
  '+91 70192 83746',
  '+91 94480 12345',
  '+91 81050 67890'
];

export const WhatsAppChatModal: React.FC = () => {
  const { isWhatsAppModalOpen, setIsWhatsAppModalOpen, showToast, setIsDemoModalOpen } = useAuth();
  
  const [phoneNumber, setPhoneNumber] = useState<string>('+91 98765 43210');
  const [userName, setUserName] = useState<string>('Guest Candidate');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "👋 *Welcome to FutureOps-Tech WhatsApp Admission Desk (+91 82777 59401)!*\n\nSend *'hi'*, *'hii'*, *'hello'*, or *'hai'* to activate our automated WhatsApp course counselor bot.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isWhatsAppModalOpen) {
      scrollToBottom();
    }
  }, [messages, isWhatsAppModalOpen]);

  if (!isWhatsAppModalOpen) return null;

  const generateRandomPhoneNumber = () => {
    const random = RANDOM_PHONE_NUMBERS[Math.floor(Math.random() * RANDOM_PHONE_NUMBERS.length)];
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newNum = random.substring(0, 11) + randomSuffix;
    setPhoneNumber(newNum);
    showToast(`Switched chat number to: ${newNum}`);
  };

  const processBotReply = (userText: string, currentPhone: string) => {
    const textLower = userText.trim().toLowerCase();
    let replyText = "";

    if (GREETINGS_REGEX.test(textLower)) {
      replyText = `Hello! 👋 Welcome to *FutureOps-Tech DevOps Academy!* I am your 24/7 WhatsApp Admission Advisor. 🚀\n\nHow can I help you today?\n1️⃣ Course Modules & AWS/Kubernetes Syllabus\n2️⃣ Upcoming Batch Timings (Weekday & Weekend)\n3️⃣ Course Duration & Program Details\n4️⃣ Book Free Live Demo Class\n5️⃣ Speak to Senior Counselor (+91 82777 59401 / +91 94826 17166)\n\n*Reply with 1, 2, 3, 4, 5 or ask any question directly!*`;
    } else if (textLower === '1' || textLower.includes('syllabus') || textLower.includes('module') || textLower.includes('course')) {
      replyText = `📚 *DevOps Master Program Syllabus:*
• *Cloud Infra:* AWS (EC2, VPC, S3, IAM, EKS, Route53)
• *Containers & Orchestration:* Docker, Kubernetes, Helm
• *IaC & Automation:* Terraform, Ansible, Shell Scripting, Python
• *CI/CD Pipelines:* Jenkins, GitHub Actions, ArgoCD
• *Observability:* Prometheus, Grafana, ELK Stack
• *Real Projects:* Production Grade Infrastructure Projects

Type *'4'* to reserve a seat in our upcoming Live Demo session!`;
    } else if (textLower === '2' || textLower.includes('timing') || textLower.includes('batch') || textLower.includes('schedule')) {
      replyText = `🗓️ *Upcoming Live Batch Timing:*
• *Weekday Morning Batch:* Mon - Fri (8:00 AM - 10:00 AM IST) [Starts Aug 17, 2026]

📍 *Learning Mode:* Live Interactive Online + Offline Campus (Chandra Layout, Bangalore).

Reply *4* to book your free demo class!`;
    } else if (textLower === '3' || textLower.includes('fee') || textLower.includes('price') || textLower.includes('cost') || textLower.includes('program') || textLower.includes('plan')) {
      replyText = `💰 *FutureOps-Tech Official Pricing & Training Plans:*

1️⃣ *DevOps Training — ₹50,000*
• Full tools mastery: Git, Linux, Jenkins, Docker, K8s, Ansible, Terraform, AWS, Prometheus, Grafana, SonarQube, ArgoCD.

2️⃣ *DevOps Training + Profile Building — ₹75,000* ⭐ *(Most Popular)*
• All DevOps Tools + Profile Building Workshop + Resume/LinkedIn/GitHub built by our team.

3️⃣ *DevOps Training + Profile Building + Interview Assistance — ₹1,00,000* 🚀 *(Premium)*
• All Tools + Profile Workshop & Built Profile + Expert Interview Workshop + Mock Rounds + Full-time Placement Support.

Reply *4* to reserve a free live demo seat!`;
    } else if (textLower === '4' || textLower.includes('demo') || textLower.includes('book') || textLower.includes('class')) {
      replyText = `🎉 *Live Demo Class Reserved!*
We have locked your seat for the upcoming Live Interactive DevOps Demo & Hands-On Lab Session for mobile number *${currentPhone}*.

Zoom meeting ID & joining link will be sent to this WhatsApp chat 1 hour prior to session start.

Need instant assistance? Call our admissions team: +91 82777 59401 / +91 94826 17166`;
    } else if (textLower === '5' || textLower.includes('counselor') || textLower.includes('human') || textLower.includes('call') || textLower.includes('agent')) {
      replyText = `📞 *FutureOps-Tech Counseling Team:*
• *Direct Admissions Call:* +91 82777 59401 / +91 94826 17166
• *WhatsApp Instant Desk:* +91 82777 59401
• *Official Email:* futureopstech@gmail.com
• *Campus:* #113, 5th Cross, Basaveshwara Layout, Near BSNL Office, Chandra Layout, Bangalore - 560040.

Our counselors are available Mon-Sat (9 AM - 8 PM IST).`;
    } else {
      replyText = `Thank you for reaching out! 🚀 Regarding your query "*${userText}*":\n\nAt FutureOps-Tech, we offer 100% practical hands-on training with 1,200+ engineer students placed across 100+ hiring companies.\n\nReply with:\n1️⃣ Syllabus & Modules\n2️⃣ Batch Timings\n3️⃣ Course Details & Duration\n4️⃣ Reserve Free Demo Class\n5️⃣ Call Admission Officer (+91 82777 59401 / +91 94826 17166)`;
    }

    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'bot',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      phoneNumber: currentPhone
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: currentTime,
      phoneNumber: phoneNumber
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      processBotReply(text, phoneNumber);
    }, 800);
  };

  const formatWhatsAppText = (content: string) => {
    // simple bold formatting for *word*
    const parts = content.split(/(\*[^*]+\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <strong key={idx} className="font-bold text-slate-900 dark:text-white">{part.slice(1, -1)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[620px] max-h-[90vh]">
        
        {/* WhatsApp Top Green Header */}
        <div className="bg-[#075e54] text-white p-3 sm:p-4 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center border-2 border-emerald-400 font-extrabold text-white text-sm shadow">
                FOT
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075e54]"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base">
                <span>WhatsApp Advisor Bot</span>
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="text-[11px] text-emerald-100 flex items-center gap-2">
                <span>+91 8277759401</span>
                <span>•</span>
                <span className="text-emerald-300 font-semibold">Online • Auto-Replies</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={`https://wa.me/918277759401?text=${encodeURIComponent(inputMessage || 'Hi, I need info about DevOps course')}`}
              target="_blank"
              rel="noreferrer"
              title="Open Official WhatsApp"
              className="p-1.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-white text-xs flex items-center gap-1 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Real WhatsApp</span>
            </a>
            <button
              onClick={() => setIsWhatsAppModalOpen(false)}
              className="p-1.5 rounded-lg hover:bg-emerald-700/60 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sender Mobile Number Bar & Customizer */}
        <div className="bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-300">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Chatting as:</span>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-cyan-300 px-2 py-0.5 rounded text-xs font-mono font-semibold focus:outline-none focus:border-cyan-400 w-32 sm:w-36"
              placeholder="+91 Phone No"
            />
          </div>
          <button
            onClick={generateRandomPhoneNumber}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-[11px] font-semibold transition"
            title="Generate Random Test Phone Number"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Random No.</span>
          </button>
        </div>

        {/* Chat Messages Body with WhatsApp Wallpaper */}
        <div 
          className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-[#0b141a] text-xs font-sans relative"
          style={{
            backgroundImage: `radial-gradient(#1f2c34 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        >
          {/* Encryption / Notice badge */}
          <div className="text-center my-1">
            <span className="inline-block px-3 py-1 rounded-md bg-[#182229] text-[10px] text-amber-200/80 border border-amber-500/10">
              🔒 End-to-end encrypted • Automated WhatsApp Advisor active
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#005c4b] text-white rounded-tr-none'
                    : 'bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-700/50'
                }`}
              >
                {formatWhatsAppText(msg.text)}
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'user' && (
                    <CheckCheck className="w-3.5 h-3.5 text-cyan-400 inline" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 bg-[#202c33] text-slate-300 px-3 py-2 rounded-2xl w-fit rounded-tl-none border border-slate-700/50">
              <Bot className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span className="text-[11px] italic text-slate-400">WhatsApp Advisor is typing response...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-[#111b21] px-3 py-2 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
          <button
            onClick={() => handleSendMessage('hi')}
            className="px-2.5 py-1 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 whitespace-nowrap font-medium transition"
          >
            👋 Say "Hi"
          </button>
          <button
            onClick={() => handleSendMessage('1')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 whitespace-nowrap transition"
          >
            📚 1. Syllabus
          </button>
          <button
            onClick={() => handleSendMessage('2')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 whitespace-nowrap transition"
          >
            ⏰ 2. Batches
          </button>
          <button
            onClick={() => handleSendMessage('3')}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 whitespace-nowrap transition"
          >
            🎓 3. Program Info
          </button>
          <button
            onClick={() => handleSendMessage('4')}
            className="px-2.5 py-1 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 whitespace-nowrap font-medium transition"
          >
            🎟️ 4. Book Demo
          </button>
        </div>

        {/* Input Bar */}
        <div className="bg-[#202c33] p-2.5 sm:p-3 flex items-center gap-2 border-t border-slate-800 shrink-0">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type 'hi', 'hii', 'hello' or ask any question..."
            className="flex-1 bg-[#2a3942] border border-slate-700/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold transition shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
