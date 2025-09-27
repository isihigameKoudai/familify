/**
 * payments/ui/containers/PaymentsSummaryPage.tsx
 * 利用可能な年一覧を取得してサマリービューに渡す。
 */
import { createResource } from "solid-js";
import { listAvailableYears } from "../../application/usecases/listAvailableYears";
import { FakePaymentsRepository } from "../../infrastructure/repositories/FakePaymentsRepository";
import { PaymentsSummaryView } from "../components/PaymentsSummaryView";

export function PaymentsSummaryPage() {
  const repo = new FakePaymentsRepository();
  const usecase = listAvailableYears(repo);
  const [years] = createResource(usecase);

  return years.loading ? (
    <div>読み込み中...</div>
  ) : years.error ? (
    <div>データの取得に失敗しました</div>
  ) : years() ? (
    <PaymentsSummaryView years={years()!} />
  ) : (
    <div>利用可能な年が見つかりません</div>
  );
}

