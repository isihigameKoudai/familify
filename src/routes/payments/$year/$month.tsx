/**
 * routes/payments/$year/$month.tsx
 * 月次決済明細ページのルートを定義する。
 */
import { createFileRoute } from "@tanstack/solid-router";
import { MonthlyStatementPage } from "../../../features/payments/ui/containers/MonthlyStatementPage";

export const Route = createFileRoute("/payments/$year/$month")({
  component: MonthlyStatementPage,
  validateSearch: () => ({}),
});


