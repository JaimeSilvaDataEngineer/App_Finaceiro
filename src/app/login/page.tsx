'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Wallet, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de Login / Redirecionamento para o Dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-blue-600">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <Wallet className="h-7 w-7 text-blue-600" />
            </div>
            <span>FinançasApp</span>
          </Link>
          <h2 className="mt-6 text-xl font-bold text-slate-900">
            {isSignUp ? 'Crie sua conta gratuitamente' : 'Acesse sua conta'}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {isSignUp
              ? 'Comece a organizar suas finanças hoje mesmo'
              : 'Entre com seu e-mail e senha para continuar'}
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 group"
          >
            <span>{isSignUp ? 'Criar Conta' : 'Entrar'}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            {isSignUp ? 'Já possui uma conta? Faça login' : 'Não tem conta? Cadastre-se gratis'}
          </button>
        </div>
      </div>
    </div>
  );
}
