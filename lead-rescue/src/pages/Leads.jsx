import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Edit3,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";

import Layout from "../components/Layout";
import { useLeads } from "../context/LeadContext";
import { useLanguage } from "../context/LanguageContext";

const STATUS_OPTIONS = [
  {
    value: "new",
    label: "Nuevo",
  },
  {
    value: "contacted",
    label: "Contactado",
  },
  {
    value: "follow-up",
    label: "Follow-up",
  },
  {
    value: "proposal",
    label: "Propuesta",
  },
  {
    value: "won",
    label: "Ganado",
  },
  {
    value: "lost",
    label: "Perdido",
  },
];

const SOURCE_OPTIONS = [
  "Instagram",
  "LinkedIn",
  "Web",
  "Referido",
  "Email",
  "Otro",
];

function formatCurrency(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
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

function getStatusStyles(status) {
  switch (status) {
    case "won":
      return "bg-emerald-500/10 text-emerald-500";

    case "lost":
      return "bg-red-500/10 text-red-500";

    case "proposal":
      return "bg-purple-500/10 text-purple-500";

    case "follow-up":
      return "bg-amber-500/10 text-amber-500";

    case "contacted":
      return "bg-blue-500/10 text-blue-500";

    default:
      return "bg-[var(--lr-bg-soft)] text-[var(--lr-text-secondary)]";
  }
}

function getStatusLabel(status) {
  return (
    STATUS_OPTIONS.find(
      (option) => option.value === status
    )?.label || status
  );
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function Leads() {
  const { leads, addLead, updateLead, deleteLead } =
    useLeads();

  const { language } = useLanguage();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [sourceFilter, setSourceFilter] =
    useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [selectedLead, setSelectedLead] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    service: "",
    value: "",
    status: "new",
    source: "Otro",
    lastContact: getToday(),
    nextFollowUp: getToday(),
    email: "",
    phone: "",
    notes: "",
  });

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    const normalizedSearch =
      search.trim().toLowerCase();

    if (normalizedSearch) {
      result = result.filter((lead) =>
        [
          lead.name,
          lead.company,
          lead.service,
          lead.email,
          lead.phone,
          lead.source,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(normalizedSearch)
          )
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (lead) => lead.status === statusFilter
      );
    }

    if (sourceFilter !== "all") {
      result = result.filter(
        (lead) => lead.source === sourceFilter
      );
    }

    result.sort((a, b) => {
      if (sortBy === "value-high") {
        return (
          Number(b.value || 0) -
          Number(a.value || 0)
        );
      }

      if (sortBy === "value-low") {
        return (
          Number(a.value || 0) -
          Number(b.value || 0)
        );
      }

      if (sortBy === "name") {
        return String(a.name || "").localeCompare(
          String(b.name || "")
        );
      }

      if (sortBy === "follow-up") {
        return String(
          a.nextFollowUp || "9999-12-31"
        ).localeCompare(
          String(b.nextFollowUp || "9999-12-31")
        );
      }

      return String(b.createdAt || "").localeCompare(
        String(a.createdAt || "")
      );
    });

    return result;
  }, [
    leads,
    search,
    statusFilter,
    sourceFilter,
    sortBy,
  ]);

  const openCreateModal = () => {
    setEditingLead(null);

    setForm({
      name: "",
      company: "",
      service: "",
      value: "",
      status: "new",
      source: "Otro",
      lastContact: getToday(),
      nextFollowUp: getToday(),
      email: "",
      phone: "",
      notes: "",
    });

    setShowModal(true);
  };

  const openEditModal = (lead) => {
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

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingLead(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    if (editingLead) {
      updateLead(editingLead.id, {
        ...form,
        value: Number(form.value) || 0,
      });
    } else {
      addLead({
        ...form,
        value: Number(form.value) || 0,
      });
    }

    closeModal();
  };

  const handleDelete = (lead) => {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar a ${lead.name}?`
    );

    if (!confirmed) {
      return;
    }

    deleteLead(lead.id);

    if (selectedLead?.id === lead.id) {
      setSelectedLead(null);
    }
  };

  const totalPipeline = leads
    .filter((lead) => lead.status !== "lost")
    .reduce(
      (total, lead) =>
        total + Number(lead.value || 0),
      0
    );

  const wonValue = leads
    .filter((lead) => lead.status === "won")
    .reduce(
      (total, lead) =>
        total + Number(lead.value || 0),
      0
    );

  const activeLeads = leads.filter(
    (lead) =>
      lead.status !== "won" &&
      lead.status !== "lost"
  ).length;

  return (
    <Layout>
      <div className="space-y-7">

        {/* HEADER */}

        <section className="relative overflow-hidden rounded-[28px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)] sm:p-8">

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--lr-accent)]/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--lr-accent)]">
                <User size={14} />
                Lead management
              </div>

              <h1 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[var(--lr-text)]">
                Tus leads
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--lr-text-secondary)]">
                Gestiona tus oportunidades y mantén
                cada conversación bajo control.
              </p>

            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--lr-text)] px-5 text-xs font-bold text-[var(--lr-bg)] shadow-lg shadow-black/10 transition hover:-translate-y-0.5"
            >
              <Plus size={16} />
              Añadir lead
            </button>

          </div>

          {/* STATS */}

          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">

            <Metric
              label="Total leads"
              value={leads.length}
              icon={User}
            />

            <Metric
              label="Activos"
              value={activeLeads}
              icon={Clock3}
            />

            <Metric
              label="Pipeline"
              value={formatCurrency(totalPipeline)}
              icon={CircleDollarSign}
            />

          </div>

        </section>

        {/* FILTERS */}

        <section className="rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-card)] p-4">

          <div className="flex flex-col gap-3 lg:flex-row">

            <div className="relative min-w-0 flex-1">

              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Buscar por nombre, empresa, email..."
                className="h-11 w-full rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] pl-11 pr-4 text-xs text-[var(--lr-text)] outline-none transition placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-border-strong)]"
              />

            </div>

            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              icon={Filter}
              options={[
                {
                  value: "all",
                  label: "Todos los estados",
                },
                ...STATUS_OPTIONS,
              ]}
            />

            <Select
              value={sourceFilter}
              onChange={setSourceFilter}
              icon={Building2}
              options={[
                {
                  value: "all",
                  label: "Todas las fuentes",
                },
                ...SOURCE_OPTIONS.map((source) => ({
                  value: source,
                  label: source,
                })),
              ]}
            />

            <Select
              value={sortBy}
              onChange={setSortBy}
              icon={ArrowDownUp}
              options={[
                {
                  value: "newest",
                  label: "Más recientes",
                },
                {
                  value: "value-high",
                  label: "Mayor valor",
                },
                {
                  value: "value-low",
                  label: "Menor valor",
                },
                {
                  value: "follow-up",
                  label: "Próximo follow-up",
                },
                {
                  value: "name",
                  label: "Nombre",
                },
              ]}
            />

          </div>

        </section>

        {/* LIST */}

        <section className="space-y-3">

          {filteredLeads.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-[var(--lr-border)] bg-[var(--lr-card)] px-6 py-14 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--lr-bg-soft)] text-[var(--lr-text-muted)]">
                <User size={20} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-[var(--lr-text)]">
                No hay leads
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[var(--lr-text-secondary)]">
                {leads.length === 0
                  ? "Añade tu primer lead para empezar a gestionar tu pipeline."
                  : "No encontramos leads que coincidan con tus filtros."}
              </p>

              {leads.length === 0 && (
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--lr-text)] px-4 text-xs font-bold text-[var(--lr-bg)]"
                >
                  <Plus size={15} />
                  Añadir lead
                </button>
              )}

            </div>

          ) : (

            filteredLeads.map((lead) => (
              <LeadItem
                key={lead.id}
                lead={lead}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onView={setSelectedLead}
              />
            ))

          )}

        </section>

        {/* WON VALUE */}

        {wonValue > 0 && (
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Check size={17} />
              </div>

              <div>
                <p className="text-xs font-bold text-[var(--lr-text)]">
                  Revenue ganado
                </p>

                <p className="mt-0.5 text-[11px] text-[var(--lr-text-secondary)]">
                  {formatCurrency(wonValue)} en
                  oportunidades cerradas.
                </p>
              </div>

            </div>

          </section>
        )}

      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-[var(--lr-border)] bg-[var(--lr-card)] shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--lr-border)] bg-[var(--lr-card)] px-6 py-5">

              <div>

                <h2 className="text-lg font-black tracking-[-0.025em] text-[var(--lr-text)]">
                  {editingLead
                    ? "Editar lead"
                    : "Nuevo lead"}
                </h2>

                <p className="mt-1 text-[11px] text-[var(--lr-text-muted)]">
                  Completa la información de la
                  oportunidad.
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--lr-text-muted)] hover:bg-[var(--lr-bg-soft)] hover:text-[var(--lr-text)]"
              >
                <X size={18} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              <div className="grid gap-4 sm:grid-cols-2">

                <Input
                  label="Nombre"
                  required
                  value={form.name}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      name: value,
                    }))
                  }
                  placeholder="Ej. Ana García"
                />

                <Input
                  label="Empresa"
                  value={form.company}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      company: value,
                    }))
                  }
                  placeholder="Ej. Acme"
                />

                <Input
                  label="Servicio"
                  value={form.service}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      service: value,
                    }))
                  }
                  placeholder="Ej. Gestión de redes"
                />

                <Input
                  label="Valor"
                  type="number"
                  value={form.value}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      value,
                    }))
                  }
                  placeholder="2500"
                />

                <SelectField
                  label="Estado"
                  value={form.status}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      status: value,
                    }))
                  }
                  options={STATUS_OPTIONS}
                />

                <SelectField
                  label="Fuente"
                  value={form.source}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      source: value,
                    }))
                  }
                  options={SOURCE_OPTIONS.map((source) => ({
                    value: source,
                    label: source,
                  }))}
                />

                <Input
                  label="Último contacto"
                  type="date"
                  value={form.lastContact}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      lastContact: value,
                    }))
                  }
                />

                <Input
                  label="Próximo follow-up"
                  type="date"
                  value={form.nextFollowUp}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      nextFollowUp: value,
                    }))
                  }
                />

                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      email: value,
                    }))
                  }
                  placeholder="cliente@email.com"
                />

                <Input
                  label="Teléfono"
                  value={form.phone}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      phone: value,
                    }))
                  }
                  placeholder="+34..."
                />

              </div>

              <div>

                <label className="mb-2 block text-[11px] font-bold text-[var(--lr-text-secondary)]">
                  Notas
                </label>

                <textarea
                  value={form.notes}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Información importante sobre este lead..."
                  className="w-full resize-none rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-4 py-3 text-xs text-[var(--lr-text)] outline-none placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-border-strong)]"
                />

              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 rounded-xl border border-[var(--lr-border)] px-5 text-xs font-bold text-[var(--lr-text-secondary)] hover:bg-[var(--lr-bg-soft)]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="h-11 rounded-xl bg-[var(--lr-text)] px-6 text-xs font-bold text-[var(--lr-bg)]"
                >
                  {editingLead
                    ? "Guardar cambios"
                    : "Crear lead"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* DETAILS */}

      {selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-[28px] border border-[var(--lr-border)] bg-[var(--lr-card)] shadow-2xl">

            <div className="flex items-center justify-between border-b border-[var(--lr-border)] px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--lr-bg-soft)] text-xs font-black text-[var(--lr-text-secondary)]">
                  {getInitials(selectedLead.name)}
                </div>

                <div>

                  <h2 className="text-sm font-black text-[var(--lr-text)]">
                    {selectedLead.name}
                  </h2>

                  <p className="mt-0.5 text-[11px] text-[var(--lr-text-muted)]">
                    {selectedLead.company ||
                      "Sin empresa"}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--lr-text-muted)] hover:bg-[var(--lr-bg-soft)]"
              >
                <X size={18} />
              </button>

            </div>

            <div className="space-y-5 p-6">

              <div className="flex items-center justify-between">

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold ${getStatusStyles(
                    selectedLead.status
                  )}`}
                >
                  {getStatusLabel(
                    selectedLead.status
                  )}
                </span>

                <span className="text-xl font-black tracking-[-0.03em] text-[var(--lr-text)]">
                  {formatCurrency(
                    selectedLead.value
                  )}
                </span>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                <Detail
                  icon={Building2}
                  label="Servicio"
                  value={
                    selectedLead.service ||
                    "Sin servicio"
                  }
                />

                <Detail
                  icon={Building2}
                  label="Fuente"
                  value={
                    selectedLead.source ||
                    "Sin fuente"
                  }
                />

                <Detail
                  icon={Mail}
                  label="Email"
                  value={
                    selectedLead.email ||
                    "Sin email"
                  }
                />

                <Detail
                  icon={Phone}
                  label="Teléfono"
                  value={
                    selectedLead.phone ||
                    "Sin teléfono"
                  }
                />

                <Detail
                  icon={CalendarDays}
                  label="Último contacto"
                  value={formatDate(
                    selectedLead.lastContact
                  )}
                />

                <Detail
                  icon={Clock3}
                  label="Próximo follow-up"
                  value={formatDate(
                    selectedLead.nextFollowUp
                  )}
                />

              </div>

              {selectedLead.notes && (
                <div className="rounded-2xl bg-[var(--lr-bg-soft)] p-4">

                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--lr-text-muted)]">
                    Notas
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[var(--lr-text-secondary)]">
                    {selectedLead.notes}
                  </p>

                </div>
              )}

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={() => {
                    setSelectedLead(null);
                    openEditModal(selectedLead);
                  }}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--lr-text)] text-xs font-bold text-[var(--lr-bg)]"
                >
                  <Edit3 size={15} />
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(selectedLead)
                  }
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 text-xs font-bold text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 size={15} />
                  Eliminar
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </Layout>
  );
}

function LeadItem({
  lead,
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <article className="group rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-card)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5 sm:p-5">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">

        <div className="flex min-w-0 flex-1 items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--lr-bg-soft)] text-xs font-black text-[var(--lr-text-secondary)]">
            {getInitials(lead.name)}
          </div>

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="truncate text-sm font-bold text-[var(--lr-text)]">
                {lead.name}
              </h3>

              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${getStatusStyles(
                  lead.status
                )}`}
              >
                {getStatusLabel(lead.status)}
              </span>

            </div>

            <p className="mt-1 truncate text-xs text-[var(--lr-text-secondary)]">
              {lead.service ||
                "Sin servicio"}

              {lead.company
                ? ` · ${lead.company}`
                : ""}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">

              <span className="text-[10px] text-[var(--lr-text-muted)]">
                {lead.source || "Sin fuente"}
              </span>

              {lead.nextFollowUp && (
                <span className="flex items-center gap-1 text-[10px] text-[var(--lr-text-muted)]">
                  <CalendarDays size={11} />
                  {formatDate(
                    lead.nextFollowUp
                  )}
                </span>
              )}

            </div>

          </div>

        </div>

        <div className="flex items-center justify-between gap-4 xl:w-[250px] xl:justify-end">

          <div className="text-left xl:text-right">

            <p className="text-sm font-black tracking-[-0.02em] text-[var(--lr-text)]">
              {formatCurrency(lead.value)}
            </p>

            <p className="mt-0.5 text-[10px] text-[var(--lr-text-muted)]">
              {lead.email || "Sin email"}
            </p>

          </div>

          <div className="flex items-center gap-1">

            <button
              type="button"
              onClick={() => onView(lead)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--lr-text-muted)] hover:bg-[var(--lr-bg-soft)] hover:text-[var(--lr-text)]"
              title="Ver detalles"
            >
              <MoreHorizontal size={16} />
            </button>

            <button
              type="button"
              onClick={() => onEdit(lead)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--lr-text-muted)] hover:bg-[var(--lr-bg-soft)] hover:text-[var(--lr-text)]"
              title="Editar"
            >
              <Edit3 size={15} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(lead)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--lr-text-muted)] hover:bg-red-500/10 hover:text-red-500"
              title="Eliminar"
            >
              <Trash2 size={15} />
            </button>

          </div>

        </div>

      </div>

    </article>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-4">

      <div className="flex items-center justify-between gap-3">

        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--lr-text-muted)]">
          {label}
        </p>

        <Icon
          size={15}
          className="text-[var(--lr-text-muted)]"
        />

      </div>

      <p className="mt-3 text-xl font-black tracking-[-0.035em] text-[var(--lr-text)]">
        {value}
      </p>

    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  icon: Icon,
}) {
  return (
    <div className="relative">

      <Icon
        size={14}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
      />

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 min-w-[170px] appearance-none rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] pl-9 pr-9 text-xs font-semibold text-[var(--lr-text)] outline-none focus:border-[var(--lr-border-strong)]"
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
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
      />

    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) {
  return (
    <div>

      <label className="mb-2 block text-[11px] font-bold text-[var(--lr-text-secondary)]">
        {label}
        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-4 text-xs text-[var(--lr-text)] outline-none placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-border-strong)]"
      />

    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="mb-2 block text-[11px] font-bold text-[var(--lr-text-secondary)]">
        {label}
      </label>

      <div className="relative">

        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-11 w-full appearance-none rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-4 pr-10 text-xs text-[var(--lr-text)] outline-none focus:border-[var(--lr-border-strong)]"
        >
          {options.map((option) => {
            const item =
              typeof option === "string"
                ? {
                    value: option,
                    label: option,
                  }
                : option;

            return (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            );
          })}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
        />

      </div>

    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-[var(--lr-bg-soft)] p-4">

      <div className="flex items-center gap-2 text-[var(--lr-text-muted)]">

        <Icon size={13} />

        <span className="text-[9px] font-bold uppercase tracking-[0.08em]">
          {label}
        </span>

      </div>

      <p className="mt-2 truncate text-xs font-semibold text-[var(--lr-text)]">
        {value}
      </p>

    </div>
  );
}

export default Leads;