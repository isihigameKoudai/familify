/**
 * payments/application/usecases/getMonthlyStatement.ts
 * 指定期間の月次明細を取得するユースケース。入力バリデーションをzodで担保。
 */
import { Period } from "../../domain/models/transaction";
import type { PaymentsRepository } from "../ports/PaymentsRepository";

export function getMonthlyStatement(repo: PaymentsRepository) {
  return async (input: unknown) => {
    const period = Period.parse(input);
    return repo.getMonthlyStatement(period);
  };
}

