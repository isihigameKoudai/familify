/**
 * payments/application/ports/PaymentsRepository.ts
 * 決済明細データ取得の抽象ポートを定義し、インフラ層との疎結合を保つ。
 */
import type { Period, Statement } from "../../domain/models/transaction";

export interface PaymentsRepository {
  listAvailableYears(): Promise<number[]>;
  getMonthlyStatement(period: Period): Promise<Statement>;
  getYearlyStatements(year: number): Promise<Statement[]>;
}

