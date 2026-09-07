import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "lead-rescue-theme";

const accentOptions = {
  purple: {
    value: "#8b7cff",
    soft: "rgba(139, 124, 255, 0.12)",
    strong: "rgba(139, 124, 255, 0.24)",
  },
  blue: {
    value: "#5b8cff",
    soft: "rgba(91, 140, 255, 0.12)",
    strong: "rgba(91, 140, 255, 0.24)",
  },
  green: {
    value: "#35c98b",
    soft: "rgba(53, 201, 139, 0.12)",
    strong: "rgba(53, 201, 139, 0.24)",
  },
  orange: {
    value: "#ff9d5c",
    soft: "rgba(255, 157, 92, 0.12)",
    strong: "rgba(255, 157, 92, 0.24)",
  },
  red: {
    value: "#ff6675",
    soft: "rgba(255, 102, 117, 0.12)",
    strong: "rgba(255, 102, 117, 0.24)",
  },
  pink: {
    value: "#ec6bba",
    soft: "rgba(236, 107, 186, 0.12)",
    strong: "rgba(236, 107, 186, 0.24)",
  },
};

const defaultBranding = {
  accent: "purple",
  background: "aurora",
  style: "premium",
};

const defaultTheme = {
  theme: "dark",
  branding: defaultBranding,
};

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultTheme;
    }

    const parsed = JSON.parse(stored);

    return {
      theme:
        parsed.theme === "light" || parsed.theme === "dark"
          ? parsed.theme
          : "dark",

      branding: {
        ...defaultBranding,
        ...(parsed.branding || {}),
      },
    };
  } catch (error) {
    console.error("Error leyendo el tema:", error);

    return defaultTheme;
  }
}

function ThemeProvider({ children }) {
  const initialTheme = getStoredTheme();

  const [theme, setThemeState] = useState(initialTheme.theme);

  const [branding, setBranding] = useState(
    initialTheme.branding
  );

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);
    root.setAttribute(
      "data-background",
      branding.background
    );
    root.setAttribute(
      "data-brand-style",
      branding.style
    );

    const accent =
      accentOptions[branding.accent] ||
      accentOptions.purple;

    root.style.setProperty(
      "--lr-accent",
      accent.value
    );

    root.style.setProperty(
      "--lr-accent-soft",
      accent.soft
    );

    root.style.setProperty(
      "--lr-accent-strong",
      accent.strong
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        theme,
        branding,
      })
    );
  }, [theme, branding]);

  function setTheme(newTheme) {
    if (
      newTheme !== "dark" &&
      newTheme !== "light"
    ) {
      return;
    }

    setThemeState(newTheme);
  }

  function toggleTheme() {
    setThemeState((current) =>
      current === "dark"
        ? "light"
        : "dark"
    );
  }

  function setAccent(accent) {
    if (!accentOptions[accent]) {
      return;
    }

    setBranding((current) => ({
      ...current,
      accent,
    }));
  }

  function setBackground(background) {
    const allowedBackgrounds = [
      "minimal",
      "dark",
      "soft",
      "aurora",
      "mesh",
    ];

    if (!allowedBackgrounds.includes(background)) {
      return;
    }

    setBranding((current) => ({
      ...current,
      background,
    }));
  }

  function setBrandStyle(style) {
    const allowedStyles = [
      "premium",
      "minimal",
      "bold",
    ];

    if (!allowedStyles.includes(style)) {
      return;
    }

    setBranding((current) => ({
      ...current,
      style,
    }));
  }

  function resetAppearance() {
    setThemeState("dark");

    setBranding({
      ...defaultBranding,
    });
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,

      branding,

      setAccent,
      setBackground,
      setBrandStyle,
      resetAppearance,

      accent:
        accentOptions[branding.accent] ||
        accentOptions.purple,

      isDark: theme === "dark",
    }),
    [theme, branding]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme debe utilizarse dentro de ThemeProvider"
    );
  }

  return context;
}

export default ThemeProvider;