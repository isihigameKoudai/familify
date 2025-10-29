/**
 * payments/domain/models/payment.ts
 * Payment API のレスポンス型とドメインモデルを定義する。
 * PaymentModel はゲッターを追加可能な拡張可能なクラスとして実装。
 */
import { z } from "zod";
import { formatCurrency } from "../../../../shared/utils/format";

/**
 * ISO8601 形式の日時を表すブランド型
 */
export const DateTimeISO = z.string()
  .datetime({ message: "日付はISO8601形式である必要があります" })
  .brand<"DateTimeISO">();

type DateTimeISO = z.infer<typeof DateTimeISO>;

/**
 * Payment スキーマ（API レスポンスの生データ）
 */
export const Payment = z.object({
  name: z.string().min(1),
  date: DateTimeISO,
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
   * 年を取得
   */
  readonly year: number;

  /**
   * 月を取得（1-12）
   */
  readonly month: number;

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
    get year(): number {
      return this.dateAsDate.getFullYear();
    },
    get month(): number {
      return this.dateAsDate.getMonth() + 1; // 0-11 を 1-12 に変換
    },
    get formattedAmount(): string {
      return formatCurrency(this.amount);
    }
  };
}

