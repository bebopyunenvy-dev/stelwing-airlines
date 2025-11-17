'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState';
import OrderTable, { type Column } from '../components/OrderTable';
import StatusBadge from '../components/StatusBadge';

type FlightOrderRow = {
  id: string;
  pnr: string;
  orderId: string;
  route: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  ticket: boolean;
};

type StatusBadgeVariant = 'success' | 'disabled' | 'refund';

/* ===== 狀態轉成 StatusBadgeVariant ===== */
const normalize = (v: string): StatusBadgeVariant => {
  if (!v) return 'success';
  const x = v.toLowerCase().trim();

  if (['success', 'paid', 'done', 'completed'].includes(x)) return 'success';
  if (['disabled', 'cancel', 'cancelled', 'canceled', 'fail'].includes(x))
    return 'disabled';

  if (
    [
      'refunding',
      'processing',
      'pending_refund',
      'refunded',
      'finish_refund',
      'refund_done',
    ].includes(x)
  ) {
    return 'refund';
  }

  return 'success';
};

const statusMap: Record<StatusBadgeVariant, string> = {
  success: '已完成',
  disabled: '已取消',
  refund: '退款中',
};

/* ===== 付款方式顯示用對照表 ===== */
const paymentMethodMap: Record<string, string> = {
  credit: '信用卡',
  atm: 'ATM 轉帳',
  cash: '現金',
  ecpay: '綠界金流',
  unknown: '未提供',
};

/* ===== 把日期字串轉成 12/08 這種格式 ===== */
// raw 可能是 '2025-12-08' 或 '2025-12-08T00:00:00.000Z'
const formatMmDd = (raw: any): string => {
  if (!raw) return '';
  const s = String(raw);
  const datePart = s.includes('T') ? s.split('T')[0] : s; // 取到 'YYYY-MM-DD'
  return datePart.slice(5).replace('-', '/'); // 'MM/DD'
};

export default function FlightOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<FlightOrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          'http://localhost:3007/api/flight-booking/bookings',
          { cache: 'no-store' }
        );

        const json = await res.json();

        if (!json.success) {
          console.error('訂單列表載入失敗：', json);
          setOrders([]);
          return;
        }

        const rows: FlightOrderRow[] = (json.data || []).map((b: any) => {
          // --- 航段來自後端 raw SQL ---
          const origin = b.originIata ?? '';
          const dest = b.destinationIata ?? '';

          // 後端有 outboundDate / inboundDate，就用來顯示 12/08 - 12/12
          // 若還沒改後端，outboundDate 可能是 undefined，就 fallback 用原本的 flightDate
          const obDate = formatMmDd(b.outboundDate ?? b.flightDate);
          const ibDate = formatMmDd(b.inboundDate);

          let dateLabel = '';
          if (obDate && ibDate) {
            dateLabel = `${obDate} - ${ibDate}`; // 去回
          } else if (obDate) {
            dateLabel = obDate; // 單程
          }

          // --- createdAt 轉成兩行顯示 ---
          let createdAt = '';
          try {
            const d = new Date(b.createdAt);
            createdAt = d
              .toLocaleString('zh-TW', { hour12: false })
              .replace(' ', '\n');
          } catch {
            createdAt = b.createdAt ?? '';
          }

          // --- 付款方式 ---
          const paymentMethod = '綠界金流';

          // --- 狀態 ---
          const status = b.paymentStatus ?? 'pending';

          // --- 航段文字 ---
          let route = '- (機票)';
          if (origin && dest && dateLabel) {
            route = `${origin} - ${dest} ${dateLabel} (機票)`;
          } else if (origin && dest) {
            route = `${origin} - ${dest} (機票)`;
          }

          return {
            id: String(b.bookingId),
            pnr: b.pnr,
            orderId: `#${b.pnr}`,
            route,
            paymentMethod,
            status,
            createdAt,
            ticket:
              status === 'paid' ||
              status === 'success' ||
              status === 'completed',
          };
        });

        setOrders(rows);
      } catch (e) {
        console.error('抓取訂單列表錯誤：', e);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const columns: Column[] = [
    { key: 'id', title: 'ID', width: 60, align: 'center' },
    { key: 'orderId', title: '訂單編號', width: 140 },
    { key: 'route', title: '航段', width: 420 },
    { key: 'paymentMethod', title: '付款方式', width: 120, align: 'center' },
    {
      key: 'status',
      title: '狀態',
      width: 120,
      align: 'center',
      render: (value?: string) => {
        const normalized = normalize(value ?? '');
        const raw = (value ?? '').toLowerCase().trim();

        let label = statusMap[normalized];

        if (
          normalized === 'refund' &&
          ['refunded', 'finish_refund', 'refund_done'].includes(raw)
        ) {
          label = '已退款';
        } else if (
          normalized === 'refund' &&
          ['refunding', 'processing', 'pending_refund'].includes(raw)
        ) {
          label = '退款中';
        }

        return <StatusBadge variant={normalized} label={label} />;
      },
    },
    {
      key: 'createdAt',
      title: '成立日期',
      width: 180,
      align: 'center',
      render: (value: string) =>
        value.split('\n').map((line, i) => <div key={i}>{line}</div>),
    },
    {
      key: 'ticket',
      title: '電子機票',
      width: 140,
      align: 'center',
      render: (value: boolean, row: any) =>
        normalize(row.status) === 'success' ? (
          <button
            className="underline text-[#1f2e3c] hover:text-[#DCBB87] font-medium"
            // ✅ 這裡改成 member-center/flight/${pnr}
            onClick={() => router.push(`/member-center/flight/${row.pnr}`)}
          >
            前往查看
          </button>
        ) : (
          <button
            className="text-xl text-[#1F2E3C] hover:text-red-400 transition-colors"
            title="刪除"
          >
            ✖
          </button>
        ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-end mb-3 text-sm text-[#666]">
        共 {orders.length} 筆訂單
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-6 text-center text-[#666]">
          訂單載入中…
        </div>
      ) : orders.length > 0 ? (
        <OrderTable columns={columns} data={orders} />
      ) : (
        <EmptyState message="尚無機票訂單" />
      )}
    </div>
  );
}
