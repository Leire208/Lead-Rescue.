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
      howItWorks: "How it works",
      features: "Features",
      pricing: "Pricing",
      getStarted: "Get started",
    },

    hero: {
      eyebrow: "AI-POWERED JOB APPLICATIONS",
      title1: "Stop applying.",
      title2: "Start getting noticed.",
      description:
        "HireKit AI turns your resume and a job description into a tailored application package — in seconds.",
      primary: "Get started",
      secondary: "See how it works",
      trusted: "Built for modern job seekers",
    },

    mockup: {
      resume: "Your resume",
      job: "Job description",
      analyzing: "Analyzing",
      generating: "Generating your application",
      complete: "Application ready",
      tailored: "Tailored to the role",
      coverLetter: "Cover letter",
      interview: "Interview prep",
      recruiter: "Recruiter message",
    },

    how: {
      eyebrow: "HOW IT WORKS",
      title1: "From resume to",
      title2: "ready-to-apply.",
      description:
        "No endless editing. No staring at a blank document. HireKit handles the heavy lifting.",
      step1Title: "Add your resume",
      step1Description:
        "Upload your existing resume and let HireKit understand your experience.",
      step2Title: "Add the job",
      step2Description:
        "Paste the job description for the role you actually want.",
      step3Title: "Get your application",
      step3Description:
        "Receive a tailored application package built around that specific role.",
    },

    why: {
      eyebrow: "WHY HIREKIT",
      title1: "One job.",
      title2: "One tailored application.",
      description:
        "Generic applications get ignored. HireKit helps you make every application relevant to the role.",
      before: "Without HireKit",
      after: "With HireKit",
      beforeItems: [
        "Rewrite your resume manually",
        "Write every cover letter from scratch",
        "Repeat the same research",
        "Spend hours preparing for interviews",
      ],
      afterItems: [
        "Tailored resume for the role",
        "Personalized cover letter",
        "Relevant application answers",
        "Focused interview preparation",
      ],
    },

    options: {
      eyebrow: "START HERE",
      title1: "Choose your starting point.",
      description:
        "Whether you already have a resume or you're starting from zero, HireKit is built to get you moving.",
      existingTitle: "I already have a resume",
      existingDescription:
        "Upload your resume, add the job description, and get a tailored application.",
      existingButton: "Use my resume",
      scratchTitle: "I need a resume",
      scratchDescription:
        "Build your resume from scratch with a guided process designed for job applications.",
      scratchButton: "Start from scratch",
    },

    features: {
      eyebrow: "FEATURES",
      title1: "Everything you need",
      title2: "to apply better.",
      description:
        "One focused toolkit for the parts of the job search that take the most time.",
      resumeTitle: "Tailored resumes",
      resumeDescription:
        "Adapt your experience to the role without losing your professional story.",
      coverTitle: "Cover letters",
      coverDescription:
        "Create relevant, role-specific cover letters instead of generic templates.",
      answersTitle: "Application answers",
      answersDescription:
        "Generate stronger responses to common application questions.",
      interviewTitle: "Interview preparation",
      interviewDescription:
        "Prepare with focused questions, talking points, and role-specific guidance.",
      recruiterTitle: "Recruiter messages",
      recruiterDescription:
        "Write concise outreach messages that actually fit the opportunity.",
      speedTitle: "Built for speed",
      speedDescription:
        "Go from job description to application-ready materials in minutes.",
    },

    pricing: {
      eyebrow: "PRICING",
      title1: "Simple pricing.",
      title2: "Choose how far you want to go.",
      description:
        "Start simple or unlock the complete HireKit experience for your job search.",
      monthly: "Monthly",
      monthlyLabel: "For trying HireKit or a short-term job search.",
      monthlyPrice: "$4.99",
      perMonth: "/ month",
      monthlyIncluded: "Includes",
      monthlyButton: "Start monthly",
      sixMonths: "6 Months",
      sixLabel:
        "For an active job search. Get the complete experience for less.",
      sixPrice: "$19.99",
      perSixMonths: "/ 6 months",
      equivalent: "$3.33/month equivalent",
      save: "SAVE 33%",
      savings: "You save $9.95 vs. paying monthly",
      bestValue: "BEST VALUE",
      sixButton: "Get 6 months",
      included: "What's included",
      basicResume: "Tailored resume",
      basicCover: "Cover letters",
      basicApplications: "Application tools",
      unlimited: "Unlimited applications",
      tailored: "Tailored resume",
      coverLetters: "Cover letters",
      interview: "Interview preparation",
      applicationAnswers: "Application answers",
      recruiter: "Recruiter messages",
    },

    faq: {
      eyebrow: "FAQ",
      title1: "Questions?",
      title2: "We've got answers.",
      q1: "What is HireKit AI?",
      a1: "HireKit AI is a job application tool that helps you create tailored application materials from your resume and a specific job description.",
      q2: "Do I need an existing resume?",
      a2: "No. You can either start with an existing resume or build one from scratch using a guided process.",
      q3: "Is HireKit AI only for one type of job?",
      a3: "No. HireKit is designed to help with a wide range of professional roles and industries.",
      q4: "Does HireKit guarantee interviews?",
      a4: "No. No tool can honestly guarantee an interview. HireKit is designed to help you create stronger, more relevant applications and prepare more effectively.",
      q5: "Can I use HireKit for multiple applications?",
      a5: "The 6-month plan is designed for ongoing job searching and multiple applications.",
    },

    final: {
      eyebrow: "READY WHEN YOU ARE",
      title1: "Your next opportunity",
      title2: "starts with a better application.",
      description:
        "Spend less time rewriting. Spend more time applying to the roles that actually matter.",
      button: "Get HireKit AI",
    },

    footer: {
      description:
        "AI-powered tools for smarter, more tailored job applications.",
      product: "Product",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      copyright: "© 2026 HireKit AI. All rights reserved.",
    },
  },

  es: {
    nav: {
      howItWorks: "Cómo funciona",
      features: "Funciones",
      pricing: "Precios",
      getStarted: "Empezar",
    },

    hero: {
      eyebrow: "CANDIDATURAS POTENCIADAS POR IA",
      title1: "Deja de enviar CVs.",
      title2: "Empieza a destacar.",
      description:
        "HireKit AI convierte tu CV y una oferta de trabajo en una candidatura personalizada — en segundos.",
      primary: "Empezar",
      secondary: "Ver cómo funciona",
      trusted: "Creado para quienes buscan trabajo hoy",
    },

    mockup: {
      resume: "Tu CV",
      job: "Oferta de trabajo",
      analyzing: "Analizando",
      generating: "Generando tu candidatura",
      complete: "Candidatura lista",
      tailored: "Adaptada al puesto",
      coverLetter: "Carta de presentación",
      interview: "Preparación de entrevista",
      recruiter: "Mensaje para recruiter",
    },

    how: {
      eyebrow: "CÓMO FUNCIONA",
      title1: "De tu CV a",
      title2: "candidatura lista.",
      description:
        "Sin editar durante horas. Sin quedarte mirando un documento en blanco. HireKit hace el trabajo pesado.",
      step1Title: "Añade tu CV",
      step1Description:
        "Sube tu CV actual y deja que HireKit entienda tu experiencia.",
      step2Title: "Añade la oferta",
      step2Description:
        "Pega la descripción del puesto al que realmente quieres optar.",
      step3Title: "Obtén tu candidatura",
      step3Description:
        "Recibe un paquete personalizado creado específicamente para ese puesto.",
    },

    why: {
      eyebrow: "POR QUÉ HIREKIT",
      title1: "Un puesto.",
      title2: "Una candidatura personalizada.",
      description:
        "Las candidaturas genéricas pasan desapercibidas. HireKit te ayuda a hacer que cada candidatura sea relevante para el puesto.",
      before: "Sin HireKit",
      after: "Con HireKit",
      beforeItems: [
        "Reescribir el CV manualmente",
        "Escribir cada carta desde cero",
        "Repetir la misma investigación",
        "Pasar horas preparando entrevistas",
      ],
      afterItems: [
        "CV adaptado al puesto",
        "Carta de presentación personalizada",
        "Respuestas relevantes para la candidatura",
        "Preparación de entrevista enfocada",
      ],
    },

    options: {
      eyebrow: "EMPIEZA AQUÍ",
      title1: "Elige cómo quieres empezar.",
      description:
        "Tanto si ya tienes CV como si empiezas desde cero, HireKit está diseñado para ponerte en marcha.",
      existingTitle: "Ya tengo un CV",
      existingDescription:
        "Sube tu CV, añade la oferta de trabajo y obtén una candidatura personalizada.",
      existingButton: "Usar mi CV",
      scratchTitle: "Necesito un CV",
      scratchDescription:
        "Crea tu CV desde cero mediante un proceso guiado pensado para solicitudes de empleo.",
      scratchButton: "Empezar desde cero",
    },

    features: {
      eyebrow: "FUNCIONES",
      title1: "Todo lo que necesitas",
      title2: "para solicitar mejor.",
      description:
        "Una herramienta centrada en las partes de la búsqueda de empleo que más tiempo consumen.",
      resumeTitle: "CVs personalizados",
      resumeDescription:
        "Adapta tu experiencia al puesto sin perder tu historia profesional.",
      coverTitle: "Cartas de presentación",
      coverDescription:
        "Crea cartas relevantes y específicas para cada puesto en lugar de usar plantillas genéricas.",
      answersTitle: "Respuestas de candidatura",
      answersDescription:
        "Genera respuestas más sólidas para las preguntas habituales de las candidaturas.",
      interviewTitle: "Preparación de entrevistas",
      interviewDescription:
        "Prepárate con preguntas, puntos clave y orientación específica para el puesto.",
      recruiterTitle: "Mensajes para recruiters",
      recruiterDescription:
        "Escribe mensajes breves de contacto que realmente encajen con la oportunidad.",
      speedTitle: "Creado para ir rápido",
      speedDescription:
        "Pasa de una oferta de trabajo a materiales listos para usar en minutos.",
    },

    pricing: {
      eyebrow: "PRECIOS",
      title1: "Precios sencillos.",
      title2: "Tú decides cuánto quieres.",
      description:
        "Empieza con lo básico o desbloquea la experiencia completa de HireKit para tu búsqueda de empleo.",
      monthly: "Mensual",
      monthlyLabel: "Para probar HireKit o para una búsqueda puntual.",
      monthlyPrice: "$4.99",
      perMonth: "/ mes",
      monthlyIncluded: "Incluye",
      monthlyButton: "Empezar mensual",
      sixMonths: "6 meses",
      sixLabel:
        "Para una búsqueda activa. Obtén la experiencia completa por menos.",
      sixPrice: "$19.99",
      perSixMonths: "/ 6 meses",
      equivalent: "Equivale a $3.33/mes",
      save: "AHORRA UN 33%",
      savings: "Ahorras $9.95 frente a pagar mes a mes",
      bestValue: "MEJOR OPCIÓN",
      sixButton: "Obtener 6 meses",
      included: "Qué incluye",
      basicResume: "CV personalizado",
      basicCover: "Cartas de presentación",
      basicApplications: "Herramientas de candidatura",
      unlimited: "Candidaturas ilimitadas",
      tailored: "CV personalizado",
      coverLetters: "Cartas de presentación",
      interview: "Preparación de entrevistas",
      applicationAnswers: "Respuestas de candidatura",
      recruiter: "Mensajes para recruiters",
    },

    faq: {
      eyebrow: "PREGUNTAS FRECUENTES",
      title1: "¿Tienes preguntas?",
      title2: "Tenemos respuestas.",
      q1: "¿Qué es HireKit AI?",
      a1: "HireKit AI es una herramienta para solicitudes de empleo que te ayuda a crear materiales personalizados a partir de tu CV y de una oferta de trabajo concreta.",
      q2: "¿Necesito tener un CV?",
      a2: "No. Puedes empezar con un CV existente o crear uno desde cero mediante un proceso guiado.",
      q3: "¿HireKit AI sirve solo para un tipo de trabajo?",
      a3: "No. HireKit está diseñado para ayudar con una amplia variedad de puestos profesionales e industrias.",
      q4: "¿HireKit garantiza entrevistas?",
      a4: "No. Ninguna herramienta puede garantizar honestamente una entrevista. HireKit está diseñado para ayudarte a crear candidaturas más sólidas y relevantes y a prepararte mejor.",
      q5: "¿Puedo usar HireKit para varias candidaturas?",
      a5: "El plan de 6 meses está pensado para búsquedas de empleo activas y múltiples candidaturas.",
    },

    final: {
      eyebrow: "CUANDO TÚ QUIERAS",
      title1: "Tu próxima oportunidad",
      title2: "empieza con una mejor candidatura.",
      description:
        "Dedica menos tiempo a reescribir. Dedica más tiempo a solicitar los puestos que realmente importan.",
      button: "Obtener HireKit AI",
    },

    footer: {
      description:
        "Herramientas con IA para crear candidaturas más inteligentes y personalizadas.",
      product: "Producto",
      legal: "Legal",
      privacy: "Privacidad",
      terms: "Términos",
      copyright: "© 2026 HireKit AI. Todos los derechos reservados.",
    },
  },
};

const steps = [
  {
    number: "01",
    icon: Upload,
    key: "step1",
  },
  {
    number: "02",
    icon: Target,
    key: "step2",
  },
  {
    number: "03",
    icon: Sparkles,
    key: "step3",
  },
];

const featureItems = [
  {
    icon: FileText,
    title: "resumeTitle",
    description: "resumeDescription",
  },
  {
    icon: MessageSquare,
    title: "coverTitle",
    description: "coverDescription",
  },
  {
    icon: Check,
    title: "answersTitle",
    description: "answersDescription",
  },
  {
    icon: Target,
    title: "interviewTitle",
    description: "interviewDescription",
  },
  {
    icon: MessageSquare,
    title: "recruiterTitle",
    description: "recruiterDescription",
  },
  {
    icon: Zap,
    title: "speedTitle",
    description: "speedDescription",
  },
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
  }, [isLight]);

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    localStorage.setItem("hirekit-language", nextLanguage);
  };

  const toggleTheme = () => {
    const nextTheme = isLight ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("hirekit-theme", nextTheme);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const themeClasses = {
    page: isLight
      ? "bg-[#f5f5f7] text-[#111111]"
      : "bg-[#050505] text-white",

    nav: isLight
      ? "border-black/[0.07] bg-white/75"
      : "border-white/[0.06] bg-[#050505]/75",

    mutedText: isLight ? "text-black/50" : "text-white/50",
    softText: isLight ? "text-black/40" : "text-white/40",
    faintText: isLight ? "text-black/30" : "text-white/30",

    border: isLight ? "border-black/[0.08]" : "border-white/[0.08]",

    card: isLight
      ? "border-black/[0.08] bg-white"
      : "border-white/[0.08] bg-white/[0.025]",

    buttonSecondary: isLight
      ? "border-black/10 bg-black/[0.03] text-black/70 hover:border-black/20 hover:bg-black/[0.06] hover:text-black"
      : "border-white/10 bg-white/[0.03] text-white/75 hover:border-white/20 hover:bg-white/[0.06] hover:text-white",

    divider: isLight ? "border-black/[0.07]" : "border-white/[0.06]",
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 selection:bg-black selection:text-white ${
        themeClasses.page
      }`}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute left-1/2 top-[-280px] h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[140px] ${
            isLight ? "bg-blue-400/[0.08]" : "bg-blue-500/[0.06]"
          }`}
        />

        <div
          className={`absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full blur-[140px] ${
            isLight ? "bg-purple-400/[0.06]" : "bg-purple-500/[0.05]"
          }`}
        />
      </div>

      {/* NAVBAR */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-500 ${themeClasses.nav}`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                isLight ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <Sparkles size={16} strokeWidth={2.4} />
            </div>

            <span
              className={`text-[15px] font-semibold tracking-[-0.02em] ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              HireKit AI
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["how-it-works", t.nav.howItWorks],
              ["features", t.nav.features],
              ["pricing", t.nav.pricing],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-sm transition-colors ${
                  isLight
                    ? "text-black/45 hover:text-black"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                isLight
                  ? "border-black/10 bg-black/[0.04] text-black/60 hover:bg-black/[0.08] hover:text-black"
                  : "border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* LANGUAGE */}
            <div
              className={`flex items-center rounded-full border p-1 ${
                isLight
                  ? "border-black/10 bg-black/[0.035]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <button
                onClick={() => changeLanguage("en")}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                  language === "en"
                    ? isLight
                      ? "bg-black text-white"
                      : "bg-white text-black"
                    : isLight
                    ? "text-black/40 hover:text-black"
                    : "text-white/45 hover:text-white"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => changeLanguage("es")}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                  language === "es"
                    ? isLight
                      ? "bg-black text-white"
                      : "bg-white text-black"
                    : isLight
                    ? "text-black/40 hover:text-black"
                    : "text-white/45 hover:text-white"
                }`}
              >
                ES
              </button>
            </div>

            <a
              href={WHOP_URL}
              target="_blank"
              rel="noreferrer"
              className={`hidden rounded-full px-4 py-2 text-xs font-semibold transition sm:block ${
                isLight
                  ? "bg-black text-white hover:bg-black/90"
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
              {t.nav.getStarted}
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="relative px-5 pb-20 pt-40 sm:px-8 sm:pt-48">
          <div className="mx-auto max-w-6xl text-center">
            <div
              className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 ${
                isLight
                  ? "border-black/10 bg-black/[0.035]"
                  : "border-white/10 bg-white/[0.035]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

              <span
                className={`text-[10px] font-semibold tracking-[0.18em] ${
                  isLight ? "text-black/50" : "text-white/55"
                }`}
              >
                {t.hero.eyebrow}
              </span>
            </div>

            <h1
              className={`mx-auto max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[92px] ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              {t.hero.title1}
              <br />
              <span className={isLight ? "text-black/40" : "text-white/45"}>
                {t.hero.title2}
              </span>
            </h1>

            <p
              className={`mx-auto mt-8 max-w-2xl text-base leading-7 sm:text-lg ${
                isLight ? "text-black/50" : "text-white/50"
              }`}
            >
              {t.hero.description}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={WHOP_URL}
                target="_blank"
                rel="noreferrer"
                className={`group flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition sm:w-auto ${
                  isLight
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {t.hero.primary}

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>

              <button
                onClick={() => scrollToSection("how-it-works")}
                className={`flex w-full items-center justify-center rounded-full border px-6 py-3.5 text-sm font-medium transition sm:w-auto ${themeClasses.buttonSecondary}`}
              >
                {t.hero.secondary}
              </button>
            </div>

            <div
              className={`mt-7 flex items-center justify-center gap-2 text-xs ${
                isLight ? "text-black/30" : "text-white/30"
              }`}
            >
              <Check size={13} />
              {t.hero.trusted}
            </div>
          </div>

          {/* PRODUCT MOCKUP */}
          <div className="mx-auto mt-20 max-w-5xl">
            <div
              className={`relative overflow-hidden rounded-[28px] border shadow-2xl transition-colors duration-500 ${
                isLight
                  ? "border-black/10 bg-white shadow-black/10"
                  : "border-white/10 bg-[#0b0b0c] shadow-black/50"
              }`}
            >
              <div
                className={`flex h-11 items-center gap-2 border-b px-5 ${
                  isLight ? "border-black/[0.06]" : "border-white/[0.06]"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isLight ? "bg-black/10" : "bg-white/15"
                  }`}
                />
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isLight ? "bg-black/10" : "bg-white/15"
                  }`}
                />
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isLight ? "bg-black/10" : "bg-white/15"
                  }`}
                />

                <div
                  className={`mx-auto hidden rounded-md border px-20 py-1.5 sm:block ${
                    isLight
                      ? "border-black/[0.06] bg-black/[0.025]"
                      : "border-white/[0.05] bg-white/[0.025]"
                  }`}
                >
                  <span
                    className={`text-[9px] ${
                      isLight ? "text-black/25" : "text-white/20"
                    }`}
                  >
                    app.hirekit.ai
                  </span>
                </div>
              </div>

              <div className="grid min-h-[360px] grid-cols-1 gap-0 md:grid-cols-3">
                {/* RESUME */}
                <div
                  className={`border-b p-6 md:border-b-0 md:border-r ${
                    isLight ? "border-black/[0.06]" : "border-white/[0.06]"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className={`text-xs font-medium ${
                        isLight ? "text-black/45" : "text-white/45"
                      }`}
                    >
                      {t.mockup.resume}
                    </span>

                    <FileText
                      size={14}
                      className={isLight ? "text-black/25" : "text-white/25"}
                    />
                  </div>

                  <div className="space-y-3">
                    <div
                      className={`h-2 w-24 rounded-full ${
                        isLight ? "bg-black/15" : "bg-white/15"
                      }`}
                    />

                    <div
                      className={`h-1.5 w-32 rounded-full ${
                        isLight ? "bg-black/[0.07]" : "bg-white/[0.06]"
                      }`}
                    />

                    <div
                      className={`mt-6 h-1.5 w-full rounded-full ${
                        isLight ? "bg-black/[0.07]" : "bg-white/[0.06]"
                      }`}
                    />

                    <div
                      className={`h-1.5 w-[88%] rounded-full ${
                        isLight ? "bg-black/[0.07]" : "bg-white/[0.06]"
                      }`}
                    />

                    <div
                      className={`h-1.5 w-[72%] rounded-full ${
                        isLight ? "bg-black/[0.07]" : "bg-white/[0.06]"
                      }`}
                    />

                    <div className="pt-5">
                      <div
                        className={`h-1.5 w-20 rounded-full ${
                          isLight ? "bg-black/10" : "bg-white/10"
                        }`}
                      />

                      <div
                        className={`mt-3 h-1.5 w-full rounded-full ${
                          isLight ? "bg-black/[0.06]" : "bg-white/[0.05]"
                        }`}
                      />

                      <div
                        className={`mt-2 h-1.5 w-[90%] rounded-full ${
                          isLight ? "bg-black/[0.06]" : "bg-white/[0.05]"
                        }`}
                      />

                      <div
                        className={`mt-2 h-1.5 w-[78%] rounded-full ${
                          isLight ? "bg-black/[0.06]" : "bg-white/[0.05]"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* AI */}
                <div
                  className={`relative flex items-center justify-center border-b p-6 md:border-b-0 md:border-r ${
                    isLight ? "border-black/[0.06]" : "border-white/[0.06]"
                  }`}
                >
                  <div
                    className={`absolute inset-0 ${
                      isLight ? "bg-blue-500/[0.025]" : "bg-blue-500/[0.025]"
                    }`}
                  />

                  <div className="relative flex flex-col items-center text-center">
                    <div
                      className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${
                        isLight
                          ? "border-black/10 bg-black/[0.035]"
                          : "border-white/10 bg-white/[0.05]"
                      }`}
                    >
                      <Sparkles
                        size={23}
                        className={
                          isLight ? "text-black/60" : "text-white/70"
                        }
                      />
                    </div>

                    <span
                      className={`text-xs font-medium ${
                        isLight ? "text-black/65" : "text-white/65"
                      }`}
                    >
                      {t.mockup.analyzing}
                    </span>

                    <div
                      className={`mt-3 h-1 w-28 overflow-hidden rounded-full ${
                        isLight ? "bg-black/[0.06]" : "bg-white/[0.06]"
                      }`}
                    >
                      <div
                        className={`h-full w-2/3 rounded-full ${
                          isLight ? "bg-black/40" : "bg-white/50"
                        }`}
                      />
                    </div>

                    <span
                      className={`mt-3 text-[10px] ${
                        isLight ? "text-black/25" : "text-white/25"
                      }`}
                    >
                      {t.mockup.generating}
                    </span>
                  </div>
                </div>

                {/* RESULT */}
                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className={`text-xs font-medium ${
                        isLight ? "text-black/45" : "text-white/45"
                      }`}
                    >
                      {t.mockup.complete}
                    </span>

                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        isLight ? "bg-black" : "bg-white"
                      }`}
                    >
                      <Check
                        size={11}
                        className={isLight ? "text-white" : "text-black"}
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      t.mockup.tailored,
                      t.mockup.coverLetter,
                      t.mockup.interview,
                      t.mockup.recruiter,
                    ].map((item) => (
                      <div
                        key={item}
                        className={`flex items-center gap-3 rounded-xl border p-3 ${
                          isLight
                            ? "border-black/[0.06] bg-black/[0.025]"
                            : "border-white/[0.06] bg-white/[0.025]"
                        }`}
                      >
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                            isLight ? "bg-black/[0.05]" : "bg-white/[0.05]"
                          }`}
                        >
                          <Check
                            size={12}
                            className={
                              isLight ? "text-black/55" : "text-white/55"
                            }
                          />
                        </div>

                        <span
                          className={`text-[11px] ${
                            isLight ? "text-black/50" : "text-white/50"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className={`scroll-mt-24 border-t px-5 py-28 sm:px-8 ${themeClasses.divider}`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className={`text-[10px] font-semibold tracking-[0.2em] ${themeClasses.faintText}`}>
                {t.how.eyebrow}
              </p>

              <h2
                className={`mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                {t.how.title1}
                <br />
                <span className={isLight ? "text-black/40" : "text-white/40"}>
                  {t.how.title2}
                </span>
              </h2>

              <p
                className={`mt-6 max-w-xl text-sm leading-7 sm:text-base ${themeClasses.softText}`}
              >
                {t.how.description}
              </p>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className={`group rounded-[24px] border p-7 transition duration-300 ${
                      isLight
                        ? "border-black/[0.08] bg-white hover:border-black/[0.15] hover:bg-white"
                        : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.15] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-medium ${
                          isLight ? "text-black/25" : "text-white/25"
                        }`}
                      >
                        {step.number}
                      </span>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                          isLight
                            ? "border-black/[0.08] bg-black/[0.03]"
                            : "border-white/[0.08] bg-white/[0.03]"
                        }`}
                      >
                        <Icon
                          size={17}
                          className={
                            isLight ? "text-black/55" : "text-white/55"
                          }
                        />
                      </div>
                    </div>

                    <h3
                      className={`mt-12 text-lg font-medium tracking-[-0.02em] ${
                        isLight ? "text-black" : "text-white"
                      }`}
                    >
                      {t.how[`${step.key}Title`]}
                    </h3>

                    <p
                      className={`mt-3 text-sm leading-6 ${
                        isLight ? "text-black/40" : "text-white/35"
                      }`}
                    >
                      {t.how[`${step.key}Description`]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="px-5 py-28 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-end gap-10 lg:grid-cols-2">
              <div>
                <p className={`text-[10px] font-semibold tracking-[0.2em] ${themeClasses.faintText}`}>
                  {t.why.eyebrow}
                </p>

                <h2
                  className={`mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl ${
                    isLight ? "text-black" : "text-white"
                  }`}
                >
                  {t.why.title1}
                  <br />
                  <span className={isLight ? "text-black/40" : "text-white/40"}>
                    {t.why.title2}
                  </span>
                </h2>
              </div>

              <p
                className={`max-w-xl text-sm leading-7 lg:justify-self-end ${themeClasses.softText}`}
              >
                {t.why.description}
              </p>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-2">
              <div
                className={`rounded-[26px] border p-7 ${
                  isLight
                    ? "border-black/[0.06] bg-black/[0.02]"
                    : "border-white/[0.06] bg-white/[0.018]"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    isLight ? "text-black/35" : "text-white/35"
                  }`}
                >
                  {t.why.before}
                </p>

                <div className="mt-7 space-y-4">
                  {t.why.beforeItems.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span
                        className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                          isLight ? "bg-black/20" : "bg-white/20"
                        }`}
                      />

                      <span
                        className={`text-sm leading-6 ${
                          isLight ? "text-black/35" : "text-white/35"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-[26px] border p-7 shadow-xl ${
                  isLight
                    ? "border-black/10 bg-white shadow-black/10"
                    : "border-white/10 bg-white/[0.035] shadow-black/20"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    isLight ? "text-black/75" : "text-white/75"
                  }`}
                >
                  {t.why.after}
                </p>

                <div className="mt-7 space-y-4">
                  {t.why.afterItems.map((item) => (
                    <div key={item} className="flex gap-3">
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          isLight ? "bg-black" : "bg-white"
                        }`}
                      >
                        <Check
                          size={11}
                          className={isLight ? "text-white" : "text-black"}
                        />
                      </div>

                      <span
                        className={`text-sm leading-6 ${
                          isLight ? "text-black/65" : "text-white/65"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STARTING OPTIONS */}
        <section
          className={`border-y px-5 py-28 sm:px-8 ${themeClasses.divider}`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className={`text-[10px] font-semibold tracking-[0.2em] ${themeClasses.faintText}`}>
                {t.options.eyebrow}
              </p>

              <h2
                className={`mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                {t.options.title1}
              </h2>

              <p
                className={`mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base ${themeClasses.softText}`}
              >
                {t.options.description}
              </p>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: FileText,
                  title: t.options.existingTitle,
                  description: t.options.existingDescription,
                  button: t.options.existingButton,
                },
                {
                  icon: Sparkles,
                  title: t.options.scratchTitle,
                  description: t.options.scratchDescription,
                  button: t.options.scratchButton,
                },
              ].map((option) => {
                const Icon = option.icon;

                return (
                  <a
                    key={option.title}
                    href={WHOP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={`group rounded-[28px] border p-8 transition duration-300 hover:-translate-y-1 ${
                      isLight
                        ? "border-black/[0.08] bg-white hover:border-black/[0.16]"
                        : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.16] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                        isLight
                          ? "border-black/10 bg-black/[0.04]"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={
                          isLight ? "text-black/65" : "text-white/65"
                        }
                      />
                    </div>

                    <h3
                      className={`mt-8 text-xl font-medium tracking-[-0.025em] ${
                        isLight ? "text-black" : "text-white"
                      }`}
                    >
                      {option.title}
                    </h3>

                    <p
                      className={`mt-3 max-w-md text-sm leading-6 ${
                        isLight ? "text-black/35" : "text-white/35"
                      }`}
                    >
                      {option.description}
                    </p>

                    <div
                      className={`mt-8 flex items-center gap-2 text-sm font-medium ${
                        isLight ? "text-black/70" : "text-white/70"
                      }`}
                    >
                      {option.button}

                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="scroll-mt-24 px-5 py-28 sm:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className={`text-[10px] font-semibold tracking-[0.2em] ${themeClasses.faintText}`}>
                {t.features.eyebrow}
              </p>

              <h2
                className={`mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                {t.features.title1}
                <br />
                <span className={isLight ? "text-black/40" : "text-white/40"}>
                  {t.features.title2}
                </span>
              </h2>

              <p
                className={`mt-6 max-w-xl text-sm leading-7 sm:text-base ${themeClasses.softText}`}
              >
                {t.features.description}
              </p>
            </div>

            <div
              className={`mt-16 grid gap-px overflow-hidden rounded-[28px] border ${
                isLight
                  ? "border-black/[0.06] bg-black/[0.06]"
                  : "border-white/[0.06] bg-white/[0.06]"
              } sm:grid-cols-2 lg:grid-cols-3`}
            >
              {featureItems.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className={`p-7 transition ${
                      isLight
                        ? "bg-white hover:bg-black/[0.015]"
                        : "bg-[#080808] hover:bg-white/[0.025]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                        isLight
                          ? "border-black/[0.08] bg-black/[0.03]"
                          : "border-white/[0.08] bg-white/[0.03]"
                      }`}
                    >
                      <Icon
                        size={17}
                        className={
                          isLight ? "text-black/55" : "text-white/55"
                        }
                      />
                    </div>

                    <h3
                      className={`mt-7 text-base font-medium tracking-[-0.015em] ${
                        isLight ? "text-black" : "text-white"
                      }`}
                    >
                      {t.features[feature.title]}
                    </h3>

                    <p
                      className={`mt-3 text-sm leading-6 ${
                        isLight ? "text-black/35" : "text-white/35"
                      }`}
                    >
                      {t.features[feature.description]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section
          id="pricing"
          className={`scroll-mt-24 border-t px-5 py-28 sm:px-8 ${themeClasses.divider}`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className={`text-[10px] font-semibold tracking-[0.2em] ${themeClasses.faintText}`}>
                {t.pricing.eyebrow}
              </p>

              <h2
                className={`mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                {t.pricing.title1}
                <br />
                <span className={isLight ? "text-black/40" : "text-white/40"}>
                  {t.pricing.title2}
                </span>
              </h2>

              <p
                className={`mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base ${themeClasses.softText}`}
              >
                {t.pricing.description}
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl gap-5 lg:grid-cols-2">
              {/* MONTHLY */}
              <div
                className={`relative flex flex-col rounded-[30px] border p-8 sm:p-9 ${
                  isLight
                    ? "border-black/[0.08] bg-white"
                    : "border-white/[0.08] bg-white/[0.025]"
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                      isLight ? "text-black/35" : "text-white/35"
                    }`}
                  >
                    {t.pricing.monthly}
                  </p>

                  <p
                    className={`mt-4 max-w-sm text-sm leading-6 ${
                      isLight ? "text-black/35" : "text-white/35"
                    }`}
                  >
                    {t.pricing.monthlyLabel}
                  </p>

                  <div className="mt-7 flex items-end gap-2">
                    <span
                      className={`text-5xl font-semibold tracking-[-0.05em] ${
                        isLight ? "text-black" : "text-white"
                      }`}
                    >
                      {t.pricing.monthlyPrice}
                    </span>

                    <span
                      className={`mb-1.5 text-sm ${
                        isLight ? "text-black/30" : "text-white/30"
                      }`}
                    >
                      {t.pricing.perMonth}
                    </span>
                  </div>
                </div>

                <div
                  className={`my-8 h-px ${
                    isLight ? "bg-black/[0.07]" : "bg-white/[0.07]"
                  }`}
                />

                <p
                  className={`mb-5 text-xs font-semibold uppercase tracking-[0.14em] ${
                    isLight ? "text-black/30" : "text-white/30"
                  }`}
                >
                  {t.pricing.monthlyIncluded}
                </p>

                <div className="space-y-4">
                  {[
                    t.pricing.basicResume,
                    t.pricing.basicCover,
                    t.pricing.basicApplications,
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          isLight ? "bg-black/[0.08]" : "bg-white/[0.08]"
                        }`}
                      >
                        <Check
                          size={11}
                          className={
                            isLight ? "text-black/60" : "text-white/60"
                          }
                        />
                      </div>

                      <span
                        className={`text-sm ${
                          isLight ? "text-black/55" : "text-white/55"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-8 rounded-2xl border p-4 ${
                    isLight
                      ? "border-black/[0.05] bg-black/[0.02]"
                      : "border-white/[0.05] bg-white/[0.02]"
                  }`}
                >
                  <p
                    className={`text-xs leading-5 ${
                      isLight ? "text-black/25" : "text-white/25"
                    }`}
                  >
                    {language === "en"
                      ? "A simple way to try HireKit before committing to a longer plan."
                      : "Una forma sencilla de probar HireKit antes de comprometerte con un plan más largo."}
                  </p>
                </div>

                <a
                  href={WHOP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-6 flex w-full items-center justify-center rounded-full border px-5 py-3.5 text-sm font-semibold transition ${
                    isLight
                      ? "border-black/10 bg-black/[0.04] text-black hover:border-black/20 hover:bg-black/[0.08]"
                      : "border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
                >
                  {t.pricing.monthlyButton}
                </a>
              </div>

              {/* SIX MONTHS */}
              <div
                className={`relative flex flex-col overflow-hidden rounded-[30px] border p-8 shadow-2xl sm:p-9 ${
                  isLight
                    ? "border-black/15 bg-white shadow-black/10"
                    : "border-white/20 bg-white/[0.055] shadow-black/30"
                }`}
              >
                <div
                  className={`pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full blur-[100px] ${
                    isLight
                      ? "bg-blue-400/[0.08]"
                      : "bg-blue-500/[0.07]"
                  }`}
                />

                <div
                  className={`absolute right-6 top-6 rounded-full border px-3 py-1.5 ${
                    isLight
                      ? "border-black/10 bg-black"
                      : "border-white/10 bg-white"
                  }`}
                >
                  <span
                    className={`text-[9px] font-bold tracking-[0.12em] ${
                      isLight ? "text-white" : "text-black"
                    }`}
                  >
                    {t.pricing.bestValue}
                  </span>
                </div>

                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3 pr-28">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                        isLight ? "text-black/60" : "text-white/60"
                      }`}
                    >
                      {t.pricing.sixMonths}
                    </p>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[9px] font-bold tracking-[0.08em] ${
                        isLight
                          ? "border-black/10 bg-black/[0.05] text-black/60"
                          : "border-white/10 bg-white/[0.06] text-white/60"
                      }`}
                    >
                      {t.pricing.save}
                    </span>
                  </div>

                  <p
                    className={`mt-4 max-w-sm text-sm leading-6 ${
                      isLight ? "text-black/50" : "text-white/50"
                    }`}
                  >
                    {t.pricing.sixLabel}
                  </p>

                  <div className="mt-7 flex items-end gap-2">
                    <span
                      className={`text-5xl font-semibold tracking-[-0.05em] ${
                        isLight ? "text-black" : "text-white"
                      }`}
                    >
                      {t.pricing.sixPrice}
                    </span>

                    <span
                      className={`mb-1.5 text-sm ${
                        isLight ? "text-black/35" : "text-white/35"
                      }`}
                    >
                      {t.pricing.perSixMonths}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1.5 text-[11px] font-medium ${
                        isLight
                          ? "bg-black/[0.06] text-black/65"
                          : "bg-white/[0.08] text-white/65"
                      }`}
                    >
                      {t.pricing.equivalent}
                    </span>

                    <span
                      className={`text-[11px] ${
                        isLight ? "text-black/30" : "text-white/30"
                      }`}
                    >
                      {t.pricing.savings}
                    </span>
                  </div>
                </div>

                <div
                  className={`relative my-8 h-px ${
                    isLight ? "bg-black/10" : "bg-white/10"
                  }`}
                />

                <div className="relative">
                  <p
                    className={`mb-5 text-xs font-semibold uppercase tracking-[0.14em] ${
                      isLight ? "text-black/40" : "text-white/40"
                    }`}
                  >
                    {t.pricing.included}
                  </p>

                  <div className="space-y-4">
                    {[
                      t.pricing.unlimited,
                      t.pricing.tailored,
                      t.pricing.coverLetters,
                      t.pricing.interview,
                      t.pricing.applicationAnswers,
                      t.pricing.recruiter,
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            isLight ? "bg-black" : "bg-white"
                          }`}
                        >
                          <Check
                            size={11}
                            className={
                              isLight ? "text-white" : "text-black"
                            }
                          />
                        </div>

                        <span
                          className={`text-sm ${
                            isLight ? "text-black/70" : "text-white/70"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={WHOP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`relative mt-9 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold transition ${
                    isLight
                      ? "bg-black text-white hover:bg-black/90"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {t.pricing.sixButton}

                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className={`border-t px-5 py-28 sm:px-8 ${themeClasses.divider}`}
        >
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className={`text-[10px] font-semibold tracking-[0.2em] ${themeClasses.faintText}`}>
                {t.faq.eyebrow}
              </p>

              <h2
                className={`mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                {t.faq.title1}
                <br />
                <span className={isLight ? "text-black/40" : "text-white/40"}>
                  {t.faq.title2}
                </span>
              </h2>
            </div>

            <div
              className={`mt-14 divide-y border-y ${
                isLight
                  ? "divide-black/[0.07] border-black/[0.07]"
                  : "divide-white/[0.07] border-white/[0.07]"
              }`}
            >
              {[
                ["q1", "a1"],
                ["q2", "a2"],
                ["q3", "a3"],
                ["q4", "a4"],
                ["q5", "a5"],
              ].map(([question, answer], index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={question}>
                    <button
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={`text-sm font-medium sm:text-base ${
                          isLight ? "text-black/70" : "text-white/70"
                        }`}
                      >
                        {t.faq[question]}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 transition-transform duration-300 ${
                          isLight ? "text-black/30" : "text-white/30"
                        } ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr] pb-6 opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`max-w-3xl text-sm leading-7 ${
                            isLight ? "text-black/35" : "text-white/35"
                          }`}
                        >
                          {t.faq[answer]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-5 py-28 sm:px-8 sm:py-36">
          <div
            className={`relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border px-6 py-20 text-center sm:px-10 ${
              isLight
                ? "border-black/10 bg-white shadow-xl shadow-black/[0.04]"
                : "border-white/10 bg-white/[0.035]"
            }`}
          >
            <div
              className={`pointer-events-none absolute left-1/2 top-[-180px] h-[350px] w-[600px] -translate-x-1/2 rounded-full blur-[110px] ${
                isLight
                  ? "bg-blue-400/[0.08]"
                  : "bg-blue-500/[0.07]"
              }`}
            />

            <div className="relative">
              <p className={`text-[10px] font-semibold tracking-[0.2em] ${themeClasses.faintText}`}>
                {t.final.eyebrow}
              </p>

              <h2
                className={`mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                {t.final.title1}
                <br />
                <span className={isLight ? "text-black/40" : "text-white/40"}>
                  {t.final.title2}
                </span>
              </h2>

              <p
                className={`mx-auto mt-6 max-w-xl text-sm leading-7 sm:text-base ${themeClasses.softText}`}
              >
                {t.final.description}
              </p>

              <a
                href={WHOP_URL}
                target="_blank"
                rel="noreferrer"
                className={`group mx-auto mt-9 flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                  isLight
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {t.final.button}

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t px-5 py-10 sm:px-8 ${themeClasses.divider}`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                  isLight ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                <Sparkles size={13} />
              </div>

              <span
                className={`text-sm font-semibold ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                HireKit AI
              </span>
            </div>

            <p
              className={`mt-3 max-w-sm text-xs leading-5 ${
                isLight ? "text-black/25" : "text-white/25"
              }`}
            >
              {t.footer.description}
            </p>
          </div>

          <div
            className={`flex flex-wrap items-center gap-5 text-xs ${
              isLight ? "text-black/30" : "text-white/30"
            }`}
          >
            <button
              onClick={() => scrollToSection("features")}
              className="transition hover:text-black"
            >
              {t.footer.product}
            </button>

            <span>{t.footer.legal}</span>

            <button className="transition hover:text-black">
              {t.footer.privacy}
            </button>

            <button className="transition hover:text-black">
              {t.footer.terms}
            </button>
          </div>

          <p
            className={`text-xs ${
              isLight ? "text-black/20" : "text-white/20"
            }`}
          >
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;