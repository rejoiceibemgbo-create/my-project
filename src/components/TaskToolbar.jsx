'use client';

import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutList, 
  Kanban, 
  ArrowUpDown, 
  PlusCircle, 
  X,
  Filter
} from 'lucide-react';
import { CATEGORIES } from '../lib/types';

export default function TaskToolbar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onQuickAdd,
}) {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickCategory, setQuickCategory] = useState('operations');

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    onQuickAdd({
      title: quickTitle.trim(),
      category: quickCategory,
      priority: 'medium',
    });
    setQuickTitle('');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || categoryFilter !== 'all' || priorityFilter !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setPriorityFilter('all');
  };

  return (
    <div className="space-y-3 sm:space-y-4 mb-6">
      
      {/* Quick Add Bar */}
      <form 
        onSubmit={handleQuickSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all"
      >
        <div className="flex-1 flex items-center px-2 sm:px-3 gap-2">
          <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600 dark:text-brand-400 shrink-0" />
          <input
            type="text"
            placeholder="Quick add a new task..."
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            className="w-full bg-transparent py-1.5 sm:py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 px-1">
          <select
            value={quickCategory}
            onChange={(e) => setQuickCategory(e.target.value)}
            className="flex-1 sm:flex-none text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-2 px-2.5 rounded-xl border-0 focus:ring-1 focus:ring-brand-500 cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={!quickTitle.trim()}
            className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-sm shrink-0 active:scale-95 text-center"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Main Filter & Control Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        
        {/* Top row: Search + View Mode Switcher + Sort */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            {/* Sort Dropdown */}
            <div className="flex-1 sm:flex-none flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-transparent border-0 text-slate-700 dark:text-slate-200 text-xs focus:ring-0 cursor-pointer pr-1"
              >
                <option value="newest">Newest First</option>
                <option value="due_soon">Due Date (Earliest)</option>
                <option value="priority_high">Priority (Highest)</option>
                <option value="alphabetical">Title (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
                title="List View"
              >
                <LayoutList className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('kanban')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  viewMode === 'kanban' 
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
                title="Kanban Board View"
              >
                <Kanban className="w-4 h-4" />
                <span className="hidden sm:inline">Board</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom row: Status Filter Buttons + Category/Priority Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800">
          
          {/* Status Tabs (Horizontally scrollable on mobile without wrapping) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
            {[
              { id: 'all', label: 'All Tasks' },
              { id: 'pending', label: 'To Do' },
              { id: 'in_progress', label: 'In Progress' },
              { id: 'completed', label: 'Completed' },
              { id: 'overdue', label: 'Overdue' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  statusFilter === tab.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Secondary Filters (Department, Priority, Clear) */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex-1 sm:flex-none text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-1.5 px-2.5 rounded-xl cursor-pointer"
            >
              <option value="all">All Departments</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="flex-1 sm:flex-none text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-1.5 px-2.5 rounded-xl cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 font-medium px-2.5 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 shrink-0"
              >
                Clear
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
