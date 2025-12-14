import React, { useState, useMemo } from 'react';
import { Consultant, Engagement } from '../types';
import StaffingModule from './StaffingModule';
import { UserGroupIcon, MagnifyingGlassIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

interface PeopleModuleProps {
  consultants: Consultant[];
  engagements: Engagement[];
  setEngagements: React.Dispatch<React.SetStateAction<Engagement[]>>;
  onViewProfile: (id: string) => void;
}

const PeopleModule: React.FC<PeopleModuleProps> = ({ 
  consultants, 
  engagements, 
  setEngagements, 
  onViewProfile 
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'staffing'>('directory');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConsultants = useMemo(() => {
    if (!searchTerm) return consultants;
    return consultants.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [consultants, searchTerm]);

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Module Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-semibold text-white">People & HR</h2>
          <p className="text-slate-400">Manage directory, talent allocation, and organizational structures.</p>
        </div>
        
        <div className="flex bg-nexus-800 p-1 rounded-lg border border-nexus-700/50">
          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'directory' ? 'bg-nexus-accent text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserGroupIcon className="w-4 h-4" />
            Directory
          </button>
          <button
            onClick={() => setActiveTab('staffing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'staffing' ? 'bg-nexus-accent text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PuzzlePieceIcon className="w-4 h-4" />
            Staffing
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'staffing' ? (
        <StaffingModule 
          consultants={consultants} 
          engagements={engagements} 
          setEngagements={setEngagements} 
          onViewProfile={onViewProfile}
        />
      ) : (
        <div className="space-y-6">
          {/* Search Bar for Directory */}
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name, role, or skill..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-nexus-900 border border-nexus-700/50 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-nexus-accent transition-colors"
            />
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredConsultants.map(consultant => (
              <div 
                key={consultant.id}
                onClick={() => onViewProfile(consultant.id)}
                className="bg-nexus-800 border border-nexus-700/50 p-4 rounded-xl hover:border-nexus-accent/50 hover:bg-nexus-800/80 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <img src={consultant.avatar} alt={consultant.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                  <div className="min-w-0">
                    <h3 className="font-medium text-white group-hover:text-nexus-accent truncate transition-colors">{consultant.name}</h3>
                    <p className="text-xs text-slate-400 truncate">{consultant.role}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate">{consultant.specialty}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                   <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                     consultant.availability === 'Available' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 
                     consultant.availability === 'On Bench' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
                     'bg-slate-500/10 border-slate-500/30 text-slate-400'
                   }`}>
                     {consultant.availability}
                   </span>
                   <button className="text-xs text-nexus-accent opacity-0 group-hover:opacity-100 transition-opacity">
                     View Profile
                   </button>
                </div>
              </div>
            ))}
          </div>
          {filteredConsultants.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No consultants found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PeopleModule;
