/**
 * routes/payments/$year/index.tsx
 * 年間決済サマリーへのルートを定義する。
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
    })
});

export const Route = createFileRoute("/payments/$year/")({
  params: {
    parse: (params) => {
      const result = paramsSchema.safeParse(params);
      if (!result.success) {
        throw redirect({ to: "/payments" });
      }
      return { year: result.data.year };
    },
  },
  component: () => {
    const params = useParams({ from: "/payments/$year/" });
    return <PaymentPage year={params().year} />;
  }
});


