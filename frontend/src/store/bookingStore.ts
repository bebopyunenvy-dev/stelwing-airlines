'use client';

import { create } from 'zustand';

export type FareSegment = {
  title: '去程' | '回程';
  flightNo: string;
  originCode: string;
  originName: string;
  depTime: string; // 已格式化 e.g. "08:35"
  destinationCode: string;
  destinationName: string;
  arrTime: string; // 已格式化
  cabin?: string; // 經濟艙 / 商務艙
  fare: number; // 小計（此段票價）
  currency?: string; // 預設 TWD
};

type PriceState = {
  baseFare: number; // 機票合計（兩段加總）
  extrasTotal: number; // 加購合計（行李/餐點…）
};

type BookingState = {
  // 顯示金額
  price: PriceState;

  // 明細彈窗 UI 狀態
  detailsOpen: boolean;

  // 明細所需的段資訊
  outbound?: FareSegment | null;
  inbound?: FareSegment | null;

  currency: string; // 預設 'TWD'

  // actions
  openDetails: () => void;
  closeDetails: () => void;

  setBaseFare: (v: number) => void;
  setExtrasTotal: (v: number) => void;

  setOutbound: (seg: FareSegment | null) => void;
  setInbound: (seg: FareSegment | null) => void;
  setCurrency: (cur: string) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  price: {
    baseFare: 0,
    extrasTotal: 0,
  },
  detailsOpen: false,
  outbound: null,
  inbound: null,
  currency: 'TWD',

  openDetails: () => set({ detailsOpen: true }),
  closeDetails: () => set({ detailsOpen: false }),

  setBaseFare: (v) => set((s) => ({ price: { ...s.price, baseFare: v } })),
  setExtrasTotal: (v) =>
    set((s) => ({ price: { ...s.price, extrasTotal: v } })),

  setOutbound: (seg) => set({ outbound: seg }),
  setInbound: (seg) => set({ inbound: seg }),
  setCurrency: (cur) => set({ currency: cur }),
}));
