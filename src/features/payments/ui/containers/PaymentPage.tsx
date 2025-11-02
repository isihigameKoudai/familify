/**
 * payments/ui/containers/PaymentPage.tsx
 * 決済履歴ページ - 年・月パラメータを受け取り表示する
 */

import { For, Show } from "solid-js";
import type { PaymentListModel } from "../../domain/models/payment-list";
import type { DateModel } from "../../domain/models/date";
import { PaymentHello } from "../components/PaymentHello";
import { PaymentListItem } from "../components/PaymentListItem";
import * as styles from "../styles/statement.css";

interface PaymentPageProps {
  year?: number;
  month?: number;
  paymentList?: PaymentListModel;
  availableDate?: DateModel;
}

export function PaymentPage(props: PaymentPageProps) {
  return (
    <div class={styles.pageWrapper}>
      <Show when={props.paymentList} fallback={<div class={styles.emptyState}>データを読み込み中...</div>}>
        {(data) => (
          <PaymentHello 
            paymentList={data()} 
            year={props.year} 
            month={props.month}
            availableDate={props.availableDate}
          />
        )}
      </Show>
      <Show when={props.paymentList} fallback={<div class={styles.emptyState}>データを読み込み中...</div>}>
        {(data) => (
          <Show 
            when={data().count > 0} 
            fallback={<div class={styles.emptyState}>この月の決済はありません</div>}
          >
            <div class={styles.scrollArea}>
              <ul class={styles.transactionsList}>
                <For each={data().payments}>
                  {(payment) => <PaymentListItem payment={payment} />}
                </For>
              </ul>
            </div>
          </Show>
        )}
      </Show>
    </div>
  );
}

