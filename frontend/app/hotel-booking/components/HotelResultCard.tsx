'use client';

import {
  Car,
  Clock,
  Coffee,
  Heart,
  MapPin,
  Package,
  Star,
  Truck,
  Utensils,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AmenityKey, amenityLabels } from '../interfaces/constants';

interface HotelResultCardProps {
  hotel: {
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
  };
}

export default function HotelResultCard({ hotel }: HotelResultCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: number[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setIsFavorite(favorites.includes(hotel.id));
  }, [hotel.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites: number[] = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    const updated = isFavorite
      ? favorites.filter((id) => id !== hotel.id)
      : [...favorites, hotel.id];
    localStorage.setItem('favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    router.push(`/hotel/${hotel.id}`);
  };

  const iconsMap: Record<AmenityKey, React.ReactNode> = {
    wifi: <Wifi size={18} />,
    parking: <Car size={18} />,
    cafe: <Coffee size={18} />,
    restaurant: <Utensils size={18} />,
    frontDesk24h: <Clock size={18} />,
    luggageStorage: <Package size={18} />,
    shuttleService: <Truck size={18} />,
  };

  return (
    <div
      onClick={handleClick}
      className="flex bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
    >
      {/* 圖片 */}
      <div className="relative w-40 h-32 rounded-l-2xl overflow-hidden flex-shrink-0">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className="absolute top-2 left-2 bg-[#DCBB87] text-white font-semibold text-xs rounded-md px-2 flex items-center gap-1">
          <Star size={12} /> {hotel.rating.toFixed(1)}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/hotel/${hotel.id}`);
          }}
          className="absolute top-2 right-6 w-6 h-6 bg-white rounded-full flex justify-center items-center text-gray-800 shadow-md hover:bg-gray-100 transition"
          aria-label="更多資訊"
        >
          &gt;
        </button>
      </div>

      {/* 資訊區 */}
      <div className="flex flex-col flex-1 p-4 gap-3 relative">
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-gray-200 flex justify-center items-center text-gray-400 hover:text-red-500 transition"
          aria-label="收藏"
        >
          <Heart
            size={20}
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke={isFavorite ? 'none' : undefined}
          />
        </button>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
          <p className="text-sm text-gray-600">{hotel.engName}</p>
          <div className="flex items-center text-gray-500 text-xs gap-2 mt-1 mb-1">
            <MapPin size={12} /> {hotel.location}
            {hotel.taxFree && (
              <span className="ml-3 px-2 py-0.5 rounded-md bg-[#DCBB87] text-black font-semibold text-xs">
                免稅
              </span>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-700">
          <p className="font-semibold">
            房型：{hotel.roomType || '經濟雙床房'}
          </p>
          <p>{hotel.notes}</p>
        </div>

        <div className="flex gap-3 text-gray-600">
          {hotel.amenities.map((key) => (
            <div
              key={key}
              className="bg-gray-100 rounded-md p-1 flex items-center justify-center"
              style={{ width: 28, height: 28 }}
              title={amenityLabels[key]}
            >
              {iconsMap[key]}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-auto items-center gap-4">
          <div className="text-2xl font-bold text-gray-900">
            ${hotel.price.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 mb-0.5">/night</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`預訂 ${hotel.name}`);
            }}
            className="px-6 py-2 bg-[#1E2A33] text-[#DCBB87] font-semibold rounded-md hover:bg-[#303D49] transition"
          >
            預訂
          </button>
        </div>
      </div>
    </div>
  );
}
