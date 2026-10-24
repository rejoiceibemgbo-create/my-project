'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Code, 
  Settings, 
  FileSpreadsheet, 
  ShieldCheck 
} from 'lucide-react';

export default function DocsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('user-guide');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150 max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Operations Guide & Docs
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                User manual, migration workflow, and system architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Horizontally scrollable on mobile) */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-3 sm:px-6 pt-2 shrink-0 bg-slate-50/50 dark:bg-slate-900/50 overflow-x-auto scrollbar-none">
          {[
            { id: 'user-guide', label: 'User Guide', icon: CheckCircle2 },
            { id: 'spreadsheet', label: 'Spreadsheet Migration', icon: FileSpreadsheet },
            { id: 'maintenance', label: 'Technical Maintenance', icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400 dark:border-brand-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex-1">
          
          {activeTab === 'user-guide' && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                BrightEdge Operations User Manual
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Designed for Melissa Grant and BrightEdge Technologies internal teams to coordinate daily activities, prevent duplicate tasks, and meet project deadlines.
              </p>

              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 flex items-center justify-center text-[10px]">1</span>
                    Adding New Tasks
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Use either the top <strong>Quick Add Bar</strong> for rapid one-line entries or click <strong>New Task</strong> to add rich details including descriptions, priority levels (Urgent, High, Medium, Low), department categories, and due dates.
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 flex items-center justify-center text-[10px]">2</span>
                    Marking Tasks as Completed
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Click the checkbox icon on any task card. The item is marked as completed with a celebratory confetti micro-animation, and team completion metrics are immediately updated in real time.
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300 flex items-center justify-center text-[10px]">3</span>
                    Deleting Tasks
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Click the trash icon on the task card to remove tasks that are no longer needed. A confirmation modal protects against accidental deletions.
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 flex items-center justify-center text-[10px]">4</span>
                    Automatic Browser Persistence
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    All tasks, priorities, tags, and progress are automatically synchronized with browser <code className="text-brand-600 dark:text-brand-400">localStorage</code>. Refreshing the browser preserves all data safely.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'spreadsheet' && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Transitioning from Shared Spreadsheets
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                How BrightEdge teams can eliminate duplicate entries and transfer existing spreadsheet rows directly into the tool.
              </p>

              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50">
                  <h5 className="font-bold text-xs text-emerald-800 dark:text-emerald-300 mb-1">
                    1. Export from Google Sheets or Excel
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Open your current shared spreadsheet, click <em>File → Download → Comma Separated Values (.csv)</em>.
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100 mb-1">
                    2. Import via the "Spreadsheets" Button
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Click <strong>Spreadsheets</strong> in the navigation bar or mobile hamburger menu, drag and drop the CSV file or paste the contents into the text area. The system parses all rows automatically into live interactive task cards.
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100 mb-1">
                    3. Export Reports Anytime
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Operations managers can export fresh CSV or JSON backups at any time for executive reporting or offline archiving.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Technical Architecture & Maintenance
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Built strictly with <strong>React</strong>, <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, and <strong>JavaScript</strong>.
              </p>

              <div className="space-y-2.5 sm:space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900 text-slate-200">
                  <p className="text-emerald-400 font-sans font-semibold mb-1"># Running in development:</p>
                  <code>npm run dev</code>
                  <p className="text-slate-400 font-sans mt-1 text-[11px]">Opens dev server on http://localhost:3000</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 text-slate-200">
                  <p className="text-emerald-400 font-sans font-semibold mb-1"># Building for production:</p>
                  <code>npm run build</code>
                  <p className="text-emerald-400 font-sans font-semibold mt-2 mb-1"># Starting production server:</p>
                  <code>npm run start</code>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-sans">
                  <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Storage Schema & Keys
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Tasks are stored under key <code className="text-brand-600 font-mono">brightedge_task_manager_data_v1</code>. Dark mode preference is preserved under <code className="text-brand-600 font-mono">brightedge_task_manager_theme</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
}
