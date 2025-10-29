/**
 * payments/ui/containers/PaymentPage.tsx
 * 決済履歴ページ - 年・月パラメータを受け取り表示する
 */

import { createResource, For } from "solid-js";
import { PaymentService } from "../../service/payment";
import { paymentStore } from "../../store/payment";

interface PaymentPageProps {
  year?: number;
  month?: number;
}

export function PaymentPage(props: PaymentPageProps) {
  const { fetchPayments } = PaymentService();
  const [payments] = createResource(async () => await fetchPayments({ year: props.year, month: props.month }));

  const { state: paymentsState } = paymentStore.useStore({
    payments: payments() ?? [],
  });
  
  
  return (
    <div>
      <h1>Payment Page</h1>
      <p>Year: {props.year ?? "なし"}</p>
      <p>Month: {props.month ?? "なし"}</p>
      <For each={paymentsState.payments}>
        {(payment) => (
          <div>
            <p>{payment.name}</p>
            <p>{payment.date}</p>
            <p>{payment.amount}</p>
          </div>
        )}
      </For>
    </div>
  );
}

