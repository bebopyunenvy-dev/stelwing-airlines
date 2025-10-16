'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// icon 使用 lucide-react 套件，這是需要 npm i 的
import { Menu, X } from 'lucide-react';

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
      <header
        className="
      w-full bg-[#1F2E3C] 
      px-[64px] py-[16px]
      flex items-center gap-[48px]"
      >
        <Image
          src="/logo-white.svg"
          alt="Stelwing Logo"
          width={125}
          height={48}
        />
        <div className="nav-wrapper flex-1 flex justify-between">

          {/* 五大功能橫向電腦版：預設隱藏，出現時使用 flex */}
          <nav className="hidden md:flex gap-[36px]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#DCBB87]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 寬螢幕：工具列：(購物車)、(多語系切換)、會員中心 */}
          <div>
            <Link
              href="/member-center"
              className="text-white hover:text-[#DCBB87]"
            >
              會員中心
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
