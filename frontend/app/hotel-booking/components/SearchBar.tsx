'use client';

import { Calendar as CalendarIcon, Users } from 'lucide-react';
import { useState } from 'react';
import Calendar, { DateRange } from './Calendar';

interface SearchBarProps {
  // 當搜尋條件改變時，通知父組件
  onSearchChange?: (params: {
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    adults: number;
    rooms: number;
  }) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  // ========== State 狀態管理 ==========
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);

  /**
   * 格式化日期顯示
   */
  const formatDate = (date: Date | undefined, placeholder: string) => {
    if (!date) return placeholder;
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  /**
   * 處理日期選擇
   */
  const handleDateSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    // 當兩個日期都選好後，自動關閉日曆
    if (range?.from && range?.to) {
      setShowCalendar(false);
    }
  };

  /**
   * 處理搜尋
   */
  const handleSearch = () => {
    const searchParams = {
      checkIn: selectedRange?.from,
      checkOut: selectedRange?.to,
      adults,
      rooms,
    };

    console.log('搜尋條件：', searchParams);

    // 通知父組件
    if (onSearchChange) {
      onSearchChange(searchParams);
    }
  };

  return (
    <>
      {/* 深色背景容器 */}
      <div className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 標題 */}
          <h1 className="text-center text-xl mb-8 font-medium">
            提尋機場內及周邊 1 公里內的優質住宿
          </h1>

          {/* 搜尋欄 */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Check in 按鈕 */}
            <button
              onClick={() => setShowCalendar(true)}
              className="bg-white text-gray-800 px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors min-w-[160px]"
            >
              <CalendarIcon size={20} className="text-gray-600" />
              <span className="font-medium">
                {formatDate(selectedRange?.from, 'Check in')}
              </span>
            </button>

            {/* Check out 按鈕 */}
            <button
              onClick={() => setShowCalendar(true)}
              className="bg-white text-gray-800 px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors min-w-[160px]"
            >
              <CalendarIcon size={20} className="text-gray-600" />
              <span className="font-medium">
                {formatDate(selectedRange?.to, 'Check out')}
              </span>
            </button>

            {/* 人數選擇按鈕 */}
            <div className="relative">
              <button className="bg-white text-gray-800 px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors min-w-[180px]">
                <Users size={20} className="text-gray-600" />
                <span className="font-medium">
                  {adults} Adults / {rooms} room
                </span>
              </button>
            </div>

            {/* 搜尋按鈕 */}
            <button
              onClick={handleSearch}
              className="bg-[#D4A574] hover:bg-[#C69563] text-white font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg active:scale-95"
            >
              搜尋
            </button>
          </div>
        </div>
      </div>

      {/* 日曆彈窗 */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          {/* 點擊背景關閉 */}
          <div
            className="absolute inset-0"
            onClick={() => setShowCalendar(false)}
          />

          {/* 日曆容器 */}
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-4xl w-full">
            {/* 關閉按鈕 */}
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>

            {/* Calendar 組件 */}
            <Calendar selected={selectedRange} onSelect={handleDateSelect} />

            {/* 確認按鈕 */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowCalendar(false)}
                className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => setShowCalendar(false)}
                className="px-6 py-2 bg-[#D4A574] hover:bg-[#C69563] text-white rounded-lg transition-colors"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS 樣式 - 日曆顏色變數 */}
      <style jsx global>{`
        :root {
          --calendar-primary: #a88352;
          --calendar-selected: #a88352;
          --calendar-muted: #bfa789;
          --calendar-range: rgba(168, 131, 82, 0.15);
          --calendar-past: #cccccc;
        }
      `}</style>
    </>
  );
}
