import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { generateAssistantResponse } from '../services/geminiService';
import { ChatMessage, User } from '../types';
import ReactMarkdown from 'react-markdown';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, currentUser }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello ${currentUser.name}. I'm NOVA. How can I assist you with your work today?`,
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    // Format history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await generateAssistantResponse(userMsg.text, history);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsThinking(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[600px] bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nexus-secondary to-nexus-accent flex items-center justify-center animate-pulse">
              <SparklesIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white">NOVA Assistant</h3>
              <p className="text-xs text-nexus-accent">Online • Neural Network Active</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <XMarkIcon className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-nexus-accent text-nexus-900 rounded-tr-sm'
                    : 'bg-white/10 text-slate-100 rounded-tl-sm'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                ) : (
                   <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-white prose-ul:my-2 prose-li:my-0.5">
                     <ReactMarkdown>{msg.text}</ReactMarkdown>
                   </div>
                )}
                <span className="text-[10px] opacity-50 mt-2 block">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isThinking && (
             <div className="flex justify-start">
               <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                 <div className="w-2 h-2 bg-nexus-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                 <div className="w-2 h-2 bg-nexus-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                 <div className="w-2 h-2 bg-nexus-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask NOVA about policies, tasks, or colleagues..."
              className="w-full bg-[#1e293b] text-white placeholder-slate-500 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-nexus-accent/50 border border-white/5"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isThinking}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-nexus-accent text-nexus-900 rounded-lg hover:bg-nexus-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
