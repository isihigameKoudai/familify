/**
 * src/features/payments/service/payment.server.ts
 * サーバ側で使用する決済サービス
 */

import { getPaymentsFromServer, GetPaymentsParams } from "../api/payments.server";
import type { PaymentListModel } from "../domain/models/payment-list";
import { createPayment } from "../domain/models/payment";
import { createPaymentList } from "../domain/models/payment-list";

/**
 * サーバ側で決済データを取得するサービス
 */
export async function fetchPaymentsOnServer(params: GetPaymentsParams): Promise<PaymentListModel> {
  try {
    const payments = await getPaymentsFromServer(params);
    const paymentModels = payments.map(createPayment);
    
    const filteredPayments = (() => {
      // 年と月が定義されている場合はその年月の決済を返す
      if (params.year && params.month) {
        return paymentModels.filter(p => p.year === params.year && p.month === params.month);
      }
      // 年が定義されている場合はその年の決済を返す
      if (params.year) {
        return paymentModels.filter(p => p.year === params.year);
      }

      // 年がundefinedで月が定義されている場合はあり得ないのでエラーを投げる
      if(!params.year && params.month){
        throw new Error("年がundefinedで月が定義されている場合はあり得ないです");
      }
      return paymentModels;
    })();

    return createPaymentList(filteredPayments);
  } catch (error) {
    console.error("[server] Failed to fetch payments:", error);
    // エラー時は空のリストを返す（ビルド時にエラーが発生してもページが生成されるように）
    return createPaymentList([]);
  }
}

