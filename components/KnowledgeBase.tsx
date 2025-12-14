import React, { useState } from 'react';
import { MagnifyingGlassIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { queryKnowledgeBase } from '../services/geminiService';
import { KnowledgeDoc } from '../types';
import ReactMarkdown from 'react-markdown';

interface KnowledgeBaseProps {
  docs: KnowledgeDoc[];
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ docs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setAiAnswer(null);

    // Call simulated RAG service with dynamic docs
    const answer = await queryKnowledgeBase(searchQuery, docs);
    
    setAiAnswer(answer);
    setIsSearching(false);
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-8">
        <h2 className="text-3xl font-display font-semibold text-white">Nexus Knowledge Base</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Search policies, guides, and internal documentation. Powered by Nexus AI for instant answers.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ask a question (e.g., 'What is the remote work policy?')"
          className="w-full bg-nexus-800 border border-nexus-700/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all shadow-lg"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
        <button 
          type="submit"
          disabled={isSearching}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-nexus-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-nexus-accent/90 disabled:opacity-50 transition-colors"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* AI Answer Section */}
      {aiAnswer && (
        <div className="bg-gradient-to-r from-nexus-800 to-nexus-900 border border-nexus-700/50 rounded-xl p-6 shadow-xl animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4 text-nexus-accent">
            <SparklesIcon className="w-5 h-5" />
            <h3 className="font-semibold">AI Generated Answer</h3>
          </div>
          <div className="prose prose-invert max-w-none prose-p:text-slate-200 prose-headings:text-white prose-strong:text-nexus-accent prose-a:text-nexus-accent prose-li:text-slate-300">
            <ReactMarkdown>{aiAnswer}</ReactMarkdown>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
             <p className="text-xs text-slate-500">Generated based on internal documents. Verify with source material.</p>
          </div>
        </div>
      )}

      {/* Suggested Documents */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Popular Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {docs.map(doc => (
            <div key={doc.id} className="group bg-nexus-800 border border-nexus-700/50 p-4 rounded-xl hover:border-nexus-accent/50 transition-all cursor-pointer flex items-start gap-4">
              <div className="p-3 bg-nexus-900 rounded-lg text-nexus-accent group-hover:bg-nexus-accent group-hover:text-white transition-colors">
                <DocumentTextIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-medium group-hover:text-nexus-accent transition-colors">{doc.title}</h4>
                <div className="flex gap-2 mt-2">
                  {doc.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
