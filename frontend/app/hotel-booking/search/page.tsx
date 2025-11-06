'use client';

import { useCallback, useMemo, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import HotelResultCard from '../components/HotelResultCard';
import { AmenityKey, MAX_PRICE, MIN_PRICE } from '../interfaces/constants';

interface Hotel {
  id: number;
  name: string;
  engName?: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  amenities: AmenityKey[];
  taxFree?: boolean;
  notes?: string;
  roomType?: string;
}

const hotels: Hotel[] = [
  {
    id: 1,
    name: '東橫INN 成田機場新館',
    engName: 'Narita Airport Terminal | Hotel',
    location: '第二航廈・機場內',
    rating: 4.6,
    price: 8000,
    image: '/images/hotel/hotel1.jpeg',
    amenities: [
      'wifi',
      'parking',
      'cafe',
      'restaurant',
      'frontDesk24h',
      'luggageStorage',
      'shuttleService',
    ],
    taxFree: true,
    notes: '位於成田機場第二航廈內的靜謐酒店，提供便利休憩及過夜住宿。',
    roomType: '經濟雙床房',
  },
  {
    id: 2,
    name: '成田日航酒店',
    engName: 'Narita Airport Terminal | Hotel',
    location: '第二航廈・機場內',
    rating: 4.9,
    price: 8000,
    image: '/images/hotel/hotel2.jpeg',
    amenities: [
      'wifi',
      'parking',
      'cafe',
      'restaurant',
      'frontDesk24h',
      'luggageStorage',
      'shuttleService',
    ],
    taxFree: true,
    notes: '位於成田機場第二航廈內的靜謐酒店，提供便利休憩及過夜住宿。',
    roomType: '經典雙床房',
  },
  {
    id: 3,
    name: 'Solana Smart INN 成田空港',
    engName: 'Narita Airport Terminal | Hotel',
    location: '第二航廈・機場內',
    rating: 4.7,
    price: 10000,
    image: '/images/hotel/hotel3.jpeg',
    amenities: [
      'wifi',
      'parking',
      'cafe',
      'restaurant',
      'frontDesk24h',
      'luggageStorage',
      'shuttleService',
    ],
    taxFree: true,
    notes: '位於成田機場第二航廈內的靜謐酒店，提供便利休憩及過夜住宿。',
    roomType: '經典雙床房',
  },
  {
    id: 4,
    name: 'Grand Hotel Narita Airport',
    engName: 'Grand Hotel Narita Airport',
    location: '第二航廈・機場內',
    rating: 4.7,
    price: 10000,
    image: '/images/hotel/hotel4.jpeg',
    amenities: [
      'wifi',
      'parking',
      'cafe',
      'restaurant',
      'frontDesk24h',
      'luggageStorage',
      'shuttleService',
    ],
    taxFree: true,
    notes: '位於成田機場第二航廈內的靜謐酒店，提供便利休憩及過夜住宿。',
    roomType: '經典雙床房',
  },
];

export default function HotelPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<AmenityKey[]>([]);

  const handleFilter = useCallback(
    ({
      priceMin,
      priceMax,
      rating,
      amenities,
    }: {
      priceMin: number;
      priceMax: number;
      rating?: number[];
      amenities?: AmenityKey[];
    }) => {
      setPriceRange([priceMin, priceMax]);
      setSelectedRatings(rating || []);
      setSelectedAmenities(amenities || []);
    },
    []
  );

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      if (hotel.price < priceRange[0] || hotel.price > priceRange[1])
        return false;
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
  }, [priceRange, selectedRatings, selectedAmenities]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/hotel/bg1.jpeg')" }}
    >
      <div className="flex flex-col md:flex-row w-full h-full bg-black/40 min-h-screen p-4 md:p-8">
        <FilterSidebar
          isMobileOpen={showFilter}
          onClose={() => setShowFilter(false)}
          onFilter={handleFilter}
        />

        <main className="flex-1 overflow-y-auto space-y-6 px-4 md:px-8">
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
                onClick={() =>
                  handleFilter({ priceMin: MIN_PRICE, priceMax: MAX_PRICE })
                }
                className="text-[#DCBB87] underline"
              >
                清除篩選條件
              </button>
            </div>
          ) : (
            filteredHotels.map((hotel) => (
              <HotelResultCard key={hotel.id} hotel={hotel} />
            ))
          )}

          <div className="flex justify-between mt-8 pb-6">
            <button className="border border-[#D4A574] text-[#D4A574] px-6 py-2 rounded-full hover:bg-[#D4A574] hover:text-white transition-all font-semibold">
              上一步
            </button>
            <button className="border border-[#D4A574] text-[#D4A574] px-6 py-2 rounded-full hover:bg-[#D4A574] hover:text-white transition-all font-semibold">
              下一步
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
