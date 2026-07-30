'use client';

import { useState, useMemo } from 'react';
import { Transaction, CATEGORIES } from '@/types/finance';
import { formatCurrency } from '@/lib/utils';
import { ArrowUpCircle, ArrowDownCircle, DollarSign, Download, Search, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TransactionModal } from './transaction-modal';
import { TransactionList } from './transaction-list';

interface DashboardProps {
  initialTransactions?: Transaction[];
}

const COLORS = ['#0284c7', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1'];

export function DashboardView({ initialTransactions = [] }: DashboardProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialTransactions.length > 0
      ? initialTransactions
      : [
          {
            id: '1',
            user_id: 'demo',
            description: 'Salário Mensal',
            amount: 5000,
            type: 'income',
            category: 'Salário',
            date: '2026-07-01',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            user_id: 'demo',
            description: 'Aluguel do Ap',
            amount: 1500,
            type: 'expense',
            category: 'Moradia',
            date: '2026-07-05',
            created_at: new Date().toISOString(),
          },
          {
            id: '3',
            user_id: 'demo',
            description: 'Supermercado',
            amount: 850,
            type: 'expense',
            category: 'Alimentação',
            date: '2026-07-10',
            created_at: new Date().toISOString(),
          },
          {
            id: '4',
            user_id: 'demo',
            description: 'Projeto Freelance',
            amount: 1200,
            type: 'income',
            category: 'Freelance',
            date: '2026-07-15',
            created_at: new Date().toISOString(),
          },
        ]
  );

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Filtros aplicados
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, search, selectedCategory]);

  // Cálculos consolidados
  const totals = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, t) => {
        const val = Number(t.amount);
        if (t.type === 'income') acc.income += val;
        if (t.type === 'expense') acc.expense += val;
        acc.balance = acc.income - acc.expense;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [filteredTransactions]);

  // Dados formatados para o gráfico Recharts (apenas despesas)
  const chartData = useMemo(() => {
    const expenses = filteredTransactions.filter((t) => t.type === 'expense');
    const categoryMap: Record<string, number> = {};

    expenses.forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
    });

    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, [filteredTransactions]);

  // Salvar / Atualizar transação
  const handleSaveTransaction = (data: Partial<Transaction>) => {
    if (data.id) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === data.id ? ({ ...t, ...data } as Transaction) : t))
      );
    } else {
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substring(2, 9),
        user_id: 'demo',
        description: data.description || '',
        amount: data.amount || 0,
        type: data.type || 'expense',
        category: data.category || 'Outros',
        date: data.date || new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
    }
  };

  // Excluir transação
  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Exportar para CSV
  const handleExportCSV = () => {
    const headers = ['Data,Descrição,Tipo,Categoria,Valor
'];
    const rows = filteredTransactions.map(
      (t) => `${t.date},"${t.description}",${t.type === 'income' ? 'Receita' : 'Despesa'},${t.category},${t.amount}`
    );

    const blob = new Blob([headers.concat(rows.join('
')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transacoes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Financeiro</h1>
          <p className="text-sm text-slate-500">Acompanhe suas receitas, despesas e saldo mensal</p>
        </div>
        <button
          onClick={() => {
            setEditingTransaction(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nova Transação</span>
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Receitas Totais</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(totals.income)}</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <ArrowUpCircle className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Despesas Totais</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">{formatCurrency(totals.expense)}</p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
            <ArrowDownCircle className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Saldo Atual</p>
            <p className={`text-2xl font-bold mt-1 ${totals.balance >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
              {formatCurrency(totals.balance)}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Gráfico & Controles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Despesas por Categoria */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Despesas por Categoria</h3>
          <div className="h-64 flex items-center justify-center">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    innerRadius={45}
                    paddingAngle={3}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => formatCurrency(val)} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-slate-400">Nenhuma despesa registrada</p>
            )}
          </div>
        </div>

        {/* Filtros e Lista de Transações */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por descrição..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas as Categorias</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-2 border text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shrink-0"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exportar CSV</span>
              </button>
            </div>
          </div>

          <TransactionList
            transactions={filteredTransactions}
            onEdit={(t) => {
              setEditingTransaction(t);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>

      {/* Modal CRUD */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSaveTransaction}
        initialData={editingTransaction}
      />
    </div>
  );
}
