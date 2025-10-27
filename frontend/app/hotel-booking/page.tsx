'use client';
import HotelCard from './components/HotelCard';
import { HotelCardData } from './interfaces/HotelCardData';

// ==================== 飯店搜尋頁面 (首頁) ====================
// 顯示多張飯店卡片（可橫向滾動）
export default function HotelSearchPage() {
  // 範例飯店資料
  const hotels: HotelCardData[] = [
    {
      id: 1,
      name: 'Taipei Grand Hotel',
      location: 'Taipei, Taiwan',
      distance: '距離市中心 2 公里',
      rating: 4.6,
      price: 2800,
      currency: 'NT$',
      priceUnit: '每晚',
      image: '/images/hotel/room2.jpeg',
    },
    {
      id: 2,
      name: 'Tokyo Imperial Hotel',
      location: 'Tokyo, Japan',
      distance: '距離車站 500 公尺',
      rating: 4.8,
      price: 5800,
      currency: '¥',
      priceUnit: '每晚',
      image: '/images/hotel/room3.jpeg',
    },
    {
      id: 3,
      name: 'Seoul Sky Residence',
      location: 'Seoul, Korea',
      distance: '距離明洞 1.2 公里',
      rating: 4.5,
      price: 3200,
      currency: '₩',
      priceUnit: '每晚',
      image: '/images/hotel/room4.jpeg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* 標題 */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        熱門飯店推薦
      </h1>

      {/* 飯店卡片列表（橫向滾動） */}
      <div className="flex gap-6 overflow-x-auto px-6 scrollbar-hide">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
