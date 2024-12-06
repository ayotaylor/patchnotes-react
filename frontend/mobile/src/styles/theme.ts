export const lightTheme = {
  colors: {
    primary: "#10B981",
    primaryHover: "#059669",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    text: {
      primary: "#111827",
      secondary: "#6B7280",
      inverse: "#FFFFFF",
    },
    border: "#E5E7EB",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px",
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  transitions: {
    default: "0.2s ease-in-out",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    primary: "#10B981",
    primaryHover: "#059669",
    background: "#18181B",
    surface: "#27272A",
    text: {
      primary: "#FFFFFF",
      secondary: "#A1A1AA",
      inverse: "#111827",
    },
    border: "#3F3F46",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
  },
};

export type Theme = typeof lightTheme;
