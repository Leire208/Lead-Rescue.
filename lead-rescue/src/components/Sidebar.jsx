import {
  BarChart3,
  Calculator,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useLeads } from "../context/LeadContext";

function Sidebar() {
  const navigate = useNavigate();

  const {
    logout,
    profile,
    user,
  } = useAuth();

  const { t } = useLanguage();
  const { theme } = useTheme();
  const { isDemo } = useLeads();

  const isDark = theme === "dark";

  const navigation = [
    {
      label: t.nav.dashboard,
      icon: LayoutDashboard,
      path: isDemo ? "/demo" : "/app",
      end: true,
    },
    {
      label: t.nav.leads,
      icon: Users,
      path: isDemo ? "/demo/leads" : "/app/leads",
    },
    {
      label: t.nav.followUps,
      icon: ClipboardList,
      path: isDemo
        ? "/demo/follow-ups"
        : "/app/follow-ups",
    },
    {
      label: t.nav.messages,
      icon: MessageSquare,
      path: isDemo
        ? "/demo/messages"
        : "/app/messages",
    },
    {
      label: t.nav.calculator,
      icon: Calculator,
      path: isDemo
        ? "/demo/calculator"
        : "/app/calculator",
    },
    {
      label: t.nav.settings,
      icon: Settings,
      path: isDemo
        ? "/demo/settings"
        : "/app/settings",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Error cerrando sesión:",
        error
      );
    }
  };

  const handleExitDemo = () => {
    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-40 hidden h-screen w-[264px] border-r lg:flex flex-col ${
          isDark
            ? "border-white/[0.07] bg-black/80"
            : "border-black/[0.08] bg-white/85"
        } backdrop-blur-2xl`}
      >
        {/* BRAND */}
        <div className="flex h-[86px] items-center px-6">
          <button
            type="button"
            onClick={() =>
              navigate(isDemo ? "/demo" : "/app")
            }
            className="flex items-center gap-3 text-left"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                isDark
                  ? "border-white/10 bg-white/[0.07]"
                  : "border-black/10 bg-black/[0.04]"
              }`}
            >
              <span className="text-lg font-bold tracking-tight">
                LR
              </span>
            </div>

            <div>
              <div className="text-[16px] font-semibold tracking-tight">
                Lead Rescue
              </div>

              <div
                className={`text-[12px] ${
                  isDark
                    ? "text-white/40"
                    : "text-black/40"
                }`}
              >
                {isDemo
                  ? "DEMO · Datos de ejemplo"
                  : t.common.workspace}
              </div>
            </div>
          </button>
        </div>

        {/* DEMO BADGE */}
        {isDemo && (
          <div className="px-4 pb-2">
            <div className="rounded-xl border border-[var(--lr-accent)]/20 bg-[var(--lr-accent-soft)] px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--lr-accent)]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--lr-accent)]">
                  Demo
                </span>
              </div>

              <p className="mt-1 text-[9px] leading-4 text-[var(--lr-text-muted)]">
                Datos ficticios para probar Lead Rescue.
              </p>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-5">
          <div
            className={`mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] ${
              isDark
                ? "text-white/25"
                : "text-black/30"
            }`}
          >
            Menu
          </div>

          <div className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "group flex items-center gap-3 rounded-2xl px-3.5 py-3",
                      "text-[14px] font-medium transition-all duration-200",
                      isActive
                        ? isDark
                          ? "bg-white/[0.09] text-white shadow-sm"
                          : "bg-black/[0.06] text-black shadow-sm"
                        : isDark
                        ? "text-white/50 hover:bg-white/[0.05] hover:text-white/85"
                        : "text-black/50 hover:bg-black/[0.04] hover:text-black/85",
                    ].join(" ")
                  }
                >
                  <Icon
                    size={19}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* WORKSPACE */}
        <div className="px-4 pb-3">
          <div
            className={`rounded-2xl border p-4 ${
              isDark
                ? "border-white/[0.07] bg-white/[0.035]"
                : "border-black/[0.07] bg-black/[0.025]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  isDark
                    ? "bg-white/[0.08]"
                    : "bg-black/[0.06]"
                }`}
              >
                <BarChart3
                  size={17}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium">
                  {isDemo
                    ? "Demo workspace"
                    : profile?.role === "admin"
                    ? "Admin workspace"
                    : t.common.freeWorkspace}
                </div>

                <div
                  className={`mt-0.5 truncate text-[11px] ${
                    isDark
                      ? "text-white/35"
                      : "text-black/35"
                  }`}
                >
                  {isDemo
                    ? "Datos de ejemplo"
                    : user?.email || "Workspace"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOGOUT / EXIT DEMO */}
        <div
          className={`border-t p-4 ${
            isDark
              ? "border-white/[0.07]"
              : "border-black/[0.07]"
          }`}
        >
          {isDemo ? (
            <button
              type="button"
              onClick={handleExitDemo}
              className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] font-medium transition ${
                isDark
                  ? "text-white/45 hover:bg-white/[0.05] hover:text-white"
                  : "text-black/45 hover:bg-black/[0.04] hover:text-black"
              }`}
            >
              <LogOut
                size={18}
                strokeWidth={1.8}
              />

              <span>
                Salir de la demo
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] font-medium transition ${
                isDark
                  ? "text-white/45 hover:bg-white/[0.05] hover:text-white"
                  : "text-black/45 hover:bg-black/[0.04] hover:text-black"
              }`}
            >
              <LogOut
                size={18}
                strokeWidth={1.8}
              />

              <span>
                {t.nav.settings === "Settings"
                  ? "Log out"
                  : "Cerrar sesión"}
              </span>
            </button>
          )}
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t lg:hidden ${
          isDark
            ? "border-white/[0.08] bg-black/85"
            : "border-black/[0.08] bg-white/90"
        } backdrop-blur-2xl`}
      >
        <div className="grid grid-cols-5 px-2 py-2">
          {navigation
            .slice(0, 5)
            .map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[10px] font-medium transition ${
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-black"
                        : isDark
                        ? "text-white/35"
                        : "text-black/35"
                    }`
                  }
                >
                  <Icon
                    size={19}
                    strokeWidth={1.8}
                  />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;