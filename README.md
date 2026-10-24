# BrightEdge Technologies - Operations Task Management Solution

A lightweight, web-based task management tool engineered specifically for **BrightEdge Technologies** to help internal operations teams organize and track daily activities, prevent duplicate efforts, eliminate missed deadlines, and boost overall team accountability.

> **Client:** BrightEdge Technologies (`contact@brightedge.tech`)  
> **Contact:** Melissa Grant (Operations Manager)  
> **Built by:** CodeOrbit (`hello@codeorbit.tech`)  
> **Tech Stack:** Next.js, React, Tailwind CSS, JavaScript  

---

## 🎯 Project Requirements & Deliverables

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **1. Add new tasks** | Quick inline task bar + comprehensive modal dialog supporting titles, descriptions, priorities, departments, and due dates. | ✅ Completed |
| **2. Mark tasks as completed** | Interactive 1-click completion toggle with visual strike-through, badge updates, and celebratory confetti micro-animation. | ✅ Completed |
| **3. Delete tasks** | Task deletion with dedicated confirmation modal and clear completed bulk action. | ✅ Completed |
| **4. Retain data across browser refresh** | Client-side `localStorage` engine with synchronization and automatic schema handling. | ✅ Completed |
| **5. Brief Documentation** | In-app **Operations Manual & Maintenance Guide** plus this comprehensive `README.md`. | ✅ Completed |

---

## 🚀 Key Features

1. **Operations Dashboard & KPI Metrics:**
   - **Total Tasks:** Real-time count of active operations records.
   - **Pending / In Progress:** Live tally of ongoing work with urgent item badges.
   - **Completed & Completion Rate:** Percentage progress bar reflecting team throughput.
   - **Overdue Deadlines:** Visual alerts for tasks that have crossed their due date.

2. **Transition from Shared Spreadsheets:**
   - **Export to CSV:** Direct export to open in Microsoft Excel or Google Sheets.
   - **Import CSV:** Drag-and-drop or paste legacy spreadsheet rows directly into the system.
   - **JSON Backup:** Full snapshot backup and restore capability.

3. **Dual View Modes:**
   - **List View:** Streamlined, dense operational view with inline quick edits and bulk actions.
   - **Kanban Board:** Three visual lanes (*To Do*, *In Progress*, *Completed*) for visual workflow management.

4. **Multi-Criteria Filtering & Live Search:**
   - Real-time search across titles and descriptions.
   - Filter by status (*All*, *To Do*, *In Progress*, *Completed*, *Overdue*).
   - Filter by department (*Operations*, *Management*, *Team Sync*, *Tech/IT*, *Client Relations*, *General*).
   - Filter by priority (*Urgent*, *High*, *Medium*, *Low*).
   - Sort by Newest, Earliest Due Date, Highest Priority, or Alphabetical.

5. **Dark Mode & Modern Aesthetics:**
   - Fully responsive on mobile, tablet, and desktop.
   - Seamless dark/light theme switch with persistent user preference.
   - Tailored Tailwind palette with glassmorphism and micro-animations.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS (utility-first, no raw HTML/CSS files)
- **Language:** JavaScript (ES6+ / JSX)
- **Icons:** Lucide React

---

## 💻 Getting Started & Local Development

### Prerequisites
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Production Build
To create an optimized production bundle:
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
├── package.json               # Dependencies and build scripts
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS styling tokens & themes
├── postcss.config.js          # PostCSS configuration for Tailwind
├── jsconfig.json              # JavaScript module path aliases (@/*)
├── src/
│   ├── app/
│   │   ├── layout.js          # Next.js App Router Root Layout & metadata
│   │   ├── page.js            # Main dashboard application page
│   │   └── globals.css        # Tailwind directives (@tailwind base/components/utilities)
│   ├── components/
│   │   ├── Header.jsx         # Navigation bar, brand logo, action buttons, theme toggle
│   │   ├── StatsOverview.jsx  # KPI metrics overview cards and progress indicators
│   │   ├── TaskToolbar.jsx    # Quick add bar, search, filter pills, view switcher
│   │   ├── TaskCard.jsx       # Interactive task item with status and inline actions
│   │   ├── TaskList.jsx       # Task list container with bulk actions & empty states
│   │   ├── KanbanBoard.jsx    # Kanban lanes (To Do, In Progress, Completed)
│   │   ├── TaskModal.jsx      # Task creation & editing dialog
│   │   ├── SpreadsheetModal.jsx # CSV/JSON export and import modal
│   │   ├── DocsModal.jsx      # Interactive operations manual and technical guide
│   │   └── DeleteConfirmModal.jsx # Safe deletion confirmation dialog
│   └── lib/
│       ├── types.js           # Priorities, categories, statuses, and style tokens
│       ├── storage.js         # LocalStorage persistence, seed data, and CSV parser
│       └── confetti.js        # Canvas confetti micro-animation
└── README.md                  # System documentation
```

---

## 📋 Maintenance & Support

- **Data Reset:** If the team wishes to reset the task board back to initial BrightEdge demonstration tasks, click the circular refresh icon in the header or call `resetToDefaults()` in `src/lib/storage.js`.
- **Storage Key:** Task data is saved under `localStorage` key `brightedge_task_manager_data_v1`.
- **Support Contact:** CodeOrbit (`hello@codeorbit.tech`)
