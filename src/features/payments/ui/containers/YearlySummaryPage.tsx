/**
 * payments/ui/containers/YearlySummaryPage.tsx
 * 年パラメータから年間明細一覧を読み込み、サマリービューに渡す。
 */
import { useParams } from "@tanstack/solid-router";
import { createResource } from "solid-js";
import { getYearlyStatements } from "../../application/usecases/getYearlyStatements";
import { FakePaymentsRepository } from "../../infrastructure/repositories/FakePaymentsRepository";
import { YearlySummaryView } from "../components/YearlySummaryView";

export function YearlySummaryPage() {
  const params = useParams({ from: "/payments/$year" });
  const repo = new FakePaymentsRepository();
  const usecase = getYearlyStatements(repo);

  const year = () => Number(params.year);
  const [statements] = createResource(year, usecase);

  return statements.loading ? (
    <div>読み込み中...</div>
  ) : statements.error ? (
    <div>年間明細の取得に失敗しました</div>
  ) : statements() ? (
    <YearlySummaryView year={year()} statements={statements()!} />
  ) : (
    <div>年間明細が見つかりません</div>
  );
}

