/**
 * payments/ui/containers/MonthlyStatementPage.tsx
 * ルートパラメータから期間を解決し、月次明細の取得とカルーセル遷移を制御する。
 */
import { createMemo, createResource } from "solid-js";
import { getMonthlyStatement } from "../../application/usecases/getMonthlyStatement";
import { FakePaymentsRepository } from "../../infrastructure/repositories/FakePaymentsRepository";
import { MonthlyStatementView } from "../components/MonthlyStatementView";
import { useParams, useNavigate } from "@tanstack/solid-router";

export function MonthlyStatementPage() {
  const params = useParams({ from: "/payments/$year/$month" });
  const navigate = useNavigate();
  const repo = new FakePaymentsRepository();
  const usecase = getMonthlyStatement(repo);

  const period = createMemo(() => ({
    year: Number(params.year),
    month: Number(params.month)
  }));

  const [statement] = createResource(period, usecase);

  const carousel = {
    canPrev: createMemo(() => period().month > 1),
    canNext: createMemo(() => period().month < 12),
    onPrev: () => {
      const { year, month } = period();
      if (month <= 1) return;
      void navigate({
        to: "/payments/$year/$month",
        params: { year: String(year), month: String(month - 1) }
      });
    },
    onNext: () => {
      const { year, month } = period();
      if (month >= 12) return;
      void navigate({
        to: "/payments/$year/$month",
        params: { year: String(year), month: String(month + 1) }
      });
    }
  };

  return statement.loading ? (
    <div>読み込み中...</div>
  ) : statement.error ? (
    <div>明細の取得に失敗しました</div>
  ) : statement() ? (
    <MonthlyStatementView statement={statement()!} carousel={carousel} />
  ) : (
    <div>明細が見つかりません</div>
  );
}

