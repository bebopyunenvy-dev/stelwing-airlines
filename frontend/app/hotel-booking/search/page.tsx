'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'; // ⭐ 1. 導入 useEffect
import { DateRange } from '../components/Calendar';
import FilterSidebar from '../components/FilterSidebar';
import HotelResultCard from '../components/HotelResultCard';
import SearchBar from '../components/SearchBar';
import { AmenityKey, MAX_PRICE, MIN_PRICE } from '../interfaces/constants';
import { allMockHotels } from '../interfaces/mockHotels';

export default function HotelPage() {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [priceMin, setPriceMin] = useState(MIN_PRICE);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<AmenityKey[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  // ⭐ 用來存放每個 hotel card 的 ref (你原本的程式碼，很棒！)
  const hotelRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const searchParams = useSearchParams(); // ⭐ 3. 獲取 URL 搜尋參數

  const clearAllFilters = useCallback(() => {
    setPriceMin(MIN_PRICE);
    setPriceMax(MAX_PRICE);
    setSelectedRatings([]);
    setSelectedAmenities([]);
  }, []);

  const filteredHotels = useMemo(() => {
    const min = Math.min(priceMin, priceMax);
    const max = Math.max(priceMin, priceMax);

    return allMockHotels.filter((hotel) => {
      if (hotel.price < min || hotel.price > max) return false;

      if (
        selectedRatings.length > 0 &&
        !selectedRatings.some((r) => hotel.rating >= r)
      )
        return false;

      if (
        selectedAmenities.length > 0 &&
        !selectedAmenities.every((a) => hotel.amenities.includes(a))
      )
        return false;

      return true;
    });
  }, [priceMin, priceMax, selectedRatings, selectedAmenities]);

  // ⭐ 4. 新增 effect 來處理滾動
  useEffect(() => {
    // 嘗試從 URL 獲取 highlight 參數
    const highlightedHotelId = searchParams.get('highlight');

    if (highlightedHotelId) {
      // 將 ID 轉為數字
      const hotelIdNumber = parseInt(highlightedHotelId, 10);
      // 從 refs 中找到對應的 DOM 元素
      const hotelElement = hotelRefs.current[hotelIdNumber];

      // 確保 ref 存在並且 filteredHotels 已經渲染完成
      if (hotelElement) {
        // 滾動到該元素
        hotelElement.scrollIntoView({
          behavior: 'smooth', // 平滑滾動
          block: 'center', // 滾動到畫面中央
        });

        // (可選) 這裡你還可以額外添加一個短暫高亮的 CSS class，
        // 但為了不影響版型，目前只做滾動
      }
    }
    // 依賴 searchParams (當 URL 參數變化時)
    // 和 filteredHotels (確保飯店列表渲染完成後才執行)
  }, [searchParams, filteredHotels]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/hotel/bg1.jpeg')" }}
    >
      <div className="flex flex-col w-full h-full bg-black/70 min-h-screen p-4 md:p-8">
        <SearchBar
          selectedRange={selectedRange}
          onDateChange={setSelectedRange}
        />

        <div className="flex-1 flex flex-col md:flex-row w-full max-w-6xl mx-auto mt-4 md:mt-6">
          <div className="w-auto flex-shrink-0 h-full">
            <FilterSidebar
              isMobileOpen={showFilter}
              onClose={() => setShowFilter(false)}
              priceMin={priceMin}
              onPriceMinChange={setPriceMin}
              priceMax={priceMax}
              onPriceMaxChange={setPriceMax}
              selectedRatings={selectedRatings}
              onSelectedRatingsChange={setSelectedRatings}
              selectedAmenities={selectedAmenities}
              onSelectedAmenitiesChange={setSelectedAmenities}
              onClearAll={clearAllFilters}
            />
          </div>

          <main className="flex-1 overflow-y-auto space-y-6 px-4 md:px-8 flex flex-col items-center">
            <button
              onClick={() => setShowFilter(true)}
              className="md:hidden mb-4 border rounded-md px-4 py-2 bg-white text-gray-800 font-bold w-full"
            >
              篩選條件
            </button>

            {filteredHotels.length === 0 ? (
              <div className="text-center py-12 text-gray-300">
                <p className="text-lg mb-4">沒有符合條件的飯店</p>
                <button
                  onClick={clearAllFilters}
                  className="text-[#DCBB87] underline"
                >
                  清除篩選條件
                </button>
              </div>
            ) : (
              filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  ref={(el) => {
                    hotelRefs.current[hotel.id] = el;
                  }}
                  className="w-full"
                >
                  <HotelResultCard hotel={hotel} />
                </div>
              ))
            )}

            <div className="flex justify-between mt-8 pb-6 w-full max-w-4xl">
              <button
                onClick={() => router.push('/hotel-booking')}
                className="border border-[#D4A574] text-[#D4A574] px-6 py-2 rounded-full hover:bg-[#D4A574] hover:text-white transition-all font-semibold"
              >
                上一步
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
