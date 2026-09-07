import { useMemo, useState } from "react";
import {
  Calculator as CalculatorIcon,
  Euro,
  Info,
  ArrowUpRight,
  CircleDollarSign,
  Target,
  TrendingUp,
} from "lucide-react";

import Layout from "../components/Layout";
import { useLeads } from "../context/LeadContext";

function formatCurrency(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function Calculator() {
  const { leads } = useLeads();

  const [monthlyLeads, setMonthlyLeads] = useState(
    leads.length || 20
  );

  const [conversionRate, setConversionRate] = useState(25);
  const [averageTicket, setAverageTicket] = useState(500);
  const [recoveryRate, setRecoveryRate] = useState(10);

  const results = useMemo(() => {
    const leadsNumber = Math.max(
      0,
      Number(monthlyLeads) || 0
    );

    const conversion = Math.min(
      100,
      Math.max(0, Number(conversionRate) || 0)
    );

    const ticket = Math.max(
      0,
      Number(averageTicket) || 0
    );

    const recovery = Math.min(
      100,
      Math.max(0, Number(recoveryRate) || 0)
    );

    const convertedCustomers =
      leadsNumber * (conversion / 100);

    const potentialRevenue =
      convertedCustomers * ticket;

    const nonConvertedLeads =
      leadsNumber - convertedCustomers;

    const recoverableCustomers =
      nonConvertedLeads * (recovery / 100);

    const recoverableRevenue =
      recoverableCustomers * ticket;

    const lostRevenue =
      nonConvertedLeads * ticket;

    const recoveryPercentageOfTotal =
      leadsNumber > 0
        ? (recoverableCustomers / leadsNumber) * 100
        : 0;

    return {
      leadsNumber,
      conversion,
      ticket,
      recovery,
      convertedCustomers,
      potentialRevenue,
      nonConvertedLeads,
      recoverableCustomers,
      recoverableRevenue,
      lostRevenue,
      recoveryPercentageOfTotal,
    };
  }, [
    monthlyLeads,
    conversionRate,
    averageTicket,
    recoveryRate,
  ]);

  return (
    <Layout>
      <div className="space-y-7">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[28px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--lr-accent)]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--lr-accent)]">
              <CalculatorIcon size={14} />
              Revenue calculator
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-[var(--lr-text)] sm:text-3xl">
              ¿Cuánto dinero estás dejando
              escapar?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--lr-text-secondary)]">
              Haz una estimación rápida del valor que
              podrían tener los leads que actualmente no
              conviertes y cuánto podrías recuperar con un
              mejor seguimiento.
            </p>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
          {/* INPUTS */}
          <section className="rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lr-accent-soft)] text-[var(--lr-accent)]">
                <Target size={17} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[var(--lr-text)]">
                  Datos de tu negocio
                </h3>

                <p className="mt-0.5 text-[10px] text-[var(--lr-text-muted)]">
                  No tienen que ser exactos.
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-6">
              <NumberInput
                label="Leads que recibes al mes"
                value={monthlyLeads}
                onChange={setMonthlyLeads}
                suffix="leads"
                min="0"
              />

              <NumberInput
                label="Porcentaje que conviertes"
                value={conversionRate}
                onChange={setConversionRate}
                suffix="%"
                min="0"
                max="100"
              />

              <NumberInput
                label="Valor medio de un cliente"
                value={averageTicket}
                onChange={setAverageTicket}
                suffix="€"
                min="0"
              />

              <NumberInput
                label="Leads que crees que puedes recuperar"
                value={recoveryRate}
                onChange={setRecoveryRate}
                suffix="%"
                min="0"
                max="100"
              />
            </div>

            <div className="mt-7 rounded-2xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-4">
              <div className="flex gap-3">
                <Info
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--lr-accent)]"
                />

                <div>
                  <p className="text-[10px] font-bold text-[var(--lr-text)]">
                    Cómo interpretar el cálculo
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-[var(--lr-text-muted)]">
                    El porcentaje de recuperación se aplica
                    solamente a los leads que actualmente no
                    conviertes. Es una estimación, no una
                    garantía de ingresos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RESULTS */}
          <div className="space-y-4">
            {/* MAIN RESULT */}
            <section className="relative overflow-hidden rounded-[28px] bg-[var(--lr-text)] p-6 text-[var(--lr-bg)] shadow-2xl shadow-black/10 sm:p-8">
              <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[var(--lr-accent)]/20 blur-3xl" />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                      <CircleDollarSign size={17} />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                      Oportunidad de recuperación
                    </span>
                  </div>

                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-white/60">
                    {recoveryRate}% recuperación
                  </span>
                </div>

                <p className="mt-6 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                  {formatCurrency(
                    results.recoverableRevenue
                  )}
                </p>

                <p className="mt-3 max-w-lg text-sm leading-6 text-white/50">
                  Es el valor aproximado de los clientes
                  que podrías recuperar si mejoras el
                  seguimiento de los leads que actualmente
                  no conviertes.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <MiniMetric
                    label="Clientes recuperables"
                    value={`${results.recoverableCustomers.toFixed(
                      1
                    )}`}
                  />

                  <MiniMetric
                    label="Valor medio por cliente"
                    value={formatCurrency(
                      results.ticket
                    )}
                  />
                </div>
              </div>
            </section>

            {/* SECONDARY RESULTS */}
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={TrendingUp}
                label="Facturación actual"
                value={formatCurrency(
                  results.potentialRevenue
                )}
                description={`${results.convertedCustomers.toFixed(
                  1
                )} clientes convertidos al mes`}
              />

              <ResultCard
                icon={ArrowUpRight}
                label="Leads sin convertir"
                value={`${results.nonConvertedLeads.toFixed(
                  1
                )}`}
                description={`De ${results.leadsNumber} leads mensuales`}
              />
            </div>

            {/* BIG OPPORTUNITY */}
            <section className="rounded-[24px] border border-[var(--lr-accent)]/20 bg-[var(--lr-accent-soft)] p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--lr-accent)]">
                    El número que importa
                  </p>

                  <p className="mt-2 text-xl font-black tracking-[-0.03em] text-[var(--lr-text)]">
                    {formatCurrency(
                      results.recoverableRevenue
                    )}
                    <span className="ml-2 text-xs font-semibold text-[var(--lr-text-muted)]">
                      / mes
                    </span>
                  </p>

                  <p className="mt-1 max-w-lg text-[11px] leading-5 text-[var(--lr-text-secondary)]">
                    Una estimación del valor adicional que
                    representa recuperar una pequeña parte
                    de tus oportunidades perdidas.
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--lr-accent)]/20 bg-[var(--lr-card)] text-[var(--lr-accent)]">
                    <Euro size={22} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* EXPLANATION */}
        <section className="rounded-[24px] border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--lr-border)] bg-[var(--lr-card)] text-[var(--lr-accent)]">
              <TrendingUp size={17} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[var(--lr-text)]">
                El seguimiento no crea interés.
                Recupera interés que ya existe.
              </h3>

              <p className="mt-2 max-w-3xl text-xs leading-5 text-[var(--lr-text-secondary)]">
                Estos leads ya llegaron hasta ti. Ya
                preguntaron, solicitaron información o
                mostraron intención de compra. El problema
                es que muchos desaparecen porque nadie
                vuelve a contactarles en el momento adecuado.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge text={`${results.leadsNumber} leads / mes`} />

                <Badge
                  text={`${results.nonConvertedLeads.toFixed(
                    0
                  )} sin convertir`}
                />

                <Badge
                  text={`${recoveryRate}% objetivo de recuperación`}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
  min,
  max,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-xs font-semibold text-[var(--lr-text)]">
          {label}
        </label>

        <span className="text-[10px] font-medium text-[var(--lr-text-muted)]">
          {suffix}
        </span>
      </div>

      <div className="relative">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-12 w-full rounded-xl border border-[var(--lr-border)] bg-[var(--lr-bg-soft)] px-4 pr-12 text-sm font-bold text-[var(--lr-text)] outline-none placeholder:text-[var(--lr-text-muted)] focus:border-[var(--lr-accent)] focus:ring-4 focus:ring-[var(--lr-accent)]/5"
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--lr-text-muted)]">
          {suffix}
        </span>
      </div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/35">
        {label}
      </p>

      <p className="mt-1 text-lg font-black tracking-[-0.025em] text-white">
        {value}
      </p>
    </div>
  );
}

function ResultCard({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-[22px] border border-[var(--lr-border)] bg-[var(--lr-card)] p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--lr-bg-soft)] text-[var(--lr-text-secondary)]">
        <Icon size={17} />
      </div>

      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--lr-text-muted)]">
        {label}
      </p>

      <p className="mt-1 text-xl font-black tracking-[-0.035em] text-[var(--lr-text)]">
        {value}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-[var(--lr-text-muted)]">
        {description}
      </p>
    </div>
  );
}

function Badge({ text }) {
  return (
    <span className="rounded-full border border-[var(--lr-border)] bg-[var(--lr-card)] px-2.5 py-1 text-[9px] font-semibold text-[var(--lr-text-secondary)]">
      {text}
    </span>
  );
}

export default Calculator;