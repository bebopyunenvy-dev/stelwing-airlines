import type { Metadata } from 'next';
import { DFStoreProvider } from './context/DFStoreContext';
import './style.css';

export const metadata: Metadata = {
  title: 'Stelwing Duty Free',
  description: 'Stelwing Airlines 免稅店專區',
};

export default function DutyFreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className="bg-gray-50 text-gray-900">
        <DFStoreProvider>
          <main className="min-h-screen flex flex-col">{children}</main>
        </DFStoreProvider>
      </body>
    </html>
  );
}
