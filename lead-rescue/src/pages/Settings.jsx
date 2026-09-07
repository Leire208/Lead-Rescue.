import { useRef, useState } from "react";

import {
  Bell,
  BriefcaseBusiness,
  Check,
  Database,
  ImagePlus,
  Mail,
  Moon,
  Palette,
  RotateCcw,
  Save,
  ShieldCheck,
  Sun,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import Layout from "../components/Layout";
import { useLeads } from "../context/LeadContext";
import useTheme from "../context/useTheme";

const SETTINGS_KEY =
  "lead-rescue-settings";

const defaultSettings = {
  businessName: "Mi negocio",
  email: "",
  notifications: true,
  logo: "",
};

function getStoredSettings() {
  try {
    const stored =
      localStorage.getItem(
        SETTINGS_KEY
      );

    if (!stored) {
      return defaultSettings;
    }

    const parsed =
      JSON.parse(stored);

    return {
      ...defaultSettings,
      ...parsed,
    };
  } catch (error) {
    console.error(
      "Error leyendo la configuración:",
      error
    );

    return defaultSettings;
  }
}

const accentOptions = [
  {
    id: "purple",
    name: "Purple",
    value: "#8b7cff",
  },
  {
    id: "blue",
    name: "Blue",
    value: "#5b8cff",
  },
  {
    id: "green",
    name: "Green",
    value: "#35c98b",
  },
  {
    id: "orange",
    name: "Orange",
    value: "#ff9d5c",
  },
  {
    id: "red",
    name: "Red",
    value: "#ff6675",
  },
  {
    id: "pink",
    name: "Pink",
    value: "#ec6bba",
  },
];

const backgroundOptions = [
  {
    id: "minimal",
    name: "Minimal",
    description:
      "Limpio y discreto",
  },
  {
    id: "dark",
    name: "Focus",
    description:
      "Oscuro y elegante",
  },
  {
    id: "soft",
    name: "Soft",
    description:
      "Suave y ligero",
  },
  {
    id: "aurora",
    name: "Aurora",
    description:
      "Gradientes sutiles",
  },
  {
    id: "mesh",
    name: "Mesh",
    description:
      "Más dinámico",
  },
];

const styleOptions = [
  {
    id: "premium",
    name: "Premium",
    description:
      "Equilibrado y elegante",
  },
  {
    id: "minimal",
    name: "Minimal",
    description:
      "Simple y limpio",
  },
  {
    id: "bold",
    name: "Bold",
    description:
      "Más carácter visual",
  },
];

function Settings() {
  const {
    leads,
    resetDemoData,
    clearAllLeads,
  } = useLeads();

  const {
    theme,
    setTheme,
    branding,
    setAccent,
    setBackground,
    setBrandStyle,
  } = useTheme();

  const [settings, setSettings] =
    useState(getStoredSettings);

  const [saved, setSaved] =
    useState(false);

  const fileInputRef =
    useRef(null);

  const updateSetting = (
    key,
    value
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  const handleLogoUpload = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      window.alert(
        "Selecciona un archivo de imagen."
      );

      return;
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      window.alert(
        "El logo debe pesar menos de 2 MB."
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      updateSetting(
        "logo",
        reader.result
      );
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const removeLogo = () => {
    updateSetting(
      "logo",
      ""
    );
  };

  const handleReset = () => {
    const confirmed =
      window.confirm(
        "¿Quieres restaurar los datos de demostración? Los leads actuales serán sustituidos."
      );

    if (confirmed) {
      resetDemoData();
    }
  };

  const handleClear = () => {
    const confirmed =
      window.confirm(
        "¿Seguro que quieres eliminar todos los leads? Esta acción no se puede deshacer."
      );

    if (confirmed) {
      clearAllLeads();
    }
  };

  const accent =
    accentOptions.find(
      (option) =>
        option.id ===
        branding.accent
    ) ||
    accentOptions[0];

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-7">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[28px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)] sm:p-8">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                accent.value,
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--lr-accent)]">
              <Palette size={14} />
              Brand workspace
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-[var(--lr-text)] sm:text-3xl">
              Haz que Lead Rescue sea tuyo.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--lr-text-secondary)]">
              Personaliza la identidad de tu workspace
              para que la herramienta se adapte a tu
              negocio, no al revés.
            </p>
          </div>

          <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
            <QuickStat
              icon={BriefcaseBusiness}
              label="Workspace"
              value={
                settings.businessName ||
                "Mi negocio"
              }
            />

            <QuickStat
              icon={Database}
              label="Leads"
              value={`${leads.length}`}
            />

            <QuickStat
              icon={Palette}
              label="Identidad"
              value={accent.name}
            />
          </div>
        </section>

        {/* BUSINESS IDENTITY */}

        <section className="overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card)]">
          <SectionHeader
            icon={BriefcaseBusiness}
            title="Identidad de tu negocio"
            description="Haz que el workspace tenga la identidad de tu empresa."
          />

          <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[180px_minmax(0,1fr)]">

            {/* LOGO */}

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--lr-text-muted)]">
                Logo
              </p>

              <div className="flex flex-col items-center">
                <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-[28px] border border-[var(--lr-border)] bg-[var(--lr-bg-soft)]">
                  {settings.logo ? (
                    <img
                      src={settings.logo}
                      alt="Logo del negocio"
                      className="h-full w-full object-contain p-4"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[var(--lr-text-muted)]">
                      <ImagePlus size={24} />

                      <span className="text-[9px] font-semibold">
                        Sin logo
                      </span>
                    </div>
                  )}

                  {settings.logo && (
                    <button
                      type="button"
                      onClick={
                        removeLogo
                      }
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--lr-border)] bg-[var(--lr-card-solid)] text-[var(--lr-text-secondary)] shadow-lg hover:text-red-500"
                      title="Eliminar logo"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="mt-3 inline-flex h-9 items-center gap-2 rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-3 text-[10px] font-bold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-card-hover)] hover:text-[var(--lr-text)]"
                >
                  <Upload size={13} />

                  {settings.logo
                    ? "Cambiar logo"
                    : "Subir logo"}
                </button>

                <input
                  ref={
                    fileInputRef
                  }
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={
                    handleLogoUpload
                  }
                  className="hidden"
                />

                <p className="mt-2 text-center text-[9px] leading-4 text-[var(--lr-text-muted)]">
                  PNG, JPG, WEBP o SVG
                  <br />
                  Máximo 2 MB
                </p>
              </div>
            </div>

            {/* BUSINESS FIELDS */}

            <div className="space-y-5">
              <Field
                label="Nombre del negocio"
                icon={
                  BriefcaseBusiness
                }
                value={
                  settings.businessName
                }
                placeholder="Ej. Studio Norte"
                onChange={(value) =>
                  updateSetting(
                    "businessName",
                    value
                  )
                }
              />

              <Field
                label="Email"
                icon={Mail}
                type="email"
                value={
                  settings.email
                }
                placeholder="tu@email.com"
                onChange={(value) =>
                  updateSetting(
                    "email",
                    value
                  )
                }
              />

              <div className="rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-4">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-[var(--lr-accent)]"
                  />

                  <div>
                    <p className="text-[10px] font-bold text-[var(--lr-text)]">
                      Tu marca será visible en todo el
                      workspace.
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-[var(--lr-text-muted)]">
                      Más adelante podremos utilizar
                      estos datos también en emails,
                      mensajes, reportes y otras
                      comunicaciones con clientes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APPEARANCE */}

        <section className="overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card)]">
          <SectionHeader
            icon={Palette}
            title="Apariencia"
            description="Elige cómo quieres que se vea tu workspace."
          />

          <div className="space-y-8 p-5 sm:p-6">

            {/* THEME */}

            <div>
              <SettingTitle
                title="Tema"
                description="Elige entre una interfaz clara u oscura."
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ThemeOption
                  icon={Moon}
                  title="Oscuro"
                  description="Elegante y concentrado"
                  active={
                    theme === "dark"
                  }
                  onClick={() =>
                    setTheme("dark")
                  }
                />

                <ThemeOption
                  icon={Sun}
                  title="Claro"
                  description="Limpio y luminoso"
                  active={
                    theme === "light"
                  }
                  onClick={() =>
                    setTheme("light")
                  }
                />
              </div>
            </div>

            {/* ACCENT */}

            <div>
              <SettingTitle
                title="Color de marca"
                description="Este color aparecerá en botones, estados y elementos destacados."
              />

              <div className="mt-4 flex flex-wrap gap-3">
                {accentOptions.map(
                  (option) => {
                    const active =
                      branding.accent ===
                      option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setAccent(
                            option.id
                          )
                        }
                        title={
                          option.name
                        }
                        className={[
                          "group relative flex h-12 w-12 items-center justify-center rounded-2xl border transition-all",
                          active
                            ? "border-[var(--lr-text)] scale-105 shadow-lg"
                            : "border-[var(--lr-border)] hover:scale-105",
                        ].join(" ")}
                      >
                        <span
                          className="h-7 w-7 rounded-xl shadow-inner"
                          style={{
                            background:
                              option.value,
                          }}
                        />

                        {active && (
                          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--lr-text)] text-[var(--lr-bg)]">
                            <Check
                              size={10}
                            />
                          </span>
                        )}
                      </button>
                    );
                  }
                )}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background:
                      accent.value,
                  }}
                />

                <span className="text-[10px] font-semibold text-[var(--lr-text-secondary)]">
                  {accent.name}
                </span>
              </div>
            </div>

            {/* BACKGROUND */}

            <div>
              <SettingTitle
                title="Fondo"
                description="Elige la atmósfera visual de tu workspace."
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {backgroundOptions.map(
                  (option) => (
                    <BackgroundOption
                      key={option.id}
                      option={option}
                      active={
                        branding.background ===
                        option.id
                      }
                      accent={
                        accent.value
                      }
                      onClick={() =>
                        setBackground(
                          option.id
                        )
                      }
                    />
                  )
                )}
              </div>
            </div>

            {/* STYLE */}

            <div>
              <SettingTitle
                title="Estilo"
                description="Define el carácter general de tu workspace."
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {styleOptions.map(
                  (option) => (
                    <StyleOption
                      key={option.id}
                      option={option}
                      active={
                        branding.style ===
                        option.id
                      }
                      onClick={() =>
                        setBrandStyle(
                          option.id
                        )
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* LIVE PREVIEW */}

        <section className="overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card)]">
          <SectionHeader
            icon={Palette}
            title="Vista previa"
            description="Así se verá la identidad de tu workspace."
          />

          <div className="p-5 sm:p-6">
            <div className="relative overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-bg)] p-4 sm:p-5">

              <div className="pointer-events-none absolute inset-0 opacity-70">
                <div
                  className="absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
                  style={{
                    background:
                      accent.value,
                    opacity: 0.14,
                  }}
                />
              </div>

              <div className="relative grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">

                {/* MINI SIDEBAR */}

                <div className="rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-card)] p-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[var(--lr-bg-soft)]">
                      {settings.logo ? (
                        <img
                          src={
                            settings.logo
                          }
                          alt=""
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <span
                          className="text-xs font-black"
                          style={{
                            color:
                              accent.value,
                          }}
                        >
                          LR
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-black text-[var(--lr-text)]">
                        {settings.businessName ||
                          "Mi negocio"}
                      </p>

                      <p className="text-[8px] text-[var(--lr-text-muted)]">
                        Lead Rescue
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-1">
                    <PreviewNavItem
                      label="Dashboard"
                      active
                      accent={
                        accent.value
                      }
                    />

                    <PreviewNavItem label="Leads" />

                    <PreviewNavItem label="Follow-ups" />

                    <PreviewNavItem label="Messages" />
                  </div>
                </div>

                {/* MINI DASHBOARD */}

                <div className="min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--lr-text-muted)]">
                        Recovery overview
                      </p>

                      <p className="mt-1 text-lg font-black tracking-[-0.035em] text-[var(--lr-text)]">
                        Hola,{" "}
                        {settings.businessName ||
                          "tu negocio"}
                      </p>
                    </div>

                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-xl"
                      style={{
                        background:
                          `${accent.value}18`,
                        color:
                          accent.value,
                      }}
                    >
                      <BriefcaseBusiness
                        size={14}
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <PreviewMetric
                      label="Recoverable"
                      value="€2.480"
                      accent={
                        accent.value
                      }
                    />

                    <PreviewMetric
                      label="Follow-ups"
                      value="4"
                      accent={
                        accent.value
                      }
                    />

                    <PreviewMetric
                      label="Leads"
                      value={`${leads.length}`}
                      accent={
                        accent.value
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOTIFICATIONS */}

        <section className="overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card)]">
          <SectionHeader
            icon={Bell}
            title="Notificaciones"
            description="Controla cuándo Lead Rescue debe llamar tu atención."
          />

          <div className="p-5 sm:p-6">
            <SettingRow
              icon={Bell}
              title="Recordatorios de seguimiento"
              description="Activa los avisos cuando tengas leads pendientes de contactar."
              enabled={
                settings.notifications
              }
              onToggle={() =>
                updateSetting(
                  "notifications",
                  !settings.notifications
                )
              }
            />

            <div className="mt-4 rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]">
                  <Bell size={14} />
                </div>

                <div>
                  <p className="text-[10px] font-bold text-[var(--lr-text)]">
                    Próximamente
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[var(--lr-text-muted)]">
                    En una futura versión podrás recibir
                    recordatorios automáticos por email,
                    WhatsApp y notificaciones del navegador.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLAN */}

        <section className="relative overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-5 sm:p-6">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
            style={{
              background:
                accent.value,
              opacity: 0.08,
            }}
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  className="text-[var(--lr-accent)]"
                />

                <p className="text-xs font-bold text-[var(--lr-text)]">
                  Plan actual
                </p>
              </div>

              <p className="mt-2 text-sm font-black text-[var(--lr-text)]">
                Lead Rescue Free
              </p>

              <p className="mt-1 max-w-lg text-[10px] leading-5 text-[var(--lr-text-muted)]">
                Estás utilizando el MVP local. Cuando
                activemos cuentas y sincronización,
                podrás convertir este workspace en una
                cuenta real.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-[var(--lr-text-secondary)]">
                Free
              </span>

              <button
                type="button"
                className="hidden h-9 items-center rounded-xl bg-[var(--lr-text)] px-3.5 text-[10px] font-bold text-[var(--lr-bg)] hover:opacity-90 sm:flex"
              >
                Ver Pro
              </button>
            </div>
          </div>
        </section>

        {/* DATA */}

        <section className="overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card)]">
          <SectionHeader
            icon={Database}
            title="Datos"
            description="Gestiona la información almacenada localmente en este dispositivo."
          />

          <div className="divide-y divide-[var(--lr-border)]">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--lr-bg-soft)] text-[var(--lr-text-secondary)]">
                  <Database size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[var(--lr-text)]">
                    Leads almacenados
                  </p>

                  <p className="mt-1 text-[11px] text-[var(--lr-text-muted)]">
                    Actualmente tienes{" "}
                    <strong className="text-[var(--lr-text-secondary)]">
                      {leads.length}
                    </strong>{" "}
                    {leads.length === 1
                      ? "lead"
                      : "leads"}{" "}
                    guardados.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-4 py-2.5 text-center">
                <p className="text-lg font-black tracking-[-0.03em] text-[var(--lr-text)]">
                  {leads.length}
                </p>

                <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--lr-text-muted)]">
                  leads
                </p>
              </div>
            </div>

            <div className="bg-red-500/[0.015] p-5 sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-bold text-[var(--lr-text)]">
                    Zona de datos
                  </p>

                  <p className="mt-1 max-w-xl text-[11px] leading-5 text-[var(--lr-text-muted)]">
                    Utiliza estas opciones solamente para
                    probar o limpiar el MVP. Las acciones
                    sobre los leads son permanentes.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={
                      handleReset
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] px-4 text-xs font-bold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-bg-soft)] hover:text-[var(--lr-text)]"
                  >
                    <RotateCcw
                      size={14}
                    />

                    Restaurar demo
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleClear
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 text-xs font-bold text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2
                      size={14}
                    />

                    Eliminar todos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SAVE */}

        <div className="sticky bottom-4 z-20 flex justify-end">
          <button
            type="button"
            onClick={
              handleSave
            }
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--lr-text)] px-5 text-xs font-bold text-[var(--lr-bg)] shadow-2xl shadow-black/20 transition hover:-translate-y-0.5 hover:opacity-90"
          >
            {saved ? (
              <>
                <Check size={15} />
                Cambios guardados
              </>
            ) : (
              <>
                <Save size={15} />
                Guardar cambios
              </>
            )}
          </button>
        </div>

        <p className="pb-8 text-center text-[10px] font-medium text-[var(--lr-text-muted)]">
          Lead Rescue · MVP · Built to recover more sales
        </p>
      </div>
    </Layout>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--lr-border)] p-5 sm:p-6">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]">
        <Icon size={16} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-[var(--lr-text)]">
          {title}
        </h3>

        <p className="mt-0.5 text-[10px] text-[var(--lr-text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

function SettingTitle({
  title,
  description,
}) {
  return (
    <div>
      <p className="text-xs font-bold text-[var(--lr-text)]">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-[var(--lr-text-muted)]">
        {description}
      </p>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  type = "text",
  value,
  placeholder,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--lr-text-muted)]">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
        />

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="h-11 w-full rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] pl-10 pr-3.5 text-sm font-medium text-[var(--lr-text)] outline-none placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-accent)] focus:ring-4 focus:ring-[var(--lr-accent)]/5"
        />
      </div>
    </div>
  );
}

function QuickStat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--lr-card)] text-[var(--lr-text-secondary)]">
        <Icon size={15} />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--lr-text-muted)]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-bold text-[var(--lr-text)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function ThemeOption({
  icon: Icon,
  title,
  description,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
        active
          ? "border-[var(--lr-accent)]/40 bg-[var(--lr-accent-soft)]"
          : "border-[var(--lr-border)] bg-[var(--lr-bg-soft)] hover:border-[var(--lr-border-strong)]",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-10 w-10 items-center justify-center rounded-xl",
          active
            ? "bg-[var(--lr-accent)] text-white"
            : "bg-[var(--lr-card)] text-[var(--lr-text-secondary)]",
        ].join(" ")}
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-[var(--lr-text)]">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-[var(--lr-text-muted)]">
          {description}
        </p>
      </div>

      {active && (
        <Check
          size={15}
          className="text-[var(--lr-accent)]"
        />
      )}
    </button>
  );
}

function BackgroundOption({
  option,
  active,
  accent,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group overflow-hidden rounded-2xl border text-left transition-all",
        active
          ? "border-[var(--lr-accent)]/50 shadow-lg"
          : "border-[var(--lr-border)] hover:-translate-y-0.5 hover:border-[var(--lr-border-strong)]",
      ].join(" ")}
    >
      <div
        className={[
          "relative h-24 overflow-hidden",
          option.id ===
          "minimal"
            ? "bg-[#0b0b0d]"
            : option.id ===
              "dark"
              ? "bg-[#050506]"
              : option.id ===
                "soft"
                ? "bg-[#111116]"
                : "bg-[#08080d]",
        ].join(" ")}
      >
        {option.id !==
          "minimal" && (
          <div
            className={[
              "absolute rounded-full blur-2xl",
              option.id ===
                "mesh"
                ? "left-4 top-2 h-16 w-16"
                : "right-3 top-2 h-20 w-20",
            ].join(" ")}
            style={{
              background:
                accent,
              opacity:
                option.id ===
                "dark"
                  ? 0.12
                  : option.id ===
                    "soft"
                    ? 0.09
                    : 0.2,
            }}
          />
        )}

        {option.id ===
          "aurora" && (
          <div
            className="absolute bottom-0 left-1/3 h-14 w-28 rounded-full blur-2xl"
            style={{
              background:
                accent,
              opacity: 0.13,
            }}
          />
        )}

        {option.id ===
          "mesh" && (
          <>
            <div
              className="absolute bottom-0 right-8 h-12 w-20 rounded-full blur-2xl"
              style={{
                background:
                  "#5b8cff",
                opacity: 0.12,
              }}
            />

            <div
              className="absolute left-1/2 top-1/2 h-10 w-16 rounded-full blur-2xl"
              style={{
                background:
                  "#ec6bba",
                opacity: 0.08,
              }}
            />
          </>
        )}

        <div className="absolute inset-x-3 bottom-3 h-7 rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-md" />

        {active && (
          <div
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-lg text-white"
            style={{
              background:
                accent,
            }}
          >
            <Check size={13} />
          </div>
        )}
      </div>

      <div className="bg-[var(--lr-card)] p-3">
        <p className="text-xs font-bold text-[var(--lr-text)]">
          {option.name}
        </p>

        <p className="mt-1 text-[9px] text-[var(--lr-text-muted)]">
          {option.description}
        </p>
      </div>
    </button>
  );
}

function StyleOption({
  option,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border p-4 text-left transition-all",
        active
          ? "border-[var(--lr-accent)]/40 bg-[var(--lr-accent-soft)]"
          : "border-[var(--lr-border)] bg-[var(--lr-bg-soft)] hover:border-[var(--lr-border-strong)]",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-[var(--lr-text)]">
          {option.name}
        </p>

        {active && (
          <Check
            size={14}
            className="text-[var(--lr-accent)]"
          />
        )}
      </div>

      <p className="mt-2 text-[10px] leading-4 text-[var(--lr-text-muted)]">
        {option.description}
      </p>

      <div
        className={[
          "mt-4 h-1.5 rounded-full",
          option.id ===
            "minimal"
            ? "w-1/2"
            : option.id ===
              "bold"
              ? "w-full"
              : "w-3/4",
        ].join(" ")}
        style={{
          background:
            active
              ? "var(--lr-accent)"
              : "var(--lr-border-strong)",
        }}
      />
    </button>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--lr-bg-soft)] text-[var(--lr-text-secondary)]">
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold text-[var(--lr-text)]">
            {title}
          </p>

          <p className="mt-1 text-[10px] leading-4 text-[var(--lr-text-muted)]">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label={title}
        className={[
          "relative h-6 w-11 shrink-0 rounded-full transition-all",
          enabled
            ? "bg-[var(--lr-accent)]"
            : "bg-[var(--lr-border-strong)]",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all",
            enabled
              ? "left-6"
              : "left-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

function PreviewNavItem({
  label,
  active = false,
  accent,
}) {
  return (
    <div
      className={[
        "rounded-lg px-2.5 py-2 text-[9px] font-semibold",
        active
          ? "text-white"
          : "text-[var(--lr-text-muted)]",
      ].join(" ")}
      style={
        active
          ? {
              background:
                `${accent}22`,
              color:
                accent,
            }
          : undefined
      }
    >
      {label}
    </div>
  );
}

function PreviewMetric({
  label,
  value,
  accent,
}) {
  return (
    <div className="rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] p-3">
      <div
        className="mb-3 h-1 w-8 rounded-full"
        style={{
          background:
            accent,
        }}
      />

      <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[var(--lr-text-muted)]">
        {label}
      </p>

      <p className="mt-1 text-sm font-black text-[var(--lr-text)]">
        {value}
      </p>
    </div>
  );
}

export default Settings;