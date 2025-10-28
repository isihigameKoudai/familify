/**
 * routes/payments/$year/$month.tsx
 * 月次決済明細ページのルートを定義する。
 */
import { createFileRoute, redirect, useParams } from "@tanstack/solid-router";
import { z } from "zod";
import { PaymentPage } from "../../../features/payments/ui/containers/PaymentPage";

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
  component: () => {
    const params = useParams({ from: "/payments/$year/$month" });
    return <PaymentPage year={params().year} month={params().month} />;
  }
});


