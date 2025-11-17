import type { Trip, TripForUI } from '../types';
// @ts-expect-error 我不寫就跳錯我只好加啊氣死
import { DateTime } from 'luxon';

// #region 關於 Luxon

// Luxon 的 DateTime 物件是「時間點 + 時區」的組合
// DateTime.fromISO(時間的 ISOstring, {zone: '時區'})：將 ISOSstring 轉成帶有時區資料的 DateTime 物件
// DateTime.setZone：把這個時間物件移去別的時區顯示，同一時間、不同時區顯示
// DateTime.toUTC：把這個時間物件轉成 UTC (+0) 時區會顯示的時間
// DateTime.toISO：把這個時間物件轉成帶有時區資訊的 ISO 字串
// DateTime.utc：建立一個 utc 的時間物件

// #endregion
// function：搭配時區轉換 UTC 時間呈現時間
function convertToTimezone(isoString: string, timezone: string): string {
  const utcDateTime = DateTime.fromISO(isoString, { zone: 'utc' });
  const localTime = utcDateTime.setZone(timezone);
  const formatLocalTime = localTime.toFormat('yyyy-MM-dd');

  return formatLocalTime;
}

// function：取得旅程狀態：待啟程、進行中、已結束
function calculateStatus(trip: any): string {
  const nowUTC = DateTime.utc();
  const startDateUTC = DateTime.fromISO(trip.startDate);
  const endDateUTC = DateTime.fromISO(trip.endDate);

  let status;
  if (nowUTC < startDateUTC) {
    status = '待啟程';
  } else if (nowUTC < endDateUTC) {
    status = '進行中';
  } else {
    status = '已結束';
  }

  return status;
}

// 將原始 API 旅程資料轉成 UI 用資料
export function transformTripForUI(trip: Trip): TripForUI {
  return {
    ...trip,
    status: calculateStatus(trip),
    displayStartDate: convertToTimezone(trip.startDate, trip.startTimezone),
    displayEndDate: convertToTimezone(trip.endDate, trip.endTimezone),
  };
}

// 如果是陣列批量轉換
export function transformTripsForUI(trips: Trip[]): TripForUI[] {
  return trips.map(transformTripForUI);
}
