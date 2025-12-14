import React from 'react';
import { User, Task, QuickStat, Announcement } from '../types';
import TaskCard from './TaskCard';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, SparklesIcon, MegaphoneIcon } from '@heroicons/react/24/solid';

interface DashboardProps {
  user: User;
  tasks: Task[];
  stats: QuickStat[];
  announcements: Announcement[];
  onAskAI: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, tasks, stats, announcements, onAskAI }) => {
  const greetingTime = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-nexus-900 to-nexus-800 border border-nexus-700/50 shadow-xl">
        <div className="absolute top-0 right-0 w-full h-full bg-hero-glow"></div>
        
        <div className="relative p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-display font-semibold text-white mb-2 tracking-tight">
              {greetingTime}, {user.name.split(' ')[0]}
            </h1>
            <p className="text-slate-300 text-lg max-w-xl font-light">
              You have <span className="text-white font-semibold">{tasks.length} priority items</span> pending. Your next milestone is in 3 days.
            </p>
          </div>
          
          <button 
            onClick={onAskAI}
            className="flex items-center gap-2 px-5 py-3 bg-nexus-accent text-white rounded-lg font-medium hover:bg-nexus-accent/90 transition-all shadow-lg shadow-nexus-accent/20"
          >
            <SparklesIcon className="w-5 h-5" />
            <span>Ask NOVA Assistant</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Tasks */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-nexus-800 border border-nexus-700/50 p-5 rounded-lg flex flex-col justify-between h-24">
                <div className="flex justify-between items-start">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                  {stat.trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold ${
                      stat.trendUp ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {stat.trendUp ? <ArrowTrendingUpIcon className="w-3 h-3" /> : <ArrowTrendingDownIcon className="w-3 h-3" />}
                      {stat.trend}
                    </div>
                  )}
                </div>
                <p className="text-2xl font-display font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Priority Actions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold text-white">Action Items</h2>
              <button className="text-sm text-nexus-accent hover:text-white transition-colors">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Announcements & Insights */}
        <div className="space-y-6">
          {/* Announcements */}
          <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <MegaphoneIcon className="w-5 h-5 text-nexus-accent" />
              <h2 className="text-lg font-display font-semibold text-white">Company News</h2>
            </div>
            <div className="space-y-6">
              {announcements.map(item => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      item.category === 'Strategic' ? 'bg-purple-500/10 text-purple-400' :
                      item.category === 'HR' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-nexus-accent transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Learning */}
          <div className="bg-gradient-to-b from-nexus-800 to-nexus-900 border border-nexus-700/50 rounded-xl p-6 relative overflow-hidden">
            <h3 className="text-sm font-semibold text-white mb-4 relative z-10">Recommended Training</h3>
            <div className="space-y-3 relative z-10">
              <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-nexus-accent/50 transition-colors cursor-pointer">
                <p className="text-sm font-medium text-white">Advanced Cloud Architecture</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-400">2h 15m remaining</span>
                  <span className="text-xs text-nexus-accent">Resume</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
