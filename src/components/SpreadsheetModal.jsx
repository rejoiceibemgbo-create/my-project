'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Download, 
  Upload, 
  FileJson, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { exportToCSV, exportToJSON, parseCSV } from '../lib/storage';

export default function SpreadsheetModal({ 
  isOpen, 
  onClose, 
  tasks, 
  onImportTasks 
}) {
  const [csvText, setCsvText] = useState('');
  const [importMessage, setImportMessage] = useState(null);

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

  const handleExportCSV = () => {
    exportToCSV(tasks);
  };

  const handleExportJSON = () => {
    exportToJSON(tasks);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        processCSV(content);
      }
    };
    reader.readAsText(file);
  };

  const handlePasteImport = () => {
    if (!csvText.trim()) return;
    processCSV(csvText);
  };

  const processCSV = (rawText) => {
    try {
      const imported = parseCSV(rawText);
      if (imported.length === 0) {
        setImportMessage({
          type: 'error',
          text: 'No valid task rows could be parsed. Check your CSV header (Title, Description, Priority, Due Date).',
        });
        return;
      }

      onImportTasks(imported);
      setImportMessage({
        type: 'success',
        text: `Successfully imported ${imported.length} tasks from spreadsheet!`,
      });
      setCsvText('');
      setTimeout(() => {
        onClose();
        setImportMessage(null);
      }, 1500);
    } catch (err) {
      setImportMessage({
        type: 'error',
        text: 'Failed to parse CSV file: ' + err.message,
      });
    }
  };

  const downloadSampleTemplate = () => {
    const sample = 'Title,Description,Priority,Category,Status,Due Date\r\n"Deploy customer portal update","Update authentication flow","high","tech","pending","2026-10-25"\r\n"Prepare team quarterly review","Gather individual metrics for Melissa","urgent","management","pending","2026-10-28"';
    const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'brightedge_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150 max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Spreadsheet Integration & Portability
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                Import CSV spreadsheet or export team reports
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

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
          
          {importMessage && (
            <div
              className={`flex items-center space-x-2 p-3 text-xs rounded-xl border ${
                importMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800'
              }`}
            >
              {importMessage.type === 'success' ? (
                <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{importMessage.text}</span>
            </div>
          )}

          {/* Section 1: Export */}
          <div>
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Export BrightEdge Operations Data
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center space-x-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-left transition-all active:scale-98"
              >
                <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500 text-white shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                    Export as CSV
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    Open in Excel or Google Sheets
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleExportJSON}
                className="flex items-center space-x-3 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 text-left transition-all active:scale-98"
              >
                <div className="p-2.5 rounded-xl bg-indigo-500 text-white shrink-0">
                  <FileJson className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                    Backup as JSON
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    Full structured snapshot
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Import from Spreadsheet */}
          <div>
            <div className="flex items-center justify-between mb-2.5 flex-wrap gap-1">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                Import from Spreadsheet (.csv)
              </h4>
              <button
                type="button"
                onClick={downloadSampleTemplate}
                className="text-[11px] text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 font-medium"
              >
                <FileText className="w-3 h-3" />
                Download CSV Template
              </button>
            </div>

            {/* File drop area */}
            <label className="flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 rounded-2xl cursor-pointer bg-slate-50 dark:bg-slate-800/40 hover:bg-brand-50/20 dark:hover:bg-brand-950/20 transition-all text-center">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600 dark:text-brand-400 mb-2" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Tap to upload CSV spreadsheet
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Supports: Title, Description, Priority, Due Date
              </span>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Or Paste CSV text */}
            <div className="mt-3">
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Or paste CSV contents directly:
              </label>
              <textarea
                rows={3}
                placeholder="Title,Description,Priority,Due Date&#10;Audit spreadsheet,Migrate Q3 items,high,2026-10-25"
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              <button
                type="button"
                disabled={!csvText.trim()}
                onClick={handlePasteImport}
                className="mt-2 w-full py-2.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-98"
              >
                Process & Import Pasted CSV
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
