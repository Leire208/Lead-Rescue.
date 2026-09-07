import {
  ArrowRight,
  Check,
  Clock3,
  MessageSquareText,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  {
    icon: Clock3,
    title: "Sabe a quién contactar",
    description:
      "Organiza automáticamente los seguimientos pendientes para que ningún lead se enfríe.",
  },
  {
    icon: MessageSquareText,
    title: "Sabe qué decir",
    description:
      "Accede a mensajes preparados para presupuestos, leads antiguos y clientes sin respuesta.",
  },
  {
    icon: TrendingUp,
    title: "Mide la oportunidad",
    description:
      "Descubre cuánto dinero podrías recuperar mejorando simplemente tu seguimiento.",
  },
];

const included = [
  "Gestor de leads sencillo",
  "Seguimientos organizados",
  "Mensajes listos para usar",
  "Calculadora de dinero perdido",
  "Datos guardados en tu dispositivo",
  "Sin CRM complicado",
];

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-white text-gray-950">
      {/* NAV */}
      <header className="relative z-20 border-b border-gray-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-white">
              <ShieldCheck size={19} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight">
                Lead Rescue
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Recover more sales
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/app")}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
          >
            Ver demo
          </button>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-5 pb-20 pt-20 text-center sm:px-8 sm:pb-28 sm:pt-28">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-semibold text-gray-500">
              <Zap size={13} />
              Diseñado para pequeños negocios
            </div>

            <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-gray-950 sm:text-6xl lg:text-7xl">
              Deja de perder clientes que{" "}
              <span className="text-gray-400">
                ya te han preguntado.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
              Lead Rescue organiza tus leads, te dice a quién
              contactar hoy y te ayuda a escribir el mensaje
              correcto para recuperar la oportunidad.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/app")}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 text-sm font-semibold text-white shadow-lg shadow-gray-950/10 transition hover:bg-gray-800 sm:w-auto"
              >
                Probar Lead Rescue
                <ArrowRight size={17} />
              </button>

              <a
                href="#como-funciona"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 px-6 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:w-auto"
              >
                Cómo funciona
              </a>
            </div>

            <p className="mt-5 text-[11px] text-gray-400">
              Sin tarjeta · Sin configuración complicada · Demo
              gratuita
            </p>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gray-100/70 blur-3xl" />
        </section>

        {/* PROBLEM */}
        <section
          id="como-funciona"
          className="border-y border-gray-100 bg-gray-50/70"
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                El problema
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                El lead no siempre se pierde porque diga que no.
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
                Muchas oportunidades desaparecen simplemente porque
                nadie volvió a escribir, nadie recordó el presupuesto
                o la conversación quedó enterrada entre WhatsApp,
                Instagram y emails.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-gray-200 bg-white p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-white">
                      <Icon size={19} />
                    </div>

                    <h3 className="mt-5 text-sm font-bold text-gray-950">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRODUCT PREVIEW */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                  El sistema
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  No necesitas otro CRM.
                  <br />
                  Necesitas saber qué hacer.
                </h2>

                <p className="mt-5 text-sm leading-6 text-gray-500">
                  Lead Rescue está construido alrededor de una
                  pregunta:
                </p>

                <div className="mt-4 rounded-2xl bg-gray-950 p-5 text-white">
                  <p className="text-lg font-bold">
                    “¿A quién tengo que escribir hoy?”
                  </p>

                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    Y después:
                    <br />
                    “¿Qué le digo?”
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/app")}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-gray-950"
                >
                  Ver cómo funciona
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* FAKE DASHBOARD */}
              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-3 shadow-2xl shadow-gray-900/10 sm:p-5">
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400">
                        HOY
                      </p>

                      <p className="mt-1 text-lg font-bold text-gray-950">
                        3 seguimientos
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-white">
                      <Users size={16} />
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <PreviewLead
                      name="María García"
                      service="Reforma integral"
                      value="4.800 €"
                      urgent
                    />

                    <PreviewLead
                      name="Carlos López"
                      service="Fotografía"
                      value="850 €"
                    />

                    <PreviewLead
                      name="Laura Martín"
                      service="Tratamiento"
                      value="180 €"
                    />
                  </div>

                  <div className="mt-5 rounded-xl bg-gray-950 p-4 text-white">
                    <p className="text-[10px] font-semibold text-gray-500">
                      OPORTUNIDAD RECUPERABLE
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      5.830 €
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICE */}
        <section className="bg-gray-950 text-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                Todo lo necesario
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Menos de lo que vale recuperar un solo cliente.
              </h2>

              <div className="mt-8">
                <span className="text-6xl font-bold tracking-tight">
                  29€
                </span>

                <span className="ml-2 text-sm text-gray-500">
                  pago único
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-400">
                Sin mensualidades. Sin CRM complicado.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="space-y-4">
                {included.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Check size={13} />
                    </div>

                    <span className="text-sm text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate("/app")}
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-bold text-gray-950 transition hover:bg-gray-100"
              >
                Probar la demo
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-950 pb-10 text-center">
          <p className="text-[11px] text-gray-600">
            Lead Rescue · Recupera oportunidades que ya existen.
          </p>
        </footer>
      </main>
    </div>
  );
}

function PreviewLead({
  name,
  service,
  value,
  urgent = false,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
      <div
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
          urgent
            ? "bg-amber-50 text-amber-600"
            : "bg-gray-100 text-gray-600",
        ].join(" ")}
      >
        {name
          .split(" ")
          .slice(0, 2)
          .map((part) => part[0])
          .join("")
          .toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-gray-950">
          {name}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-gray-400">
          {service}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs font-bold text-gray-950">
          {value}
        </p>

        <p
          className={[
            "mt-0.5 text-[9px] font-semibold",
            urgent
              ? "text-amber-500"
              : "text-gray-400",
          ].join(" ")}
        >
          {urgent ? "HOY" : "Próximo"}
        </p>
      </div>
    </div>
  );
}

export default Landing;