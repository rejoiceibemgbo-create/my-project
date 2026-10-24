'use client';

import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardCheck, Sparkles, Plus, CheckCheck, Trash } from 'lucide-react';

export default function TaskList({ 
  tasks, 
  onToggleComplete, 
  onStatusChange,
  onEdit, 
  onDelete, 
  onOpenNewTask,
  onBulkComplete,
  onBulkDeleteCompleted 
}) {
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const pendingCount = tasks.filter((t) => t.status !== 'completed').length;

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-50 dark:bg-brand-950/60 flex items-center justify-center text-brand-600 dark:text-brand-400">
          <ClipboardCheck className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
          No tasks found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
          There are no tasks matching your current filter criteria or search query. Create a new task or adjust your filters.
        </p>
        <button
          onClick={onOpenNewTask}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/25 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Task</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* List Header & Bulk Actions */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>
          Showing <strong className="text-slate-700 dark:text-slate-200">{tasks.length}</strong> {tasks.length === 1 ? 'task' : 'tasks'}
        </span>

        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <button
              onClick={onBulkComplete}
              className="inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium py-1 px-2 rounded hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Complete all shown</span>
            </button>
          )}

          {completedCount > 0 && (
            <button
              onClick={onBulkDeleteCompleted}
              className="inline-flex items-center gap-1 hover:text-rose-600 dark:hover:text-rose-400 font-medium py-1 px-2 rounded hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <Trash className="w-3.5 h-3.5 text-rose-500" />
              <span>Clear completed ({completedCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Task Cards Stack */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
