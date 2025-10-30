/**
 * payments/ui/containers/PaymentPage.tsx
 * 決済履歴ページ - 年・月パラメータを受け取り表示する
 */

import { createResource, For, Show } from "solid-js";
import { PaymentService } from "../../service/payment";
import { PaymentHello } from "../components/PaymentHello";
import { PaymentListItem } from "../components/PaymentListItem";
import * as styles from "../styles/statement.css";

interface PaymentPageProps {
  year?: number;
  month?: number;
}

export function PaymentPage(props: PaymentPageProps) {
  const { fetchPayments } = PaymentService();
  const [paymentList] = createResource(async () => await fetchPayments({ year: props.year, month: props.month }));

  return (
    <div class={styles.pageWrapper}>
      <Show when={paymentList()} fallback={<div class={styles.emptyState}>データを読み込み中...</div>}>
        {
          (data) => (
            <PaymentHello 
              paymentList={data()} 
              year={props.year} 
              month={props.month} 
            />
          )
        }
      </Show>
      <Show when={paymentList()} fallback={<div class={styles.emptyState}>データを読み込み中...</div>}>
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

