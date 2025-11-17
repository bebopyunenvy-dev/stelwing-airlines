// app/member-center/flight/[pnr]/page.tsx

type BookingDetail = {
  detailId: number | string;
  tripType: 'OB' | 'IB';
  seat?: {
    seatNumber: string | null;
  } | null;
  baggage?: {
    weightKg: number | null;
  } | null;
  meal?: {
    mealName: string | null;
  } | null;
  flight: {
    flightNumber: string;
    flightDate: string; // YYYY-MM-DD
    originIata: string;
    destinationIata: string;
    depTimeUtc: string;
    arrTimeUtc: string;
  };
};

type Booking = {
  pnr: string;
  currency: string;
  totalAmount: number;
  paymentMethod: string | null;
  paymentStatus: string | null;
  createdAt: string;
  details: BookingDetail[];
};

// 從後端抓單一訂單
async function fetchBooking(pnr: string): Promise<Booking> {
  const res = await fetch(
    `http://localhost:3007/api/flight-booking/bookings/${pnr}`,
    { cache: 'no-store' }
  );

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error('查詢訂單失敗');
  }

  return json.data as Booking;
}

export default async function FlightTicketPage({
  params,
}: {
  params: { pnr: string };
}) {
  const booking = await fetchBooking(params.pnr);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold text-[#1F2E3C]">
        電子機票（測試版）
      </h1>

      <div className="mb-6 rounded-xl bg-white p-4 shadow">
        <div className="mb-2 text-sm text-[#555]">
          訂單編號：<span className="font-semibold">#{booking.pnr}</span>
        </div>
        <div className="mb-1 text-sm text-[#555]">
          付款方式：{booking.paymentMethod || '未提供'}
        </div>
        <div className="mb-1 text-sm text-[#555]">
          狀態：{booking.paymentStatus || 'pending'}
        </div>
        <div className="text-sm text-[#555]">
          成立時間：{new Date(booking.createdAt).toLocaleString('zh-TW')}
        </div>
      </div>

      {booking.details.map((d) => (
        <div
          key={d.detailId}
          className="mb-6 rounded-xl border border-[#ddd] bg-white p-4"
        >
          <div className="mb-2 text-sm font-semibold text-[#1F2E3C]">
            {d.tripType === 'OB' ? '去程' : '回程'}
          </div>
          <div className="mb-1 text-sm">
            航班編號：
            <span className="font-semibold">{d.flight.flightNumber}</span>
          </div>
          <div className="mb-1 text-sm">
            航段：{d.flight.originIata} → {d.flight.destinationIata}
          </div>
          <div className="mb-1 text-sm">起飛日期：{d.flight.flightDate}</div>
          <div className="mb-1 text-sm">座位：{d.seat?.seatNumber || '-'}</div>
          <div className="mb-1 text-sm">
            行李：{d.baggage?.weightKg ? `${d.baggage.weightKg}kg` : '-'}
          </div>
          <div className="mb-1 text-sm">餐點：{d.meal?.mealName || '-'}</div>
        </div>
      ))}
    </div>
  );
}
