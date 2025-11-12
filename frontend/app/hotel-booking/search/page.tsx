'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DateRange } from '../components/Calendar';
import FilterSidebar from '../components/FilterSidebar';
import HotelResultCard from '../components/HotelResultCard';
import SearchBar from '../components/SearchBar';
import { AmenityKey, MAX_PRICE, MIN_PRICE } from '../interfaces/constants';
import { allMockHotels } from '../interfaces/mockHotels';

export default function HotelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [priceMin, setPriceMin] = useState(MIN_PRICE);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<AmenityKey[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  const hotelRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  // 自動滾動到 highlight 的飯店
  useEffect(() => {
    const highlightedHotelId = searchParams.get('highlight');
    if (highlightedHotelId) {
      const id = parseInt(highlightedHotelId, 10);
      const el = hotelRefs.current[id];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-[#DCBB87]', 'ring-offset-4');
        setTimeout(
          () =>
            el.classList.remove('ring-4', 'ring-[#DCBB87]', 'ring-offset-4'),
          3000
        );
      }
    }
  }, [searchParams, filteredHotels]);

  const goToDetail = (hotelId: number) => {
    localStorage.setItem('booking_selectedHotelId', hotelId.toString());
    router.push(`/hotel-booking/${hotelId}?${searchParams.toString()}`);
  };

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
                  <div
                    onClick={() => goToDetail(hotel.id)}
                    className="cursor-pointer"
                  >
                    <HotelResultCard hotel={hotel} />
                  </div>
                </div>
              ))
            )}

            <div className="flex justify-between mt-8 pb-6 w-full max-w-4xl">
              <button
                onClick={() => router.push('/hotel-booking')}
                className="border border-[#D4A574] text-[#D4A574] px-6 py-2 rounded-full hover:bg-[#D4A574] hover:text-white transition-all font-semibold"
              >
                返回首頁
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
