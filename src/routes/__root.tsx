/**
 * routes/__root.tsx
 * アプリ全体のルート。ナビゲーションをシンプルに整備する。
 */
import { Outlet, createRootRoute } from "@tanstack/solid-router";
import { clientOnly } from "@solidjs/start";
import { Suspense } from "solid-js";
import { GlobalHeader } from "../shared/ui/layout/GlobalHeader";

const Devtools = clientOnly(() => import("../components/Devtools"));

export const Route = createRootRoute({
  component: RootComponent
});

function RootComponent() {
  return (
    <>
      <GlobalHeader />
      <Suspense>
        <Outlet />
        <Devtools />
      </Suspense>
    </>
  );
}
