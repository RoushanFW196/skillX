import { createTheme } from "@mantine/core";

/* ============================================================
   SKILLX MANTINE THEME
   Mirrors the Tailwind palette (tailwind.config.js) so Mantine
   components (Buttons, Badges, Tabs, inputs, NavLink...) and
   Tailwind-styled markup share one identical brand system.
   Tailwind  → primary / secondary / accent / success / danger /
               warning / info / neutral
   Mantine   → same names, 10 shades each (50 → 900)
   ============================================================ */

const primary = [
  "#eef2ff",
  "#e0e7ff",
  "#c7d2fe",
  "#a5b4fc",
  "#818cf8",
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
];

const secondary = [
  "#f5f3ff",
  "#ede9fe",
  "#ddd6fe",
  "#c4b5fd",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
];

const accent = [
  "#fffbeb",
  "#fef3c7",
  "#fde68a",
  "#fcd34d",
  "#fbbf24",
  "#f59e0b",
  "#d97706",
  "#b45309",
  "#92400e",
  "#78350f",
];

const success = [
  "#ecfdf5",
  "#d1fae5",
  "#a7f3d0",
  "#6ee7b7",
  "#34d399",
  "#10b981",
  "#059669",
  "#047857",
  "#065f46",
  "#064e3b",
];

const danger = [
  "#fff1f2",
  "#ffe4e6",
  "#fecdd3",
  "#fda4af",
  "#fb7185",
  "#f43f5e",
  "#e11d48",
  "#be123c",
  "#9f1239",
  "#881337",
];

const warning = [...accent];

const info = [
  "#f0f9ff",
  "#e0f2fe",
  "#bae6fd",
  "#7dd3fc",
  "#38bdf8",
  "#0ea5e9",
  "#0284c7",
  "#0369a1",
  "#075985",
  "#0c4a6e",
];

/* Zinc-based dark palette — makes Mantine surfaces (Card, Paper, Modal,
   Drawer, inputs) use the SAME shades as Tailwind's neutral scale:
   dark-9 → body/Paper/Card bg  = neutral-900 (#18181b)
   dark-0 → text on dark        = neutral-50  (#fafafa)
   dark-4 → default borders     = neutral-700 (#3f3f46)  */
const dark = [
  "#fafafa", // 0  text
  "#f4f4f5", // 1  bright
  "#d4d4d8", // 2  dimmed text
  "#a1a1aa", // 3  placeholder
  "#3f3f46", // 4  default border
  "#71717a", // 5
  "#27272a", // 6  default bg (inputs, subtle buttons)
  "#27272a", // 7  hover bg
  "#1f1f23", // 8  elevated surfaces
  "#18181b", // 9  body / Paper / Card bg
];

const extendedTheme = createTheme({
  colors: { primary, secondary, accent, success, danger, warning, info, dark },
  primaryColor: "primary",
  primaryShade: 6, // → #4f46e5, matches Tailwind's primary-600
  defaultRadius: "md",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  headings: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    fontWeight: "700",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Badge: {
      defaultProps: {
        radius: "xl",
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
      },
    },
    Modal: {
      defaultProps: {
        radius: "lg",
        overlayProps: { opacity: 0.5, blur: 4 },
      },
    },
  },
});

/* createTheme already merges with Mantine's DEFAULT_THEME internally,
   so no explicit merging is needed. */
export const mantineTheme = extendedTheme;
