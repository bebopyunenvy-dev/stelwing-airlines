'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type BookingDetail = {
  detailId: number | string;
  tripType: 'outbound' | 'inbound' | null;
  flight: {
    flightId: number | string;
    flightNumber: string;
    flightDate: string; // YYYY-MM-DD
    originIata: string;
    destinationIata: string;
    depTimeUtc: string; // ISO
    arrTimeUtc: string; // ISO
    status: string;
  };
};
type BookingDTO = {
  pnr: string;
  currency: string;
  totalAmount: number;
  firstName: string | null;
  lastName: string | null;
  paymentStatus: string;
  details: BookingDetail[];
};

type FareStore = {
  flightId?: number;
  flightNo?: string;
  finalFare?: number;
  currency?: string;
  cabin?: string;
  leg?: {
    originCode: string;
    destinationCode: string;
    depTime: string;
    arrTime: string;
  };
};

const fmtMoney = (n: number) =>
  `TWD ${Number(n || 0).toLocaleString('zh-TW', { maximumFractionDigits: 0 })}`;

export default function CheckoutPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const pnr = sp.get('pnr') ?? '';

  const [data, setData] = useState<BookingDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 右側表單（聯絡資訊 / 付款）
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [payMethod, setPayMethod] = useState<'card' | 'linepay'>('card');
  const [card, setCard] = useState({ number: '', exp: '', cvc: '' });

  // 1) 讀取 booking
  useEffect(() => {
    if (!pnr) {
      setError('缺少 PNR');
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3007/api/flight-booking/${encodeURIComponent(pnr)}`,
          { cache: 'no-store' }
        );
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          const t = await res.text();
          throw new Error(`Unexpected response: ${t.slice(0, 120)}...`);
        }
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
        setData(json);
      } catch (e: any) {
        console.error(e);
        setError(e?.message || '載入訂單失敗');
      }
    })();
  }, [pnr]);

  // 2) 從 PassengerPage 暫存帶聯絡人
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('stelwing.passenger.form');
      if (raw) {
        const parsed = JSON.parse(raw);
        setContact({
          firstName: parsed?.contact?.firstName || '',
          lastName: parsed?.contact?.lastName || '',
          phone:
            (parsed?.contact?.phoneCountry
              ? `${parsed.contact.phoneCountry}-`
              : '') + (parsed?.contact?.phone || ''),
          email: parsed?.contact?.email || '',
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // 3) 取票價（優先 sessionStorage）
  const obFareStore: FareStore | null = useMemo(() => {
    try {
      const s = sessionStorage.getItem('fare_outbound');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }, []);
  const ibFareStore: FareStore | null = useMemo(() => {
    try {
      const s = sessionStorage.getItem('fare_inbound');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  }, []);

  // 4) 整理去回程資料給左側卡使用
  const segments = useMemo(() => {
    if (!data) return { ob: null as any, ib: null as any, total: 0 };
    const currency = data.currency || 'TWD';

    const ob = data.details.find((d) => d.tripType === 'outbound');
    const ib = data.details.find((d) => d.tripType === 'inbound');

    // 小計：若 sessionStorage 有 finalFare 則用；否則用平均拆分
    const segCount = [ob, ib].filter(Boolean).length || 1;
    const avg = Math.round((data.totalAmount || 0) / segCount);

    const obFare = Math.round(
      (obFareStore?.finalFare as number) ?? (segCount ? avg : 0)
    );
    const ibFare = Math.round(
      (ibFareStore?.finalFare as number) ?? (segCount > 1 ? avg : 0)
    );

    const mapSeg = (d?: BookingDetail | null, fare?: number) => {
      if (!d) return null;
      const f = d.flight;
      const dep = new Date(f.depTimeUtc);
      const arr = new Date(f.arrTimeUtc);
      return {
        title: d.tripType === 'inbound' ? '回程' : '去程',
        flightNo: f.flightNumber,
        origin: f.originIata,
        destination: f.destinationIata,
        depTime: dep.toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        arrTime: arr.toLocaleTimeString('zh-TW', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        fare: fare || 0,
        currency,
      };
    };

    return {
      ob: mapSeg(ob, obFare),
      ib: mapSeg(ib, ibFare),
      total: Math.round((obFare || 0) + (ibFare || 0)),
      currency,
    };
  }, [data, obFareStore, ibFareStore]);

  const onPrev = () => router.back();
  const onPay = () => {
    // 這裡你之後串真實金流；先做 UI 動作
    alert('模擬付款成功！(此區可串接金流或導至 3D 驗證頁)');
    router.push('/'); // 或導到謝謝頁
  };

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-2">結帳確認</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  if (!data) {
    return <div className="p-6">載入訂單中...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-6 md:py-8">
        <h2 className="text-xl md:text-2xl font-bold text-[color:var(--sw-primary)] mb-2">
          結帳確認
        </h2>
        <div className="text-sm text-[color:var(--sw-primary)]/70 mb-6">
          PNR：<span className="font-semibold">{data.pnr}</span>
          <span className="ml-4">
            總額：{fmtMoney(segments.total || data.totalAmount)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 左側：航段明細卡 */}
          <section className="md:col-span-7">
            <div className="rounded-2xl border border-[color:var(--sw-grey)]/30 bg-[color:var(--sw-primary)] text-[color:var(--sw-white)] p-5 md:p-6 space-y-6 shadow-sm">
              {/* 去程 */}
              {segments.ob && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-xs">
                      去程
                    </span>
                    <span>
                      {segments.ob.origin} → {segments.ob.destination}
                    </span>
                    <span className="ml-auto font-semibold">
                      小計 {fmtMoney(segments.ob.fare)}
                    </span>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm opacity-90">
                        出發{' '}
                        <span className="font-semibold">
                          {segments.ob.depTime}
                        </span>
                      </div>
                      <div className="text-sm opacity-90">
                        抵達{' '}
                        <span className="font-semibold">
                          {segments.ob.arrTime}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs opacity-80">
                      航班 {segments.ob.flightNo}
                    </div>
                    {/* 費用列（靜態示意，可改接後端費用細項） */}
                    <div className="mt-4 grid grid-cols-2 gap-y-1 text-sm">
                      <div className="opacity-90">機上加值服務</div>
                      <div className="text-right opacity-90">TWD 350</div>
                      <div className="opacity-90">票價</div>
                      <div className="text-right opacity-90">
                        {fmtMoney(Math.max(segments.ob.fare - 700, 0))}
                      </div>
                      <div className="opacity-90">稅金與其他費用</div>
                      <div className="text-right opacity-90">TWD 350</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between font-semibold">
                      <span>小計</span>
                      <span>{fmtMoney(segments.ob.fare)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 回程 */}
              {segments.ib && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-xs">
                      回程
                    </span>
                    <span>
                      {segments.ib.origin} → {segments.ib.destination}
                    </span>
                    <span className="ml-auto font-semibold">
                      小計 {fmtMoney(segments.ib.fare)}
                    </span>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm opacity-90">
                        出發{' '}
                        <span className="font-semibold">
                          {segments.ib.depTime}
                        </span>
                      </div>
                      <div className="text-sm opacity-90">
                        抵達{' '}
                        <span className="font-semibold">
                          {segments.ib.arrTime}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs opacity-80">
                      航班 {segments.ib.flightNo}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-y-1 text-sm">
                      <div className="opacity-90">機上加值服務</div>
                      <div className="text-right opacity-90">TWD 350</div>
                      <div className="opacity-90">票價</div>
                      <div className="text-right opacity-90">
                        {fmtMoney(Math.max(segments.ib.fare - 700, 0))}
                      </div>
                      <div className="opacity-90">稅金與其他費用</div>
                      <div className="text-right opacity-90">TWD 350</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between font-semibold">
                      <span>小計</span>
                      <span>{fmtMoney(segments.ib.fare)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 總計 */}
              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-lg font-extrabold">
                <span>總計</span>
                <span>{fmtMoney(segments.total || data.totalAmount)}</span>
              </div>
            </div>
          </section>

          {/* 右側：聯絡資訊 + 付款方式 */}
          <section className="md:col-span-5 space-y-6">
            {/* 聯絡資訊 */}
            <div className="rounded-2xl border border-[color:var(--sw-grey)]/30 bg-white p-5 md:p-6">
              <h3 className="font-semibold mb-4">聯絡資訊</h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-6">
                  <label className="text-xs text-[color:var(--sw-primary)]/70">
                    姓
                  </label>
                  <input
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    value={contact.lastName}
                    onChange={(e) =>
                      setContact({ ...contact, lastName: e.target.value })
                    }
                    placeholder="Last name"
                  />
                </div>
                <div className="md:col-span-6">
                  <label className="text-xs text-[color:var(--sw-primary)]/70">
                    名
                  </label>
                  <input
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    value={contact.firstName}
                    onChange={(e) =>
                      setContact({ ...contact, firstName: e.target.value })
                    }
                    placeholder="First name"
                  />
                </div>
                <div className="md:col-span-6">
                  <label className="text-xs text-[color:var(--sw-primary)]/70">
                    電話號碼
                  </label>
                  <input
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    placeholder="Phone number"
                  />
                </div>
                <div className="md:col-span-6">
                  <label className="text-xs text-[color:var(--sw-primary)]/70">
                    EMAIL
                  </label>
                  <input
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    placeholder="Your Email"
                  />
                </div>
              </div>
            </div>

            {/* 付款方式 */}
            <div className="rounded-2xl border border-[color:var(--sw-grey)]/30 bg-white p-5 md:p-6">
              <h3 className="font-semibold mb-4">付款方式</h3>

              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pay"
                    checked={payMethod === 'card'}
                    onChange={() => setPayMethod('card')}
                    className="accent-[color:var(--sw-accent)]"
                  />
                  信用卡付款
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pay"
                    checked={payMethod === 'linepay'}
                    onChange={() => setPayMethod('linepay')}
                    className="accent-[color:var(--sw-accent)]"
                  />
                  LinePay
                </label>
              </div>

              {/* 卡片資料（選信用卡時可填） */}
              <div
                className={`mt-4 grid grid-cols-1 md:grid-cols-12 gap-3 ${payMethod === 'card' ? '' : 'opacity-50 pointer-events-none'}`}
              >
                <div className="md:col-span-12">
                  <label className="text-xs text-[color:var(--sw-primary)]/70">
                    信用卡號
                  </label>
                  <input
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    placeholder="1234 1234 1234 1234"
                    value={card.number}
                    onChange={(e) =>
                      setCard({ ...card, number: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-6">
                  <label className="text-xs text-[color:var(--sw-primary)]/70">
                    有效期限
                  </label>
                  <input
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    placeholder="MM/YY"
                    value={card.exp}
                    onChange={(e) => setCard({ ...card, exp: e.target.value })}
                  />
                </div>
                <div className="md:col-span-6">
                  <label className="text-xs text-[color:var(--sw-primary)]/70">
                    CVC
                  </label>
                  <input
                    className="mt-1 w-full border rounded-lg px-3 py-2"
                    placeholder="CVC code"
                    value={card.cvc}
                    onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 底部操作列 */}
            <div className="flex items-center justify-between pt-2">
              <button
                className="sw-btn sw-btn--outline rounded-full"
                onClick={onPrev}
              >
                上一步
              </button>
              <button
                className="sw-btn sw-btn--gold-primary rounded-full"
                onClick={onPay}
              >
                付款
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
