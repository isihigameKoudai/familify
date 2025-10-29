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
  // 日付をフォーマット
  const formattedDate = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short"
  }).format(props.payment.dateAsDate);

  return (
    <li class={styles.transactionItem}>
      <div class={styles.transactionLeft}>
        <div class={styles.transactionMerchant}>{props.payment.name}</div>
        <div class={styles.transactionDate}>{formattedDate}</div>
      </div>
      <div class={styles.transactionAmount}>
        {props.payment.formattedAmount}
      </div>
    </li>
  );
}

