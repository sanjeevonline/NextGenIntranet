import React, { useState } from 'react';
import { Engagement, EngagementStatus, PricingModel, Consultant } from '../types';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  UserPlusIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface FinanceModuleProps {
  engagements: Engagement[];
  setEngagements: React.Dispatch<React.SetStateAction<Engagement[]>>;
  consultants: Consultant[];
}

const FinanceModule: React.FC<FinanceModuleProps> = ({ engagements, setEngagements, consultants }) => {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingEngagement, setEditingEngagement] = useState<Engagement | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Engagement>>({});

  // CRUD Handlers
  const handleEdit = (engagement: Engagement) => {
    setEditingEngagement(engagement);
    setFormData({ ...engagement });
    setView('form');
  };

  const handleCreate = () => {
    setEditingEngagement(null);
    setFormData({
      status: EngagementStatus.PIPELINE,
      pricingModel: PricingModel.FIXED_FEE,
      team: []
    });
    setView('form');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this engagement?')) {
      setEngagements(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.clientName || !formData.projectName) {
      alert("Please fill in Client Name and Project Name");
      return;
    }

    if (editingEngagement) {
      // Update
      setEngagements(prev => prev.map(e => e.id === editingEngagement.id ? { ...formData, id: e.id } as Engagement : e));
    } else {
      // Create
      const newEngagement = {
        ...formData,
        id: `e-${Date.now()}`,
        staffingNeeds: [] // Default empty
      } as Engagement;
      setEngagements(prev => [...prev, newEngagement]);
    }
    setView('list');
  };

  // Staffing Helper
  const toggleConsultant = (consultantId: string) => {
    const currentTeam = formData.team || [];
    if (currentTeam.includes(consultantId)) {
      setFormData({ ...formData, team: currentTeam.filter(id => id !== consultantId) });
    } else {
      setFormData({ ...formData, team: [...currentTeam, consultantId] });
    }
  };

  // UI Helpers
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const getStatusColor = (status: EngagementStatus) => {
    switch (status) {
      case EngagementStatus.ACTIVE: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case EngagementStatus.PIPELINE: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case EngagementStatus.COMPLETED: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      case EngagementStatus.ON_HOLD: return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  // Render List View
  const renderList = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-semibold text-white">Engagement Management</h2>
          <p className="text-slate-400">Track active projects, pipeline, staffing, and financials.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 bg-nexus-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-nexus-accent/90 transition-all shadow-lg shadow-nexus-accent/20"
        >
          <PlusIcon className="w-5 h-5" />
          New Engagement
        </button>
      </div>

      <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-nexus-900/50 border-b border-white/5">
              <tr>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Client / Project</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Commercials</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Staffing</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {engagements.map(e => (
                <tr key={e.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="font-semibold text-white">{e.clientName}</div>
                    <div className="text-sm text-slate-400">{e.projectName}</div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getStatusColor(e.status)}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm text-white font-medium">
                      <CurrencyDollarIcon className="w-4 h-4 text-slate-500" />
                      {formatCurrency(e.budget)}
                    </div>
                    <div className="text-xs text-slate-500">{e.pricingModel}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex -space-x-2 overflow-hidden">
                      {e.team.map(consultantId => {
                        const consultant = consultants.find(c => c.id === consultantId);
                        if (!consultant) return null;
                        return (
                          <img 
                            key={consultantId}
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-nexus-800 object-cover"
                            src={consultant.avatar}
                            alt={consultant.name}
                            title={consultant.name}
                          />
                        );
                      })}
                      {e.team.length === 0 && <span className="text-xs text-slate-500 italic">Unstaffed</span>}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(e)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(e.id)}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {engagements.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No engagements found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );

  // Render Form View
  const renderForm = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-display font-semibold text-white">
          {editingEngagement ? 'Edit Engagement' : 'New Engagement'}
        </h2>
        <button onClick={() => setView('list')} className="text-sm text-slate-400 hover:text-white">
          Cancel
        </button>
      </div>

      <div className="space-y-8">
        {/* Section 1: Overview */}
        <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6 text-nexus-accent">
            <CheckCircleIcon className="w-5 h-5" />
            <h3 className="font-semibold text-white">Project Overview</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Client Name</label>
              <input 
                type="text" 
                className="w-full bg-nexus-900 border border-nexus-700/50 rounded-lg p-3 text-white focus:outline-none focus:border-nexus-accent transition-colors"
                value={formData.clientName || ''}
                onChange={e => setFormData({...formData, clientName: e.target.value})}
                placeholder="e.g. Acme Corp"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Project Name</label>
              <input 
                type="text" 
                className="w-full bg-nexus-900 border border-nexus-700/50 rounded-lg p-3 text-white focus:outline-none focus:border-nexus-accent transition-colors"
                value={formData.projectName || ''}
                onChange={e => setFormData({...formData, projectName: e.target.value})}
                placeholder="e.g. Strategy 2025"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Description</label>
              <textarea 
                className="w-full h-24 bg-nexus-900 border border-nexus-700/50 rounded-lg p-3 text-white focus:outline-none focus:border-nexus-accent transition-colors resize-none"
                value={formData.description || ''}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Project scope and objectives..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Start Date</label>
              <input 
                type="date" 
                className="w-full bg-nexus-900 border border-nexus-700/50 rounded-lg p-3 text-white focus:outline-none focus:border-nexus-accent transition-colors"
                value={formData.startDate || ''}
                onChange={e => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">End Date</label>
              <input 
                type="date" 
                className="w-full bg-nexus-900 border border-nexus-700/50 rounded-lg p-3 text-white focus:outline-none focus:border-nexus-accent transition-colors"
                value={formData.endDate || ''}
                onChange={e => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Status</label>
              <select 
                className="w-full bg-nexus-900 border border-nexus-700/50 rounded-lg p-3 text-white focus:outline-none focus:border-nexus-accent transition-colors"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as EngagementStatus})}
              >
                {Object.values(EngagementStatus).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Commercials */}
        <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6 text-nexus-accent">
            <CurrencyDollarIcon className="w-5 h-5" />
            <h3 className="font-semibold text-white">Commercials & Pricing</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Pricing Model</label>
              <select 
                className="w-full bg-nexus-900 border border-nexus-700/50 rounded-lg p-3 text-white focus:outline-none focus:border-nexus-accent transition-colors"
                value={formData.pricingModel}
                onChange={e => setFormData({...formData, pricingModel: e.target.value as PricingModel})}
              >
                {Object.values(PricingModel).map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase">Budget / Value (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input 
                  type="number" 
                  className="w-full bg-nexus-900 border border-nexus-700/50 rounded-lg p-3 pl-7 text-white focus:outline-none focus:border-nexus-accent transition-colors"
                  value={formData.budget || ''}
                  onChange={e => setFormData({...formData, budget: Number(e.target.value)})}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Staffing */}
        <div className="bg-nexus-800 border border-nexus-700/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6 text-nexus-accent">
            <UserPlusIcon className="w-5 h-5" />
            <h3 className="font-semibold text-white">Team Staffing</h3>
          </div>
          
          <div className="space-y-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-64 overflow-y-auto custom-scrollbar">
               {consultants.map(consultant => {
                 const isSelected = (formData.team || []).includes(consultant.id);
                 return (
                   <div 
                     key={consultant.id} 
                     onClick={() => toggleConsultant(consultant.id)}
                     className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                       isSelected 
                         ? 'bg-nexus-accent/10 border-nexus-accent' 
                         : 'bg-nexus-900 border-white/5 hover:border-white/20'
                     }`}
                   >
                     <div className="relative">
                       <img src={consultant.avatar} alt={consultant.name} className="w-10 h-10 rounded-full object-cover" />
                       {isSelected && (
                         <div className="absolute -top-1 -right-1 w-4 h-4 bg-nexus-accent rounded-full flex items-center justify-center border border-nexus-900">
                           <CheckCircleIcon className="w-3 h-3 text-white" />
                         </div>
                       )}
                     </div>
                     <div className="ml-3">
                       <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>{consultant.name}</p>
                       <div className="flex items-center gap-2 text-xs text-slate-500">
                         <span>{consultant.role}</span>
                         <span>•</span>
                         <span>${consultant.rate}/hr</span>
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
             <p className="text-xs text-slate-500 mt-2">* Select consultants to assign them to this engagement.</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-4">
          <button 
            onClick={() => setView('list')}
            className="px-6 py-3 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-3 rounded-lg bg-nexus-accent text-white hover:bg-nexus-accent/90 transition-colors font-bold shadow-lg shadow-nexus-accent/20"
          >
            {editingEngagement ? 'Save Changes' : 'Create Engagement'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {view === 'list' ? renderList() : renderForm()}
    </div>
  );
};

export default FinanceModule;
