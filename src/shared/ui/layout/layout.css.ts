/**
 * shared/ui/layout/layout.css.ts
 * レイアウトコンポーネント用のスタイル
 */
import { style } from "@vanilla-extract/css";

export const header = style({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px 24px",
  backgroundColor: "#004831",
  color: "white",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
});

export const headerTitle = style({
  fontSize: "24px",
  fontWeight: 700,
  margin: 0
});

export const hamburgerButton = style({
  position: "absolute",
  left: "24px",
  background: "none",
  border: "none",
  color: "white",
  fontSize: "24px",
  cursor: "pointer",
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.2s ease",
  selectors: {
    "&:hover": {
      opacity: 0.8
    }
  }
});

export const menuOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
  opacity: 0,
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
  selectors: {
    "&.open": {
      opacity: 1,
      pointerEvents: "auto"
    }
  }
});

export const menuDrawer = style({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  width: "280px",
  backgroundColor: "white",
  boxShadow: "2px 0 8px rgba(0, 0, 0, 0.15)",
  zIndex: 1000,
  transform: "translateX(-100%)",
  transition: "transform 0.3s ease",
  display: "flex",
  flexDirection: "column",
  selectors: {
    "&.open": {
      transform: "translateX(0)"
    }
  }
});

export const menuHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 24px",
  borderBottom: "1px solid #e5e7eb"
});

export const menuTitle = style({
  fontSize: "20px",
  fontWeight: 600,
  margin: 0
});

export const closeButton = style({
  background: "none",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  padding: "4px",
  color: "#6b7280",
  transition: "color 0.2s ease",
  selectors: {
    "&:hover": {
      color: "#111827"
    }
  }
});

export const menuNav = style({
  display: "flex",
  flexDirection: "column",
  padding: "8px 0"
});

export const menuLink = style({
  padding: "12px 24px",
  textDecoration: "none",
  color: "#111827",
  fontSize: "16px",
  transition: "background-color 0.2s ease",
  selectors: {
    "&:hover": {
      backgroundColor: "#f3f4f6"
    }
  }
});

