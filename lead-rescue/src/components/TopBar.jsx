import {
  Bell,
  Plus,
  Sun,
  Moon,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import useTheme from "../context/useTheme";
import { useLanguage } from "../context/LanguageContext";

const titles = {
  "/app": "dashboard",
  "/app/leads": "leads",
  "/app/follow-ups": "followUps",
  "/app/messages": "messages",
  "/app/calculator": "calculator",
  "/app/settings": "settings",
};

function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    theme,
    toggleTheme,
  } = useTheme();

  const { t } = useLanguage();

  const key =
    titles[location.pathname] ||
    "dashboard";

  const titleMap = {
    dashboard: t.dashboard.title,
    leads: t.nav.leads,
    followUps: t.nav.followUps,
    messages: t.nav.messages,
    calculator: t.nav.calculator,
    settings: t.nav.settings,
  };

  const subtitleMap = {
    dashboard: t.dashboard.subtitle,
    leads: t.page.leads.subtitle,
    followUps: t.page.followUps.subtitle,
    messages: t.page.messages.subtitle,
    calculator: t.page.calculator.subtitle,
    settings: t.page.settings.subtitle,
  };

  const title = titleMap[key];
  const subtitle = subtitleMap[key];

  const ThemeIcon =
    theme === "dark"
      ? Sun
      : Moon;

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--lr-border)] bg-[var(--lr-bg)]/85 backdrop-blur-2xl">
      <div className="flex h-[76px] items-center justify-between px-5 sm:px-8">

        <div>
          <h1 className="text-[19px] font-bold tracking-[-0.025em] text-[var(--lr-text)]">
            {title}
          </h1>

          <p className="mt-1 hidden text-[11px] text-[var(--lr-text-muted)] sm:block">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] text-[var(--lr-text-secondary)] hover:bg-[var(--lr-card-hover)] hover:text-[var(--lr-text)]"
            title={
              theme === "dark"
                ? t.common.lightMode
                : t.common.darkMode
            }
          >
            <ThemeIcon size={16} />
          </button>

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] text-[var(--lr-text-secondary)] hover:bg-[var(--lr-card-hover)] hover:text-[var(--lr-text)]"
            title={t.common.attention}
          >
            <Bell size={16} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--lr-accent)]" />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/app/leads")
            }
            className="ml-1 flex h-9 items-center gap-2 rounded-xl bg-[var(--lr-text)] px-3.5 text-[11px] font-bold text-[var(--lr-bg)] shadow-sm hover:opacity-90"
          >
            <Plus
              size={15}
              strokeWidth={2.5}
            />

            <span className="hidden sm:inline">
              {t.common.newLead}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopBar;