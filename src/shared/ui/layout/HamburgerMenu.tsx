/**
 * shared/ui/layout/HamburgerMenu.tsx
 * モバイル対応のトグルメニュー
 */
import { Link } from "@tanstack/solid-router";
import { createSignal, onMount, Show } from "solid-js";
import * as styles from "./layout.css";
import { DateModel } from "../../../features/payments/domain/models/date";
import { PaymentService } from "../../../features/payments/service/payment";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HamburgerMenu(props: HamburgerMenuProps) {
  const [date, setDate] = createSignal<DateModel | null>(null);

  onMount(async () => {
    const date = await PaymentService().fetchAvailableDate();
    setDate(date);
  });
  return (
    <>
      <Show when={props.isOpen}>
        <div
          class={`${styles.menuOverlay} ${props.isOpen ? "open" : ""}`}
          onClick={props.onClose}
        />
        <aside class={`${styles.menuDrawer} ${props.isOpen ? "open" : ""}`}>
          <div class={styles.menuHeader}>
            <h2 class={styles.menuTitle}>メニュー</h2>
            <button
              class={styles.closeButton}
              onClick={props.onClose}
              aria-label="メニューを閉じる"
            >
              ✕
            </button>
          </div>
          <nav class={styles.menuNav}>
            <Link
              to="/payments"
              class={styles.menuLink}
              onClick={props.onClose}
            >
              全期間の決済履歴
            </Link>
            <Show when={date()}>
              {(date) => (
                <Link
                  to="/payments/$year/$month"
                  params={{ year: date().latest.year, month: date().latest.month }}
                  class={styles.menuLink}
                  onClick={props.onClose}
                >
                  月ごと
                </Link>
              )}
            </Show>
            <Show when={date()}>
              {(date) => (
                <Link
                  to="/payments/$year"
                  params={{ year: date().latest.year }}
                  class={styles.menuLink}
                  onClick={props.onClose}
                >
                  年ごと
                </Link>
              )}
            </Show>
          </nav>
        </aside>
      </Show>
    </>
  );
}

