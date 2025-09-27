/**
 * payments/application/usecases/getYearlyStatements.ts
 * 指定年の各月明細を取得するユースケース。年の妥当性を検証し年間一覧を提供。
 */
import { z } from "zod";
import { Period } from "../../domain/models/transaction";
import type { PaymentsRepository } from "../ports/PaymentsRepository";

const YearSchema = Period.shape.year;

export function getYearlyStatements(repo: PaymentsRepository) {
  return async (input: unknown) => {
    const year = YearSchema.parse(input);
    return repo.getYearlyStatements(year);
  };
}

