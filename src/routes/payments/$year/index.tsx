/**
 * routes/payments/$year/index.tsx
 * 年間決済サマリーへのルートを定義する。
 */
import { createFileRoute } from "@tanstack/solid-router";
import { YearlySummaryPage } from "../../../features/payments/ui/containers/YearlySummaryPage";

export const Route = createFileRoute("/payments/$year/")({
  component: YearlySummaryPage,
});


