/**
 * shared/utils/format.ts
 * 日付や金額などのフォーマット用ユーティリティ関数
 */

/**
 * 金額を日本円形式でフォーマット
 * @param amount - フォーマットする金額（数値）
 * @returns フォーマットされた金額文字列（例: "¥1,000"）
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY"
  }).format(amount);
}

/**
 * 日付を日本語形式でフォーマット
 * @param date - フォーマットする日付
 * @returns フォーマットされた日付文字列（例: "2025年10月29日"）
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

/**
 * 日付を短縮形式でフォーマット
 * @param date - フォーマットする日付
 * @returns フォーマットされた日付文字列（例: "2025/10/29"）
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

