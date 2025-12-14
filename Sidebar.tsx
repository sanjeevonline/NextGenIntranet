import React from 'react';
import { 
  HomeIcon, 
  UserGroupIcon, 
  BanknotesIcon, 
  DocumentTextIcon, 
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    // Staffing has been moved inside People & HR
    { id: 'hr', label: 'People & HR', icon: UserGroupIcon },
    { id: 'finance', label: 'Finance', icon: BanknotesIcon },
    { id: 'knowledge', label: 'Knowledge Base', icon: DocumentTextIcon },
    { id: 'feedback', label: 'Feedback 360', icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-nexus-900 border-r border-nexus-700/50 flex flex-col z-50 transition-all duration-300">
      <div className="h-20 flex items-center justify-center md:justify-start md:px-8 border-b border-nexus-700/50">
        <div className="w-8 h-8 rounded bg-nexus-accent flex items-center justify-center shadow-lg shadow-nexus-accent/20">
          <span className="text-white font-bold text-lg">N</span>
        </div>
        <span className="hidden md:block ml-3 font-display font-bold text-xl tracking-wide text-white">NEXUS</span>
      </div>

      <nav className="flex-1 py-8 px-2 md:px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-center md:justify-start p-3 rounded-md transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-nexus-accent text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-nexus-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span className={`hidden md:block ml-3 text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-nexus-700/50 space-y-2">
        <button 
          onClick={() => setActiveTab('admin')}
          className={`w-full flex items-center justify-center md:justify-start p-3 rounded-md transition-all ${activeTab === 'admin' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-nexus-800'}`}
        >
          <CommandLineIcon className="w-5 h-5" />
          <span className="hidden md:block ml-3 text-sm">Admin Panel</span>
        </button>
        <button className="w-full flex items-center justify-center md:justify-start p-3 rounded-md text-slate-400 hover:text-white hover:bg-nexus-800 transition-all">
          <Cog6ToothIcon className="w-5 h-5" />
          <span className="hidden md:block ml-3 text-sm">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
