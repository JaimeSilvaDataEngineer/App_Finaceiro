# Finanças Pessoais App

Um aplicativo moderno e minimalista de gestão financeira pessoal desenvolvido com Next.js 14, Supabase e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** (Autenticação + PostgreSQL + Row Level Security)
- **Recharts** para visualização gráfica
- **Lucide React** para ícones

## 📦 Como Executar

1. Clone o repositório ou descompacte este arquivo.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env.local` baseado no `.env.example`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=seu_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```
4. Execute o script SQL contido em `supabase/schema.sql` no **SQL Editor** do Supabase.
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Acesse `http://localhost:3000`.

## 🛡️ Segurança

Todas as consultas ao banco de dados são protegidas com **Row Level Security (RLS)** do Supabase, garantindo que cada usuário acesse exclusivamente os seus próprios registros.
