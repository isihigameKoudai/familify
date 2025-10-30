import { style } from "@vanilla-extract/css";

export const selectWrapper = style({
  position: "relative",
  display: "inline-flex",
  maxWidth: "240px",
  borderRadius: "12px",
  padding: "1px",
  background: "linear-gradient(135deg, #0d3326, #004831)",
  boxShadow: "0 12px 28px rgba(0, 72, 49, 0.18)",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",
  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      pointerEvents: "none",
      right: "16px",
      top: "50%",
      marginTop: "-3px",
      borderWidth: "6px 5px 0 5px",
      borderStyle: "solid",
      borderColor: "#0d3326 transparent transparent transparent",
      transition: "border-color 0.2s ease"
    },
    "&:focus-within": {
      boxShadow: "0 16px 34px rgba(37, 99, 235, 0.22)",
      transform: "translateY(-1px)"
    },
    "&:focus-within::after": {
      borderColor: "#1d4ed8 transparent transparent transparent"
    }
  }
});

export const selectControl = style({
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  width: "100%",
  padding: "12px 44px 12px 16px",
  border: "none",
  borderRadius: "11px",
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.9))",
  color: "#0d3326",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 1.4,
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  cursor: "pointer",
  transition: "box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease",
  selectors: {
    "&:focus": {
      outline: "none",
      boxShadow: "inset 0 0 0 2px rgba(37, 99, 235, 0.25), inset 0 1px 6px rgba(15, 23, 42, 0.12)",
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))"
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.65,
      background: "rgba(248, 250, 252, 0.7)",
      color: "rgba(15, 23, 42, 0.35)"
    }
  }
});

export const dateSelectWrapper = style({
  display: "flex",
  gap: "16px",
});
