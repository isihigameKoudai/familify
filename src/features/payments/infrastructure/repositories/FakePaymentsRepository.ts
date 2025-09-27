/**
 * payments/infrastructure/repositories/FakePaymentsRepository.ts
 * フロントエンド開発用のフェイクリポジトリ。
 * 固定データで月次・年次の明細を返し、ユースケースのデモを可能にする。
 */
import { PaymentsRepository } from "../../application/ports/PaymentsRepository";
import { aggregateStatement } from "../../domain/services/aggregate";
import type { Period, Statement, Transaction } from "../../domain/models/transaction";

const MONTHLY_SEED: Record<string, Transaction[]> = {
  "2025-01": [
    {
      id: "2025-01-1",
      occurredAt: "2025-01-05T00:00:00.000Z",
      merchant: "スーパーA",
      amount: 12000,
      cardId: "card-main"
    },
    {
      id: "2025-01-2",
      occurredAt: "2025-01-08T00:00:00.000Z",
      merchant: "電気料金",
      amount: 9500,
      cardId: "card-main"
    }
  ],
  "2025-02": [
    {
      id: "2025-02-1",
      occurredAt: "2025-02-03T00:00:00.000Z",
      merchant: "ガス料金",
      amount: 7800,
      cardId: "card-main"
    },
    {
      id: "2025-02-2",
      occurredAt: "2025-02-11T00:00:00.000Z",
      merchant: "オンラインストア",
      amount: 15200,
      cardId: "card-main"
    }
  ],
  "2025-04": [
    {
      id: "2025-04-1",
      occurredAt: "2025-04-02T00:00:00.000Z",
      merchant: "スーパーB",
      amount: 8700,
      cardId: "card-main"
    },
    {
      id: "2025-04-2",
      occurredAt: "2025-04-08T00:00:00.000Z",
      merchant: "ドラッグストア",
      amount: 4200,
      cardId: "card-main"
    },
    {
      id: "2025-04-3",
      occurredAt: "2025-04-16T00:00:00.000Z",
      merchant: "サブスク",
      amount: 1200,
      cardId: "card-main"
    }
  ]
};

export class FakePaymentsRepository implements PaymentsRepository {
  async listAvailableYears(): Promise<number[]> {
    const years = new Set<number>();
    Object.keys(MONTHLY_SEED).forEach(key => {
      const [year] = key.split("-");
      years.add(Number(year));
    });
    return Array.from(years).sort((a, b) => a - b);
  }

  async getMonthlyStatement(period: Period): Promise<Statement> {
    const key = `${period.year}-${String(period.month).padStart(2, "0")}`;
    const baseTransactions = MONTHLY_SEED[key] ?? [];
    return aggregateStatement(period, baseTransactions);
  }

  async getYearlyStatements(year: number): Promise<Statement[]> {
    const statements: Statement[] = [];
    for (let month = 1; month <= 12; month++) {
      const period: Period = { year, month };
      statements.push(await this.getMonthlyStatement(period));
    }
    return statements.filter(statement => statement.transactions.length > 0);
  }
}

