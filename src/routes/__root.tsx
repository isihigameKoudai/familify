/**
 * routes/__root.tsx
 * アプリ全体のルート。ナビゲーションをシンプルに整備する。
 */
import { Link, Outlet, createRootRoute } from "@tanstack/solid-router";
import { clientOnly } from "@solidjs/start";
import { Suspense } from "solid-js";

const Devtools = clientOnly(() => import("../components/Devtools"));

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  return (
    <>
      <nav style={{ display: "flex", gap: "12px", padding: "16px" }}>
        <Link to="/payments">サマリー</Link>
        <Link to="/payments/2025">2025年</Link>
        <Link to="/payments/2025/4">2025年4月</Link>
      </nav>
      <Suspense>
        <Outlet />
        <Devtools />
      </Suspense>
    </>
  );
}
