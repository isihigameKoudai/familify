/**
 * payments/ui/components/MonthlyStatementView.tsx
 * 月次明細表示コンポーネント。合計金額と取引リストを表示しカルーセル制御を委譲。
 */
import { For, Show } from "solid-js";
import type { Accessor } from "solid-js";
import type { Statement } from "../../domain/models/transaction";
import {
  carouselButton,
  carouselContainer,
  carouselLabel,
  emptyState,
  statementWrapper,
  summaryHeader,
  totalAmountText,
  transactionAmount,
  transactionItem,
  transactionMerchant,
  transactionsList
} from "../styles/statement.css";

type CarouselControls = {
  canPrev: Accessor<boolean>;
  canNext: Accessor<boolean>;
  onPrev: () => void;
  onNext: () => void;
};

type Props = {
  statement: Statement;
  carousel: CarouselControls;
};

export function MonthlyStatementView(props: Props) {
  const { statement, carousel } = props;
  const { period, totalAmount, transactions, count } = statement;

  const totalFormatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY"
  });

  const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
    month: "long",
    day: "numeric"
  });

  return (
    <section class={statementWrapper} aria-label={`${period.year}年${period.month}月の決済明細`}>
      <header class={summaryHeader}>
        <h1 class={totalAmountText}>{`${period.year}年${period.month}月の合計`}</h1>
        <p>{totalFormatter.format(totalAmount)} ・ {count}件</p>
        <div class={carouselContainer}>
          <button class={carouselButton} onClick={carousel.onPrev} disabled={!carousel.canPrev()} aria-label="前の月へ">
            前月
          </button>
          <span class={carouselLabel}>{`${period.year}年 ${period.month}月`}</span>
          <button class={carouselButton} onClick={carousel.onNext} disabled={!carousel.canNext()} aria-label="次の月へ">
            翌月
          </button>
        </div>
      </header>

      <Show when={transactions.length > 0} fallback={<p class={emptyState}>取引はありません</p>}>
        <ul class={transactionsList}>
          <For each={transactions}>
            {tx => (
              <li class={transactionItem}>
                <span>{dateFormatter.format(new Date(tx.occurredAt))}</span>
                <span class={transactionMerchant}>{tx.merchant}</span>
                <span class={transactionAmount}>{totalFormatter.format(tx.amount)}</span>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </section>
  );
}

