import {
  ArrowDownUp,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Filter,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import Layout from "../components/Layout";
import { useLeads } from "../context/LeadContext";
import { useLanguage } from "../context/LanguageContext";

const STATUS_VALUES = [
  "new",
  "contacted",
  "proposal",
  "follow-up",
  "won",
  "lost",
];

const SOURCE_OPTIONS = [
  "WhatsApp",
  "Instagram",
  "Web",
  "Email",
  "Referencia",
  "Otro",
];

const STATUS_STYLES = {
  new: {
    className:
      "bg-blue-500/10 text-blue-500 border-blue-500/10",
  },
  contacted: {
    className:
      "bg-gray-500/10 text-[var(--lr-text-secondary)] border-gray-500/10",
  },
  proposal: {
    className:
      "bg-purple-500/10 text-purple-500 border-purple-500/10",
  },
  "follow-up": {
    className:
      "bg-[var(--lr-accent-soft)] text-[var(--lr-accent)] border-[var(--lr-accent)]/10",
  },
  won: {
    className:
      "bg-emerald-500/10 text-emerald-500 border-emerald-500/10",
  },
  lost: {
    className:
      "bg-red-500/10 text-red-500 border-red-500/10",
  },
};

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
  ).format(Number(value || 0));
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
      year: "numeric",
    }
  ).format(new Date(`${date}T12:00:00`));
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

const EMPTY_FORM = {
  name: "",
  company: "",
  service: "",
  value: "",
  status: "new",
  source: "WhatsApp",
  lastContact: getToday(),
  nextFollowUp: getToday(),
  email: "",
  phone: "",
  notes: "",
};

function Leads() {
  const {
    leads,
    addLead,
    updateLead,
    deleteLead,
  } = useLeads();

  const { t, language } = useLanguage();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("value-desc");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filteredLeads = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    const result = leads.filter((lead) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          lead.name,
          lead.company,
          lead.service,
          lead.email,
          lead.phone,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(normalizedSearch)
          );

      const matchesStatus =
        statusFilter === "all" ||
        lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "value-desc") {
        return (
          Number(b.value || 0) -
          Number(a.value || 0)
        );
      }

      if (sortBy === "value-asc") {
        return (
          Number(a.value || 0) -
          Number(b.value || 0)
        );
      }

      if (sortBy === "newest") {
        return (
          new Date(`${b.createdAt}T12:00:00`) -
          new Date(`${a.createdAt}T12:00:00`)
        );
      }

      if (sortBy === "follow-up") {
        return (
          new Date(`${a.nextFollowUp}T12:00:00`) -
          new Date(`${b.nextFollowUp}T12:00:00`)
        );
      }

      return 0;
    });
  }, [leads, search, statusFilter, sortBy]);

  const totalValue = useMemo(() => {
    return filteredLeads
      .filter((lead) => lead.status !== "lost")
      .reduce(
        (total, lead) =>
          total + Number(lead.value || 0),
        0
      );
  }, [filteredLeads]);

  const hotCount = useMemo(() => {
    return filteredLeads.filter(
      (lead) =>
        lead.status === "proposal" ||
        lead.status === "follow-up"
    ).length;
  }, [filteredLeads]);

  const openCreate = () => {
    setEditingLead(null);

    setForm({
      ...EMPTY_FORM,
      lastContact: getToday(),
      nextFollowUp: getToday(),
    });

    setModalOpen(true);
  };

  const openEdit = (lead) => {
    setEditingLead(lead);

    setForm({
      name: lead.name || "",
      company: lead.company || "",
      service: lead.service || "",
      value: lead.value || "",
      status: lead.status || "new",
      source: lead.source || "Otro",
      lastContact:
        lead.lastContact || getToday(),
      nextFollowUp:
        lead.nextFollowUp || getToday(),
      email: lead.email || "",
      phone: lead.phone || "",
      notes: lead.notes || "",
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingLead(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    if (editingLead) {
      updateLead(editingLead.id, form);
    } else {
      addLead(form);
    }

    closeModal();
  };

  const handleDelete = (lead) => {
    const confirmed = window.confirm(
      `${t.leads.deleteConfirm} ${lead.name}?`
    );

    if (confirmed) {
      deleteLead(lead.id);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* HEADER */}

        <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>

            <div className="mb-3 flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lr-accent)]" />

              <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--lr-text-muted)]">
                {t.leads.management}
              </span>

            </div>

            <h2 className="text-3xl font-bold tracking-[-0.04em] text-[var(--lr-text)]">
              {t.leads.title}
            </h2>

            <p className="mt-2 max-w-xl text-[15px] leading-5 text-[var(--lr-text-secondary)]">
              {t.leads.description}
            </p>

          </div>

          <button
            type="button"
            onClick={openCreate}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--lr-text)] px-5 text-[15px] font-bold text-[var(--lr-bg)] shadow-sm hover:opacity-90"
          >
            <Plus size={16} />
            {t.common.newLead}
          </button>

        </section>

        {/* SUMMARY */}

        <section className="grid gap-3 sm:grid-cols-3">

          <SummaryCard
            icon={UserRound}
            label={t.leads.showing}
            value={filteredLeads.length}
            suffix={
              filteredLeads.length === 1
                ? t.leads.lead
                : t.leads.leads
            }
          />

          <SummaryCard
            icon={CircleDollarSign}
            label={t.leads.visibleValue}
            value={formatCurrency(
              totalValue,
              language
            )}
          />

          <SummaryCard
            icon={MessageCircle}
            label={t.leads.hotOpportunities}
            value={hotCount}
            suffix={t.leads.requireFollowUp}
            accent
          />

        </section>

        {/* TOOLBAR */}

        <section className="rounded-[22px] border border-[var(--lr-border)] bg-[var(--lr-card-solid)] p-3">

          <div className="flex flex-col gap-3 xl:flex-row">

            <div className="relative flex-1">

              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder={t.leads.searchPlaceholder}
                className="h-11 w-full rounded-xl border border-transparent bg-[var(--lr-bg-soft)] pl-10 pr-4 text-[15px] text-[var(--lr-text)] outline-none placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-accent)]/30"
              />

            </div>

            <div className="flex gap-2">

              <div className="relative flex-1 sm:flex-none">

                <Filter
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] pl-9 pr-9 text-[14px] font-semibold text-[var(--lr-text-secondary)] outline-none focus:border-[var(--lr-accent)]/30 sm:w-[170px]"
                >

                  <option value="all">
                    {t.leads.allStatuses}
                  </option>

                  {STATUS_VALUES.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {t.leads.statuses[status]}
                    </option>
                  ))}

                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
                />

              </div>

              <div className="relative flex-1 sm:flex-none">

                <ArrowDownUp
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
                />

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] pl-9 pr-9 text-[14px] font-semibold text-[var(--lr-text-secondary)] outline-none focus:border-[var(--lr-accent)]/30 sm:w-[170px]"
                >

                  <option value="value-desc">
                    {t.leads.sortHighestValue}
                  </option>

                  <option value="value-asc">
                    {t.leads.sortLowestValue}
                  </option>

                  <option value="newest">
                    {t.leads.sortNewest}
                  </option>

                  <option value="follow-up">
                    {t.leads.sortNextFollowUp}
                  </option>

                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
                />

              </div>

            </div>

          </div>

        </section>

        {/* LEADS */}

        {filteredLeads.length > 0 ? (

          <section className="grid gap-3 xl:grid-cols-2">

            {filteredLeads.map((lead) => (

              <LeadItem
                key={lead.id}
                lead={lead}
                onEdit={openEdit}
                onDelete={handleDelete}
                language={language}
                t={t}
              />

            ))}

          </section>

        ) : (

          <EmptyLeads
            hasFilters={
              Boolean(search.trim()) ||
              statusFilter !== "all"
            }
            onCreate={openCreate}
            onClear={() => {
              setSearch("");
              setStatusFilter("all");
            }}
            t={t}
          />

        )}

      </div>

      {/* MODAL */}

      {modalOpen && (

        <LeadModal
          form={form}
          editingLead={editingLead}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
          t={t}
        />

      )}

    </Layout>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  suffix,
  accent = false,
}) {
  return (
    <div
      className={[
        "rounded-[20px] border p-4",
        accent
          ? "border-[var(--lr-accent)]/15 bg-[var(--lr-accent-soft)]"
          : "border-[var(--lr-border)] bg-[var(--lr-card-solid)]",
      ].join(" ")}
    >

      <div className="flex items-center gap-3">

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

        <div>

          <p className="text-[12px] font-medium text-[var(--lr-text-muted)]">
            {label}
          </p>

          <div className="mt-0.5 flex items-baseline gap-1.5">

            <span className="text-lg font-bold tracking-[-0.03em] text-[var(--lr-text)]">
              {value}
            </span>

            {suffix && (
              <span className="text-[12px] text-[var(--lr-text-muted)]">
                {suffix}
              </span>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

function LeadItem({
  lead,
  onEdit,
  onDelete,
  language,
  t,
}) {
  const status =
    STATUS_STYLES[lead.status] ||
    STATUS_STYLES.new;

  const today = getToday();

  const isDue =
    lead.nextFollowUp &&
    lead.nextFollowUp <= today &&
    lead.status !== "won" &&
    lead.status !== "lost";

  return (
    <article className="group overflow-hidden rounded-[22px] border border-[var(--lr-border)] bg-[var(--lr-card-solid)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--lr-border-strong)] hover:shadow-xl hover:shadow-black/5">

      <div className="p-5">

        <div className="flex items-start gap-4">

          {/* AVATAR */}

          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[var(--lr-bg-soft)] text-[13px] font-bold text-[var(--lr-text-secondary)]">

            {getInitials(lead.name)}

            {(lead.status === "proposal" ||
              lead.status === "follow-up") && (

              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--lr-card-solid)] bg-[var(--lr-accent)]" />

            )}

          </div>

          {/* INFO */}

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="truncate text-sm font-bold text-[var(--lr-text)]">
                {lead.name}
              </h3>

              <span
                className={[
                  "rounded-full border px-2 py-0.5 text-[12px] font-bold",
                  status.className,
                ].join(" ")}
              >
                {t.leads.statuses[lead.status] ||
                  t.leads.statuses.new}
              </span>

            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">

              {lead.company && (
                <span className="flex items-center gap-1 text-[12px] text-[var(--lr-text-muted)]">

                  <BriefcaseBusiness size={11} />

                  {lead.company}

                </span>
              )}

              {lead.service && (
                <span className="text-[12px] text-[var(--lr-text-muted)]">
                  {lead.service}
                </span>
              )}

            </div>

          </div>

          {/* VALUE */}

          <div className="shrink-0 text-right">

            <p className="text-base font-bold tracking-[-0.025em] text-[var(--lr-text)]">
              {formatCurrency(
                lead.value,
                language
              )}
            </p>

            <p className="mt-0.5 text-[12px] uppercase tracking-[0.08em] text-[var(--lr-text-muted)]">
              {t.leads.opportunity}
            </p>

          </div>

        </div>

        {/* DETAILS */}

        <div className="mt-5 grid gap-2 border-t border-[var(--lr-border)] pt-4 sm:grid-cols-3">

          <InfoItem
            icon={CalendarDays}
            label={t.leads.followUp}
            value={
              lead.nextFollowUp
                ? formatDate(
                    lead.nextFollowUp,
                    language
                  )
                : t.leads.noDate
            }
            danger={isDue}
          />

          <InfoItem
            icon={MessageCircle}
            label={t.leads.source}
            value={
              lead.source
                ? getSourceLabel(
                    lead.source,
                    t
                  )
                : getSourceLabel(
                    "Otro",
                    t
                  )
            }
          />

          <InfoItem
            icon={Clock3}
            label={t.leads.lastContact}
            value={
              lead.lastContact
                ? formatDate(
                    lead.lastContact,
                    language
                  )
                : t.leads.noRecord
            }
          />

        </div>

        {/* ACTIONS */}

        <div className="mt-4 flex flex-wrap items-center gap-2">

          <button
            type="button"
            onClick={() => onEdit(lead)}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-[var(--lr-text)] px-3 text-[12px] font-bold text-[var(--lr-bg)] hover:opacity-90"
          >
            <Pencil size={12} />
            {t.leads.edit}
          </button>

          <button
            type="button"
            onClick={() => onEdit(lead)}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[var(--lr-border)] bg-[var(--lr-card)] px-3 text-[12px] font-semibold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-card-hover)] hover:text-[var(--lr-text)]"
          >
            {t.leads.viewDetails}
            <ArrowRight size={11} />
          </button>

          <div className="ml-auto flex items-center gap-1.5">

            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                onClick={(event) =>
                  event.stopPropagation()
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--lr-border)] bg-[var(--lr-card)] text-[var(--lr-text-muted)] hover:text-[var(--lr-text)]"
                title={t.leads.call}
              >
                <Phone size={13} />
              </a>
            )}

            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                onClick={(event) =>
                  event.stopPropagation()
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--lr-border)] bg-[var(--lr-card)] text-[var(--lr-text-muted)] hover:text-[var(--lr-text)]"
                title={t.leads.email}
              >
                <Mail size={13} />
              </a>
            )}

            <button
              type="button"
              onClick={() => onDelete(lead)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[var(--lr-text-muted)] hover:border-red-500/10 hover:bg-red-500/10 hover:text-red-500"
              title={t.leads.delete}
            >
              <Trash2 size={13} />
            </button>

          </div>

        </div>

      </div>

    </article>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  danger = false,
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-[var(--lr-bg-soft)] px-3 py-2.5">

      <Icon
        size={13}
        className={
          danger
            ? "text-red-500"
            : "text-[var(--lr-text-muted)]"
        }
      />

      <div className="min-w-0">

        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--lr-text-muted)]">
          {label}
        </p>

        <p
          className={[
            "mt-0.5 truncate text-[12px] font-semibold",
            danger
              ? "text-red-500"
              : "text-[var(--lr-text-secondary)]",
          ].join(" ")}
        >
          {value}
        </p>

      </div>

    </div>
  );
}

function EmptyLeads({
  hasFilters,
  onCreate,
  onClear,
  t,
}) {
  return (
    <section className="flex min-h-[360px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[var(--lr-border)] bg-[var(--lr-card-solid)] px-6 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]">
        <UserRound size={23} />
      </div>

      <h3 className="mt-5 text-sm font-bold text-[var(--lr-text)]">
        {hasFilters
          ? t.leads.noLeadsFound
          : t.leads.emptyPipeline}
      </h3>

      <p className="mt-2 max-w-sm text-[14px] leading-5 text-[var(--lr-text-muted)]">
        {hasFilters
          ? t.leads.noLeadsFoundDescription
          : t.leads.emptyPipelineDescription}
      </p>

      {hasFilters ? (

        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] px-4 py-2.5 text-[13px] font-bold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-card-hover)]"
        >
          {t.leads.clearFilters}
        </button>

      ) : (

        <button
          type="button"
          onClick={onCreate}
          className="mt-5 flex items-center gap-2 rounded-xl bg-[var(--lr-text)] px-4 py-2.5 text-[13px] font-bold text-[var(--lr-bg)] hover:opacity-90"
        >
          <Plus size={13} />
          {t.leads.addFirstLead}
        </button>

      )}

    </section>
  );
}

function LeadModal({
  form,
  editingLead,
  onChange,
  onSubmit,
  onClose,
  t,
}) {
  const statusOptions = STATUS_VALUES.map(
    (value) => ({
      value,
      label: t.leads.statuses[value],
    })
  );

  const sourceOptions = SOURCE_OPTIONS.map(
    (source) => ({
      value: source,
      label: getSourceLabel(source, t),
    })
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">

      <div className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-[26px] border border-[var(--lr-border)] bg-[var(--lr-card-solid)] shadow-2xl shadow-black/30">

        {/* MODAL HEADER */}

        <div className="flex items-center justify-between border-b border-[var(--lr-border)] px-5 py-4 sm:px-6">

          <div>

            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--lr-accent)]">
              {editingLead
                ? t.leads.editOpportunity
                : t.leads.newOpportunity}
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-[-0.03em] text-[var(--lr-text)]">
              {editingLead
                ? editingLead.name
                : t.leads.addLead}
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--lr-border)] text-[var(--lr-text-muted)] hover:bg-[var(--lr-card)] hover:text-[var(--lr-text)]"
          >
            <X size={17} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={onSubmit}
          className="max-h-[calc(92vh-78px)] overflow-y-auto p-5 sm:p-6"
        >

          <div className="grid gap-4 sm:grid-cols-2">

            <Field
              label={t.leads.fields.name}
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder={t.leads.placeholders.name}
              required
            />

            <Field
              label={t.leads.fields.company}
              name="company"
              value={form.company}
              onChange={onChange}
              placeholder={t.leads.placeholders.company}
            />

            <Field
              label={t.leads.fields.service}
              name="service"
              value={form.service}
              onChange={onChange}
              placeholder={t.leads.placeholders.service}
            />

            <Field
              label={t.leads.fields.value}
              name="value"
              value={form.value}
              onChange={onChange}
              placeholder={t.leads.placeholders.value}
              type="number"
              min="0"
              icon="€"
            />

            <SelectField
              label={t.leads.fields.status}
              name="status"
              value={form.status}
              onChange={onChange}
              options={statusOptions}
            />

            <SelectField
              label={t.leads.fields.source}
              name="source"
              value={form.source}
              onChange={onChange}
              options={sourceOptions}
            />

            <Field
              label={t.leads.fields.lastContact}
              name="lastContact"
              value={form.lastContact}
              onChange={onChange}
              type="date"
            />

            <Field
              label={t.leads.fields.nextFollowUp}
              name="nextFollowUp"
              value={form.nextFollowUp}
              onChange={onChange}
              type="date"
            />

            <Field
              label={t.leads.fields.email}
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder={t.leads.placeholders.email}
              type="email"
            />

            <Field
              label={t.leads.fields.phone}
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder={t.leads.placeholders.phone}
            />

          </div>

          <div className="mt-4">

            <label className="block">

              <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--lr-text-secondary)]">
                {t.leads.fields.notes}
              </span>

              <textarea
                name="notes"
                value={form.notes}
                onChange={onChange}
                rows={4}
                placeholder={t.leads.placeholders.notes}
                className="w-full resize-none rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-3.5 py-3 text-[15px] text-[var(--lr-text)] outline-none placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-accent)]/40"
              />

            </label>

          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] px-5 text-[13px] font-bold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-card-hover)]"
            >
              {t.common.cancel}
            </button>

            <button
              type="submit"
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--lr-text)] px-5 text-[13px] font-bold text-[var(--lr-bg)] hover:opacity-90"
            >
              <Check size={14} />

              {editingLead
                ? t.leads.saveChanges
                : t.leads.createLead}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
  icon,
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--lr-text-secondary)]">
        {label}
      </span>

      <div className="relative">

        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] font-bold text-[var(--lr-text-muted)]">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          className={[
            "h-10 w-full rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-3.5 text-[15px] text-[var(--lr-text)] outline-none placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-accent)]/40",
            icon ? "pl-8" : "",
          ].join(" ")}
        />

      </div>

    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--lr-text-secondary)]">
        {label}
      </span>

      <div className="relative">

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="h-10 w-full appearance-none rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-3.5 pr-9 text-[15px] text-[var(--lr-text)] outline-none focus:border-[var(--lr-accent)]/40"
        >

          {options.map((option) => (

            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>

          ))}

        </select>

        <ChevronDown
          size={13}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
        />

      </div>

    </label>
  );
}

function getSourceLabel(source, t) {
  const sourceMap = {
    WhatsApp: t.leads.sources.whatsapp,
    Instagram: t.leads.sources.instagram,
    Web: t.leads.sources.web,
    Email: t.leads.sources.email,
    Referencia: t.leads.sources.referral,
    Otro: t.leads.sources.other,
  };

  return sourceMap[source] || source;
}

export default Leads;