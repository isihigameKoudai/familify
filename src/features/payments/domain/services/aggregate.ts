/**
 * payments/domain/services/aggregate.ts
 * 取引配列から期間明細を集計する純粋関数を提供する。
 * UI層からの集計依存を排除し再利用性を高める目的。
 */
import { Period, Statement, Transaction } from "../models/transaction";

export function aggregateStatement(period: Period, transactions: Transaction[]): Statement {
  const totalAmount = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  return {
    period,
    transactions,
    totalAmount,
    count: transactions.length
  };
}

