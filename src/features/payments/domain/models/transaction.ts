/**
 * payments/domain/models/transaction.ts
 * 決済明細のドメインモデル（取引、期間、明細）をzodで定義する。
 * URLや外部データからの入力を型安全に扱い、将来の拡張にも耐える基盤とする。
 */
import { z } from "zod";

export const Currency = z.enum(["JPY"]);

export const Yen = z.number().int().finite();

export const Transaction = z.object({
  id: z.string().uuid(),
  occurredAt: z.string().datetime(),
  merchant: z.string().min(1),
  amount: Yen,
  cardId: z.string().min(1),
  memo: z.string().optional()
});
export type Transaction = z.infer<typeof Transaction>;

export const Period = z.object({
  year: z.number().int().min(2000).max(2100),
  month: z.number().int().min(1).max(12)
});
export type Period = z.infer<typeof Period>;

export const Statement = z.object({
  period: Period,
  transactions: z.array(Transaction),
  totalAmount: Yen,
  count: z.number().int().nonnegative()
});
export type Statement = z.infer<typeof Statement>;

