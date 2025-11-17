'use client';
import { usePathname } from 'next/navigation';
import Header from './components/header';

export default function ConditionalHeader() {
  const pathname = usePathname();

  // ✅ Dutyfree 模組不顯示全站 Header
  if (pathname.startsWith('/dutyfree-shop')) {
    return null;
  }

  // ✅ 其他頁面才顯示全站 Header
  return <Header />;
}
