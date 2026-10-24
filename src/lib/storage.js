const STORAGE_KEY = 'brightedge_task_manager_data_v1';
const THEME_KEY = 'brightedge_task_manager_theme';

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Audit shared spreadsheet entries & eliminate duplicate records',
    description: 'Consolidate the regional operations spreadsheets from Q3. Identify duplicate task entries and verify owners with team leads before archival.',
    priority: 'high',
    category: 'operations',
    status: 'pending',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-2',
    title: 'Prepare Q4 team capacity and accountability summary',
    description: 'Synthesize internal hours, current project blockages, and milestone tracking for Operations Manager Melissa Grant.',
    priority: 'urgent',
    category: 'management',
    status: 'in_progress',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-3',
    title: 'Standardize client onboarding SOP documentation',
    description: 'Document step-by-step workflow for rapid client onboarding to prevent recurring communication gaps.',
    priority: 'medium',
    category: 'operations',
    status: 'completed',
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Schedule weekly operations standup & blocker review',
    description: 'Establish a concise 15-minute sync every Monday morning to review high-priority deliverables and deadline risks.',
    priority: 'low',
    category: 'team',
    status: 'pending',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-5',
    title: 'Review prototype deliverables against BrightEdge requirements',
    description: 'Validate task creation, completion toggles, local persistence, responsive design, and intuitive user workflow.',
    priority: 'high',
    category: 'tech',
    status: 'completed',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date().toISOString(),
  },
];

export function loadTasks() {
  if (typeof window === 'undefined') return INITIAL_TASKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveTasks(INITIAL_TASKS);
      return INITIAL_TASKS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_TASKS;
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return INITIAL_TASKS;
  }
}

export function saveTasks(tasks) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
}

export function resetToDefaults() {
  saveTasks(INITIAL_TASKS);
  return INITIAL_TASKS;
}

export function loadTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch {
    return 'light';
  }
}

export function saveTheme(theme) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Error saving theme:', e);
  }
}

export function exportToCSV(tasks) {
  const headers = ['ID', 'Title', 'Description', 'Priority', 'Category', 'Status', 'Due Date', 'Created At', 'Completed At'];
  const rows = tasks.map((t) => [
    t.id,
    `"${(t.title || '').replace(/"/g, '""')}"`,
    `"${(t.description || '').replace(/"/g, '""')}"`,
    t.priority || 'medium',
    t.category || 'operations',
    t.status || 'pending',
    t.dueDate || '',
    t.createdAt || '',
    t.completedAt || '',
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `brightedge_tasks_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(tasks) {
  const jsonContent = JSON.stringify(tasks, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `brightedge_tasks_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, '').toLowerCase());
  const tasks = [];

  for (let i = 1; i < lines.length; i++) {
    // Regex for CSV with quoted strings
    const match = lines[i].match(/(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g);
    if (!match) continue;

    const values = match.map((val) => {
      let cleaned = val.replace(/^,/, '').trim();
      if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.slice(1, -1).replace(/""/g, '"');
      }
      return cleaned;
    });

    const rowObj = {};
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] || '';
    });

    const title = rowObj.title || rowObj.task || rowObj.name || values[1] || values[0];
    if (!title) continue;

    tasks.push({
      id: 'import-' + Math.random().toString(36).substr(2, 9),
      title: title,
      description: rowObj.description || rowObj.details || rowObj.notes || '',
      priority: ['urgent', 'high', 'medium', 'low'].includes((rowObj.priority || '').toLowerCase())
        ? rowObj.priority.toLowerCase()
        : 'medium',
      category: rowObj.category || 'operations',
      status: (rowObj.status || '').toLowerCase().includes('complete') ? 'completed' : 'pending',
      dueDate: rowObj['due date'] || rowObj.duedate || rowObj.due || '',
      createdAt: new Date().toISOString(),
      completedAt: null,
    });
  }

  return tasks;
}
