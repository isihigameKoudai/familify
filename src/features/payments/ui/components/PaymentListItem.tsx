/**
 * payments/ui/components/PaymentListItem.tsx
 * 個別の決済情報を表示するコンポーネント
 */
import type { PaymentModel } from "../../domain/models/payment";
import * as styles from "../styles/statement.css";

interface PaymentListItemProps {
  payment: PaymentModel;
}

export function PaymentListItem(props: PaymentListItemProps) {
  return (
    <li class={styles.transactionItem}>
      <div class={styles.transactionLeft}>
        <span class={styles.transactionMerchant}>{props.payment.name}</span>
        <span class={styles.transactionDate}>{props.payment.formattedDateWithDay}</span>
      </div>
      <div class={styles.transactionAmount}>{props.payment.formattedAmount}</div>
    </li>
  );
}

