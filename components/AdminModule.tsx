import React, { useState } from 'react';
import { Announcement, Task, KnowledgeDoc, Consultant, TaskType, Priority } from '../types';
import * as api from '../services/api';
import { 
  MegaphoneIcon, 
  ClipboardDocumentCheckIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface AdminModuleProps {
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  docs: KnowledgeDoc[];
  setDocs: React.Dispatch<React.SetStateAction<KnowledgeDoc[]>>;
  consultants: Consultant[];
  setConsultants: React.Dispatch<React.SetStateAction<Consultant[]>>;
  onViewProfile?: (id: string) => void;
}

const AdminModule: React.FC<AdminModuleProps> = ({
  announcements, setAnnouncements,
  tasks, setTasks,
  docs, setDocs,
  consultants, setConsultants,
  onViewProfile
}) => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'tasks' | 'knowledge' | 'people'>('announcements');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleCreate = () => {
    setFormData({});
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    if (activeTab === 'announcements') {
      const newItem: Announcement = {
        id: `a-${Date.now()}`,
        title: formData.title || 'New Announcement',
        category: formData.category || 'General',
        date: 'Today',
        summary: formData.summary || 'No summary provided.'
      };
      await api.createAnnouncement(newItem);
      setAnnouncements(prev => [newItem, ...prev]);
    } else if (activeTab === 'tasks') {
      const newItem: Task = {
        id: `t-${Date.now()}`,
        title: formData.title || 'New Task',
        description: formData.description || '',
        dueDate: formData.dueDate || new Date().toISOString(),
        priority: formData.priority || Priority.MEDIUM,
        type: formData.type || TaskType.ADMIN,
        progress: 0
      };
      await api.createTask(newItem);
      setTasks(prev => [newItem, ...prev]);
    } else if (activeTab === 'knowledge') {
      const newItem: KnowledgeDoc = {
        id: `k-${Date.now()}`,
        title: formData.title || 'New Doc',
        type: formData.type || 'Wiki',
        lastUpdated: new Date().toLocaleDateString(),
        content: formData.content || '',
        tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()) : []
      };
      await api.createKnowledgeDoc(newItem);
      setDocs(prev => [newItem, ...prev]);
    } else if (activeTab === 'people') {
      const newItem: Consultant = {
        id: `c-${Date.now()}`,
        name: formData.name || 'New Consultant',
        role: formData.role || 'Associate',
        rate: Number(formData.rate) || 150,
        specialty: formData.specialty || 'Generalist',
        availability: 'Available',
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
      };
      await api.createConsultant(newItem);
      setConsultants(prev => [newItem, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this from the database?')) {
      if (activeTab === 'announcements') {
          await api.deleteAnnouncement(id);
          setAnnouncements(prev => prev.filter(i => i.id !== id));
      }
      if (activeTab === 'tasks') {
          await api.deleteTask(id);
          setTasks(prev => prev.filter(i => i.id !== id));
      }
      if (activeTab === 'knowledge') {
          await api.deleteKnowledgeDoc(id);
          setDocs(prev => prev.filter(i => i.id !== id));
      }
      if (activeTab === 'people') {
          await api.deleteConsultant(id);
          setConsultants(prev => prev.filter(i => i.id !== id));
      }
    }
  };

  const renderTabs = () => (
    <div className="flex space-x-2 bg-nexus-900 p-1 rounded-lg border border-nexus-700/50 mb-6 w-fit">
      {[
        { id: 'announcements', label: 'News', icon: MegaphoneIcon },
        { id: 'tasks', label: 'Tasks', icon: ClipboardDocumentCheckIcon },
        { id: 'knowledge', label: 'Knowledge', icon: BookOpenIcon },
        { id: 'people', label: 'People', icon: UserGroupIcon },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => { setActiveTab(tab.id as any); setIsFormOpen(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === tab.id ? 'bg-nexus-accent text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );

  const renderForm = () => {
    if (!isFormOpen) return null;

    return (
      <div className="bg-nexus-800 border border-nexus-700/50 p-6 rounded-xl mb-6 animate-fade-in">
        <h3 className="text-lg font-bold text-white mb-4">Add New Item</h3>
        <div className="space-y-4">
          {activeTab === 'announcements' && (
             <>
               <input placeholder="Title" className="input-field w-full p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
               <select className="input-field w-full p-2 rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                 <option value="General">General</option>
                 <option value="Strategic">Strategic</option>
                 <option value="HR">HR</option>
                 <option value="Tech">Tech</option>
               </select>
               <textarea placeholder="Summary" className="input-field w-full p-2 rounded h-24" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} />
             </>
          )}
          {activeTab === 'tasks' && (
             <>
               <input placeholder="Task Title" className="input-field w-full p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
               <textarea placeholder="Description" className="input-field w-full p-2 rounded h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
               <select className="input-field w-full p-2 rounded" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                 <option value={Priority.MEDIUM}>Medium Priority</option>
                 <option value={Priority.HIGH}>High Priority</option>
                 <option value={Priority.LOW}>Low Priority</option>
               </select>
               <select className="input-field w-full p-2 rounded" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                  <option value={TaskType.ADMIN}>Admin</option>
                  <option value={TaskType.TRAINING}>Training</option>
                  <option value={TaskType.EVALUATION}>Evaluation</option>
               </select>
             </>
          )}
          {activeTab === 'knowledge' && (
             <>
               <input placeholder="Document Title" className="input-field w-full p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
               <select className="input-field w-full p-2 rounded" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                 <option value="Guide">Guide</option>
                 <option value="Policy">Policy</option>
                 <option value="Report">Report</option>
               </select>
               <textarea placeholder="Content" className="input-field w-full p-2 rounded h-32" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
               <input placeholder="Tags (comma separated)" className="input-field w-full p-2 rounded" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
             </>
          )}
          {activeTab === 'people' && (
             <>
               <input placeholder="Full Name" className="input-field w-full p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
               <input placeholder="Role" className="input-field w-full p-2 rounded" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
               <input placeholder="Hourly Rate" type="number" className="input-field w-full p-2 rounded" value={formData.rate} onChange={e => setFormData({...formData, rate: e.target.value})} />
               <input placeholder="Specialty" className="input-field w-full p-2 rounded" value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} />
             </>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm bg-nexus-accent text-white rounded hover:bg-nexus-accent/90">Save Item</button>
        </div>
      </div>
    );
  }

  const renderList = () => (
    <div className="space-y-4">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-bold text-white capitalize">{activeTab} List</h2>
         {!isFormOpen && (
           <button onClick={handleCreate} className="flex items-center gap-2 px-3 py-1.5 bg-nexus-700 hover:bg-nexus-600 text-white rounded text-sm transition-colors">
             <PlusIcon className="w-4 h-4" /> Add New
           </button>
         )}
       </div>

       {isFormOpen && renderForm()}

       <div className="bg-nexus-800 border border-nexus-700/50 rounded-lg overflow-hidden">
          {activeTab === 'announcements' && announcements.map(item => (
            <div key={item.id} className="p-4 border-b border-white/5 flex justify-between items-center last:border-0 hover:bg-white/5">
              <div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.category} • {item.date}</p>
              </div>
              <button onClick={(e) => handleDelete(item.id, e)} className="text-slate-500 hover:text-rose-400"><TrashIcon className="w-4 h-4" /></button>
            </div>
          ))}

          {activeTab === 'tasks' && tasks.map(item => (
            <div key={item.id} className="p-4 border-b border-white/5 flex justify-between items-center last:border-0 hover:bg-white/5">
              <div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.priority} • {item.type}</p>
              </div>
              <button onClick={(e) => handleDelete(item.id, e)} className="text-slate-500 hover:text-rose-400"><TrashIcon className="w-4 h-4" /></button>
            </div>
          ))}

          {activeTab === 'knowledge' && docs.map(item => (
            <div key={item.id} className="p-4 border-b border-white/5 flex justify-between items-center last:border-0 hover:bg-white/5">
              <div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.type} • {item.tags.join(', ')}</p>
              </div>
              <button onClick={(e) => handleDelete(item.id, e)} className="text-slate-500 hover:text-rose-400"><TrashIcon className="w-4 h-4" /></button>
            </div>
          ))}

          {activeTab === 'people' && consultants.map(item => (
            <div 
              key={item.id} 
              onClick={() => onViewProfile && onViewProfile(item.id)}
              className="p-4 border-b border-white/5 flex justify-between items-center last:border-0 hover:bg-white/5 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <img src={item.avatar} className="w-8 h-8 rounded-full" alt=""/>
                <div>
                  <h4 className="font-semibold text-white group-hover:text-nexus-accent transition-colors">{item.name}</h4>
                  <p className="text-sm text-slate-400">{item.role} • {item.specialty}</p>
                </div>
              </div>
              <button onClick={(e) => handleDelete(item.id, e)} className="text-slate-500 hover:text-rose-400 p-2"><TrashIcon className="w-4 h-4" /></button>
            </div>
          ))}
       </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">System Administration</h1>
        <p className="text-slate-400">Manage global data, users, and content across the Intranet. Changes persist to the database.</p>
      </div>
      {renderTabs()}
      {renderList()}
    </div>
  );
};

export default AdminModule;