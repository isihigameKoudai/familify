/**
 * src/features/payments/api/payments.server.ts
 * サーバ側で直接 Google Apps Script を呼び出す関数
 */

import type { Payment } from "../domain/models/payment";

const PAYMENTS_API_URL = "https://script.google.com/macros/s/AKfycbz3fQJvLrivCNoeLd7paEcxZbz7q6Ofp0N9HvO96gI5th96NksrusV38LU_l3SgA2pmiQ/exec";

export interface GetPaymentsParams {
  year?: number;
  month?: number;
}

/**
 * サーバ側で直接 Google Apps Script から決済データを取得
 */
export async function getPaymentsFromServer(params: GetPaymentsParams): Promise<Payment[]> {
  try {
    const response = await fetch(PAYMENTS_API_URL, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch payments data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[server] Failed to fetch payments:", error);
    throw error;
  }
}

