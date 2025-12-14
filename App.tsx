import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AIChat from './components/AIChat';
import FeedbackModule from './components/FeedbackModule';
import KnowledgeBase from './components/KnowledgeBase';
import FinanceModule from './components/FinanceModule';
import PeopleModule from './components/PeopleModule';
import ProfilePage from './components/ProfilePage';
import AdminModule from './components/AdminModule';
import { 
  CURRENT_USER, 
  INITIAL_TASKS, 
  QUICK_STATS, 
  ANNOUNCEMENTS, 
  FEEDBACK_REQUESTS, 
  INITIAL_ENGAGEMENTS,
  KNOWLEDGE_DOCS,
  AVAILABLE_CONSULTANTS,
  USER_PROFILE,
  getProfileById
} from './constants';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { Task, Announcement, KnowledgeDoc, Consultant, Engagement } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // --- Lifted State for Admin Management ---
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDoc[]>(KNOWLEDGE_DOCS);
  const [consultants, setConsultants] = useState<Consultant[]>(AVAILABLE_CONSULTANTS);
  const [engagements, setEngagements] = useState<Engagement[]>(INITIAL_ENGAGEMENTS);

  // --- Profile Viewing State ---
  // If null, viewing the default activeTab. If set, overlays ProfilePage.
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);

  const handleViewProfile = (id: string) => {
    setViewingProfileId(id);
  };

  const handleCloseProfile = () => {
    setViewingProfileId(null);
  };

  // Helper to get the profile data to display
  const currentViewProfile = viewingProfileId ? getProfileById(viewingProfileId, consultants) : USER_PROFILE;

  // Placeholder views for other tabs to demonstrate structure
  const PlaceholderView = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 space-y-4 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-nexus-800 flex items-center justify-center">
        <span className="text-3xl">🚧</span>
      </div>
      <h2 className="text-2xl font-display font-bold text-white">{title} Module</h2>
      <p>Access restricted or under development by Nexus Corp IT.</p>
      <button 
        onClick={() => setIsAIChatOpen(true)}
        className="mt-4 px-6 py-2 bg-nexus-800 hover:bg-nexus-700 border border-nexus-700/50 rounded-lg text-nexus-accent transition-all"
      >
        Ask NOVA for details
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-nexus-950 text-slate-200 font-sans selection:bg-nexus-accent selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setViewingProfileId(null); }} />
      
      <main className="pl-20 md:pl-64 min-h-screen transition-all duration-300">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-nexus-950/80 backdrop-blur-md border-b border-nexus-700/50 px-6 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
             <div className="relative group">
               <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-nexus-accent transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search documents, people, or ask a question..." 
                 className="w-full bg-nexus-900 border border-nexus-700/50 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent transition-all"
               />
               <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                 <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-400">⌘K</span>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-nexus-800 rounded-lg transition-colors">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-nexus-accent rounded-full animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-nexus-accent rounded-full" />
            </button>
            <div 
              className="flex items-center gap-3 pl-4 border-l border-nexus-700/50 cursor-pointer group"
              onClick={() => { setActiveTab('profile'); setViewingProfileId(null); }}
            >
              <div className="text-right hidden sm:block group-hover:opacity-80 transition-opacity">
                <p className="text-sm font-bold text-white leading-none">{CURRENT_USER.name}</p>
                <p className="text-xs text-slate-500 mt-1">{CURRENT_USER.department}</p>
              </div>
              <img 
                src={CURRENT_USER.avatar} 
                alt="Profile" 
                className={`w-10 h-10 rounded-full border border-white/10 object-cover transition-all ${activeTab === 'profile' ? 'ring-2 ring-nexus-accent' : 'group-hover:ring-2 group-hover:ring-white/20'}`}
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          
          {/* If a profile ID is selected (from click), show profile page overlay */}
          {viewingProfileId ? (
            <ProfilePage 
              profile={currentViewProfile} 
              isOwnProfile={viewingProfileId === CURRENT_USER.id}
              onBack={handleCloseProfile}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard 
                  user={CURRENT_USER} 
                  tasks={tasks} 
                  stats={QUICK_STATS}
                  announcements={announcements}
                  onAskAI={() => setIsAIChatOpen(true)}
                />
              )}
              
              {activeTab === 'hr' && (
                <PeopleModule 
                  consultants={consultants}
                  engagements={engagements}
                  setEngagements={setEngagements}
                  onViewProfile={handleViewProfile}
                />
              )}
              
              {activeTab === 'finance' && (
                <FinanceModule 
                  engagements={engagements} 
                  setEngagements={setEngagements}
                  consultants={consultants} 
                />
              )}
              
              {activeTab === 'knowledge' && <KnowledgeBase docs={knowledgeDocs} />}
              
              {activeTab === 'feedback' && <FeedbackModule requests={FEEDBACK_REQUESTS} />}
              
              {activeTab === 'profile' && <ProfilePage profile={USER_PROFILE} isOwnProfile={true} />}

              {activeTab === 'admin' && (
                <AdminModule 
                  announcements={announcements}
                  setAnnouncements={setAnnouncements}
                  tasks={tasks}
                  setTasks={setTasks}
                  docs={knowledgeDocs}
                  setDocs={setKnowledgeDocs}
                  consultants={consultants}
                  setConsultants={setConsultants}
                  onViewProfile={handleViewProfile}
                />
              )}
            </>
          )}
        </div>
      </main>

      <AIChat 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
        currentUser={CURRENT_USER}
      />
    </div>
  );
};

export default App;
