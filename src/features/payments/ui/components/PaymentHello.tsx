/**
 * payments/ui/components/PaymentHello.tsx
 * 月次サマリーと月移動コントロールを表示するコンポーネント
 */
import { useNavigate } from "@tanstack/solid-router";
import type { PaymentListModel } from "../../domain/models/payment-list";
import * as styles from "../styles/statement.css";

interface PaymentHelloProps {
  paymentList: PaymentListModel;
  year: number;
  month: number;
}

export function PaymentHello(props: PaymentHelloProps) {
  const navigate = useNavigate();

  // 前月への移動
  const goToPreviousMonth = () => {
    const prevMonth = props.month - 1;
    const prevYear = prevMonth < 1 ? props.year - 1 : props.year;
    const adjustedMonth = prevMonth < 1 ? 12 : prevMonth;
    navigate({ to: `/payments/${prevYear}/${adjustedMonth}` });
  };

  // 翌月への移動
  const goToNextMonth = () => {
    const nextMonth = props.month + 1;
    const nextYear = nextMonth > 12 ? props.year + 1 : props.year;
    const adjustedMonth = nextMonth > 12 ? 1 : nextMonth;
    navigate({ to: `/payments/${nextYear}/${adjustedMonth}` });
  };

  return (
    <div class={styles.summaryHeader}>
      <div class={styles.carouselContainer}>
        <button
          class={styles.carouselButton}
          onClick={goToPreviousMonth}
          aria-label="前月へ"
        >
          ◀
        </button>
        <div class={styles.carouselLabel}>
          {props.year}年{props.month}月
        </div>
        <button
          class={styles.carouselButton}
          onClick={goToNextMonth}
          aria-label="翌月へ"
        >
          ▶
        </button>
      </div>
      <div class={styles.totalAmountText}>
        合計: {props.paymentList.formattedTotalAmount}
      </div>
      <div class={styles.paymentCount}>
        {props.paymentList.count}件の決済
      </div>
    </div>
  );
}

