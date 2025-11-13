'use client';

import { Calendar, Moon, Users } from 'lucide-react';
import { HotelDetailData } from '../interfaces/HotelDetailData';

interface HotelDetailBookingCardProps {
  hotel: HotelDetailData;
  formData: {
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    rooms: number;
    roomType: string; // 必須加上！
    smokingPreference?: string;
  };
  onInputChange: (field: string, value: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function HotelDetailBookingCard({
  hotel,
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
}: HotelDetailBookingCardProps) {
  const totalPrice = hotel.price * formData.nights * formData.rooms;

  return (
    <aside className="lg:w-80 flex-shrink-0">
      <div className="sticky top-10 bg-[#F7F7F7] p-6 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">立即預訂</h2>

        <div className="flex justify-between items-end mb-4 border-b pb-4">
          <span className="text-sm text-gray-600">總金額 (含稅)</span>
          <span className="text-4xl font-extrabold text-[#303D49]">
            ${totalPrice.toLocaleString()}
          </span>
        </div>

        {/* 表單區塊 */}
        <div className="space-y-4 text-gray-700">
          {/* 入住日期 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              入住日期
            </label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => onInputChange('checkIn', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            />
          </div>

          {/* 退房日期 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              退房日期
            </label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) => onInputChange('checkOut', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            />
          </div>

          {/* 住宿晚數 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Moon size={16} className="text-gray-500" />
              住宿晚數
            </label>
            <select
              value={formData.nights}
              onChange={(e) =>
                onInputChange('nights', parseInt(e.target.value))
              }
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            >
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} 晚
                </option>
              ))}
            </select>
          </div>

          {/* 住宿人數 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Users size={16} className="text-gray-500" />
              住宿人數
            </label>
            <select
              value={formData.guests}
              onChange={(e) =>
                onInputChange('guests', parseInt(e.target.value))
              }
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} 人
                </option>
              ))}
            </select>
          </div>

          {/* 房間數 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Users size={16} className="text-gray-500" />
              房間數
            </label>
            <select
              value={formData.rooms}
              onChange={(e) => onInputChange('rooms', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} 間
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 右側訂單摘要 - 完全聯動 */}
        <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>飯店名稱</span>
            <span className="font-medium">{hotel.name}</span>
          </div>
          <div className="flex justify-between">
            <span>房型</span>
            <span>{formData.roomType}</span> {/* 這裡聯動！ */}
          </div>
          <div className="flex justify-between">
            <span>入住</span>
            <span>{formData.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span>退房</span>
            <span>{formData.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span>住宿晚數</span>
            <span className="font-semibold text-[#DCBB87]">
              {formData.nights} 晚
            </span>
          </div>
          <div className="flex justify-between">
            <span>人數</span>
            <span>{formData.guests} 人</span>
          </div>
          <div className="flex justify-between">
            <span>房間數</span>
            <span>{formData.rooms} 間</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>總金額</span>
            <span className="text-[#DCBB87]">
              ${totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 按鈕 */}
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full mt-6 py-3 bg-[#1F2E3C] text-white font-bold text-lg rounded-lg hover:bg-[#2e445b] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          {isSubmitting ? '處理中...' : '前往付款'}
        </button>

        <p className="text-xs text-center text-gray-500 mt-3">
          點擊確認預訂即表示您同意我們的服務條款
        </p>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-gray-700">
          <p className="font-semibold mb-1">Free cancellation</p>
          <p>入住前 24 小時可免費取消</p>
        </div>
      </div>
    </aside>
  );
}
