import { useMemo, useState } from "react";
import {
  Check,
  Clipboard,
  Copy,
  MessageCircle,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import { useLeads } from "../context/LeadContext";
import { allMessages, messageCategories } from "../data/messages";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Messages() {
  const { leads, isDemo } = useLeads();
  const location = useLocation();
  const navigate = useNavigate();

  const basePath = isDemo ? "/demo" : "/app";

  const [selectedLeadId, setSelectedLeadId] = useState(
    location.state?.leadId || leads[0]?.id || ""
  );

  const [selectedMessageId, setSelectedMessageId] =
    useState(allMessages[0]?.id || "");

  const [search, setSearch] = useState("");
  const [leadSearch, setLeadSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedLead = useMemo(
    () =>
      leads.find(
        (lead) => lead.id === selectedLeadId
      ) || null,
    [leads, selectedLeadId]
  );

  const selectedMessage = useMemo(
    () =>
      allMessages.find(
        (message) =>
          message.id === selectedMessageId
      ) || allMessages[0],
    [selectedMessageId]
  );

  const filteredLeads = useMemo(() => {
    const normalized = leadSearch.trim().toLowerCase();

    if (!normalized) return leads;

    return leads.filter((lead) => {
      return (
        lead.name?.toLowerCase().includes(normalized) ||
        lead.company?.toLowerCase().includes(normalized) ||
        lead.service?.toLowerCase().includes(normalized)
      );
    });
  }, [leads, leadSearch]);

  const visibleCategories = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) {
      return messageCategories;
    }

    return messageCategories
      .map((category) => ({
        ...category,
        messages: category.messages.filter(
          (message) =>
            message.title
              .toLowerCase()
              .includes(normalized) ||
            message.text
              .toLowerCase()
              .includes(normalized) ||
            category.title
              .toLowerCase()
              .includes(normalized)
        ),
      }))
      .filter(
        (category) => category.messages.length > 0
      );
  }, [search]);

  const personalizedMessage = useMemo(() => {
    if (!selectedMessage) return "";

    let message = selectedMessage.text;

    const replacements = {
      "{{nombre}}":
        selectedLead?.name?.split(" ")[0] ||
        "nombre",
      "{{servicio}}":
        selectedLead?.service || "el servicio",
      "{{empresa}}":
        selectedLead?.company || "nuestro servicio",
    };

    Object.entries(replacements).forEach(
      ([variable, value]) => {
        message = message.replaceAll(
          variable,
          value
        );
      }
    );

    return message;
  }, [selectedMessage, selectedLead]);

  const copyMessage = async () => {
    if (!selectedLead || !personalizedMessage) return;

    try {
      await navigator.clipboard.writeText(
        personalizedMessage
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error(
        "No se pudo copiar el mensaje:",
        error
      );
    }
  };

  return (
    <Layout>
      <div className="space-y-7">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[28px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--lr-accent)]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--lr-accent)]">
              <Sparkles size={14} />
              Message engine
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-[var(--lr-text)] sm:text-3xl">
              No pienses qué decir.
              <br />
              <span className="text-[var(--lr-text-secondary)]">
                Escríbelo y envíalo.
              </span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--lr-text-secondary)]">
              Selecciona un lead, elige la situación y
              Lead Rescue prepara un mensaje personalizado
              listo para enviar.
            </p>
          </div>

          <div className="relative mt-7 flex flex-wrap items-center gap-3">
            <Step
              number="01"
              label="Selecciona un lead"
              active={Boolean(selectedLead)}
            />

            <div className="hidden h-px w-8 bg-[var(--lr-border)] sm:block" />

            <Step
              number="02"
              label="Elige una situación"
              active={Boolean(selectedMessage)}
            />

            <div className="hidden h-px w-8 bg-[var(--lr-border)] sm:block" />

            <Step
              number="03"
              label="Copia y contacta"
              active={copied}
            />
          </div>
        </section>

        {/* WORKSPACE */}
        <section className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* LEADS */}
          <aside className="overflow-hidden rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-card)]">
            <div className="border-b border-[var(--lr-border)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-[var(--lr-text)]">
                    01 · Lead
                  </p>

                  <p className="mt-1 text-[10px] text-[var(--lr-text-muted)]">
                    ¿Con quién quieres hablar?
                  </p>
                </div>

                <span className="rounded-full bg-[var(--lr-accent-soft)] px-2 py-1 text-[9px] font-bold text-[var(--lr-accent)]">
                  {leads.length}
                </span>
              </div>

              <div className="relative mt-4">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
                />

                <input
                  value={leadSearch}
                  onChange={(event) =>
                    setLeadSearch(event.target.value)
                  }
                  placeholder="Buscar lead..."
                  className="h-10 w-full rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] pl-9 pr-3 text-xs text-[var(--lr-text)] outline-none placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-accent)]"
                />
              </div>
            </div>

            <div className="max-h-[430px] overflow-y-auto p-2.5">
              {filteredLeads.length > 0 ? (
                <div className="space-y-1">
                  {filteredLeads.map((lead) => {
                    const active =
                      selectedLeadId === lead.id;

                    return (
                      <button
                        key={lead.id}
                        type="button"
                        onClick={() =>
                          setSelectedLeadId(lead.id)
                        }
                        className={[
                          "group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all",
                          active
                            ? "bg-[var(--lr-text)] shadow-md"
                            : "hover:bg-[var(--lr-bg-soft)]",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-black",
                            active
                              ? "bg-white/10 text-white"
                              : "bg-[var(--lr-bg-soft)] text-[var(--lr-text-secondary)]",
                          ].join(" ")}
                        >
                          {getInitials(lead.name)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className={[
                              "truncate text-xs font-bold",
                              active
                                ? "text-white"
                                : "text-[var(--lr-text)]",
                            ].join(" ")}
                          >
                            {lead.name}
                          </p>

                          <p
                            className={[
                              "mt-0.5 truncate text-[10px]",
                              active
                                ? "text-white/45"
                                : "text-[var(--lr-text-muted)]",
                            ].join(" ")}
                          >
                            {lead.service ||
                              lead.company ||
                              "Sin servicio"}
                          </p>
                        </div>

                        {active && (
                          <Check
                            size={14}
                            className="shrink-0 text-white"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <UserRound
                    size={20}
                    className="mx-auto text-[var(--lr-text-muted)]"
                  />

                  <p className="mt-3 text-xs font-bold text-[var(--lr-text)]">
                    No encontramos ese lead
                  </p>

                  <p className="mt-1 text-[10px] text-[var(--lr-text-muted)]">
                    Prueba con otro nombre.
                  </p>
                </div>
              )}
            </div>

            {/* SELECTED LEAD */}
            {selectedLead && (
              <div className="border-t border-[var(--lr-border)] p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--lr-text-muted)]">
                  Conversación
                </p>

                <div className="mt-2 rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--lr-accent-soft)] text-[9px] font-black text-[var(--lr-accent)]">
                      {getInitials(selectedLead.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-[var(--lr-text)]">
                        {selectedLead.name}
                      </p>

                      <p className="truncate text-[10px] text-[var(--lr-text-muted)]">
                        {selectedLead.company ||
                          selectedLead.service ||
                          "Lead"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* MAIN */}
          <div className="min-w-0 space-y-5">
            {/* MESSAGE TYPES */}
            <section className="overflow-hidden rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-card)]">
              <div className="flex flex-col gap-4 border-b border-[var(--lr-border)] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]">
                      <MessageCircle size={14} />
                    </div>

                    <p className="text-xs font-bold text-[var(--lr-text)]">
                      02 · Situación
                    </p>
                  </div>

                  <p className="mt-2 text-[11px] text-[var(--lr-text-muted)]">
                    Elige el momento que mejor describe
                    la conversación.
                  </p>
                </div>

                <div className="relative w-full sm:w-[220px]">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--lr-text-muted)]"
                  />

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Buscar situación..."
                    className="h-9 w-full rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] pl-9 pr-3 text-[11px] text-[var(--lr-text)] outline-none placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-accent)]"
                  />
                </div>
              </div>

              <div className="grid gap-4 p-5 md:grid-cols-2">
                {visibleCategories.map((category) => (
                  <div
                    key={category.id}
                    className="rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-4"
                  >
                    <div className="mb-3">
                      <h3 className="text-xs font-bold text-[var(--lr-text)]">
                        {category.title}
                      </h3>

                      <p className="mt-1 text-[10px] leading-4 text-[var(--lr-text-muted)]">
                        {category.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {category.messages.map(
                        (message) => {
                          const active =
                            selectedMessageId ===
                            message.id;

                          return (
                            <button
                              key={message.id}
                              type="button"
                              onClick={() =>
                                setSelectedMessageId(
                                  message.id
                                )
                              }
                              className={[
                                "w-full rounded-xl border p-3 text-left transition-all",
                                active
                                  ? "border-[var(--lr-accent)]/40 bg-[var(--lr-card)] shadow-md shadow-[var(--lr-accent)]/5"
                                  : "border-[var(--lr-border)] bg-[var(--lr-card)] hover:border-[var(--lr-border-strong)] hover:-translate-y-0.5",
                              ].join(" ")}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-xs font-bold text-[var(--lr-text)]">
                                  {message.title}
                                </span>

                                <span
                                  className={[
                                    "rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide",
                                    active
                                      ? "bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]"
                                      : "bg-[var(--lr-bg-soft)] text-[var(--lr-text-muted)]",
                                  ].join(" ")}
                                >
                                  {message.channel}
                                </span>
                              </div>

                              <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-[var(--lr-text-muted)]">
                                {message.text}
                              </p>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                ))}

                {visibleCategories.length === 0 && (
                  <div className="md:col-span-2 py-10 text-center">
                    <Search
                      size={22}
                      className="mx-auto text-[var(--lr-text-muted)]"
                    />

                    <p className="mt-3 text-xs font-bold text-[var(--lr-text)]">
                      No encontramos ese mensaje
                    </p>

                    <p className="mt-1 text-[10px] text-[var(--lr-text-muted)]">
                      Prueba con otra búsqueda.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* MESSAGE PREVIEW */}
            <section className="relative overflow-hidden rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card)]">
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[var(--lr-accent)]/10 blur-3xl" />

              <div className="relative border-b border-[var(--lr-border)] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                        <Sparkles size={14} />
                      </div>

                      <p className="text-xs font-bold text-[var(--lr-text)]">
                        03 · Mensaje listo
                      </p>
                    </div>

                    <p className="mt-2 text-[11px] text-[var(--lr-text-muted)]">
                      {selectedLead
                        ? `Personalizado para ${selectedLead.name}.`
                        : "Selecciona un lead para personalizarlo."}
                    </p>
                  </div>

                  {selectedMessage && (
                    <span className="hidden rounded-full border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-2.5 py-1 text-[9px] font-bold text-[var(--lr-text-muted)] sm:block">
                      {selectedMessage.channel}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative p-5 sm:p-7">
                {/* MESSAGE BUBBLE */}
                <div className="relative mx-auto max-w-3xl">
                  <div className="absolute -left-2 top-5 hidden h-3 w-3 rotate-45 rounded-sm bg-[#171719] sm:block" />

                  <div className="rounded-[22px] rounded-tl-md bg-[#171719] p-5 text-white shadow-2xl shadow-black/10 sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold">
                          {selectedLead
                            ? getInitials(
                                selectedLead.name
                              )
                            : "LR"}
                        </div>

                        <span className="text-[10px] font-semibold text-white/60">
                          {selectedLead?.name ||
                            "Tu lead"}
                        </span>
                      </div>

                      <span className="flex items-center gap-1.5 text-[9px] text-white/35">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Personalizado
                      </span>
                    </div>

                    <p className="whitespace-pre-line text-sm leading-7 text-white/85">
                      {selectedLead
                        ? personalizedMessage
                        : "Selecciona un lead para generar automáticamente tu mensaje."}
                    </p>
                  </div>
                </div>

                {/* ACTION */}
                <div className="mx-auto mt-5 flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-md">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--lr-text-muted)]">
                      Consejo de Lead Rescue
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[var(--lr-text-secondary)]">
                      Personaliza una frase si tienes
                      algún detalle concreto de la conversación.
                      Un mensaje humano convierte mejor que
                      uno perfectamente escrito.
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={!selectedLead}
                    onClick={copyMessage}
                    className={[
                      "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-xs font-bold transition-all",
                      selectedLead
                        ? "bg-[var(--lr-text)] text-[var(--lr-bg)] shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                        : "cursor-not-allowed bg-[var(--lr-bg-soft)] text-[var(--lr-text-muted)]",
                    ].join(" ")}
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Mensaje copiado
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copiar mensaje
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* BOTTOM CTA */}
        {!selectedLead && leads.length === 0 && (
          <section className="rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-[var(--lr-text)]">
                  Todavía no tienes leads.
                </p>

                <p className="mt-1 text-xs text-[var(--lr-text-muted)]">
                  Añade tu primera oportunidad para empezar
                  a generar mensajes.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(`${basePath}/leads`)
                }
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--lr-text)] px-4 text-xs font-bold text-[var(--lr-bg)]"
              >
                Añadir primer lead
                <Clipboard size={14} />
              </button>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

function Step({ number, label, active }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={[
          "flex h-7 w-7 items-center justify-center rounded-lg text-[8px] font-black",
          active
            ? "bg-[var(--lr-accent)] text-white"
            : "bg-[var(--lr-bg-soft)] text-[var(--lr-text-muted)]",
        ].join(" ")}
      >
        {number}
      </div>

      <span className="text-[10px] font-semibold text-[var(--lr-text-secondary)]">
        {label}
      </span>
    </div>
  );
}

export default Messages;