'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Sun, 
  Moon, 
  FileSpreadsheet, 
  BookOpen, 
  Plus, 
  RefreshCw,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ListTodo,
  Clock,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export default function Header({ 
  darkMode, 
  setDarkMode, 
  onOpenNewTask, 
  onOpenSpreadsheet, 
  onOpenDocs, 
  onResetData,
  totalTasks = 0,
  tasks = []
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compute counts for the mobile drawer stats
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress' || t.status === 'pending').length;

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/85 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand & Organization */}
            <div className="flex items-center space-x-2.5 sm:space-x-4 min-w-0">
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 shrink-0">
                <CheckSquare className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                <span className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <h1 className="text-base sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
                    BrightEdge<span className="text-brand-600 dark:text-brand-400">.tech</span>
                  </h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shrink-0">
                    Operations Hub
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 hidden md:block truncate">
                  Internal Task Management & Team Accountability Solution
                </p>
              </div>
            </div>

            {/* Desktop Action Tools (visible on md screens and up) */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              
              {/* Spreadsheet Integration Modal Button */}
              <button
                onClick={onOpenSpreadsheet}
                title="Import or Export Spreadsheet data (CSV / JSON)"
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs lg:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Spreadsheets</span>
              </button>

              {/* Guide & Docs */}
              <button
                onClick={onOpenDocs}
                title="BrightEdge Operations User Guide & Documentation"
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs lg:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Guide</span>
              </button>

              {/* Reset / Demo seed data */}
              <button
                onClick={onResetData}
                title="Restore BrightEdge default sample tasks"
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle theme"
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>

              {/* Add Task Primary CTA */}
              <button
                onClick={onOpenNewTask}
                className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs lg:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:scale-95 shadow-md shadow-brand-500/25 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Task</span>
              </button>

            </div>

            {/* Mobile Header Controls (Visible on mobile/tablet < md) */}
            <div className="flex md:hidden items-center space-x-2">
              
              {/* Quick Add Button (Compact on mobile) */}
              <button
                onClick={onOpenNewTask}
                className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 active:scale-95 shadow-sm shadow-brand-500/30 rounded-xl transition-all"
                aria-label="Create new task"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Task</span>
              </button>

              {/* Theme Toggle for quick access on mobile */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle theme"
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 transition-all"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>

              {/* HAMBURGER MENU BUTTON */}
              <button
                id="mobile-hamburger-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                className="p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all active:scale-95 flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER & BACKDROP */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Slide-out Container */}
          <div 
            className="relative w-full max-w-xs sm:max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center space-x-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-md">
                    <CheckSquare className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      BrightEdge<span className="text-brand-600 dark:text-brand-400">.tech</span>
                    </h2>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      Operations Hub Menu
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Status KPI Pill in Drawer */}
              <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Board Snapshot
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">
                      {totalTasks}
                    </div>
                    <div className="text-[10px] text-slate-500">Total</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
                    <div className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                      {inProgressCount}
                    </div>
                    <div className="text-[10px] text-slate-500">Active</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
                    <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      {completedCount}
                    </div>
                    <div className="text-[10px] text-slate-500">Done</div>
                  </div>
                </div>
              </div>

              {/* Main Action Items */}
              <div className="p-4 space-y-2">
                
                {/* Primary CTA: New Task */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenNewTask();
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-98 text-white font-semibold text-sm shadow-md shadow-brand-500/25 transition-all mb-4"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Create New Task</span>
                </button>

                <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1 pt-1">
                  Tools & Operations
                </div>

                {/* Spreadsheet Tool */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSpreadsheet();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                        Spreadsheet Integration
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Import & Export CSV / JSON
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Guide & Docs */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDocs();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                        Operations Guide
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        User manual & instructions
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Reset Data */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onResetData();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                        Reset Sample Data
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Restore default team tasks
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                  <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1 mb-2">
                    Preferences
                  </div>

                  {/* Dark Mode Toggle Item */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                          {darkMode ? 'Dark Theme' : 'Light Theme'}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {darkMode ? 'Active' : 'Active'}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        darkMode ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                      aria-label="Toggle theme mode"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                BrightEdge Technologies Inc.
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                Internal Operations Portal v1.0
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
