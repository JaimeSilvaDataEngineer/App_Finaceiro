'use client';

import { Transaction } from '@/types/finance';
import { formatCurrency } from '@/lib/utils';
import { Edit2, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-slate-500">
        Nenhuma transação encontrada.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b bg-slate-50/50">
        <h3 className="font-semibold text-slate-800">Histórico de Transações</h3>
      </div>
      <div className="divide-y divide-slate-100 overflow-x-auto">
        {transactions.map((t) => (
          <div key={t.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`p-2 rounded-full shrink-0 ${
                  t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}
              >
                {t.type === 'income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-slate-900 truncate">{t.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="inline-block px-2 py-0.5 bg-slate-100 rounded-full font-medium">{t.category}</span>
                  <span>•</span>
                  <span>{new Date(t.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-semibold text-sm sm:text-base whitespace-nowrap ${
                  t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(t)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Editar"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
