'use client';

import { useState, useEffect } from 'react';
import { Transaction, CATEGORIES, TransactionType } from '@/types/finance';
import { Plus, X } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Partial<Transaction>) => void;
  initialData?: Transaction | null;
}

export function TransactionModal({ isOpen, onClose, onSave, initialData }: TransactionModalProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description);
      setAmount(initialData.amount.toString());
      setType(initialData.type);
      setCategory(initialData.category);
      setDate(initialData.date);
    } else {
      setDescription('');
      setAmount('');
      setType('expense');
      setCategory(CATEGORIES[0]);
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || Number(amount) <= 0) return;

    onSave({
      ...(initialData?.id ? { id: initialData.id } : {}),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 rounded-lg p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {initialData ? 'Editar Transação' : 'Nova Transação'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo: Receita / Despesa */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`py-2 text-sm font-semibold rounded-md transition-all ${
                type === 'expense'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`py-2 text-sm font-semibold rounded-md transition-all ${
                type === 'income'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Receita
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Descrição
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Supermercado, Salário..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Valor (R$)
            </label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Data
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
