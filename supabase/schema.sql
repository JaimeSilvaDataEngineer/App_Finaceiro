-- Criar enum de tipo de transação
CREATE TYPE transaction_type AS ENUM ('income', 'expense');

-- Criar tabela de transações
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  type transaction_type NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS para garantir isolamento por usuário
CREATE POLICY "Usuários podem ver suas próprias transações" 
  ON transactions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias transações" 
  ON transactions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias transações" 
  ON transactions FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias transações" 
  ON transactions FOR DELETE 
  USING (auth.uid() = user_id);

-- Índices para otimizar busca e filtros
CREATE INDEX idx_transactions_user_date ON transactions(user_id, date);
CREATE INDEX idx_transactions_category ON transactions(user_id, category);
