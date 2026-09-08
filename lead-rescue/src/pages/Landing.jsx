import {
  ArrowRight,
  Check,
  Clock3,
  Globe2,
  MessageSquareText,
  Moon,
  ShieldCheck,
  Sun,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WHOP_PRO_URL =
  "https://whop.com/checkout/plan_cGBN1dOfHwI45";

const WHOP_PRO_PLUS_URL =
  "https://whop.com/checkout/plan_EjDVr11EQCStb";

const translations = {
  es: {
    navHow: "Cómo funciona",
    navFeatures: "Funciones",
    navPricing: "Precios",
    login: "Iniciar sesión",
    demo: "Ver demo",

    heroEyebrow: "CONVIERTE MÁS LEADS EN CLIENTES",
    heroTitle: "Deja de perder dinero por leads que no sigues.",
    heroText:
      "Lead Rescue te ayuda a organizar tus leads, saber a quién contactar y qué decir para recuperar oportunidades que estás dejando escapar.",
    heroPrimary: "Probar Lead Rescue",
    heroSecondary: "Cómo funciona",

    problemTitle: "El problema no es conseguir leads.",
    problemHighlight: "Es perderlos después.",
    problemText:
      "Muchos leads se enfrían porque nadie hace seguimiento a tiempo. Lead Rescue convierte ese caos en un sistema simple para que sepas exactamente qué hacer con cada oportunidad.",

    benefit1Title: "Sabe a quién contactar",
    benefit1Text:
      "Organiza tus leads y detecta rápidamente cuáles necesitan seguimiento.",
    benefit2Title: "Sabe qué decir",
    benefit2Text:
      "Ten mensajes preparados para contactar sin perder tiempo pensando qué escribir.",
    benefit3Title: "Mide la oportunidad",
    benefit3Text:
      "Calcula cuánto dinero podrías estar dejando sobre la mesa por no hacer seguimiento.",

    productEyebrow: "TU NUEVO SISTEMA",
    productTitle: "Todo lo que necesitas para rescatar tus leads.",
    productText:
      "Sin CRM complicado. Sin hojas de cálculo interminables. Solo las herramientas que necesitas para convertir oportunidades en dinero.",
    productButton: "Probar la demo",

    includedTitle: "Todo incluido",
    included1: "Gestor de leads sencillo",
    included2: "Seguimientos organizados",
    included3: "Mensajes listos para usar",
    included4: "Calculadora de dinero perdido",
    included5: "Datos guardados en tu dispositivo",
    included6: "Sin CRM complicado",

    pricingEyebrow: "PRECIOS",
    pricingTitle: "Empieza gratis. Escala cuando quieras.",
    pricingText:
      "Prueba Lead Rescue sin pagar y pasa a PRO cuando quieras desbloquear más posibilidades.",

    freeName: "FREE",
    freePrice: "0€",
    freeDescription: "Para probar Lead Rescue.",
    freeButton: "Probar gratis",

    proName: "PRO",
    proPrice: "8,99€",
    proPeriod: "/mes",
    proDescription: "Para quienes quieren recuperar más oportunidades.",
    proButton: "Empezar con PRO",
    popular: "MÁS POPULAR",

    proPlusName: "PRO+",
    proPlusPrice: "29,99€",
    proPlusPeriod: "/mes",
    proPlusDescription: "Para llevar tu seguimiento al siguiente nivel.",
    proPlusButton: "Empezar con PRO+",

    featureLeadManager: "Gestor de leads",
    featureFollowUps: "Seguimientos organizados",
    featureMessages: "Mensajes preparados",
    featureCalculator: "Calculadora de dinero perdido",
    featureStorage: "Datos guardados en tu dispositivo",
    featureAdvanced: "Funciones avanzadas",
    featurePriority: "Soporte prioritario",

    ctaTitle: "Cada lead que no sigues puede ser dinero que pierdes.",
    ctaText:
      "Empieza a organizar tus oportunidades hoy y deja de depender de la memoria.",
    ctaButton: "Probar Lead Rescue",

    footerText: "Lead Rescue. Convierte oportunidades en clientes.",
  },

  en: {
    navHow: "How it works",
    navFeatures: "Features",
    navPricing: "Pricing",
    login: "Log in",
    demo: "View demo",

    heroEyebrow: "TURN MORE LEADS INTO CLIENTS",
    heroTitle: "Stop losing money from leads you don't follow up.",
    heroText:
      "Lead Rescue helps you organize your leads, know who to contact and what to say so you can recover opportunities you're currently losing.",
    heroPrimary: "Try Lead Rescue",
    heroSecondary: "How it works",

    problemTitle: "The problem isn't getting leads.",
    problemHighlight: "It's losing them afterwards.",
    problemText:
      "Many leads go cold because nobody follows up at the right time. Lead Rescue turns that chaos into a simple system so you always know what to do with every opportunity.",

    benefit1Title: "Know who to contact",
    benefit1Text:
      "Organize your leads and quickly identify which ones need follow-up.",
    benefit2Title: "Know what to say",
    benefit2Text:
      "Have ready-to-use messages so you never waste time wondering what to write.",
    benefit3Title: "Measure the opportunity",
    benefit3Text:
      "Calculate how much money you could be leaving on the table by not following up.",

    productEyebrow: "YOUR NEW SYSTEM",
    productTitle: "Everything you need to rescue your leads.",
    productText:
      "No complicated CRM. No endless spreadsheets. Just the tools you need to turn opportunities into revenue.",
    productButton: "Try the demo",

    includedTitle: "Everything included",
    included1: "Simple lead manager",
    included2: "Organized follow-ups",
    included3: "Ready-to-use messages",
    included4: "Lost money calculator",
    included5: "Data saved on your device",
    included6: "No complicated CRM",

    pricingEyebrow: "PRICING",
    pricingTitle: "Start free. Scale when you're ready.",
    pricingText:
      "Try Lead Rescue for free and upgrade to PRO whenever you want more possibilities.",

    freeName: "FREE",
    freePrice: "$0",
    freeDescription: "For trying Lead Rescue.",
    freeButton: "Try for free",

    proName: "PRO",
    proPrice: "$8.99",
    proPeriod: "/month",
    proDescription: "For those who want to recover more opportunities.",
    proButton: "Start with PRO",
    popular: "MOST POPULAR",

    proPlusName: "PRO+",
    proPlusPrice: "$29.99",
    proPlusPeriod: "/month",
    proPlusDescription: "For taking your follow-up system to the next level.",
    proPlusButton: "Start with PRO+",

    featureLeadManager: "Lead manager",
    featureFollowUps: "Organized follow-ups",
    featureMessages: "Prepared messages",
    featureCalculator: "Lost money calculator",
    featureStorage: "Data saved on your device",
    featureAdvanced: "Advanced features",
    featurePriority: "Priority support",

    ctaTitle: "Every lead you don't follow up can be money you lose.",
    ctaText:
      "Start organizing your opportunities today and stop relying on memory.",
    ctaButton: "Try Lead Rescue",

    footerText: "Lead Rescue. Turn opportunities into clients.",
  },
};

const benefits = [
  {
    icon: Clock3,
    title: "benefit1Title",
    text: "benefit1Text",
  },
  {
    icon: MessageSquareText,
    title: "benefit2Title",
    text: "benefit2Text",
  },
  {
    icon: TrendingUp,
    title: "benefit3Title",
    text: "benefit3Text",
  },
];

function Landing() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("lead-rescue-language") || "es";
  });

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("lead-rescue-theme") !== "light";
  });

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem("lead-rescue-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(
      "lead-rescue-theme",
      dark ? "dark" : "light"
    );

    document.documentElement.dataset.landingTheme = dark
      ? "dark"
      : "light";
  }, [dark]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const background = dark
    ? "bg-[#050505] text-white"
    : "bg-[#fafafa] text-[#111]";

  const muted = dark ? "text-white/60" : "text-black/55";

  const border = dark
    ? "border-white/10"
    : "border-black/10";

  const card = dark
    ? "bg-white/[0.04] border-white/10"
    : "bg-white border-black/[0.08]";

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${background}`}
    >
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl ${
          dark
            ? "border-white/10 bg-black/60"
            : "border-black/5 bg-white/75"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                dark
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              <Zap size={18} fill="currentColor" />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Lead Rescue
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollTo("how")}
              className={`text-sm transition ${
                dark
                  ? "text-white/60 hover:text-white"
                  : "text-black/55 hover:text-black"
              }`}
            >
              {t.navHow}
            </button>

            <button
              onClick={() => scrollTo("features")}
              className={`text-sm transition ${
                dark
                  ? "text-white/60 hover:text-white"
                  : "text-black/55 hover:text-black"
              }`}
            >
              {t.navFeatures}
            </button>

            <button
              onClick={() => scrollTo("pricing")}
              className={`text-sm transition ${
                dark
                  ? "text-white/60 hover:text-white"
                  : "text-black/55 hover:text-black"
              }`}
            >
              {t.navPricing}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setLanguage(language === "es" ? "en" : "es")
              }
              className={`hidden h-10 items-center gap-2 rounded-xl border px-3 text-xs font-medium transition sm:flex ${
                dark
                  ? "border-white/10 bg-white/5 hover:bg-white/10"
                  : "border-black/10 bg-black/[0.03] hover:bg-black/[0.06]"
              }`}
            >
              <Globe2 size={15} />
              {language === "es" ? "ES" : "EN"}
            </button>

            <button
              onClick={() => setDark(!dark)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                dark
                  ? "border-white/10 bg-white/5 hover:bg-white/10"
                  : "border-black/10 bg-black/[0.03] hover:bg-black/[0.06]"
              }`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => navigate("/login")}
              className={`hidden rounded-xl px-4 py-2.5 text-sm font-medium transition sm:block ${
                dark
                  ? "text-white/70 hover:text-white"
                  : "text-black/60 hover:text-black"
              }`}
            >
              {t.login}
            </button>

            <button
              onClick={() => navigate("/demo")}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                dark
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-black text-white hover:bg-black/90"
              }`}
            >
              {t.demo}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
          <div
            className={`absolute left-1/2 top-32 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[140px] ${
              dark ? "bg-white/[0.05]" : "bg-black/[0.035]"
            }`}
          />

          <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div
                className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide ${
                  dark
                    ? "border-white/10 bg-white/[0.04] text-white/60"
                    : "border-black/10 bg-black/[0.025] text-black/55"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {t.heroEyebrow}
              </div>

              <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
                {t.heroTitle}
              </h1>

              <p
                className={`mx-auto mt-7 max-w-2xl text-base leading-7 sm:text-lg ${muted}`}
              >
                {t.heroText}
              </p>

              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={() => navigate("/demo")}
                  className={`group flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold transition ${
                    dark
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/90"
                  }`}
                >
                  {t.heroPrimary}
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={() => scrollTo("how")}
                  className={`rounded-2xl border px-6 py-4 text-sm font-semibold transition ${
                    dark
                      ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                      : "border-black/10 bg-white hover:bg-black/[0.03]"
                  }`}
                >
                  {t.heroSecondary}
                </button>
              </div>

              <div
                className={`mt-12 flex items-center justify-center gap-6 text-xs ${muted}`}
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck size={15} />
                  Simple & secure
                </span>

                <span className="flex items-center gap-2">
                  <Users size={15} />
                  Built for sales
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section
          id="how"
          className={`border-t px-5 py-28 sm:px-8 ${
            dark ? "border-white/10" : "border-black/10"
          }`}
        >
          <div className="mx-auto max-w-5xl text-center">
            <p className={`mb-4 text-sm font-medium ${muted}`}>
              THE PROBLEM
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
              {t.problemTitle}
              <br />
              <span className={muted}>
                {t.problemHighlight}
              </span>
            </h2>

            <p
              className={`mx-auto mt-7 max-w-2xl text-base leading-7 ${muted}`}
            >
              {t.problemText}
            </p>
          </div>

          <div
            className={`mx-auto mt-20 grid max-w-6xl gap-4 md:grid-cols-3`}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className={`rounded-3xl border p-7 transition ${
                    card
                  } ${
                    dark
                      ? "hover:bg-white/[0.06]"
                      : "hover:shadow-xl hover:shadow-black/[0.03]"
                  }`}
                >
                  <div
                    className={`mb-7 flex h-11 w-11 items-center justify-center rounded-2xl ${
                      dark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="mb-2 text-lg font-semibold">
                    {t[benefit.title]}
                  </div>

                  <p className={`text-sm leading-6 ${muted}`}>
                    {t[benefit.text]}
                  </p>

                  <div
                    className={`mt-8 text-xs font-medium ${
                      dark ? "text-white/30" : "text-black/30"
                    }`}
                  >
                    0{index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FEATURES / PRODUCT */}
        <section
          id="features"
          className={`border-t px-5 py-28 sm:px-8 ${
            dark ? "border-white/10" : "border-black/10"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <p className={`mb-4 text-sm font-medium ${muted}`}>
                  {t.productEyebrow}
                </p>

                <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
                  {t.productTitle}
                </h2>

                <p
                  className={`mt-7 max-w-xl text-base leading-7 ${muted}`}
                >
                  {t.productText}
                </p>

                <button
                  onClick={() => navigate("/demo")}
                  className={`mt-9 flex items-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold transition ${
                    dark
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/90"
                  }`}
                >
                  {t.productButton}
                  <ArrowRight size={17} />
                </button>
              </div>

              <div
                className={`rounded-[2rem] border p-3 shadow-2xl ${
                  dark
                    ? "border-white/10 bg-white/[0.03] shadow-black/50"
                    : "border-black/10 bg-white shadow-black/10"
                }`}
              >
                <div
                  className={`overflow-hidden rounded-[1.5rem] border ${
                    dark
                      ? "border-white/10 bg-[#0b0b0b]"
                      : "border-black/10 bg-[#f7f7f7]"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between border-b px-5 py-4 ${
                      dark
                        ? "border-white/10"
                        : "border-black/10"
                    }`}
                  >
                    <div className="text-sm font-semibold">
                      Lead Rescue
                    </div>

                    <div
                      className={`h-7 w-7 rounded-full ${
                        dark ? "bg-white/10" : "bg-black/10"
                      }`}
                    />
                  </div>

                  <div className="grid gap-4 p-5 sm:grid-cols-3">
                    <PreviewStat
                      label="Total leads"
                      value="128"
                      dark={dark}
                    />
                    <PreviewStat
                      label="Follow-ups"
                      value="34"
                      dark={dark}
                    />
                    <PreviewStat
                      label="Potential"
                      value="€8.4K"
                      dark={dark}
                    />
                  </div>

                  <div className="space-y-3 px-5 pb-5">
                    <PreviewLead
                      name="Alex Morgan"
                      company="Acme Studio"
                      status="Follow up today"
                      dark={dark}
                    />

                    <PreviewLead
                      name="Sarah Wilson"
                      company="Growth Lab"
                      status="Waiting"
                      dark={dark}
                    />

                    <PreviewLead
                      name="Daniel Smith"
                      company="Nova Agency"
                      status="New lead"
                      dark={dark}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INCLUDED */}
        <section
          className={`border-t px-5 py-28 sm:px-8 ${
            dark ? "border-white/10" : "border-black/10"
          }`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                {t.includedTitle}
              </h2>
            </div>

            <div className="grid gap-x-12 gap-y-5 md:grid-cols-2">
              {[
                "included1",
                "included2",
                "included3",
                "included4",
                "included5",
                "included6",
              ].map((key) => (
                <div
                  key={key}
                  className={`flex items-center gap-4 border-b py-5 ${
                    dark
                      ? "border-white/10"
                      : "border-black/10"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      dark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    <Check size={15} strokeWidth={2.5} />
                  </div>

                  <span className="text-sm font-medium">
                    {t[key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section
          id="pricing"
          className={`border-t px-5 py-28 sm:px-8 ${
            dark ? "border-white/10" : "border-black/10"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <p className={`mb-4 text-sm font-medium ${muted}`}>
                {t.pricingEyebrow}
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
                {t.pricingTitle}
              </h2>

              <p className={`mt-6 text-base leading-7 ${muted}`}>
                {t.pricingText}
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <PricingCard
                name={t.freeName}
                price={t.freePrice}
                description={t.freeDescription}
                button={t.freeButton}
                features={[
                  t.featureLeadManager,
                  t.featureFollowUps,
                  t.featureMessages,
                  t.featureCalculator,
                ]}
                dark={dark}
                onClick={() => navigate("/demo")}
              />

              <PricingCard
                name={t.proName}
                price={t.proPrice}
                period={t.proPeriod}
                description={t.proDescription}
                button={t.proButton}
                features={[
                  t.featureLeadManager,
                  t.featureFollowUps,
                  t.featureMessages,
                  t.featureCalculator,
                  t.featureStorage,
                ]}
                dark={dark}
                popular={t.popular}
                onClick={() => {
                  window.location.href = WHOP_PRO_URL;
                }}
              />

              <PricingCard
                name={t.proPlusName}
                price={t.proPlusPrice}
                period={t.proPlusPeriod}
                description={t.proPlusDescription}
                button={t.proPlusButton}
                features={[
                  t.featureLeadManager,
                  t.featureFollowUps,
                  t.featureMessages,
                  t.featureCalculator,
                  t.featureStorage,
                  t.featureAdvanced,
                  t.featurePriority,
                ]}
                dark={dark}
                onClick={() => {
                  window.location.href = WHOP_PRO_PLUS_URL;
                }}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-28 sm:px-8">
          <div
            className={`mx-auto max-w-6xl rounded-[2rem] border px-6 py-20 text-center sm:px-12 ${
              dark
                ? "border-white/10 bg-white/[0.04]"
                : "border-black/10 bg-white"
            }`}
          >
            <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
              {t.ctaTitle}
            </h2>

            <p className={`mx-auto mt-6 max-w-xl ${muted}`}>
              {t.ctaText}
            </p>

            <button
              onClick={() => navigate("/demo")}
              className={`mt-9 inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold transition ${
                dark
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-black text-white hover:bg-black/90"
              }`}
            >
              {t.ctaButton}
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t px-5 py-8 sm:px-8 ${
          dark ? "border-white/10" : "border-black/10"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                dark
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              <Zap size={14} fill="currentColor" />
            </div>

            <span className="text-sm font-semibold">
              Lead Rescue
            </span>
          </div>

          <p className={`text-xs ${muted}`}>
            {t.footerText}
          </p>
        </div>
      </footer>

      {/* MOBILE LANGUAGE */}
      <button
        onClick={() =>
          setLanguage(language === "es" ? "en" : "es")
        }
        className={`fixed bottom-5 left-5 z-40 flex h-11 items-center gap-2 rounded-2xl border px-4 text-xs font-semibold shadow-xl backdrop-blur-xl sm:hidden ${
          dark
            ? "border-white/10 bg-black/70"
            : "border-black/10 bg-white/90"
        }`}
      >
        <Globe2 size={15} />
        {language === "es" ? "ES" : "EN"}
      </button>
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  description,
  button,
  features,
  dark,
  popular,
  onClick,
}) {
  return (
    <div
      className={`relative flex flex-col rounded-[2rem] border p-7 ${
        popular
          ? dark
            ? "border-white/30 bg-white/[0.07]"
            : "border-black/20 bg-white shadow-2xl shadow-black/[0.06]"
          : dark
          ? "border-white/10 bg-white/[0.03]"
          : "border-black/10 bg-white"
      }`}
    >
      {popular && (
        <div
          className={`absolute -top-3 left-7 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider ${
            dark
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          {popular}
        </div>
      )}

      <div className="mb-8">
        <div className="mb-3 text-sm font-semibold">
          {name}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight">
            {price}
          </span>

          {period && (
            <span
              className={`text-sm ${
                dark ? "text-white/40" : "text-black/40"
              }`}
            >
              {period}
            </span>
          )}
        </div>

        <p
          className={`mt-4 min-h-[48px] text-sm leading-6 ${
            dark ? "text-white/55" : "text-black/55"
          }`}
        >
          {description}
        </p>
      </div>

      <button
        onClick={onClick}
        className={`mb-8 w-full rounded-2xl py-3.5 text-sm font-semibold transition ${
          dark
            ? "bg-white text-black hover:bg-white/90"
            : "bg-black text-white hover:bg-black/90"
        }`}
      >
        {button}
      </button>

      <div className="space-y-4">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-start gap-3"
          >
            <Check
              size={17}
              className={`mt-0.5 shrink-0 ${
                dark ? "text-white" : "text-black"
              }`}
            />

            <span
              className={`text-sm ${
                dark ? "text-white/65" : "text-black/65"
              }`}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewStat({ label, value, dark }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        dark
          ? "border-white/10 bg-white/[0.03]"
          : "border-black/10 bg-white"
      }`}
    >
      <div
        className={`text-[11px] ${
          dark ? "text-white/40" : "text-black/40"
        }`}
      >
        {label}
      </div>

      <div className="mt-2 text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}

function PreviewLead({
  name,
  company,
  status,
  dark,
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl border p-4 ${
        dark
          ? "border-white/10 bg-white/[0.025]"
          : "border-black/10 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
            dark
              ? "bg-white/10 text-white"
              : "bg-black/5 text-black"
          }`}
        >
          {name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div>
          <div className="text-sm font-medium">
            {name}
          </div>

          <div
            className={`text-xs ${
              dark ? "text-white/40" : "text-black/40"
            }`}
          >
            {company}
          </div>
        </div>
      </div>

      <div
        className={`hidden rounded-full px-3 py-1 text-[10px] font-medium sm:block ${
          dark
            ? "bg-white/10 text-white/60"
            : "bg-black/5 text-black/50"
        }`}
      >
        {status}
      </div>
    </div>
  );
}

export default Landing;