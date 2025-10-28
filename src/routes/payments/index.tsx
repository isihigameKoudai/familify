/**
 * routes/payments/index.tsx
 * 決済サマリーページのルートを定義する。
 */
import { createFileRoute } from "@tanstack/solid-router";
import { PaymentPage } from "../../features/payments/ui/containers/PaymentPage";

export const Route = createFileRoute("/payments/")({
  component: () => <PaymentPage />
});


