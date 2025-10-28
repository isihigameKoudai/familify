/**
 * payments/ui/containers/PaymentPage.tsx
 * 決済履歴ページ - 年・月パラメータを受け取り表示する
 */

interface PaymentPageProps {
  year?: number;
  month?: number;
}

export function PaymentPage(props: PaymentPageProps) {
  return (
    <div>
      <h1>Payment Page</h1>
      <p>Year: {props.year ?? "なし"}</p>
      <p>Month: {props.month ?? "なし"}</p>
    </div>
  );
}

