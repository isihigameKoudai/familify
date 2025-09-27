/**
 * payments/ui/styles/statement.css.ts
 * 月次明細ビューのスタイル変数とレイアウトをvanilla-extractで定義する。
 */
import { createVar, style } from "@vanilla-extract/css";

export const statementWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px",
  maxWidth: "960px",
  margin: "0 auto"
});

export const summaryHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5"
});

export const totalAmountText = style({
  fontSize: "24px",
  fontWeight: 600,
  margin: 0
});

export const carouselContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px"
});

export const carouselButton = style({
  border: "none",
  background: "#3b82f6",
  color: "white",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background-color 0.2s ease",
  selectors: {
    "&:hover": { backgroundColor: "#2563eb" },
    "&:disabled": {
      backgroundColor: "#94a3b8",
      cursor: "not-allowed"
    }
  }
});

export const carouselLabel = style({
  fontSize: "18px",
  fontWeight: 500
});

export const transactionsList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "12px"
});

export const transactionItem = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 16px",
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
});

export const transactionMerchant = style({
  fontWeight: 500
});

export const transactionAmount = style({
  fontVariantNumeric: "tabular-nums"
});

export const emptyState = style({
  textAlign: "center",
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  color: "#6b7280"
});

