/**
 * payments/domain/models/payment.ts
 * Payment API のレスポンス型とドメインモデルを定義する。
 * PaymentModel はゲッターを追加可能な拡張可能なクラスとして実装。
 */
import { z } from "zod";

/**
 * Payment スキーマ（API レスポンスの生データ）
 */
export const Payment = z.object({
  name: z.string().min(1),
  date: z.string().min(1),
  amount: z.number()
});

export type Payment = z.infer<typeof Payment>;

/**
 * PaymentModel インターフェース
 * Payment の型を継承し、ゲッターメソッドを追加可能な設計
 */
export interface PaymentModel extends Payment {
  /**
   * 日付を Date オブジェクトとして取得
   */
  readonly dateAsDate: Date;

  /**
   * 金額をフォーマットした文字列として取得
   */
  readonly formattedAmount: string;
}

/**
 * ファクトリ関数
 * 入力を zod でバリデーションし PaymentModel オブジェクトを生成
 */
export function createPayment(input: unknown): PaymentModel {
  const validated = Payment.parse(input);

  return {
    name: validated.name,
    date: validated.date,
    amount: validated.amount,
    get dateAsDate(): Date {
      return new Date(this.date);
    },
    get formattedAmount(): string {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY"
      }).format(this.amount);
    }
  };
}

