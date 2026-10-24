'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import StatsOverview from '../components/StatsOverview';
import TaskToolbar from '../components/TaskToolbar';
import TaskList from '../components/TaskList';
import KanbanBoard from '../components/KanbanBoard';
import TaskModal from '../components/TaskModal';
import SpreadsheetModal from '../components/SpreadsheetModal';
import DocsModal from '../components/DocsModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { 
  loadTasks, 
  saveTasks, 
  loadTheme, 
  saveTheme, 
  resetToDefaults 
} from '../lib/storage';
import { PRIORITIES } from '../lib/types';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list');

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSpreadsheetOpen, setIsSpreadsheetOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Toast Notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Load initial tasks & theme
  useEffect(() => {
    const savedTheme = loadTheme();
    const isDark = savedTheme === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const initialData = loadTasks();
    setTasks(initialData);
    setIsLoaded(true);
  }, []);

  // Update theme when toggled
  useEffect(() => {
    if (!isLoaded) return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      saveTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      saveTheme('light');
    }
  }, [darkMode, isLoaded]);

  // Sync tasks to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded) return;
    saveTasks(tasks);
  }, [tasks, isLoaded]);

  // Task Operations
  const handleCreateOrUpdateTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
      showToast('Task updated successfully');
    } else {
      setTasks((prev) => [taskData, ...prev]);
      showToast('Task added to tracking board');
    }
    setEditingTask(null);
  };

  const handleQuickAdd = ({ title, category, priority }) => {
    const newTask = {
      id: 'task-' + Date.now(),
      title,
      description: '',
      priority: priority || 'medium',
      category: category || 'operations',
      status: 'pending',
      dueDate: '',
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Added: "${title}"`);
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const isNowCompleted = t.status !== 'completed';
          return {
            ...t,
            status: isNowCompleted ? 'completed' : 'pending',
            completedAt: isNowCompleted ? new Date().toISOString() : null,
          };
        }
        return t;
      })
    );
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: newStatus,
            completedAt: newStatus === 'completed' ? (t.completedAt || new Date().toISOString()) : null,
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    setDeleteTargetId(taskId);
  };

  const confirmDeleteTask = () => {
    if (!deleteTargetId) return;
    const taskToDelete = tasks.find((t) => t.id === deleteTargetId);
    setTasks((prev) => prev.filter((t) => t.id !== deleteTargetId));
    setDeleteTargetId(null);
    showToast(`Task removed`, 'info');
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleResetData = () => {
    if (window.confirm('Restore BrightEdge default sample tasks? This will reset your active board.')) {
      const defaults = resetToDefaults();
      setTasks(defaults);
      showToast('Restored default BrightEdge operations data');
    }
  };

  const handleImportTasks = (importedTasks) => {
    setTasks((prev) => [...importedTasks, ...prev]);
    showToast(`Imported ${importedTasks.length} tasks from spreadsheet!`);
  };

  const handleBulkComplete = () => {
    const shownIds = new Set(filteredTasks.map((t) => t.id));
    setTasks((prev) =>
      prev.map((t) => {
        if (shownIds.has(t.id) && t.status !== 'completed') {
          return { ...t, status: 'completed', completedAt: new Date().toISOString() };
        }
        return t;
      })
    );
    showToast('Marked visible tasks as completed');
  };

  const handleBulkDeleteCompleted = () => {
    if (window.confirm('Are you sure you want to delete all completed tasks?')) {
      setTasks((prev) => prev.filter((t) => t.status !== 'completed'));
      showToast('Cleared all completed tasks');
    }
  };

  // Filtered and Sorted Tasks
  const filteredTasks = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    return tasks
      .filter((task) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (task.title || '').toLowerCase().includes(q);
          const matchDesc = (task.description || '').toLowerCase().includes(q);
          if (!matchTitle && !matchDesc) return false;
        }

        // Status filter
        if (statusFilter === 'pending') {
          if (task.status === 'completed') return false;
        } else if (statusFilter === 'in_progress') {
          if (task.status !== 'in_progress') return false;
        } else if (statusFilter === 'completed') {
          if (task.status !== 'completed') return false;
        } else if (statusFilter === 'overdue') {
          if (task.status === 'completed' || !task.dueDate || task.dueDate >= todayStr) {
            return false;
          }
        }

        // Category filter
        if (categoryFilter !== 'all' && task.category !== categoryFilter) {
          return false;
        }

        // Priority filter
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (sortBy === 'due_soon') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        if (sortBy === 'priority_high') {
          const wA = PRIORITIES[a.priority]?.weight || 0;
          const wB = PRIORITIES[b.priority]?.weight || 0;
          return wB - wA;
        }
        if (sortBy === 'alphabetical') {
          return (a.title || '').localeCompare(b.title || '');
        }
        return 0;
      });
  }, [tasks, searchQuery, statusFilter, categoryFilter, priorityFilter, sortBy]);

  const deletingTaskObject = tasks.find((t) => t.id === deleteTargetId);

  return (
    <div className="min-h-screen flex flex-col transition-colors">
      
      {/* Header with Hamburger Menu */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenNewTask={() => {
          setEditingTask(null);
          setIsTaskModalOpen(true);
        }}
        onOpenSpreadsheet={() => setIsSpreadsheetOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        onResetData={handleResetData}
        totalTasks={tasks.length}
        tasks={tasks}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Welcome & Context Banner */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-700 text-white shadow-xl shadow-brand-500/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Operations Portal</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold tracking-tight">
              BrightEdge Operations Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mt-1 leading-relaxed">
              Organize team activities, eliminate spreadsheet duplicates, and track progress effortlessly.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsDocsOpen(true)}
              className="flex-1 sm:flex-none px-3.5 py-2.5 sm:py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all text-center"
            >
              How it works
            </button>
            <button
              onClick={() => {
                setEditingTask(null);
                setIsTaskModalOpen(true);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 text-xs font-semibold rounded-xl bg-white text-brand-700 hover:bg-brand-50 shadow-md transition-all active:scale-95 text-center"
            >
              + Create Task
            </button>
          </div>
        </div>

        {/* Stats KPI Overview */}
        <StatsOverview tasks={tasks} />

        {/* Task Control Toolbar */}
        <TaskToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onQuickAdd={handleQuickAdd}
        />

        {/* Task View: List or Kanban */}
        {viewMode === 'list' ? (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onOpenNewTask={() => {
              setEditingTask(null);
              setIsTaskModalOpen(true);
            }}
            onBulkComplete={handleBulkComplete}
            onBulkDeleteCompleted={handleBulkDeleteCompleted}
          />
        ) : (
          <KanbanBoard
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onOpenNewTask={() => {
              setEditingTask(null);
              setIsTaskModalOpen(true);
            }}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Crafted for <strong>BrightEdge Technologies</strong> (contact@brightedge.tech)
          </p>
          <div className="flex items-center space-x-4 text-xs">
            <button 
              onClick={() => setIsDocsOpen(true)}
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              User & Maintenance Guide
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsSpreadsheetOpen(true)}
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Spreadsheet Migration
            </button>
            <span>•</span>
            <span>Local Storage Active</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleCreateOrUpdateTask}
        initialTask={editingTask}
      />

      <SpreadsheetModal
        isOpen={isSpreadsheetOpen}
        onClose={() => setIsSpreadsheetOpen(false)}
        tasks={tasks}
        onImportTasks={handleImportTasks}
      />

      <DocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDeleteTask}
        taskTitle={deletingTaskObject?.title || ''}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl border border-slate-700 dark:border-slate-200 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span className="text-xs font-semibold">{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="p-1 rounded hover:bg-white/10 dark:hover:bg-slate-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
