import React from 'react';
import { Task, Priority, TaskType } from '../types';
import { ExclamationTriangleIcon, CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.HIGH: return 'text-red-400 border-red-500/30 bg-red-500/10';
      case Priority.MEDIUM: return 'text-nexus-warning border-nexus-warning/30 bg-nexus-warning/10';
      case Priority.LOW: return 'text-nexus-success border-nexus-success/30 bg-nexus-success/10';
    }
  };

  const getTypeIcon = (t: TaskType) => {
    switch (t) {
      case TaskType.TRAINING: return '🛡️';
      case TaskType.EVALUATION: return '👥';
      case TaskType.PROJECT_PREP: return '🚀';
      case TaskType.ADMIN: return '📝';
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl hover:bg-white/5 transition-all duration-300 group cursor-pointer border-l-4 border-l-transparent hover:border-l-nexus-accent">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs font-bold px-2 py-1 rounded-md border ${getPriorityColor(task.priority)}`}>
          {task.priority} PRIORITY
        </span>
        <span className="text-2xl">{getTypeIcon(task.type)}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-nexus-accent transition-colors">
        {task.title}
      </h3>
      <p className="text-sm text-slate-400 mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        {task.progress > 0 && (
           <div className="flex items-center gap-2">
             <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-nexus-success" 
                 style={{ width: `${task.progress}%` }}
               />
             </div>
             <span>{task.progress}%</span>
           </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
        <button className="text-sm font-medium text-nexus-accent hover:text-white flex items-center gap-1">
          Start Task <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
