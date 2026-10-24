import './globals.css';

export const metadata = {
  title: 'BrightEdge Technologies | Operations Task Manager',
  description: 'A lightweight, web-based task management solution engineered for BrightEdge Technologies internal operations teams to track daily activities, prevent duplicate efforts, and improve team accountability.',
  keywords: 'task management, operations, BrightEdge Technologies, Next.js, React, Tailwind CSS',
  authors: [{ name: 'CodeOrbit Team' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
