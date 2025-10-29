'use client';

import * as React from 'react';
import Calendar, { DateRange } from './components/Calendar';
import HotelCard from './components/HotelCard';
import SearchBar from './components/SearchBar';
import { HotelCardData } from './interfaces/HotelCardData';

export default function Page() {
  // 範例飯店資料
  const hotels: HotelCardData[] = [
    {
      id: 1,
      name: 'Toyoko Inn Narita Airport',
      location: 'Tokyo, Japan',
      distance: '距離市中心 0.1 公里',
      rating: 4.6,
      price: 3500,
      currency: 'NT$',
      priceUnit: '每晚',
      image: '/images/hotel/room1.jpeg',
    },
    {
      id: 2,
      name: 'Hotel Nikko Narita',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.3公里',
      rating: 4.9,
      price: 5500,
      currency: 'NT$',
      priceUnit: '每晚',
      image: '/images/hotel/room2.jpeg',
    },
    {
      id: 3,
      name: 'Hotel Mystays Premier Narita',
      location: 'Tokyo, Japan',
      distance: '第二航廈・機場內',
      rating: 4.7,
      price: 3800,
      currency: 'NT$',
      priceUnit: '每晚',
      image: '/images/hotel/room3.jpeg',
    },
    {
      id: 4,
      name: 'Garden Hotel Narita',
      location: 'Tokyo, Japan',
      distance: '距離機場約 0.2公里',
      rating: 4.8,
      price: 4500,
      currency: 'NT$',
      priceUnit: '每晚',
      image: '/images/hotel/room4.jpeg',
    },
    {
      id: 5,
      name: 'Narita Tobu Hotel Airport',
      location: 'Tokyo, Japan',
      distance: '第二航廈・機場內',
      rating: 4.8,
      price: 3000,
      currency: 'NT$',
      priceUnit: '每晚',
      image: '/images/hotel/room5.jpeg',
    },
  ];

  // 狀態：儲存選取的日期
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(undefined);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ========== 1. SearchBar（頂部搜尋欄） ========== */}
      <SearchBar />

      {/* ========== 2. 日曆區域 ========== */}
      <div className="py-12 flex flex-col items-center">
        <Calendar selected={selectedRange} onSelect={setSelectedRange} />
      </div>

      {/* ========== 3. 飯店列表區域 ========== */}
      <div className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* 標題 */}
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            TOP 5 附近優質飯店
          </h2>

          {/* 飯店卡片列表（橫向滾動）*/}
          <div className="flex gap-6 overflow-x-auto px-6 py-4 scrollbar-hide">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>

      {/* 隱藏滾動條的樣式 */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
