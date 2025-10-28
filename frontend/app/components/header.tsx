'use client';

import clsx from 'clsx';
import { ChevronDown, Globe, Plane } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// icon 使用 lucide-react 套件，這是需要 npm i 的

export interface HeaderProps {
  className?: string;
}

export default function Header({}: HeaderProps) {
  // 導覽 nav 有橫向電腦版和手機漢堡版，透過這裡做切換，預設是不打開 (false) 的漢堡版
  const [isOpen, setIsOpen] = useState(false);

  // 不能重複寫五次 Link，迴圈用起來
  const navItems = [
    { name: '訂購機票', href: '/flight-booking' },
    { name: '住宿預定', href: '/hotel-booking' },
    { name: '免稅商品', href: '/dutyfree-shop' },
    { name: '旅程規劃', href: '/travel-planner' },
    { name: '旅遊分享', href: '/travel-community' },
  ];

  return (
    <>
      <header className={clsx('bg-[var(--sw-primary)] h-[64px]')}>
        {/* 固定高度 + 垂直置中，左右兩邊都對齊 */}
        <div className="mx-auto w-full h-full px-[64px] flex items-center justify-between gap-[48px]">
          {/* 左：Logo + 主導覽 */}
          <div className="flex items-center gap-[48px]">
            <Image
              src="/logo-white.svg"
              alt="Stelwing Logo"
              width={125}
              height={48}
              className="block"
              priority
            />

            {/* 五大功能：統一高度、leading 置零，視覺對齊右側 */}
            <nav className="hidden md:flex items-center gap-[36px]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center h-10 leading-none text-white hover:text-[var(--sw-accent)] transition"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* 右：語系 + 會員登入 */}
          <div className="flex items-center gap-[24px]">
            {/* 語系切換 */}
            <button
              type="button"
              className="inline-flex items-center h-10 leading-none gap-2 text-white hover:text-[var(--sw-accent)] transition"
              aria-label="切換語言"
            >
              <Globe className="w-4 h-4" />
              <span>繁體中文</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* 會員登入（用你的金色按鈕樣式） */}
            <Link
              href="/member-center"
              className="sw-btn sw-btn--gold-primary inline-flex items-center h-10 leading-none gap-2"
            >
              <Plane className="w-4 h-4 text-[color:var(--sw-primary)]" />
              會員登入
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
