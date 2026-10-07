import { createTheme, type MantineColorsTuple } from "@mantine/core";

/* ============================================================
   SKILLX MANTINE THEME
   Mirrors the Tailwind palette (tailwind.config.js) so Mantine
   components (Buttons, Badges, Tabs, inputs, NavLink...) and
   Tailwind-styled markup share one identical brand system.
   Tailwind  → primary / secondary / accent / success / danger /
               warning / info / neutral
   Mantine   → same names, 10 shades each (50 → 900)
   ============================================================ */

const primary: MantineColorsTuple = [
  "#f2f7ed",
  "#e6efdc",
  "#d1e2bf",
  "#b2ce95",
  "#8fb76c",
  "#709c4f",
  "#527a3b",
  "#41622f",
  "#365029",
  "#2e4326",
];

const secondary: MantineColorsTuple = [
  "#eff9fa",
  "#d6eff0",
  "#b0dfe3",
  "#7ac7cf",
  "#42a9b6",
  "#268d9b",
  "#23717f",
  "#225b68",
  "#234c57",
  "#22414b",
];

const accent: MantineColorsTuple = [
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

const success: MantineColorsTuple = [
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

const danger: MantineColorsTuple = [
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

const warning: MantineColorsTuple = [...accent];

const info: MantineColorsTuple = [
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
const dark: MantineColorsTuple = [
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
  primaryShade: { light: 6, dark: 3 },
  autoContrast: true,
  defaultRadius: "md",
  fontFamily:
    "DM Sans, sans-serif",
  fontSizes: {
    xs: "0.875rem",
    sm: "0.9375rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  lineHeights: {
    xs: "1.5",
    sm: "1.55",
    md: "1.6",
    lg: "1.6",
    xl: "1.6",
  },
  headings: {
    fontFamily:
      "DM Sans, sans-serif",
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
