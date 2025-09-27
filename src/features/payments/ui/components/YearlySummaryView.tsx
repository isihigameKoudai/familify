/**
 * payments/ui/components/YearlySummaryView.tsx
 * 指定年の各月明細サマリーを表示し、月次詳細へのナビゲーションを提供する。
 */
import type { Statement } from "../../domain/models/transaction";
import { For } from "solid-js";
import { statementWrapper, summaryHeader, totalAmountText, transactionsList, transactionItem } from "../styles/statement.css";
import { Link } from "@tanstack/solid-router";

type Props = {
  year: number;
  statements: Statement[];
};

export function YearlySummaryView(props: Props) {
  const totalFormatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY"
  });

  return (
    <section class={statementWrapper} aria-label={`${props.year}年の決済サマリー`}>
      <header class={summaryHeader}>
        <h1 class={totalAmountText}>{`${props.year}年の明細一覧`}</h1>
        <p>月を選択して詳細を確認できます。</p>
      </header>

      <ul class={transactionsList}>
        <For each={props.statements}>
          {statement => (
            <li class={transactionItem}>
              <span>{`${statement.period.month}月`}</span>
              <span>{`${statement.count}件`}</span>
              <span>{totalFormatter.format(statement.totalAmount)}</span>
              <Link to="/payments/$year/$month" params={{ year: String(statement.period.year), month: String(statement.period.month) }}>
                詳細へ
              </Link>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}

