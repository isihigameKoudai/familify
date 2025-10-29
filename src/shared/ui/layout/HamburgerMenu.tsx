/**
 * shared/ui/layout/HamburgerMenu.tsx
 * モバイル対応のトグルメニュー
 */
import { Link } from "@tanstack/solid-router";
import { Show } from "solid-js";
import * as styles from "./layout.css";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HamburgerMenu(props: HamburgerMenuProps) {
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
              href="/payments"
              class={styles.menuLink}
              onClick={props.onClose}
            >
              決済履歴
            </Link>
          </nav>
        </aside>
      </Show>
    </>
  );
}

