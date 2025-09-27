/**
 * payments/application/usecases/listAvailableYears.ts
 * 取り扱い可能な年の一覧を取得し、サマリーUIが選択肢を表示できるようにする。
 */
import type { PaymentsRepository } from "../ports/PaymentsRepository";

export function listAvailableYears(repo: PaymentsRepository) {
  return async () => repo.listAvailableYears();
}

