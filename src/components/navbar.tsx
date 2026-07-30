'use client';

import Link from 'next/link';
import { Wallet, LogOut } from 'lucide-react';

interface NavbarProps {
  userEmail?: string;
  onLogout?: () => void;
}

export function Navbar({ userEmail, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <Wallet className="h-6 w-6" />
          </div>
          <span>FinançasApp</span>
        </Link>

        {userEmail ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:inline">{userEmail}</span>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
