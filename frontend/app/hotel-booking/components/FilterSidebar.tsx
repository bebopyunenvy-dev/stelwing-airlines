'use client';

import {
  Car,
  Clock,
  Coffee,
  Package,
  Truck,
  Utensils,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import {
  AmenityKey,
  MAX_PRICE,
  MIN_PRICE,
  PRICE_STEP,
} from '../interfaces/constants';

interface FilterSidebarProps {
  onFilter: (filters: {
    priceMin: number;
    priceMax: number;
    rating?: number[];
    amenities?: AmenityKey[];
  }) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  onFilter,
  isMobileOpen,
  onClose,
}: FilterSidebarProps) {
  const [priceMin, setPriceMin] = useState(MIN_PRICE);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [amenities, setAmenities] = useState<AmenityKey[]>([]);

  const ratings = [4.5, 4, 3.5, 3];

  const amenityList: { key: AmenityKey; label: string; icon: JSX.Element }[] = [
    { key: 'wifi', label: 'WiFi', icon: <Wifi size={16} /> },
    { key: 'parking', label: '停車場', icon: <Car size={16} /> },
    { key: 'cafe', label: '咖啡廳', icon: <Coffee size={16} /> },
    { key: 'restaurant', label: '餐廳', icon: <Utensils size={16} /> },
    { key: 'shuttleService', label: '機場接送', icon: <Truck size={16} /> },
    { key: 'frontDesk24h', label: '24小時前台', icon: <Clock size={16} /> },
    { key: 'luggageStorage', label: '行李寄存', icon: <Package size={16} /> },
  ];

  const toggleRating = (rate: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rate) ? prev.filter((r) => r !== rate) : [...prev, rate]
    );
  };

  const clearAll = () => {
    setPriceMin(MIN_PRICE);
    setPriceMax(MAX_PRICE);
    setSelectedRatings([]);
    setAmenities([]);
  };

  const applyFilters = () => {
    onFilter({
      priceMin,
      priceMax,
      rating: selectedRatings.length > 0 ? selectedRatings : undefined,
      amenities: amenities.length > 0 ? amenities : undefined,
    });
    onClose();
  };

  const minPercent = ((priceMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPercent = ((priceMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-6 z-50
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="mb-4 rounded-xl overflow-hidden cursor-pointer relative">
          <Image
            src="/images/hotel/map.jpeg"
            alt="地圖找房"
            width={280}
            height={160}
            className="object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center bg-black/30 text-white font-semibold text-lg">
            地圖找房
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">篩選條件</h3>
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            清除全部
          </button>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-gray-700">價格範圍（每晚）</h4>
          <div className="relative h-10 flex items-center">
            <div className="absolute w-full h-1 bg-gray-200 rounded" />
            <div
              className="absolute h-1 bg-[#DCBB87] rounded"
              style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            />
            <input
              type="range"
              min={MIN_PRICE}
              max={priceMax}
              step={PRICE_STEP}
              value={priceMin}
              onChange={(e) =>
                setPriceMin(
                  Math.min(Number(e.target.value), priceMax - PRICE_STEP)
                )
              }
              className="absolute w-full h-6 bg-transparent appearance-none z-20 pointer-events-auto cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:bg-[#DCBB87] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#DCBB87] 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
            />
            <input
              type="range"
              min={priceMin + PRICE_STEP}
              max={MAX_PRICE}
              step={PRICE_STEP}
              value={priceMax}
              onChange={(e) =>
                setPriceMax(
                  Math.max(Number(e.target.value), priceMin + PRICE_STEP)
                )
              }
              className="absolute w-full h-6 bg-transparent appearance-none z-10 pointer-events-auto cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:bg-[#DCBB87] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#DCBB87] 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
            />
            <div className="absolute top-0 w-full h-0 pointer-events-none">
              <div
                className="absolute bg-[#DCBB87] text-white text-xs px-2 py-1 rounded-md -translate-x-1/2"
                style={{ left: `${minPercent}%`, bottom: '100%' }}
              >
                ¥{priceMin.toLocaleString()}
              </div>
              <div
                className="absolute bg-[#DCBB87] text-white text-xs px-2 py-1 rounded-md -translate-x-1/2"
                style={{ left: `${maxPercent}%`, bottom: '100%' }}
              >
                ¥{priceMax.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-gray-700">最低評分</h4>
          <ul className="space-y-1 text-gray-700 text-sm">
            {ratings.map((r) => (
              <li key={r}>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(r)}
                    onChange={() => toggleRating(r)}
                    className="w-4 h-4 text-[#DCBB87] rounded focus:ring-[#DCBB87]"
                  />
                  {r}星以上
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-gray-700">設施</h4>
          <ul className="space-y-1 text-gray-700 text-sm">
            {amenityList.map(({ key, label, icon }) => (
              <li key={key}>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={amenities.includes(key)}
                    onChange={(e) => {
                      setAmenities((prev) =>
                        e.target.checked
                          ? [...prev, key]
                          : prev.filter((a) => a !== key)
                      );
                    }}
                    className="w-4 h-4 text-[#DCBB87] rounded focus:ring-[#DCBB87]"
                  />
                  <span className="flex items-center gap-1">
                    {icon} {label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={applyFilters}
          className="lg:hidden w-full py-3 bg-[#DCBB87] rounded-lg font-semibold text-white hover:bg-[#C49D67] transition"
        >
          套用篩選
        </button>
      </aside>
    </>
  );
}
