/**
 * routes/payments/index.tsx
 * 決済サマリーページのルートを定義する。
 */
import { createFileRoute } from "@tanstack/solid-router";
import { PaymentPage } from "../../features/payments/ui/containers/PaymentPage";
import { fetchPaymentsOnServer } from "../../features/payments/service/payment.server";
import { getAvailableDateFromServer } from "../../features/payments/api/date.server";

export const Route = createFileRoute("/payments/")({
  loader: async () => {
    const [paymentList, availableDate] = await Promise.all([
      fetchPaymentsOnServer({}),
      getAvailableDateFromServer()
    ]);
    return { paymentList, availableDate };
  },
  component: () => {
    const data = Route.useLoaderData();
    return <PaymentPage paymentList={data().paymentList} availableDate={data().availableDate} />;
  }
});


