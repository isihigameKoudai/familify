/**
 * src/features/payments/api/date.server.ts
 * サーバ側で直接 Google Apps Script を呼び出す関数
 */

import { DateModel, createDate } from "../domain/models/date";

const DATE_API_URL = "https://script.google.com/macros/s/AKfycbziskVGlEy8o4Fg1BlYNIbj8WHV9xhAc59I0ZbMUYL1zhZIR-S2sGxGWYohQ2A9o4nAhQ/exec";

/**
 * サーバ側で直接 Google Apps Script から利用可能な期間を取得
 */
export async function getAvailableDateFromServer(): Promise<DateModel> {
  try {
    const response = await fetch(DATE_API_URL, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch available date: ${response.statusText}`);
    }

    const data = await response.json();
    return createDate(data);
  } catch (error) {
    console.error("[server] Failed to fetch available date:", error);
    // エラー時はデフォルト値を返す（ビルド時にエラーが発生してもページが生成されるように）
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    return createDate({
      years: [currentYear],
      latest: { year: currentYear, month: currentMonth },
      earliest: { year: currentYear, month: currentMonth }
    });
  }
}

