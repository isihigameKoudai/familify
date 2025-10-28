/**
 * payments/ui/components/PaymentsSummaryView.tsx
 * 利用可能な年一覧を表示し、ユーザが年間明細ページへ遷移できるようにする。
 */
import { For } from "solid-js";
import { statementWrapper, summaryHeader, totalAmountText, transactionsList, transactionItem } from "../styles/statement.css";
import { Link } from "@tanstack/solid-router";
import { PaymentModel } from "../../domain/models/payment";

type Props = {
  payments: PaymentModel[];
};

export function PaymentsSummaryView({ payments }: Props) {
  return (
    <section class={statementWrapper} aria-label="決済サマリー">
      <header class={summaryHeader}>
        <h1 class={totalAmountText}>決済履歴</h1>
        <p>参照したい年を選択してください。</p>
      </header>

      <ul class={transactionsList}>
        <For each={payments}>
          {payment => (
            <li class={transactionItem}>
              <span>{payment.date}</span>
              <span>{payment.amount}</span>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}

