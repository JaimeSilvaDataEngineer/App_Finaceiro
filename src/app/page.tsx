import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Wallet, PieChart, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wider">
            Simples • Visual • Inteligente
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Assuma o controle total das suas <span className="text-blue-600">finanças pessoais</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Abandone as planilhas complexas. Cadastre suas receitas e despesas, veja gráficos visuais e tome decisões financeiras mais inteligentes.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Ver Demo no Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-xl border border-slate-200 shadow-sm transition-colors"
            >
              Criar Conta Grátis
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl w-fit">
                  <PieChart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Dashboard Intuitivo</h3>
                <p className="text-sm text-slate-600">
                  Gráficos visuais por categoria e resumo simplificado de receitas, despesas e saldo real.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl w-fit">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Gestão Fácil (CRUD)</h3>
                <p className="text-sm text-slate-600">
                  Adicione, edite e filtre transações rapidamente por descrição, categoria ou período.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl w-fit">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Segurança & Privacidade</h3>
                <p className="text-sm text-slate-600">
                  Seus dados protegidos por autenticação e Row Level Security (RLS) no PostgreSQL.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t text-center text-sm text-slate-500 bg-white">
        © 2026 Finanças Pessoais App. Todos os direitos reservados.
      </footer>
    </div>
  );
}
