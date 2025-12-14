import React, { useState, useMemo } from 'react';
import { Engagement, Consultant, EngagementStatus } from '../types';
import * as api from '../services/api';
import { MagnifyingGlassIcon, BriefcaseIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface StaffingModuleProps {
  engagements: Engagement[];
  setEngagements: React.Dispatch<React.SetStateAction<Engagement[]>>;
  consultants: Consultant[];
  onViewProfile?: (id: string) => void;
}

const StaffingModule: React.FC<StaffingModuleProps> = ({ engagements, setEngagements, consultants, onViewProfile }) => {
  const [consultantFilter, setConsultantFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [draggedConsultant, setDraggedConsultant] = useState<Consultant | null>(null);

  // --- Filtering Logic ---
  const filteredConsultants = useMemo(() => {
    return consultants.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(consultantFilter.toLowerCase()) || 
                            c.specialty.toLowerCase().includes(consultantFilter.toLowerCase());
      const matchesRole = roleFilter === 'All' || c.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [consultants, consultantFilter, roleFilter]);

  const activeEngagements = useMemo(() => {
    return engagements.filter(e => e.status !== EngagementStatus.COMPLETED);
  }, [engagements]);

  // --- Drag & Drop Handlers ---
  const handleDragStart = (e: React.DragEvent, consultant: Consultant) => {
    setDraggedConsultant(consultant);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = async (e: React.DragEvent, engagementId: string, needId: string) => {
    e.preventDefault();
    if (!draggedConsultant) return;

    // Find the engagement to update
    const engagementToUpdate = engagements.find(e => e.id === engagementId);
    if (!engagementToUpdate) return;

    // Create updated structure
    const updatedNeeds = engagementToUpdate.staffingNeeds.map(need => {
      if (need.id === needId) {
        return { ...need, filledBy: draggedConsultant.id };
      }
      return need;
    });

    const updatedTeam = [...engagementToUpdate.team];
    if (!updatedTeam.includes(draggedConsultant.id)) {
      updatedTeam.push(draggedConsultant.id);
    }

    const updatedEngagement = { 
      ...engagementToUpdate, 
      staffingNeeds: updatedNeeds, 
      team: updatedTeam 
    };

    // Optimistic Update
    setEngagements(prev => prev.map(eng => eng.id === engagementId ? updatedEngagement : eng));
    
    // DB Update
    await api.updateEngagement(updatedEngagement);

    setDraggedConsultant(null);
  };

  const handleUnassign = async (engagementId: string, needId: string, consultantId: string) => {
     // Find the engagement to update
    const engagementToUpdate = engagements.find(e => e.id === engagementId);
    if (!engagementToUpdate) return;

    const updatedNeeds = engagementToUpdate.staffingNeeds.map(need => {
      if (need.id === needId) {
        return { ...need, filledBy: undefined };
      }
      return need;
    });
    
    const updatedEngagement = { ...engagementToUpdate, staffingNeeds: updatedNeeds };

    // Optimistic Update
    setEngagements(prev => prev.map(eng => eng.id === engagementId ? updatedEngagement : eng));

    // DB Update
    await api.updateEngagement(updatedEngagement);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-display font-semibold text-white">Project Allocation</h2>
          <p className="text-xs text-slate-400">Drag consultants to open project needs. Changes are saved automatically.</p>
        </div>
        <div className="flex gap-2">
            <span className="text-xs bg-nexus-accent/10 text-nexus-accent px-3 py-1 rounded-full border border-nexus-accent/20">
                {consultants.length} Consultants
            </span>
            <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20">
                {activeEngagements.length} Projects
            </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        
        {/* LEFT COLUMN: PEOPLE */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col bg-nexus-900 border border-nexus-700/50 rounded-xl overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-white/5 space-y-3 bg-nexus-900 z-10">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={consultantFilter}
                onChange={(e) => setConsultantFilter(e.target.value)}
                className="w-full bg-nexus-950 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-nexus-accent"
              />
            </div>
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-nexus-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-nexus-accent"
            >
              <option value="All">All Roles</option>
              <option value="Associate">Associate</option>
              <option value="Senior Consultant">Senior Consultant</option>
              <option value="Manager">Manager</option>
              <option value="Partner">Partner</option>
            </select>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {filteredConsultants.map(consultant => (
              <div 
                key={consultant.id}
                draggable
                onDragStart={(e) => handleDragStart(e, consultant)}
                onClick={() => onViewProfile && onViewProfile(consultant.id)}
                className="bg-nexus-800 border border-white/5 p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:border-nexus-accent/50 hover:bg-nexus-800/80 transition-all group"
              >
                <img src={consultant.avatar} alt={consultant.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-white truncate group-hover:text-nexus-accent">{consultant.name}</h4>
                  <p className="text-xs text-slate-400 truncate">{consultant.role}</p>
                  <p className="text-[10px] text-slate-500 truncate">{consultant.specialty}</p>
                </div>
                <div className={`ml-auto w-2 h-2 rounded-full ${consultant.availability === 'Available' ? 'bg-emerald-500' : consultant.availability === 'On Bench' ? 'bg-yellow-500' : 'bg-slate-700'}`} title={consultant.availability}></div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: ENGAGEMENTS */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col bg-nexus-900/50 border border-nexus-700/50 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-nexus-900/80 backdrop-blur-sm">
             <h3 className="font-semibold text-white flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-nexus-accent" />
                Active Staffing Requirements
             </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {activeEngagements.map(engagement => (
              <div key={engagement.id} className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white">{engagement.clientName}</h4>
                    <p className="text-sm text-nexus-accent">{engagement.projectName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded border ${engagement.status === EngagementStatus.PIPELINE ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                      {engagement.status}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{new Date(engagement.startDate).toLocaleDateString()} - {new Date(engagement.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Open Positions & Staffing</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {engagement.staffingNeeds.map(need => {
                      const filledByConsultant = need.filledBy ? consultants.find(c => c.id === need.filledBy) : null;
                      
                      return (
                        <div 
                          key={need.id}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, engagement.id, need.id)}
                          className={`relative border-2 border-dashed rounded-lg p-3 transition-all ${
                            filledByConsultant 
                              ? 'border-emerald-500/30 bg-emerald-500/5' 
                              : 'border-nexus-700 hover:border-nexus-accent hover:bg-nexus-accent/5'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-300">{need.role}</span>
                                {need.skills.map(skill => <span key={skill} className="text-[10px] bg-white/5 px-1.5 rounded text-slate-500">{skill}</span>)}
                             </div>
                             {filledByConsultant && (
                               <button 
                                 onClick={() => handleUnassign(engagement.id, need.id, filledByConsultant.id)}
                                 className="text-slate-500 hover:text-rose-400"
                               >
                                 <XMarkIcon className="w-4 h-4" />
                               </button>
                             )}
                          </div>

                          {filledByConsultant ? (
                             <div 
                               className="flex items-center gap-3 bg-nexus-900 rounded p-2 cursor-pointer hover:bg-nexus-800 transition-colors"
                               onClick={() => onViewProfile && onViewProfile(filledByConsultant.id)}
                             >
                                <img src={filledByConsultant.avatar} className="w-8 h-8 rounded-full" alt="" />
                                <div>
                                   <p className="text-sm font-medium text-white">{filledByConsultant.name}</p>
                                   <p className="text-xs text-emerald-400 flex items-center gap-1">
                                     <CheckCircleIcon className="w-3 h-3" /> Assigned
                                   </p>
                                </div>
                             </div>
                          ) : (
                            <div className="h-12 flex items-center justify-center text-xs text-slate-500 italic">
                               Drag candidate here
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffingModule;