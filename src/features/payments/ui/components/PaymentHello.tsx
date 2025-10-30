/**
 * payments/ui/components/PaymentHello.tsx
 * 月次サマリーと月移動コントロールを表示するコンポーネント
 */
import { useNavigate } from "@tanstack/solid-router";
import type { PaymentListModel } from "../../domain/models/payment-list";
import * as styles from "../styles/statement.css";
import { DateSelect } from "./DateSelect";
import { Show, createMemo, createResource } from "solid-js";
import { PaymentService } from "../../service/payment";

interface PaymentHelloProps {
  paymentList: PaymentListModel;
  year?: number;
  month?: number;
}

export function PaymentHello(props: PaymentHelloProps) {
  const navigate = useNavigate();
  const { fetchAvailableDate } = PaymentService();
  const [availableDate] = createResource(async () => await fetchAvailableDate());

  const hasPeriod = createMemo(() => props.year !== undefined && props.month !== undefined);

  const previousPeriod = createMemo(() => {
    if (!hasPeriod()) {
      return undefined;
    }
    const currentYear = props.year!;
    const currentMonth = props.month!;
    const prevMonth = currentMonth - 1;
    const prevYear = prevMonth < 1 ? currentYear - 1 : currentYear;
    const adjustedMonth = prevMonth < 1 ? 12 : prevMonth;
    return { year: prevYear, month: adjustedMonth };
  });

  const nextPeriod = createMemo(() => {
    if (!hasPeriod()) {
      return undefined;
    }
    const currentYear = props.year!;
    const currentMonth = props.month!;
    const nextMonth = currentMonth + 1;
    const nextYear = nextMonth > 12 ? currentYear + 1 : currentYear;
    const adjustedMonth = nextMonth > 12 ? 1 : nextMonth;
    return { year: nextYear, month: adjustedMonth };
  });

  const isPreviousDisabled = createMemo(() => {
    const date = availableDate();
    const target = previousPeriod();
    if (!date || !target) {
      return true;
    }
    return date.isOutsideRange(target.year, target.month);
  });

  const isNextDisabled = createMemo(() => {
    const date = availableDate();
    const target = nextPeriod();
    if (!date || !target) {
      return true;
    }
    return date.isOutsideRange(target.year, target.month);
  });

  // 前月への移動
  const goToPreviousMonth = () => {
    const target = previousPeriod();
    const date = availableDate();
    if (!target || !date || date.isOutsideRange(target.year, target.month)) {
      return;
    }
    navigate({ to: `/payments/${target.year}/${target.month}` });
  };

  // 翌月への移動
  const goToNextMonth = () => {
    const target = nextPeriod();
    const date = availableDate();
    if (!target || !date || date.isOutsideRange(target.year, target.month)) {
      return;
    }
    navigate({ to: `/payments/${target.year}/${target.month}` });
  };

  return (
    <div class={styles.summaryHeader}>
      <div class={styles.carouselContainer}>
        <button
          class={styles.carouselButton}
          onClick={goToPreviousMonth}
          aria-label="前月へ"
          disabled={isPreviousDisabled()}
        >
          ◀
        </button>
        <Show when={!props.year && !props.month}>
          累計金額
        </Show>
        <Show when={props.year || props.month}>
          <DateSelect year={props.year} month={props.month} />
        </Show>
        <button
          class={styles.carouselButton}
          onClick={goToNextMonth}
          aria-label="翌月へ"
          disabled={isNextDisabled()}
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

