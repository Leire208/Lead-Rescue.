import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  MessageSquare,
  Sparkles,
  Sun,
  Moon,
  Target,
  Upload,
  Zap,
} from "lucide-react";

const WHOP_URL =
  "https://whop.com/hirekit-ai/hirekit-ai-job-application-generator/";

const translations = {
  en: {
    nav: {
      how: "How it works",
      features: "Features",
      pricing: "Pricing",
      getStarted: "Get started",
    },

    hero: {
      eyebrow: "AI-powered job applications",
      title: "Stop applying.",
      titleAccent: "Start getting noticed.",
      description:
        "HireKit turns your resume and a job description into a tailored application package in minutes.",
      primary: "Get started",
      secondary: "See how it works",
      note: "Built for faster, smarter applications.",
    },

    mockup: {
      resume: "Your resume",
      job: "Target job",
      ai: "HireKit AI",
      result: "Application package",
      tailored: "Tailored to the role",
      cover: "Cover letter",
      answers: "Application answers",
      message: "Recruiter message",
      interview: "Interview prep",
    },

    how: {
      eyebrow: "Simple by design",
      title: "From job description to ready-to-apply.",
      description:
        "No complicated setup. Give HireKit the information you already have and let it do the heavy lifting.",
    },

    steps: [
      {
        number: "01",
        title: "Upload your resume",
        description:
          "Start with your existing resume or build one from scratch.",
      },
      {
        number: "02",
        title: "Add the job",
        description:
          "Paste the job description for the role you actually want.",
      },
      {
        number: "03",
        title: "Get your application",
        description:
          "HireKit creates tailored application materials ready to use.",
      },
    ],

    why: {
      eyebrow: "Why HireKit",
      title: "Stop sending the same application everywhere.",
      description:
        "Generic applications make it harder to stand out. HireKit helps you adapt your application to the opportunity in front of you.",
      generic: "Generic application",
      hirekit: "With HireKit",
      genericItems: [
        "Same resume for every role",
        "Generic cover letters",
        "Repeated application answers",
        "Little preparation",
      ],
      hirekitItems: [
        "Resume tailored to the role",
        "Relevant cover letter",
        "Job-specific answers",
        "Interview preparation",
      ],
    },

    options: {
      eyebrow: "Start your way",
      title: "Choose where you want to begin.",
      description:
        "Whether you already have a resume or need one first, HireKit gives you a simple starting point.",
      existingTitle: "I already have a resume",
      existingDescription:
        "Upload your current resume and tailor it to the job you're applying for.",
      newTitle: "I need a resume",
      newDescription:
        "Start from scratch and create a stronger resume built around your experience.",
      bothTitle: "I need both",
      bothDescription:
        "Build your resume and create the complete application package in one flow.",
      button: "Start with HireKit",
    },

    features: {
      eyebrow: "Everything in one place",
      title: "Your application, upgraded.",
      description:
        "HireKit helps you create the materials you need without jumping between multiple tools.",
      items: [
        {
          title: "Tailored resume",
          description:
            "Adapt your resume around the requirements and language of the target role.",
        },
        {
          title: "Cover letter",
          description:
            "Create a relevant cover letter without starting from a blank page.",
        },
        {
          title: "Application answers",
          description:
            "Generate thoughtful answers for common application questions.",
        },
        {
          title: "Recruiter message",
          description:
            "Write concise, relevant outreach messages that match the opportunity.",
        },
        {
          title: "Interview preparation",
          description:
            "Prepare around the role, company, and experience highlighted in your application.",
        },
        {
          title: "Save time",
          description:
            "Spend less time rewriting documents and more time applying strategically.",
        },
      ],
    },

    pricing: {
      eyebrow: "Simple pricing",
      title: "Invest less time. Apply better.",
      description:
        "Choose the plan that fits how actively you're applying.",
      monthly: "Monthly",
      monthlyPrice: "$4.99",
      monthlyPeriod: "/ month",
      monthlyDescription: "Flexible access while you're job hunting.",
      sixMonths: "6 months",
      sixMonthsPrice: "$19.99",
      sixMonthsPeriod: "/ 6 months",
      sixMonthsDescription: "Best value for an extended job search.",
      bestValue: "Best value",
      button: "Get HireKit",
      features: [
        "Tailored applications",
        "Resume assistance",
        "Cover letters",
        "Application answers",
        "Recruiter messages",
        "Interview preparation",
      ],
    },

    faq: {
      eyebrow: "FAQ",
      title: "Questions, answered.",
      items: [
        {
          question: "What is HireKit?",
          answer:
            "HireKit is an AI-powered job application tool that helps you tailor your resume and create relevant application materials for specific jobs.",
        },
        {
          question: "Do I need an existing resume?",
          answer:
            "No. You can start with an existing resume or build your application from scratch.",
        },
        {
          question: "Does HireKit guarantee interviews?",
          answer:
            "No. HireKit cannot guarantee interviews or job offers. It is designed to help you create stronger, more relevant applications and save time.",
        },
        {
          question: "Is HireKit only for one type of job?",
          answer:
            "No. HireKit can be used across different industries and job types as long as you provide the relevant job description and your experience.",
        },
        {
          question: "Can I use my own resume?",
          answer:
            "Yes. You can provide your current resume and use it as the foundation for a tailored application.",
        },
      ],
    },

    final: {
      eyebrow: "Your next application",
      title: "Make every application count.",
      description:
        "Turn the information you already have into an application built for the opportunity.",
      button: "Get started with HireKit",
    },

    footer: {
      tagline: "Apply smarter. Move faster.",
      product: "Product",
      company: "HireKit AI",
      rights: "All rights reserved.",
    },
  },

  es: {
    nav: {
      how: "Cómo funciona",
      features: "Funciones",
      pricing: "Precios",
      getStarted: "Empezar",
    },

    hero: {
      eyebrow: "Aplicaciones de empleo con IA",
      title: "Deja de enviar.",
      titleAccent: "Empieza a destacar.",
      description:
        "HireKit convierte tu CV y una oferta de trabajo en un paquete de candidatura personalizado en minutos.",
      primary: "Empezar",
      secondary: "Ver cómo funciona",
      note: "Diseñado para enviar mejores candidaturas en menos tiempo.",
    },

    mockup: {
      resume: "Tu CV",
      job: "Oferta objetivo",
      ai: "HireKit AI",
      result: "Paquete de candidatura",
      tailored: "Adaptado al puesto",
      cover: "Carta de presentación",
      answers: "Respuestas de candidatura",
      message: "Mensaje para recruiter",
      interview: "Preparación de entrevista",
    },

    how: {
      eyebrow: "Simple por diseño",
      title: "De la oferta a una candidatura lista.",
      description:
        "Sin configuraciones complicadas. Dale a HireKit la información que ya tienes y deja que haga el trabajo pesado.",
    },

    steps: [
      {
        number: "01",
        title: "Sube tu CV",
        description:
          "Empieza con tu CV actual o crea uno desde cero.",
      },
      {
        number: "02",
        title: "Añade la oferta",
        description:
          "Pega la descripción del puesto al que realmente quieres optar.",
      },
      {
        number: "03",
        title: "Obtén tu candidatura",
        description:
          "HireKit crea los materiales personalizados que necesitas para aplicar.",
      },
    ],

    why: {
      eyebrow: "Por qué HireKit",
      title: "Deja de enviar la misma candidatura a todas partes.",
      description:
        "Las candidaturas genéricas hacen más difícil destacar. HireKit te ayuda a adaptar tu candidatura a cada oportunidad.",
      generic: "Candidatura genérica",
      hirekit: "Con HireKit",
      genericItems: [
        "El mismo CV para todos los puestos",
        "Cartas de presentación genéricas",
        "Respuestas repetidas",
        "Poca preparación",
      ],
      hirekitItems: [
        "CV adaptado al puesto",
        "Carta relevante",
        "Respuestas específicas",
        "Preparación para la entrevista",
      ],
    },

    options: {
      eyebrow: "Empieza como quieras",
      title: "Elige desde dónde quieres empezar.",
      description:
        "Tanto si ya tienes un CV como si necesitas crear uno primero, HireKit te da un punto de partida sencillo.",
      existingTitle: "Ya tengo un CV",
      existingDescription:
        "Sube tu CV actual y adáptalo al puesto al que quieres aplicar.",
      newTitle: "Necesito un CV",
      newDescription:
        "Empieza desde cero y crea un CV más sólido basado en tu experiencia.",
      bothTitle: "Necesito ambos",
      bothDescription:
        "Crea tu CV y prepara toda la candidatura en un mismo proceso.",
      button: "Empezar con HireKit",
    },

    features: {
      eyebrow: "Todo en un mismo lugar",
      title: "Tu candidatura, mejorada.",
      description:
        "HireKit te ayuda a crear todo lo que necesitas sin tener que saltar entre diferentes herramientas.",
      items: [
        {
          title: "CV personalizado",
          description:
            "Adapta tu CV a los requisitos y lenguaje del puesto objetivo.",
        },
        {
          title: "Carta de presentación",
          description:
            "Crea una carta relevante sin tener que empezar desde una página en blanco.",
        },
        {
          title: "Respuestas de candidatura",
          description:
            "Genera respuestas pensadas para las preguntas habituales de las candidaturas.",
        },
        {
          title: "Mensaje para recruiter",
          description:
            "Escribe mensajes de contacto breves y relevantes para cada oportunidad.",
        },
        {
          title: "Preparación de entrevista",
          description:
            "Prepárate teniendo en cuenta el puesto, la empresa y tu experiencia.",
        },
        {
          title: "Ahorra tiempo",
          description:
            "Dedica menos tiempo a reescribir documentos y más a aplicar estratégicamente.",
        },
      ],
    },

    pricing: {
      eyebrow: "Precios simples",
      title: "Invierte menos tiempo. Aplica mejor.",
      description:
        "Elige el plan que mejor encaje con la intensidad de tu búsqueda de empleo.",
      monthly: "Mensual",
      monthlyPrice: "$4.99",
      monthlyPeriod: "/ mes",
      monthlyDescription:
        "Acceso flexible mientras buscas trabajo.",
      sixMonths: "6 meses",
      sixMonthsPrice: "$19.99",
      sixMonthsPeriod: "/ 6 meses",
      sixMonthsDescription:
        "La mejor opción para una búsqueda de empleo más larga.",
      bestValue: "Mejor opción",
      button: "Conseguir HireKit",
      features: [
        "Candidaturas personalizadas",
        "Ayuda con el CV",
        "Cartas de presentación",
        "Respuestas de candidatura",
        "Mensajes para recruiters",
        "Preparación de entrevistas",
      ],
    },

    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Tus dudas, resueltas.",
      items: [
        {
          question: "¿Qué es HireKit?",
          answer:
            "HireKit es una herramienta de IA para candidaturas de empleo que te ayuda a adaptar tu CV y crear materiales relevantes para puestos concretos.",
        },
        {
          question: "¿Necesito tener un CV?",
          answer:
            "No. Puedes empezar con un CV existente o crear tu candidatura desde cero.",
        },
        {
          question: "¿HireKit garantiza entrevistas?",
          answer:
            "No. HireKit no puede garantizar entrevistas ni ofertas de trabajo. Está diseñado para ayudarte a crear candidaturas más relevantes y ahorrar tiempo.",
        },
        {
          question: "¿HireKit sirve para cualquier tipo de trabajo?",
          answer:
            "Sí. Puedes utilizar HireKit para diferentes sectores y tipos de puestos proporcionando la oferta y tu experiencia.",
        },
        {
          question: "¿Puedo utilizar mi propio CV?",
          answer:
            "Sí. Puedes utilizar tu CV actual como base para crear una candidatura personalizada.",
        },
      ],
    },

    final: {
      eyebrow: "Tu próxima candidatura",
      title: "Haz que cada candidatura cuente.",
      description:
        "Convierte la información que ya tienes en una candidatura creada para la oportunidad que tienes delante.",
      button: "Empezar con HireKit",
    },

    footer: {
      tagline: "Aplica mejor. Avanza más rápido.",
      product: "Producto",
      company: "HireKit AI",
      rights: "Todos los derechos reservados.",
    },
  },
};

const steps = [
  {
    icon: Upload,
  },
  {
    icon: Target,
  },
  {
    icon: Sparkles,
  },
];

const featureIcons = [
  FileText,
  MessageSquare,
  Check,
  Target,
  MessageSquare,
  Zap,
];

function App() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [openFaq, setOpenFaq] = useState(null);

  const t = translations[language];
  const isLight = theme === "light";

  useEffect(() => {
    const savedLanguage = localStorage.getItem("hirekit-language");
    const savedTheme = localStorage.getItem("hirekit-theme");

    if (savedLanguage === "en" || savedLanguage === "es") {
      setLanguage(savedLanguage);
    }

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.backgroundColor = isLight
      ? "#f5f5f7"
      : "#050505";

    document.body.style.backgroundColor = isLight
      ? "#f5f5f7"
      : "#050505";

    document.documentElement.style.colorScheme = isLight
      ? "light"
      : "dark";
  }, [isLight]);

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    localStorage.setItem("hirekit-language", nextLanguage);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("hirekit-theme", nextTheme);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const themeClasses = {
    page: isLight
      ? "bg-[#f5f5f7] text-[#111111]"
      : "bg-[#050505] text-white",

    nav: isLight
      ? "border-black/10 bg-white/75"
      : "border-white/10 bg-black/60",

    mutedText: isLight
      ? "text-black/60"
      : "text-white/60",

    softText: isLight
      ? "text-black/70"
      : "text-white/70",

    faintText: isLight
      ? "text-black/45"
      : "text-white/45",

    border: isLight
      ? "border-black/10"
      : "border-white/10",

    card: isLight
      ? "border-black/10 bg-white/70"
      : "border-white/10 bg-white/[0.035]",

    buttonSecondary: isLight
      ? "border-black/10 bg-black/[0.03] text-black hover:bg-black/[0.06]"
      : "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]",

    divider: isLight
      ? "border-black/10"
      : "border-white/10",
  };

  return (
    <div
      className={`relative isolate min-h-screen overflow-x-hidden transition-colors duration-500 selection:bg-black selection:text-white ${
        themeClasses.page
      }`}
    >
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className={`absolute left-1/2 top-[-300px] h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[140px] transition-opacity duration-700 ${
            isLight
              ? "bg-blue-400/10"
              : "bg-blue-500/[0.08]"
          }`}
        />

        <div
          className={`absolute right-[-250px] top-[35%] h-[500px] w-[500px] rounded-full blur-[150px] transition-opacity duration-700 ${
            isLight
              ? "bg-violet-400/10"
              : "bg-violet-500/[0.06]"
          }`}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav
          className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-500 ${themeClasses.nav}`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
            <button
              onClick={() => scrollToSection("top")}
              className="flex items-center gap-2"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold ${
                  isLight
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                H
              </div>

              <span className="text-sm font-semibold tracking-tight">
                HireKit
              </span>
            </button>

            <div className="hidden items-center gap-7 md:flex">
              <button
                onClick={() => scrollToSection("how")}
                className={`text-sm transition-colors ${
                  themeClasses.mutedText
                } hover:text-current`}
              >
                {t.nav.how}
              </button>

              <button
                onClick={() => scrollToSection("features")}
                className={`text-sm transition-colors ${
                  themeClasses.mutedText
                } hover:text-current`}
              >
                {t.nav.features}
              </button>

              <button
                onClick={() => scrollToSection("pricing")}
                className={`text-sm transition-colors ${
                  themeClasses.mutedText
                } hover:text-current`}
              >
                {t.nav.pricing}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Language */}
              <div
                className={`flex items-center rounded-full border p-0.5 ${themeClasses.border}`}
              >
                <button
                  onClick={() => changeLanguage("en")}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                    language === "en"
                      ? isLight
                        ? "bg-black text-white"
                        : "bg-white text-black"
                      : themeClasses.mutedText
                  }`}
                >
                  EN
                </button>

                <button
                  onClick={() => changeLanguage("es")}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                    language === "es"
                      ? isLight
                        ? "bg-black text-white"
                        : "bg-white text-black"
                      : themeClasses.mutedText
                  }`}
                >
                  ES
                </button>
              </div>

              {/* Theme */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${themeClasses.border} ${themeClasses.buttonSecondary}`}
              >
                {isLight ? (
                  <Moon size={16} />
                ) : (
                  <Sun size={16} />
                )}
              </button>

              <button
                onClick={() => window.open(WHOP_URL, "_blank")}
                className={`hidden rounded-full px-4 py-2 text-sm font-medium transition sm:block ${
                  isLight
                    ? "bg-black text-white hover:bg-black/85"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {t.nav.getStarted}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section
          id="top"
          className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44 lg:pb-40"
        >
          <div className="mx-auto max-w-5xl text-center">
            <div
              className={`mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xl ${themeClasses.border} ${
                isLight
                  ? "bg-black/[0.03] text-black/65"
                  : "bg-white/[0.04] text-white/65"
              }`}
            >
              <Sparkles size={13} />
              {t.hero.eyebrow}
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-[92px] lg:leading-[0.98]">
              {t.hero.title}
              <br />
              <span
                className={
                  isLight
                    ? "text-black/45"
                    : "text-white/45"
                }
              >
                {t.hero.titleAccent}
              </span>
            </h1>

            <p
              className={`mx-auto mt-8 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${themeClasses.mutedText}`}
            >
              {t.hero.description}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => window.open(WHOP_URL, "_blank")}
                className={`group flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition sm:w-auto ${
                  isLight
                    ? "bg-black text-white hover:bg-black/85"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {t.hero.primary}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>

              <button
                onClick={() => scrollToSection("how")}
                className={`w-full rounded-full border px-6 py-3.5 text-sm font-medium transition sm:w-auto ${themeClasses.buttonSecondary}`}
              >
                {t.hero.secondary}
              </button>
            </div>

            <p
              className={`mt-5 text-xs ${themeClasses.faintText}`}
            >
              {t.hero.note}
            </p>
          </div>

          {/* Product Mockup */}
          <div className="mx-auto mt-20 max-w-6xl sm:mt-28">
            <div
              className={`relative overflow-hidden rounded-[28px] border p-3 shadow-2xl backdrop-blur-xl sm:rounded-[36px] sm:p-4 ${themeClasses.border} ${
                isLight
                  ? "bg-white/70 shadow-black/10"
                  : "bg-white/[0.025] shadow-black"
              }`}
            >
              <div
                className={`overflow-hidden rounded-[22px] border sm:rounded-[28px] ${themeClasses.border} ${
                  isLight
                    ? "bg-[#f8f8fa]"
                    : "bg-[#090909]"
                }`}
              >
                <div
                  className={`flex h-11 items-center gap-1.5 border-b px-4 ${themeClasses.border}`}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>

                <div className="grid min-h-[430px] grid-cols-1 md:grid-cols-3">
                  {/* Resume */}
                  <div
                    className={`border-b p-6 md:border-b-0 md:border-r sm:p-8 ${themeClasses.border}`}
                  >
                    <div
                      className={`mb-5 text-xs font-medium ${themeClasses.faintText}`}
                    >
                      {t.mockup.resume}
                    </div>

                    <div
                      className={`rounded-2xl border p-5 ${themeClasses.border} ${
                        isLight
                          ? "bg-white"
                          : "bg-white/[0.025]"
                      }`}
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <div>
                          <div className="h-2.5 w-24 rounded-full bg-current opacity-80" />
                          <div
                            className={`mt-2 h-1.5 w-16 rounded-full ${
                              isLight
                                ? "bg-black/20"
                                : "bg-white/20"
                            }`}
                          />
                        </div>

                        <FileText
                          size={18}
                          className={themeClasses.faintText}
                        />
                      </div>

                      <div className="space-y-3">
                        {[80, 95, 65, 88, 72, 92].map(
                          (width, index) => (
                            <div
                              key={index}
                              className={`h-1.5 rounded-full ${
                                isLight
                                  ? "bg-black/10"
                                  : "bg-white/10"
                              }`}
                              style={{ width: `${width}%` }}
                            />
                          )
                        )}
                      </div>

                      <div className="mt-7 space-y-2">
                        <div
                          className={`h-1.5 w-20 rounded-full ${
                            isLight
                              ? "bg-black/20"
                              : "bg-white/20"
                          }`}
                        />
                        <div
                          className={`h-1.5 w-full rounded-full ${
                            isLight
                              ? "bg-black/10"
                              : "bg-white/10"
                          }`}
                        />
                        <div
                          className={`h-1.5 w-4/5 rounded-full ${
                            isLight
                              ? "bg-black/10"
                              : "bg-white/10"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* AI */}
                  <div
                    className={`relative flex flex-col items-center justify-center border-b p-6 md:border-b-0 md:border-r sm:p-8 ${themeClasses.border}`}
                  >
                    <div
                      className={`mb-5 text-xs font-medium ${themeClasses.faintText}`}
                    >
                      {t.mockup.ai}
                    </div>

                    <div
                      className={`flex h-24 w-24 items-center justify-center rounded-[28px] border shadow-xl ${
                        isLight
                          ? "border-black/10 bg-white shadow-black/10"
                          : "border-white/10 bg-white/[0.05] shadow-black"
                      }`}
                    >
                      <Sparkles
                        size={32}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div
                      className={`mt-6 flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] ${themeClasses.border} ${
                        isLight
                          ? "bg-black/[0.03]"
                          : "bg-white/[0.03]"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                      {t.mockup.tailored}
                    </div>
                  </div>

                  {/* Result */}
                  <div className="p-6 sm:p-8">
                    <div
                      className={`mb-5 text-xs font-medium ${themeClasses.faintText}`}
                    >
                      {t.mockup.result}
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          icon: FileText,
                          label: t.mockup.resume,
                        },
                        {
                          icon: FileText,
                          label: t.mockup.cover,
                        },
                        {
                          icon: MessageSquare,
                          label: t.mockup.answers,
                        },
                        {
                          icon: MessageSquare,
                          label: t.mockup.message,
                        },
                        {
                          icon: Target,
                          label: t.mockup.interview,
                        },
                      ].map((item, index) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${themeClasses.border} ${
                              isLight
                                ? "bg-white"
                                : "bg-white/[0.025]"
                            }`}
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                                isLight
                                  ? "bg-black/[0.05]"
                                  : "bg-white/[0.06]"
                              }`}
                            >
                              <Icon size={15} />
                            </div>

                            <span className="text-xs font-medium">
                              {item.label}
                            </span>

                            <Check
                              size={14}
                              className={`ml-auto ${
                                themeClasses.faintText
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how"
          className={`scroll-mt-24 border-y ${themeClasses.divider}`}
        >
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
            <div className="max-w-3xl">
              <p
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${themeClasses.faintText}`}
              >
                {t.how.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {t.how.title}
              </h2>

              <p
                className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${themeClasses.mutedText}`}
              >
                {t.how.description}
              </p>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border bg-current/10 md:grid-cols-3">
              {t.steps.map((step, index) => {
                const Icon = steps[index].icon;

                return (
                  <div
                    key={step.number}
                    className={`p-7 sm:p-9 ${
                      isLight
                        ? "bg-[#f5f5f7]"
                        : "bg-[#050505]"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${themeClasses.border} ${
                          isLight
                            ? "bg-white"
                            : "bg-white/[0.04]"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <span
                        className={`text-xs font-medium ${themeClasses.faintText}`}
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>

                    <p
                      className={`mt-3 text-sm leading-6 ${themeClasses.mutedText}`}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="max-w-3xl">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${themeClasses.faintText}`}
            >
              {t.why.eyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              {t.why.title}
            </h2>

            <p
              className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${themeClasses.mutedText}`}
            >
              {t.why.description}
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            <div
              className={`rounded-3xl border p-7 sm:p-9 ${themeClasses.border} ${
                isLight
                  ? "bg-white"
                  : "bg-white/[0.025]"
              }`}
            >
              <div
                className={`text-sm font-semibold ${themeClasses.mutedText}`}
              >
                {t.why.generic}
              </div>

              <div className="mt-7 space-y-4">
                {t.why.genericItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${isLight ? "bg-black/30" : "bg-white/30"}`}
                    />
                    <span
                      className={`text-sm ${themeClasses.mutedText}`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`rounded-3xl border p-7 sm:p-9 ${themeClasses.border} ${
                isLight
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              <div className="text-sm font-semibold opacity-60">
                {t.why.hirekit}
              </div>

              <div className="mt-7 space-y-4">
                {t.why.hirekitItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        isLight
                          ? "bg-white/10"
                          : "bg-black/10"
                      }`}
                    >
                      <Check size={12} />
                    </div>

                    <span className="text-sm opacity-85">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Starting options */}
        <section
          className={`border-y ${themeClasses.divider}`}
        >
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
            <div className="max-w-3xl">
              <p
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${themeClasses.faintText}`}
              >
                {t.options.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {t.options.title}
              </h2>

              <p
                className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${themeClasses.mutedText}`}
              >
                {t.options.description}
              </p>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: t.options.existingTitle,
                  description: t.options.existingDescription,
                  icon: Upload,
                },
                {
                  title: t.options.newTitle,
                  description: t.options.newDescription,
                  icon: FileText,
                },
                {
                  title: t.options.bothTitle,
                  description: t.options.bothDescription,
                  icon: Sparkles,
                },
              ].map((option) => {
                const Icon = option.icon;

                return (
                  <div
                    key={option.title}
                    className={`flex flex-col rounded-3xl border p-7 sm:p-8 ${themeClasses.border} ${
                      isLight
                        ? "bg-white"
                        : "bg-white/[0.025]"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${themeClasses.border}`}
                    >
                      <Icon size={18} />
                    </div>

                    <h3 className="mt-7 text-xl font-semibold tracking-tight">
                      {option.title}
                    </h3>

                    <p
                      className={`mt-3 min-h-[72px] text-sm leading-6 ${themeClasses.mutedText}`}
                    >
                      {option.description}
                    </p>

                    <button
                      onClick={() => window.open(WHOP_URL, "_blank")}
                      className={`group mt-7 flex items-center gap-2 text-sm font-semibold`}
                    >
                      {t.options.button}
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="scroll-mt-24 mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="max-w-3xl">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${themeClasses.faintText}`}
            >
              {t.features.eyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              {t.features.title}
            </h2>

            <p
              className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${themeClasses.mutedText}`}
            >
              {t.features.description}
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((item, index) => {
              const Icon = featureIcons[index];

              return (
                <div
                  key={item.title}
                  className={`rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1 ${themeClasses.border} ${
                    isLight
                      ? "bg-white hover:shadow-xl hover:shadow-black/5"
                      : "bg-white/[0.025] hover:bg-white/[0.04]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${themeClasses.border}`}
                  >
                    <Icon size={17} />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p
                    className={`mt-3 text-sm leading-6 ${themeClasses.mutedText}`}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className={`scroll-mt-24 border-y ${themeClasses.divider}`}
        >
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <p
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${themeClasses.faintText}`}
              >
                {t.pricing.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {t.pricing.title}
              </h2>

              <p
                className={`mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg ${themeClasses.mutedText}`}
              >
                {t.pricing.description}
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-2">
              {/* Monthly */}
              <div
                className={`rounded-3xl border p-7 sm:p-9 ${themeClasses.border} ${
                  isLight
                    ? "bg-white"
                    : "bg-white/[0.025]"
                }`}
              >
                <div className="text-sm font-semibold">
                  {t.pricing.monthly}
                </div>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-5xl font-semibold tracking-[-0.05em]">
                    {t.pricing.monthlyPrice}
                  </span>

                  <span
                    className={`mb-1 text-sm ${themeClasses.mutedText}`}
                  >
                    {t.pricing.monthlyPeriod}
                  </span>
                </div>

                <p
                  className={`mt-4 text-sm leading-6 ${themeClasses.mutedText}`}
                >
                  {t.pricing.monthlyDescription}
                </p>

                <div className="my-8 h-px bg-current opacity-10" />

                <div className="space-y-3">
                  {t.pricing.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <Check size={15} />
                      <span
                        className={`text-sm ${themeClasses.mutedText}`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => window.open(WHOP_URL, "_blank")}
                  className={`mt-9 w-full rounded-full border px-5 py-3.5 text-sm font-semibold transition ${themeClasses.buttonSecondary}`}
                >
                  {t.pricing.button}
                </button>
              </div>

              {/* Six months */}
              <div
                className={`relative rounded-3xl border p-7 sm:p-9 ${
                  isLight
                    ? "border-black bg-black text-white"
                    : "border-white bg-white text-black"
                }`}
              >
                <div
                  className={`absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                    isLight
                      ? "bg-white/10 text-white"
                      : "bg-black/10 text-black"
                  }`}
                >
                  {t.pricing.bestValue}
                </div>

                <div className="text-sm font-semibold opacity-75">
                  {t.pricing.sixMonths}
                </div>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-5xl font-semibold tracking-[-0.05em]">
                    {t.pricing.sixMonthsPrice}
                  </span>

                  <span className="mb-1 text-sm opacity-60">
                    {t.pricing.sixMonthsPeriod}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 opacity-60">
                  {t.pricing.sixMonthsDescription}
                </p>

                <div className="my-8 h-px bg-current opacity-10" />

                <div className="space-y-3">
                  {t.pricing.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <Check size={15} />
                      <span className="text-sm opacity-75">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => window.open(WHOP_URL, "_blank")}
                  className={`mt-9 w-full rounded-full px-5 py-3.5 text-sm font-semibold transition ${
                    isLight
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/90"
                  }`}
                >
                  {t.pricing.button}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="text-center">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${themeClasses.faintText}`}
            >
              {t.faq.eyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              {t.faq.title}
            </h2>
          </div>

          <div className="mt-14">
            {t.faq.items.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={item.question}
                  className={`border-b ${themeClasses.divider}`}
                >
                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-sm font-semibold sm:text-base">
                      {item.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] pb-6"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`max-w-2xl text-sm leading-6 ${themeClasses.mutedText}`}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-5 pb-24 sm:px-8 sm:pb-32">
          <div
            className={`mx-auto max-w-6xl overflow-hidden rounded-[32px] border px-6 py-20 text-center sm:px-12 sm:py-28 ${themeClasses.border} ${
              isLight
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-50">
              {t.final.eyebrow}
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
              {t.final.title}
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 opacity-60 sm:text-lg">
              {t.final.description}
            </p>

            <button
              onClick={() => window.open(WHOP_URL, "_blank")}
              className={`group mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                isLight
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-black text-white hover:bg-black/90"
              }`}
            >
              {t.final.button}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`border-t ${themeClasses.divider}`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold ${
                    isLight
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  H
                </div>

                <span className="text-sm font-semibold">
                  HireKit AI
                </span>
              </div>

              <p
                className={`mt-3 text-xs ${themeClasses.faintText}`}
              >
                {t.footer.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs">
              <button
                onClick={() => scrollToSection("how")}
                className={themeClasses.mutedText}
              >
                {t.nav.how}
              </button>

              <button
                onClick={() => scrollToSection("features")}
                className={themeClasses.mutedText}
              >
                {t.nav.features}
              </button>

              <button
                onClick={() => scrollToSection("pricing")}
                className={themeClasses.mutedText}
              >
                {t.nav.pricing}
              </button>

              <button
                onClick={() => window.open(WHOP_URL, "_blank")}
                className={themeClasses.mutedText}
              >
                {t.nav.getStarted}
              </button>
            </div>

            <p
              className={`text-xs ${themeClasses.faintText}`}
            >
              © {new Date().getFullYear()} {t.footer.company}.{" "}
              {t.footer.rights}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;