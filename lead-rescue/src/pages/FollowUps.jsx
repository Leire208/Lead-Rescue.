import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Flame,
  Filter,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import EmptyState from "../components/EmptyState";
import { useLeads } from "../context/LeadContext";

function getTodayString() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDate(date) {
  if (!date) return "Sin fecha";

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function getDaysDifference(date) {
  if (!date) return 0;

  const today = new Date(`${getTodayString()}T00:00:00`);
  const target = new Date(`${date}T00:00:00`);

  return Math.round(
    (target - today) / (1000 * 60 * 60 * 24)
  );
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function FollowUps() {
  const navigate = useNavigate();

  const {
    leads,
    updateLead,
    isDemo,
  } = useLeads();

  const [filter, setFilter] = useState("pending");

  const basePath = isDemo ? "/demo" : "/app";

  const leadsPath = `${basePath}/leads`;
  const messagesPath = `${basePath}/messages`;

  const followUps = useMemo(() => {
    return leads
      .filter(
        (lead) =>
          lead.status === "follow-up" ||
          lead.status === "proposal"
      )
      .sort((a, b) => {
        const aDate = a.nextFollowUp || "9999-12-31";
        const bDate = b.nextFollowUp || "9999-12-31";

        return aDate.localeCompare(bDate);
      });
  }, [leads]);

  const today = getTodayString();

  const overdueCount = useMemo(
    () =>
      followUps.filter(
        (lead) =>
          lead.nextFollowUp &&
          lead.nextFollowUp < today
      ).length,
    [followUps, today]
  );

  const todayCount = useMemo(
    () =>
      followUps.filter(
        (lead) => lead.nextFollowUp === today
      ).length,
    [followUps, today]
  );

  const upcomingCount = useMemo(
    () =>
      followUps.filter(
        (lead) =>
          lead.nextFollowUp &&
          lead.nextFollowUp > today
      ).length,
    [followUps, today]
  );

  const overdueValue = useMemo(
    () =>
      followUps
        .filter(
          (lead) =>
            lead.nextFollowUp &&
            lead.nextFollowUp < today
        )
        .reduce(
          (total, lead) =>
            total + Number(lead.value || 0),
          0
        ),
    [followUps, today]
  );

  const filteredFollowUps = useMemo(() => {
    if (filter === "overdue") {
      return followUps.filter(
        (lead) =>
          lead.nextFollowUp &&
          lead.nextFollowUp < today
      );
    }

    if (filter === "today") {
      return followUps.filter(
        (lead) => lead.nextFollowUp === today
      );
    }

    if (filter === "upcoming") {
      return followUps.filter(
        (lead) =>
          lead.nextFollowUp &&
          lead.nextFollowUp > today
      );
    }

    return followUps;
  }, [followUps, filter, today]);

  const completeFollowUp = (lead) => {
    updateLead(lead.id, {
      status: "contacted",
      lastContact: today,
      nextFollowUp: "",
    });
  };

  const postponeFollowUp = (lead, days = 3) => {
    const date = new Date();

    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    updateLead(lead.id, {
      nextFollowUp: `${year}-${month}-${day}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-7">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[28px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)] sm:p-8">

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--lr-accent)]/10 blur-3xl" />

          <div className="relative">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--lr-accent)]">
                  <Clock3 size={14} />
                  Follow-up engine
                </div>

                <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.035em] text-[var(--lr-text)] sm:text-3xl">
                  Recupera las conversaciones
                  que están a punto de enfriarse.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--lr-text-secondary)]">
                  Lead Rescue ordena tus oportunidades
                  por prioridad para que sepas exactamente
                  a quién contactar y cuándo.
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate(leadsPath)}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--lr-text)] px-4 text-xs font-bold text-[var(--lr-bg)] shadow-lg shadow-black/10 transition hover:-translate-y-0.5"
              >
                <Plus size={15} strokeWidth={2.5} />
                Añadir lead
              </button>

            </div>

            <div className="mt-7 flex flex-wrap items-end gap-8">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--lr-text-muted)]">
                  Dinero en riesgo
                </p>

                <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-[var(--lr-text)]">
                  {formatCurrency(overdueValue)}
                </p>
              </div>

              <div className="hidden h-10 w-px bg-[var(--lr-border)] sm:block" />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--lr-text-muted)]">
                  Pendientes
                </p>

                <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-[var(--lr-text)]">
                  {followUps.length}
                </p>
              </div>

              <div className="hidden h-10 w-px bg-[var(--lr-border)] sm:block" />

              <div className="flex items-center gap-2 pb-1 text-xs font-semibold text-[var(--lr-text-secondary)]">
                <TrendingUp
                  size={15}
                  className="text-emerald-500"
                />
                Prioriza antes de perderlos
              </div>

            </div>

          </div>

        </section>

        {/* SUMMARY */}

        <section className="grid gap-3 sm:grid-cols-3">

          <SummaryCard
            label="Atrasados"
            description="Necesitan atención"
            value={overdueCount}
            icon={AlertTriangle}
            active={filter === "overdue"}
            tone="danger"
            onClick={() => setFilter("overdue")}
          />

          <SummaryCard
            label="Hoy"
            description="Contactar ahora"
            value={todayCount}
            icon={Flame}
            active={filter === "today"}
            tone="accent"
            onClick={() => setFilter("today")}
          />

          <SummaryCard
            label="Próximos"
            description="Ya programados"
            value={upcomingCount}
            icon={CalendarDays}
            active={filter === "upcoming"}
            tone="neutral"
            onClick={() => setFilter("upcoming")}
          />

        </section>

        {/* FILTER */}

        <div className="flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--lr-border)] bg-[var(--lr-card)] text-[var(--lr-text-secondary)]">
              <Filter size={14} />
            </div>

            <div>

              <p className="text-xs font-bold text-[var(--lr-text)]">
                {filter === "pending"
                  ? "Todos los pendientes"
                  : filter === "overdue"
                    ? "Seguimientos atrasados"
                    : filter === "today"
                      ? "Contactos de hoy"
                      : "Próximos contactos"}
              </p>

              <p className="text-[10px] text-[var(--lr-text-muted)]">
                {filteredFollowUps.length}{" "}
                {filteredFollowUps.length === 1
                  ? "oportunidad"
                  : "oportunidades"}
              </p>

            </div>

          </div>

          {filter !== "pending" && (
            <button
              type="button"
              onClick={() => setFilter("pending")}
              className="text-xs font-bold text-[var(--lr-accent)] hover:opacity-80"
            >
              Ver todos
            </button>
          )}

        </div>

        {/* LIST */}

        {filteredFollowUps.length > 0 ? (

          <section className="space-y-3">

            {filteredFollowUps.map((lead) => {

              const days = getDaysDifference(
                lead.nextFollowUp
              );

              const isOverdue = days < 0;
              const isToday = days === 0;

              return (

                <article
                  key={lead.id}
                  className={[
                    "group relative overflow-hidden rounded-2xl border bg-[var(--lr-card)] p-5 transition-all duration-300",
                    "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5",
                    isOverdue
                      ? "border-red-500/20"
                      : isToday
                        ? "border-[var(--lr-accent)]/25"
                        : "border-[var(--lr-border)]",
                  ].join(" ")}
                >

                  {isOverdue && (
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-red-500" />
                  )}

                  {isToday && !isOverdue && (
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-[var(--lr-accent)]" />
                  )}

                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center">

                    {/* LEAD */}

                    <div className="flex min-w-0 flex-1 items-center gap-4">

                      <div
                        className={[
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xs font-black",
                          isOverdue
                            ? "bg-red-500/10 text-red-500"
                            : isToday
                              ? "bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]"
                              : "bg-[var(--lr-bg-soft)] text-[var(--lr-text-secondary)]",
                        ].join(" ")}
                      >
                        {getInitials(lead.name)}
                      </div>

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="truncate text-sm font-bold text-[var(--lr-text)]">
                            {lead.name}
                          </h3>

                          <span
                            className={[
                              "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                              lead.status === "proposal"
                                ? "bg-purple-500/10 text-purple-500"
                                : "bg-amber-500/10 text-amber-500",
                            ].join(" ")}
                          >
                            {lead.status === "proposal"
                              ? "Presupuesto"
                              : "Seguimiento"}
                          </span>

                        </div>

                        <p className="mt-1 truncate text-xs text-[var(--lr-text-secondary)]">
                          {lead.service || "Sin servicio"}
                          {lead.company
                            ? ` · ${lead.company}`
                            : ""}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">

                          <span className="text-[10px] text-[var(--lr-text-muted)]">
                            Último contacto:{" "}
                            {formatDate(lead.lastContact)}
                          </span>

                          <span className="text-[11px] font-bold text-[var(--lr-text)]">
                            {formatCurrency(lead.value)}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* PRIORITY */}

                    <div className="flex items-center gap-3 xl:w-[190px]">

                      <div
                        className={[
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          isOverdue
                            ? "bg-red-500/10 text-red-500"
                            : isToday
                              ? "bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]"
                              : "bg-[var(--lr-bg-soft)] text-[var(--lr-text-secondary)]",
                        ].join(" ")}
                      >
                        {isOverdue ? (
                          <AlertTriangle size={16} />
                        ) : isToday ? (
                          <Flame size={16} />
                        ) : (
                          <Clock3 size={16} />
                        )}
                      </div>

                      <div>

                        <p
                          className={[
                            "text-xs font-bold",
                            isOverdue
                              ? "text-red-500"
                              : isToday
                                ? "text-[var(--lr-accent)]"
                                : "text-[var(--lr-text)]",
                          ].join(" ")}
                        >
                          {isOverdue
                            ? `${Math.abs(days)} ${
                                Math.abs(days) === 1
                                  ? "día"
                                  : "días"
                              } de retraso`
                            : isToday
                              ? "Contactar hoy"
                              : `En ${days} ${
                                  days === 1
                                    ? "día"
                                    : "días"
                                }`}
                        </p>

                        <p className="mt-0.5 text-[10px] text-[var(--lr-text-muted)]">
                          {formatDate(lead.nextFollowUp)}
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex flex-wrap gap-2 xl:justify-end">

                      <button
                        type="button"
                        onClick={() =>
                          navigate(messagesPath, {
                            state: {
                              leadId: lead.id,
                            },
                          })
                        }
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--lr-text)] px-4 text-xs font-bold text-[var(--lr-bg)] transition hover:-translate-y-0.5 hover:opacity-90"
                      >
                        <MessageSquareText size={15} />
                        Escribir
                        <ArrowRight size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          postponeFollowUp(lead)
                        }
                        className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] px-3 text-xs font-semibold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-card-hover)] hover:text-[var(--lr-text)]"
                      >
                        +3 días
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          completeFollowUp(lead)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--lr-border)] text-[var(--lr-text-secondary)] hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500"
                        title="Marcar como contactado"
                      >
                        <Check size={16} />
                      </button>

                      <button
                        type="button"
                        className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[var(--lr-border)] text-[var(--lr-text-muted)] hover:bg-[var(--lr-card-hover)] hover:text-[var(--lr-text)] sm:flex"
                        title="Más opciones"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </section>

        ) : (

          <EmptyState
            title={
              followUps.length === 0
                ? "No tienes seguimientos pendientes"
                : "No hay seguimientos en esta vista"
            }
            description={
              followUps.length === 0
                ? "Cuando un lead necesite seguimiento aparecerá automáticamente aquí."
                : "Prueba con otra categoría de seguimiento."
            }
            action={
              followUps.length === 0
                ? "Ver mis leads"
                : undefined
            }
            onAction={() => navigate(leadsPath)}
          />

        )}

        {/* EXPLANATION */}

        <section className="relative overflow-hidden rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-5 sm:p-6">

          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--lr-accent)]/5 blur-3xl" />

          <div className="relative flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] text-[var(--lr-accent)]">
              <ArrowRight size={17} />
            </div>

            <div>

              <h3 className="text-sm font-bold text-[var(--lr-text)]">
                El objetivo no es guardar leads.
              </h3>

              <p className="mt-1 max-w-3xl text-xs leading-5 text-[var(--lr-text-secondary)]">
                El objetivo es convertir seguimiento
                olvidado en conversaciones. Por eso Lead
                Rescue te muestra primero a quién contactar
                y después te ayuda con el mensaje.
              </p>

            </div>

          </div>

        </section>

      </div>
    </Layout>
  );
}

function SummaryCard({
  label,
  description,
  value,
  icon: Icon,
  active,
  tone,
  onClick,
}) {
  const iconStyles = {
    danger: "bg-red-500/10 text-red-500",
    accent:
      "bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]",
    neutral:
      "bg-[var(--lr-bg-soft)] text-[var(--lr-text-secondary)]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group rounded-2xl border p-5 text-left transition-all duration-300",
        active
          ? "border-[var(--lr-text)] bg-[var(--lr-text)] shadow-xl shadow-black/10"
          : "border-[var(--lr-border)] bg-[var(--lr-card)] hover:-translate-y-0.5 hover:border-[var(--lr-border-strong)] hover:shadow-lg hover:shadow-black/5",
      ].join(" ")}
    >

      <div className="flex items-start justify-between gap-4">

        <div
          className={[
            "flex h-10 w-10 items-center justify-center rounded-xl",
            active
              ? "bg-white/10 text-white"
              : iconStyles[tone],
          ].join(" ")}
        >
          <Icon size={17} />
        </div>

        <span
          className={[
            "text-3xl font-black tracking-[-0.04em]",
            active
              ? "text-white"
              : "text-[var(--lr-text)]",
          ].join(" ")}
        >
          {value}
        </span>

      </div>

      <div className="mt-5">

        <p
          className={[
            "text-xs font-bold",
            active
              ? "text-white"
              : "text-[var(--lr-text)]",
          ].join(" ")}
        >
          {label}
        </p>

        <p
          className={[
            "mt-1 text-[10px]",
            active
              ? "text-white/50"
              : "text-[var(--lr-text-muted)]",
          ].join(" ")}
        >
          {description}
        </p>

      </div>

    </button>
  );
}

export default FollowUps;