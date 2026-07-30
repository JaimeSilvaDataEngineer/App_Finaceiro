import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finanças Pessoais App',
  description: 'Controle suas finanças pessoais de forma simples, visual e inteligente.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
