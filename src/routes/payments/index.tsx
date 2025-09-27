/**
 * routes/payments/index.tsx
 * 決済サマリーページのルートを定義する。
 */
import { createFileRoute } from "@tanstack/solid-router";
import { PaymentsSummaryPage } from "../../features/payments/ui/containers/PaymentsSummaryPage";

export const Route = createFileRoute("/payments/")({
  component: PaymentsSummaryPage
});


