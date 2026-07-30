'use client';

import { Navbar } from '@/components/navbar';
import { DashboardView } from '@/components/dashboard/dashboard-view';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar userEmail="usuario@exemplo.com" />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardView />
      </main>
    </div>
  );
}
