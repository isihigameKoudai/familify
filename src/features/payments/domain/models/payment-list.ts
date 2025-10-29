/**
 * payments/domain/models/payment-list.ts
 * PaymentModel のリストを集約し、合計金額などの算出ロジックを提供する
 */
import { type PaymentModel } from "./payment";
import { formatCurrency } from "../../../../shared/utils/format";

/**
 * PaymentListModel インターフェース
 * 複数の PaymentModel から算出される集約値を提供
 */
export interface PaymentListModel {
  /**
   * 決済リスト
   */
  readonly payments: readonly PaymentModel[];

  /**
   * 決済の件数
   */
  readonly count: number;

  /**
   * 合計金額
   */
  readonly totalAmount: number;

  /**
   * フォーマット済み合計金額
   */
  readonly formattedTotalAmount: string;

  /**
   * 平均金額
   */
  readonly averageAmount: number;

  /**
   * フォーマット済み平均金額
   */
  readonly formattedAverageAmount: string;
}

/**
 * ファクトリ関数
 * PaymentModel の配列から PaymentListModel を生成
 */
export function createPaymentList(payments: PaymentModel[]): PaymentListModel {
  // 合計金額を計算
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  
  // 平均金額を計算（件数が0の場合は0）
  const averageAmount = payments.length > 0 ? totalAmount / payments.length : 0;

  return {
    payments: Object.freeze([...payments]), // イミュータブルにする
    count: payments.length,
    get totalAmount(): number {
      return totalAmount;
    },
    get formattedTotalAmount(): string {
      return formatCurrency(this.totalAmount);
    },
    get averageAmount(): number {
      return averageAmount;
    },
    get formattedAverageAmount(): string {
      return formatCurrency(this.averageAmount);
    }
  };
}

