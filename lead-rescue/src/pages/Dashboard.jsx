import {
  ArrowRight,
  Clock3,
  Flame,
  MoreHorizontal,
  Plus,
  TrendingUp,
  Users,
  WalletCards,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { useLeads } from "../context/LeadContext";
import { useLanguage } from "../context/LanguageContext";

function formatCurrency(value, language) {
  const localeMap = {
    es: "es-ES",
    eu: "eu-ES",
    en: "en-US",
    fr: "fr-FR",
    de: "de-DE",
    pt: "pt-PT",
    it: "it-IT",
    ja: "ja-JP",
    zh: "zh-CN",
  };

  return new Intl.NumberFormat(
    localeMap[language] || "en-US",
    {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatDate(date, language) {
  if (!date) return "—";

  const localeMap = {
    es: "es-ES",
    eu: "eu-ES",
    en: "en-US",
    fr: "fr-FR",
    de: "de-DE",
    pt: "pt-PT",
    it: "it-IT",
    ja: "ja-JP",
    zh: "zh-CN",
  };

  return new Intl.DateTimeFormat(
    localeMap[language] || "en-US",
    {
      day: "numeric",
      month: "short",
    }
  ).format(new Date(`${date}T12:00:00`));
}

function Dashboard() {
  const navigate = useNavigate();
  const { leads, stats } = useLeads();
  const { t, language } = useLanguage();

  const today = getToday();

  const attentionLeads = useMemo(() => {
    return leads
      .filter(
        (lead) =>
          lead.status !== "won" &&
          lead.status !== "lost" &&
          lead.nextFollowUp
      )
      .sort((a, b) => {
        return (
          new Date(`${a.nextFollowUp}T12:00:00`) -
          new Date(`${b.nextFollowUp}T12:00:00`)
        );
      })
      .slice(0, 5);
  }, [leads]);

  const todayLeads = useMemo(() => {
    return leads.filter(
      (lead) =>
        lead.status !== "won" &&
        lead.status !== "lost" &&
        lead.nextFollowUp &&
        lead.nextFollowUp <= today
    );
  }, [leads, today]);

  const recoverableValue = useMemo(() => {
    return leads
      .filter(
        (lead) =>
          lead.status === "follow-up" ||
          lead.status === "proposal"
      )
      .reduce(
        (total, lead) =>
          total + Number(lead.value || 0),
        0
      );
  }, [leads]);

  const hotLeads = useMemo(() => {
    return leads
      .filter(
        (lead) =>
          lead.status === "proposal" ||
          lead.status === "follow-up"
      )
      .sort(
        (a, b) =>
          Number(b.value) - Number(a.value)
      )
      .slice(0, 3);
  }, [leads]);

  const recoveryScore = useMemo(() => {
    if (!leads.length) return 0;

    const activeLeads = leads.filter(
      (lead) =>
        lead.status !== "won" &&
        lead.status !== "lost"
    );

    if (!activeLeads.length) return 100;

    const followedUp = activeLeads.filter(
      (lead) =>
        lead.nextFollowUp &&
        lead.nextFollowUp >= today
    ).length;

    return Math.min(
      100,
      Math.round(
        (followedUp / activeLeads.length) * 100
      )
    );
  }, [leads, today]);

  const scoreLabel =
    recoveryScore >= 80
      ? t.dashboard.scoreExcellent
      : recoveryScore >= 60
        ? t.dashboard.scoreHealthy
        : recoveryScore >= 40
          ? t.dashboard.scoreAttention
          : t.dashboard.scoreRisk;

  return (
    <Layout>
      <div className="space-y-6">

        {/* =================================
            HERO
        ================================= */}

        <section className="relative overflow-hidden rounded-[28px] border border-[var(--lr-border)] bg-[var(--lr-card-solid)] p-6 shadow-sm sm:p-8">

          <div className="pointer-events-none absolute -right-20 -top-32 h-[400px] w-[400px] rounded-full bg-[var(--lr-accent)]/10 blur-[100px]" />

          <div className="pointer-events-none absolute bottom-[-150px] left-[35%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.06] blur-[100px]" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--lr-border)] bg-[var(--lr-card)] px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-[var(--lr-accent)]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--lr-text-muted)]">
                  {t.dashboard.recoveryOverview}
                </span>

              </div>

              <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--lr-text)] sm:text-4xl">
                {t.dashboard.headline}
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--lr-text-secondary)]">
                {t.dashboard.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/app/leads")
                  }
                  className="group flex h-10 items-center gap-2 rounded-xl bg-[var(--lr-text)] px-4 text-xs font-bold text-[var(--lr-bg)] hover:opacity-90"
                >
                  <Plus size={15} />

                  {t.common.newLead}

                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/app/follow-ups")
                  }
                  className="flex h-10 items-center gap-2 rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] px-4 text-xs font-semibold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-card-hover)] hover:text-[var(--lr-text)]"
                >
                  {t.dashboard.viewFollowUps}
                </button>

              </div>
            </div>

            {/* SCORE */}

            <div className="relative mx-auto w-full max-w-[250px] lg:mx-0 lg:ml-auto">

              <div className="rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-5 backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--lr-text-muted)]">
                    {t.dashboard.rescueScore}
                  </p>

                  <TrendingUp
                    size={15}
                    className="text-[var(--lr-accent)]"
                  />

                </div>

                <div className="mt-5 flex items-end gap-1">

                  <span className="text-5xl font-bold tracking-[-0.06em] text-[var(--lr-text)]">
                    {recoveryScore}
                  </span>

                  <span className="mb-2 text-sm text-[var(--lr-text-muted)]">
                    /100
                  </span>

                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--lr-bg-soft)]">

                  <div
                    className="h-full rounded-full bg-[var(--lr-accent)] transition-all duration-700"
                    style={{
                      width: `${recoveryScore}%`,
                    }}
                  />

                </div>

                <div className="mt-3 flex items-center justify-between">

                  <span className="text-[10px] font-semibold text-[var(--lr-text-secondary)]">
                    {scoreLabel}
                  </span>

                  <span className="text-[9px] text-[var(--lr-text-muted)]">
                    {t.dashboard.followUpLabel}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================
            STATS
        ================================= */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            label={t.dashboard.recovery}
            value={formatCurrency(
              recoverableValue,
              language
            )}
            description={t.dashboard.leadsWithOpportunity}
            icon={WalletCards}
            accent
          />

          <MetricCard
            label={t.dashboard.followUps}
            value={todayLeads.length}
            description={t.dashboard.requireAttention}
            icon={Clock3}
            alert={todayLeads.length > 0}
            alertLabel={t.dashboard.attentionShort}
          />

          <MetricCard
            label={t.dashboard.activeLeads}
            value={stats.active}
            description={`${stats.total} ${t.dashboard.totalLeads}`}
            icon={Users}
          />

          <MetricCard
            label={t.dashboard.pipeline}
            value={formatCurrency(
              stats.pipelineValue,
              language
            )}
            description={`${stats.conversionRate}% ${t.dashboard.conversion}`}
            icon={TrendingUp}
          />

        </section>

        {/* =================================
            MAIN GRID
        ================================= */}

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">

          {/* ATTENTION */}

          <div className="overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card-solid)]">

            <div className="flex items-center justify-between border-b border-[var(--lr-border)] p-5 sm:p-6">

              <div>

                <h3 className="text-sm font-bold text-[var(--lr-text)]">
                  {t.dashboard.attention}
                </h3>

                <p className="mt-1 text-[10px] text-[var(--lr-text-muted)]">
                  {t.dashboard.prioritizeContacts}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/app/follow-ups")
                }
                className="text-[10px] font-bold text-[var(--lr-accent)] hover:opacity-80"
              >
                {t.dashboard.viewAll}
              </button>

            </div>

            {attentionLeads.length > 0 ? (

              <div className="divide-y divide-[var(--lr-border)]">

                {attentionLeads.map((lead) => {

                  const isOverdue =
                    lead.nextFollowUp < today;

                  const isToday =
                    lead.nextFollowUp === today;

                  return (
                    <div
                      key={lead.id}
                      className="group flex items-center gap-3 p-4 transition hover:bg-[var(--lr-card-hover)] sm:p-5"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--lr-bg-soft)] text-[10px] font-bold text-[var(--lr-text-secondary)]">
                        {getInitials(lead.name)}
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2">

                          <p className="truncate text-xs font-bold text-[var(--lr-text)]">
                            {lead.name}
                          </p>

                          {lead.status === "proposal" && (
                            <Flame
                              size={12}
                              className="shrink-0 text-[var(--lr-accent)]"
                            />
                          )}

                        </div>

                        <p className="mt-0.5 truncate text-[10px] text-[var(--lr-text-muted)]">
                          {lead.service || lead.company}
                        </p>

                      </div>

                      <div className="hidden text-right sm:block">

                        <p className="text-xs font-bold text-[var(--lr-text)]">
                          {formatCurrency(
                            lead.value,
                            language
                          )}
                        </p>

                        <p
                          className={[
                            "mt-0.5 text-[9px] font-semibold",
                            isOverdue
                              ? "text-red-500"
                              : isToday
                                ? "text-[var(--lr-accent)]"
                                : "text-[var(--lr-text-muted)]",
                          ].join(" ")}
                        >
                          {isOverdue
                            ? t.common.overdue
                            : isToday
                              ? t.common.today
                              : formatDate(
                                  lead.nextFollowUp,
                                  language
                                )}
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            "/app/messages",
                            {
                              state: {
                                leadId: lead.id,
                              },
                            }
                          )
                        }
                        className="hidden h-8 items-center gap-1.5 rounded-lg border border-[var(--lr-border)] bg-[var(--lr-card)] px-2.5 text-[9px] font-bold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-text)] hover:text-[var(--lr-bg)] sm:flex"
                      >
                        {t.dashboard.write}
                        <ArrowRight size={11} />
                      </button>

                      <MoreHorizontal
                        size={16}
                        className="text-[var(--lr-text-muted)] sm:hidden"
                      />

                    </div>
                  );
                })}

              </div>

            ) : (

              <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]">
                  <CheckCircle2 size={21} />
                </div>

                <p className="mt-4 text-sm font-bold text-[var(--lr-text)]">
                  {t.dashboard.allUnderControl}
                </p>

                <p className="mt-1 max-w-xs text-[11px] leading-5 text-[var(--lr-text-muted)]">
                  {t.dashboard.noPendingFollowUps}
                </p>

              </div>

            )}

          </div>

          {/* HOT LEADS */}

          <div className="overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card-solid)]">

            <div className="flex items-center justify-between border-b border-[var(--lr-border)] p-5 sm:p-6">

              <div>

                <h3 className="text-sm font-bold text-[var(--lr-text)]">
                  {t.dashboard.hotOpportunities}
                </h3>

                <p className="mt-1 text-[10px] text-[var(--lr-text-muted)]">
                  {t.dashboard.highestPotential}
                </p>

              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]">
                <Flame size={15} />
              </div>

            </div>

            <div className="p-4">

              {hotLeads.length > 0 ? (

                <div className="space-y-2">

                  {hotLeads.map((lead, index) => (

                    <button
                      key={lead.id}
                      type="button"
                      onClick={() =>
                        navigate("/app/leads")
                      }
                      className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-[var(--lr-card)]"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--lr-bg-soft)] text-[9px] font-bold text-[var(--lr-text-secondary)]">
                        {getInitials(lead.name)}
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-[11px] font-bold text-[var(--lr-text)]">
                          {lead.name}
                        </p>

                        <p className="mt-0.5 truncate text-[9px] text-[var(--lr-text-muted)]">
                          {lead.service}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-[11px] font-bold text-[var(--lr-text)]">
                          {formatCurrency(
                            lead.value,
                            language
                          )}
                        </p>

                        <p className="mt-0.5 text-[8px] font-semibold text-[var(--lr-accent)]">
                          #{index + 1}
                        </p>

                      </div>

                    </button>

                  ))}

                </div>

              ) : (

                <div className="flex min-h-[180px] items-center justify-center text-center">

                  <div>

                    <AlertCircle
                      size={20}
                      className="mx-auto text-[var(--lr-text-muted)]"
                    />

                    <p className="mt-3 text-xs font-semibold text-[var(--lr-text)]">
                      {t.dashboard.noHotOpportunities}
                    </p>

                    <p className="mt-1 text-[10px] text-[var(--lr-text-muted)]">
                      {t.dashboard.addLeadsToStart}
                    </p>

                  </div>

                </div>

              )}

            </div>

            <div className="border-t border-[var(--lr-border)] p-4">

              <button
                type="button"
                onClick={() =>
                  navigate("/app/leads")
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--lr-bg-soft)] py-2.5 text-[10px] font-bold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-card-hover)] hover:text-[var(--lr-text)]"
              >
                {t.dashboard.viewAllLeads}
                <ArrowRight size={12} />
              </button>

            </div>

          </div>

        </section>

        {/* =================================
            BOTTOM INFO
        ================================= */}

        <section className="grid gap-4 md:grid-cols-3">

          <MiniCard
            number="01"
            title={t.dashboard.find}
            description={t.dashboard.findDescription}
          />

          <MiniCard
            number="02"
            title={t.dashboard.contact}
            description={t.dashboard.contactDescription}
          />

          <MiniCard
            number="03"
            title={t.dashboard.recover}
            description={t.dashboard.recoverDescription}
          />

        </section>

      </div>
    </Layout>
  );
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  accent = false,
  alert = false,
  alertLabel,
}) {
  return (
    <div
      className={[
        "rounded-[20px] border p-5",
        accent
          ? "border-[var(--lr-accent)]/20 bg-[var(--lr-accent-soft)]"
          : "border-[var(--lr-border)] bg-[var(--lr-card-solid)]",
      ].join(" ")}
    >

      <div className="flex items-start justify-between">

        <div
          className={[
            "flex h-9 w-9 items-center justify-center rounded-xl",
            accent
              ? "bg-[var(--lr-accent)] text-white"
              : "bg-[var(--lr-bg-soft)] text-[var(--lr-text-secondary)]",
          ].join(" ")}
        >
          <Icon size={16} />
        </div>

        {alert && (
          <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-1 text-[8px] font-bold text-red-500">

            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

            {alertLabel}

          </span>
        )}

      </div>

      <p className="mt-5 text-[10px] font-medium text-[var(--lr-text-muted)]">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold tracking-[-0.04em] text-[var(--lr-text)]">
        {value}
      </p>

      <p className="mt-1 text-[9px] text-[var(--lr-text-muted)]">
        {description}
      </p>

    </div>
  );
}

function MiniCard({
  number,
  title,
  description,
}) {
  return (
    <div className="flex gap-4 rounded-[20px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-5">

      <span className="text-[9px] font-bold text-[var(--lr-accent)]">
        {number}
      </span>

      <div>

        <p className="text-xs font-bold text-[var(--lr-text)]">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-5 text-[var(--lr-text-muted)]">
          {description}
        </p>

      </div>

    </div>
  );
}

export default Dashboard;