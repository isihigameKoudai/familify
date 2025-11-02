/**
 * shared/ui/layout/GlobalHeader.tsx
 * アプリ全体のヘッダーコンポーネント
 */
import { createSignal } from "solid-js";
import * as styles from "./layout.css";
import { HamburgerMenu } from "./HamburgerMenu";

export function GlobalHeader() {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  return (
    <>
      <header class={styles.header}>
        <button
          class={styles.hamburgerButton}
          onClick={() => setIsMenuOpen(true)}
          aria-label="メニューを開く"
        >
          ☰
        </button>
        <h1 class={styles.headerTitle}>三井住友</h1>
      </header>
      <HamburgerMenu isOpen={isMenuOpen()} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

