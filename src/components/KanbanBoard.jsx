'use client';

import React from 'react';
import TaskCard from './TaskCard';
import { Plus, ListTodo, Clock, CheckCircle2 } from 'lucide-react';

export default function KanbanBoard({
  tasks,
  onToggleComplete,
  onStatusChange,
  onEdit,
  onDelete,
  onOpenNewTask,
}) {
  const columns = [
    {
      id: 'pending',
      title: 'To Do',
      icon: ListTodo,
      color: 'border-slate-300 dark:border-slate-700',
      badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      items: tasks.filter((t) => t.status === 'pending'),
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      icon: Clock,
      color: 'border-amber-400 dark:border-amber-600',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      items: tasks.filter((t) => t.status === 'in_progress'),
    },
    {
      id: 'completed',
      title: 'Completed',
      icon: CheckCircle2,
      color: 'border-emerald-400 dark:border-emerald-600',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      items: tasks.filter((t) => t.status === 'completed'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {columns.map((col) => {
        const IconComponent = col.icon;
        return (
          <div
            key={col.id}
            className="flex flex-col bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <IconComponent className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  {col.title}
                </h4>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${col.badgeColor}`}>
                  {col.items.length}
                </span>
              </div>

              {col.id === 'pending' && (
                <button
                  onClick={onOpenNewTask}
                  className="p-1 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  title="Add task to To Do"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Column Cards */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {col.items.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <span>No tasks</span>
                </div>
              ) : (
                col.items.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onStatusChange={onStatusChange}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
