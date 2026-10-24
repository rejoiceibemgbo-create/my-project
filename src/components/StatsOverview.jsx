'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ListTodo, 
  TrendingUp 
} from 'lucide-react';

export default function StatsOverview({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress' || t.status === 'pending').length;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const overdue = tasks.filter((t) => {
    if (t.status === 'completed' || !t.dueDate) return false;
    return t.dueDate < todayStr;
  }).length;

  const urgentCount = tasks.filter((t) => t.status !== 'completed' && t.priority === 'urgent').length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6">
      
      {/* Total Tasks */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
            Total Tasks
          </span>
          <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
            <ListTodo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white">
              {total}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400">records</span>
          </div>
        </div>
      </div>

      {/* Pending / In Progress */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
            In Progress
          </span>
          <div className="p-1.5 sm:p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2 flex-wrap">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {inProgress}
            </span>
            {urgentCount > 0 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                {urgentCount} urgent
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
            Completed
          </span>
          <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {completed}
            </span>
            <span className="text-[10px] sm:text-xs text-emerald-700 dark:text-emerald-400 font-medium">
              {percent}% done
            </span>
          </div>
          {/* Mini progress bar */}
          <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Overdue / Deadlines */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
            Overdue
          </span>
          <div className={`p-1.5 sm:p-2 rounded-xl shrink-0 ${overdue > 0 ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className={`text-xl sm:text-2xl lg:text-3xl font-extrabold ${overdue > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
              {overdue}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 truncate">
              {overdue > 0 ? 'needs attention' : 'on schedule'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
