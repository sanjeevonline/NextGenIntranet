import React, { useState } from 'react';
import { User, FeedbackRequest } from '../types';
import { CheckCircleIcon, PaperAirplaneIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface FeedbackModuleProps {
  requests: FeedbackRequest[];
}

const FeedbackModule: React.FC<FeedbackModuleProps> = ({ requests }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'request' | 'history'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<FeedbackRequest | null>(null);

  const renderPending = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {requests.map(req => (
        <div 
          key={req.id} 
          className="bg-nexus-800 border border-nexus-700/50 p-6 rounded-xl hover:border-nexus-accent/50 transition-all cursor-pointer"
          onClick={() => setSelectedRequest(req)}
        >
          <div className="flex items-center gap-4 mb-4">
            <img src={req.from.avatar} alt={req.from.name} className="w-12 h-12 rounded-full border border-white/10" />
            <div>
              <h3 className="text-white font-medium">{req.from.name}</h3>
              <p className="text-xs text-slate-400">{req.type} • Due {new Date(req.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs bg-nexus-warning/10 text-nexus-warning px-2 py-1 rounded">Action Required</span>
            <button className="text-sm text-nexus-accent font-medium hover:text-white transition-colors">Provide Feedback &rarr;</button>
          </div>
        </div>
      ))}
      {requests.length === 0 && (
        <div className="col-span-2 py-12 text-center text-slate-500">
          <CheckCircleIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>You're all caught up on feedback requests.</p>
        </div>
      )}
    </div>
  );

  const renderFeedbackForm = (req: FeedbackRequest) => (
    <div className="bg-nexus-800 border border-nexus-700/50 p-8 rounded-xl max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div>
           <h3 className="text-xl font-display font-semibold text-white">Feedback for {req.from.name}</h3>
           <p className="text-sm text-slate-400">{req.type}</p>
        </div>
        <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-white">Cancel</button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Key Strengths</label>
          <textarea 
            className="w-full h-24 bg-nexus-950 border border-nexus-700/50 rounded-lg p-3 text-white focus:outline-none focus:border-nexus-accent transition-colors resize-none"
            placeholder="What did they do well?"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Areas for Development</label>
          <textarea 
            className="w-full h-24 bg-nexus-950 border border-nexus-700/50 rounded-lg p-3 text-white focus:outline-none focus:border-nexus-accent transition-colors resize-none"
            placeholder="Constructive feedback for growth..."
          ></textarea>
        </div>
        <div>
           <label className="block text-sm font-medium text-slate-300 mb-2">Overall Rating</label>
           <div className="flex gap-2">
             {[1,2,3,4,5].map(star => (
               <button key={star} className="text-nexus-accent hover:scale-110 transition-transform">
                 <StarIconSolid className="w-8 h-8" />
               </button>
             ))}
           </div>
        </div>
        
        <div className="pt-6">
          <button className="w-full bg-nexus-accent text-white font-medium py-3 rounded-lg hover:bg-nexus-accent/90 transition-colors flex items-center justify-center gap-2">
            <PaperAirplaneIcon className="w-5 h-5" />
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-semibold text-white">Performance & Feedback</h2>
          <p className="text-slate-400 mt-1">Manage 360 reviews and continuous feedback.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-nexus-800 p-1 rounded-lg w-fit border border-nexus-700/50">
        {['pending', 'request', 'history'].map((tab) => (
           <button
             key={tab}
             onClick={() => { setActiveTab(tab as any); setSelectedRequest(null); }}
             className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
               activeTab === tab ? 'bg-nexus-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
             }`}
           >
             {tab === 'pending' ? 'Pending Requests' : tab === 'request' ? 'Request Feedback' : 'My Reviews'}
           </button>
        ))}
      </div>

      {selectedRequest ? renderFeedbackForm(selectedRequest) : (
        <div className="mt-6">
          {activeTab === 'pending' && renderPending()}
          {activeTab === 'request' && (
            <div className="bg-nexus-800 border border-nexus-700/50 p-12 text-center rounded-xl">
               <p className="text-slate-400">Select colleagues to request feedback from (Module Under Construction)</p>
            </div>
          )}
          {activeTab === 'history' && (
             <div className="bg-nexus-800 border border-nexus-700/50 p-12 text-center rounded-xl">
               <p className="text-slate-400">History of your reviews (Module Under Construction)</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackModule;
