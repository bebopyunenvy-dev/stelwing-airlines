import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import 'styled-jsx/css';
import Footer from './components/footer';
import ConditionalHeader from './ConditionalHeader';

export const metadata: Metadata = {
  title: '展翼航空 Stelwing',
  description: 'Stelwing Airlines Official Website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <div className="flex min-h-screen flex-col">
          {/* ✅ 只有非 DutyFree 頁面才顯示 Header */}
          <ConditionalHeader />

          <main className="flex-1 flex flex-col">{children}</main>
        </div>
        {/* ✅ Footer 全站共用 */}
        <Footer />
      </body>
    </html>
  );
}
