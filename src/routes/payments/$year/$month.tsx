/**
 * routes/payments/$year/$month.tsx
 * 月次決済明細ページのルートを定義する。
 */
import { createFileRoute, redirect, useParams } from "@tanstack/solid-router";
import { z } from "zod";
import { PaymentPage } from "../../../features/payments/ui/containers/PaymentPage";
import { fetchPaymentsOnServer } from "../../../features/payments/service/payment.server";
import { getAvailableDateFromServer } from "../../../features/payments/api/date.server";

// パラメータのバリデーションスキーマ
const paramsSchema = z.object({
  year: z.string().regex(/^\d{4}$/, "年は4桁の数値である必要があります")
    .transform(Number)
    .refine((val) => val >= 2000 && val <= 2100, {
      message: "年は2000年から2100年の範囲である必要があります"
    }),
  month: z.string().regex(/^(0?[1-9]|1[0-2])$/, "月は1から12の範囲である必要があります")
    .transform(Number)
    .refine((val) => val >= 1 && val <= 12, {
      message: "月は1から12の範囲である必要があります"
    })
});

export const Route = createFileRoute("/payments/$year/$month")({
  params: {
    parse: (params) => {
      const result = paramsSchema.safeParse(params);
      if (!result.success) {
        throw redirect({ to: "/payments" });
      }
      return {
        year: result.data.year,
        month: result.data.month
      };
    },
  },
  loader: async ({ params }) => {
    const year = Number(params.year);
    const month = Number(params.month);
    const [paymentList, availableDate] = await Promise.all([
      fetchPaymentsOnServer({ year, month }),
      getAvailableDateFromServer()
    ]);
    return { paymentList, availableDate };
  },
  component: () => {
    const params = useParams({ from: "/payments/$year/$month" });
    const data = Route.useLoaderData();
    return <PaymentPage year={params().year} month={params().month} paymentList={data().paymentList} availableDate={data().availableDate} />;
  }
});


