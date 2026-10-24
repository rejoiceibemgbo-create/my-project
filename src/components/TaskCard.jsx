'use client';

import React from 'react';
import { 
  CheckCircle, 
  Circle, 
  Calendar, 
  Trash2, 
  Edit3, 
  Clock, 
  AlertTriangle,
  PlayCircle
} from 'lucide-react';
import { PRIORITIES, CATEGORIES } from '../lib/types';
import { triggerConfetti } from '../lib/confetti';

export default function TaskCard({ 
  task, 
  onToggleComplete, 
  onStatusChange,
  onEdit, 
  onDelete 
}) {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';
  const priorityInfo = PRIORITIES[task.priority] || PRIORITIES.medium;
  const categoryInfo = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[0];

  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = !isCompleted && task.dueDate && task.dueDate < todayStr;
  const isDueToday = !isCompleted && task.dueDate && task.dueDate === todayStr;

  const handleToggle = () => {
    if (!isCompleted) {
      triggerConfetti();
    }
    onToggleComplete(task.id);
  };

  return (
    <div
      className={`group relative rounded-2xl p-3.5 sm:p-5 transition-all duration-200 border ${
        isCompleted
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/50 opacity-85'
          : isInProgress
          ? 'bg-white dark:bg-slate-900 border-amber-300/80 dark:border-amber-700/60 shadow-sm hover:shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div className="flex items-start gap-2.5 sm:gap-4">
        
        {/* Checkbox Complete Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
          className="mt-0.5 shrink-0 transition-transform active:scale-90 focus:outline-none p-0.5"
          aria-label={isCompleted ? "Mark task incomplete" : "Mark task complete"}
        >
          {isCompleted ? (
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm shadow-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </div>
          ) : (
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:border-brand-500 dark:hover:border-brand-400 flex items-center justify-center transition-colors">
              <Circle className="w-3 h-3 text-transparent group-hover:text-slate-300" />
            </div>
          )}
        </button>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Header row: Title + Actions */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              className={`text-sm sm:text-base font-semibold leading-snug break-words transition-all ${
                isCompleted 
                  ? 'line-through text-slate-400 dark:text-slate-500' 
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {task.title}
            </h3>

            {/* Quick Actions (always visible on touch devices, hover on desktop) */}
            <div className="flex items-center space-x-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onEdit(task)}
                title="Edit Task"
                className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Edit task"
              >
                <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                title="Delete Task"
                className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                aria-label="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Description (if provided) */}
          {task.description && (
            <p 
              className={`mt-1.5 text-xs sm:text-sm leading-relaxed break-words ${
                isCompleted 
                  ? 'line-through text-slate-400 dark:text-slate-500' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Badges & Meta info */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
            
            {/* Priority Badge */}
            <span className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-md font-medium border ${priorityInfo.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dot}`} />
              <span>{priorityInfo.label}</span>
            </span>

            {/* Category Tag */}
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium border ${categoryInfo.color}`}>
              {categoryInfo.label}
            </span>

            {/* Status Selector Pill */}
            <div className="relative inline-flex items-center">
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
                className="text-[11px] font-medium rounded-md py-0.5 px-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer focus:ring-1 focus:ring-brand-500"
                aria-label="Change status"
              >
                <option value="pending">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Due Date Indicator */}
            {task.dueDate && (
              <span 
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium text-[11px] ${
                  isOverdue 
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-semibold' 
                    : isDueToday
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                {isOverdue ? (
                  <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                ) : (
                  <Calendar className="w-3 h-3 shrink-0" />
                )}
                <span>
                  {isOverdue ? `Overdue: ${task.dueDate}` : isDueToday ? `Due Today` : `Due: ${task.dueDate}`}
                </span>
              </span>
            )}

            {/* Completed timestamp if completed */}
            {isCompleted && task.completedAt && (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />
                Done
              </span>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
