import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const LanguageContext = createContext(null);

const STORAGE_KEY = "lead-rescue-language";

const translations = {
  // =========================================================
  // 🇪🇸 ESPAÑOL
  // =========================================================

  es: {
    languageName: "Español",

    nav: {
      dashboard: "Dashboard",
      leads: "Leads",
      followUps: "Seguimientos",
      messages: "Mensajes",
      calculator: "Calculadora",
      settings: "Configuración",
    },

    common: {
      newLead: "Nuevo lead",
      viewDemo: "Ver demo",
      save: "Guardar cambios",
      cancel: "Cancelar",
      today: "Hoy",
      upcoming: "Próximos",
      overdue: "Atrasados",
      free: "Gratis",
      monthly: "al mes",
      viewAll: "Ver todos",
      viewAllLeads: "Ver todos los leads",
      write: "Escribir",
      attention: "Atención",
      language: "Idioma",
      darkMode: "Modo oscuro",
      lightMode: "Modo claro",
      workspace: "Workspace",
      freeWorkspace: "Workspace gratuito",
    },

    leads: {
      management: "GESTIÓN DE LEADS",
      title: "Leads",
      description:
        "Gestiona tus oportunidades y decide a quién contactar después.",
      showing: "Mostrando",
      lead: "lead",
      leads: "leads",
      visibleValue: "Valor visible",
      hotOpportunities: "Oportunidades calientes",
      requireFollowUp: "requieren seguimiento",
      allStatuses: "Todos los estados",

      statuses: {
        new: "Nuevo",
        contacted: "Contactado",
        proposal: "Propuesta",
        "follow-up": "Seguimiento",
        won: "Ganado",
        lost: "Perdido",
      },

      sortHighestValue: "Mayor valor",
      sortLowestValue: "Menor valor",
      sortNewest: "Más recientes",
      sortNextFollowUp: "Próximo seguimiento",
      opportunity: "Oportunidad",
      followUp: "Seguimiento",
      noDate: "Sin fecha",
      source: "Origen",
      lastContact: "Último contacto",
      noRecord: "Sin registro",
      edit: "Editar",
      viewDetails: "Ver detalles",
      call: "Llamar",
      email: "Enviar email",
      delete: "Eliminar",
      deleteConfirm: "¿Seguro que quieres eliminar a",
      noLeadsFound: "No se encontraron leads",
      noLeadsFoundDescription:
        "Prueba a cambiar la búsqueda o los filtros.",
      emptyPipeline: "Tu pipeline está vacío",
      emptyPipelineDescription:
        "Añade tu primer lead para empezar a recuperar oportunidades.",
      clearFilters: "Limpiar filtros",
      addFirstLead: "Añadir primer lead",
      editOpportunity: "EDITAR OPORTUNIDAD",
      newOpportunity: "NUEVA OPORTUNIDAD",
      addLead: "Añadir lead",
      saveChanges: "Guardar cambios",
      createLead: "Crear lead",
      searchPlaceholder:
        "Buscar por nombre, empresa, servicio o contacto...",

      sources: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        web: "Web",
        email: "Email",
        referral: "Referencia",
        other: "Otro",
      },

      fields: {
        name: "Nombre",
        company: "Empresa",
        service: "Servicio",
        value: "Valor",
        status: "Estado",
        source: "Origen",
        lastContact: "Último contacto",
        nextFollowUp: "Próximo seguimiento",
        email: "Email",
        phone: "Teléfono",
        notes: "Notas",
      },

      placeholders: {
        name: "Nombre del contacto",
        company: "Empresa",
        service: "Servicio o producto",
        value: "0",
        email: "correo@ejemplo.com",
        phone: "+34 600 000 000",
        notes: "Añade cualquier información relevante...",
      },
    },

    dashboard: {
      title: "Dashboard",
      subtitle: "Esto es lo que necesita tu atención.",
      headline: "No dejes dinero encima de la mesa.",
      description:
        "Lead Rescue te muestra qué oportunidades necesitan seguimiento y cuánto podrían valer.",
      recovery: "Potencial recuperable",
      followUps: "Seguimientos hoy",
      activeLeads: "Leads activos",
      pipeline: "Pipeline",
      attention: "Necesita tu atención",
      recent: "Leads recientes",
      recoveryOverview: "Resumen de recuperación",
      rescueScore: "Rescue score",
      followUp: "Seguimiento",
      excellent: "Excelente",
      healthy: "Saludable",
      needsAttention: "Necesita atención",
      atRisk: "En riesgo",
      leadsWithOpportunity: "leads con oportunidad",
      requireAttention: "requieren atención",
      totalLeads: "leads totales",
      conversion: "conversión",
      prioritizeContacts:
        "Prioriza estos contactos primero.",
      hotOpportunities: "Oportunidades calientes",
      highestPotential:
        "Los leads con mayor potencial.",
      noHotLeads:
        "Todavía no hay oportunidades calientes",
      addLeadsToStart:
        "Añade leads para empezar a detectar oportunidades.",
    },

    landing: {
      badge: "Recupera oportunidades que ya tienes",
      title: "Convierte leads olvidados en dinero.",
      description:
        "Lead Rescue detecta qué leads necesitan seguimiento, cuándo contactarles y cuánto dinero podrías recuperar.",
      startFree: "Empieza gratis",
      seeHowItWorks: "Ver cómo funciona",
      noCard: "Sin tarjeta. Sin complicaciones.",
      features: "Todo lo que necesitas para recuperar más ventas.",
      feature1Title: "Nunca pierdas un lead",
      feature1Description:
        "Ten todos tus leads organizados y sabe exactamente a quién contactar.",
      feature2Title: "Seguimientos inteligentes",
      feature2Description:
        "Recibe una visión clara de qué oportunidades necesitan atención.",
      feature3Title: "Mide tu potencial",
      feature3Description:
        "Descubre cuánto dinero tienes realmente en tu pipeline.",
      trustedBy: "Creado para equipos que quieren vender más.",
    },

    page: {
      leads: {
        title: "Leads",
        subtitle:
          "Gestiona tus oportunidades y decide a quién contactar después.",
      },

      followUps: {
        title: "Seguimientos",
        subtitle:
          "No dejes que ninguna oportunidad se enfríe.",
      },

      messages: {
        title: "Mensajes",
        subtitle:
          "Gestiona y prepara tus comunicaciones.",
      },

      calculator: {
        title: "Calculadora",
        subtitle:
          "Descubre cuánto dinero puedes recuperar.",
      },

      settings: {
        title: "Configuración",
        subtitle:
          "Personaliza tu experiencia en Lead Rescue.",
      },
    },
  },

  // =========================================================
  // 🇪🇺 EUSKERA
  // =========================================================

  eu: {
    languageName: "Euskera",

    nav: {
      dashboard: "Panela",
      leads: "Lead-ak",
      followUps: "Jarraipenak",
      messages: "Mezuak",
      calculator: "Kalkulagailua",
      settings: "Ezarpenak",
    },

    common: {
      newLead: "Lead berria",
      viewDemo: "Demoa ikusi",
      save: "Aldaketak gorde",
      cancel: "Utzi",
      today: "Gaur",
      upcoming: "Hurrengoak",
      overdue: "Atzeratuak",
      free: "Doan",
      monthly: "hilean",
      viewAll: "Guztiak ikusi",
      viewAllLeads: "Lead guztiak ikusi",
      write: "Idatzi",
      attention: "Arreta",
      language: "Hizkuntza",
      darkMode: "Modu iluna",
      lightMode: "Modu argia",
      workspace: "Workspace",
      freeWorkspace: "Doako workspace-a",
    },

    leads: {
      management: "LEAD-EN KUDEAKETA",
      title: "Lead-ak",
      description:
        "Kudeatu zure aukerak eta erabaki norekin harremanetan jarri.",
      showing: "Erakusten",
      lead: "lead",
      leads: "lead",
      visibleValue: "Ikusgai dagoen balioa",
      hotOpportunities: "Aukera beroak",
      requireFollowUp: "jarraipena behar dute",
      allStatuses: "Egoera guztiak",

      statuses: {
        new: "Berria",
        contacted: "Harremanetan",
        proposal: "Proposamena",
        "follow-up": "Jarraipena",
        won: "Irabazia",
        lost: "Galduta",
      },

      sortHighestValue: "Balio handiena",
      sortLowestValue: "Balio txikiena",
      sortNewest: "Berrienak",
      sortNextFollowUp: "Hurrengo jarraipena",
      opportunity: "Aukera",
      followUp: "Jarraipena",
      noDate: "Datarik gabe",
      source: "Jatorria",
      lastContact: "Azken kontaktua",
      noRecord: "Erregistrorik gabe",
      edit: "Editatu",
      viewDetails: "Xehetasunak ikusi",
      call: "Deitu",
      email: "Emaila bidali",
      delete: "Ezabatu",
      deleteConfirm: "Ziur zaude ezabatu nahi duzula",
      noLeadsFound: "Ez da lead-ik aurkitu",
      noLeadsFoundDescription:
        "Saiatu bilaketa edo iragazkiak aldatzen.",
      emptyPipeline: "Zure pipeline-a hutsik dago",
      emptyPipelineDescription:
        "Gehitu zure lehen lead-a aukerak berreskuratzen hasteko.",
      clearFilters: "Iragazkiak garbitu",
      addFirstLead: "Lehen lead-a gehitu",
      editOpportunity: "AUKERA EDITATU",
      newOpportunity: "AUKERA BERRIA",
      addLead: "Lead-a gehitu",
      saveChanges: "Aldaketak gorde",
      createLead: "Lead-a sortu",
      searchPlaceholder:
        "Bilatu izen, enpresa, zerbitzu edo kontaktuaren arabera...",

      sources: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        web: "Web",
        email: "Emaila",
        referral: "Erreferentzia",
        other: "Beste bat",
      },

      fields: {
        name: "Izena",
        company: "Enpresa",
        service: "Zerbitzua",
        value: "Balioa",
        status: "Egoera",
        source: "Jatorria",
        lastContact: "Azken kontaktua",
        nextFollowUp: "Hurrengo jarraipena",
        email: "Emaila",
        phone: "Telefonoa",
        notes: "Oharrak",
      },

      placeholders: {
        name: "Kontaktuaren izena",
        company: "Enpresa",
        service: "Zerbitzua edo produktua",
        value: "0",
        email: "posta@adibidea.com",
        phone: "+34 600 000 000",
        notes: "Gehitu informazio garrantzitsua...",
      },
    },

    dashboard: {
      title: "Panela",
      subtitle: "Hau da zure arreta behar duena.",
      headline: "Ez utzi dirua mahai gainean.",
      description:
        "Lead Rescue-k jarraipena behar duten aukerak eta berreskura dezakezun dirua erakusten dizkizu.",
      recovery: "Berreskuratzeko potentziala",
      followUps: "Gaurko jarraipenak",
      activeLeads: "Lead aktiboak",
      pipeline: "Pipeline-a",
      attention: "Zure arreta behar du",
      recent: "Azken lead-ak",
      recoveryOverview: "Berreskurapenaren laburpena",
      rescueScore: "Rescue score",
      followUp: "Jarraipena",
      excellent: "Bikaina",
      healthy: "Osasuntsua",
      needsAttention: "Arreta behar du",
      atRisk: "Arriskuan",
      leadsWithOpportunity: "aukera duten lead",
      requireAttention: "arreta behar dute",
      totalLeads: "lead guztira",
      conversion: "bihurketa",
      prioritizeContacts:
        "Lehenetsi kontaktu hauek.",
      hotOpportunities: "Aukera beroak",
      highestPotential:
        "Potentzial handiena duten lead-ak.",
      noHotLeads:
        "Oraindik ez dago aukera berorik",
      addLeadsToStart:
        "Gehitu lead-ak aukerak detektatzen hasteko.",
    },

    landing: {
      badge: "Berreskuratu dituzun aukerak",
      title: "Bihurtu ahaztutako lead-ak diru.",
      description:
        "Lead Rescue-k jarraipena behar duten lead-ak eta noiz kontaktatu behar dituzun erakusten dizu.",
      startFree: "Hasi doan",
      seeHowItWorks: "Ikusi nola funtzionatzen duen",
      noCard: "Txartelik gabe. Konplikaziorik gabe.",
      features: "Salmenta gehiago egiteko behar duzun guztia.",
      feature1Title: "Ez galdu lead bakar bat ere",
      feature1Description:
        "Mantendu lead guztiak antolatuta eta jakin norekin jarri harremanetan.",
      feature2Title: "Jarraipen adimentsuak",
      feature2Description:
        "Ikusi zein aukerek behar duten arreta.",
      feature3Title: "Neurtu zure potentziala",
      feature3Description:
        "Ezagutu zenbat diru duzun benetan zure pipeline-an.",
      trustedBy: "Gehiago saldu nahi duten taldeentzat sortua.",
    },

    page: {
      leads: {
        title: "Lead-ak",
        subtitle:
          "Kudeatu zure aukerak eta erabaki norekin harremanetan jarri.",
      },

      followUps: {
        title: "Jarraipenak",
        subtitle:
          "Ez utzi aukera bakar bat ere hozten.",
      },

      messages: {
        title: "Mezuak",
        subtitle:
          "Kudeatu eta prestatu zure komunikazioak.",
      },

      calculator: {
        title: "Kalkulagailua",
        subtitle:
          "Ezagutu zenbat diru berreskura dezakezun.",
      },

      settings: {
        title: "Ezarpenak",
        subtitle:
          "Pertsonalizatu zure Lead Rescue esperientzia.",
      },
    },
  },

  // =========================================================
  // 🇬🇧 ENGLISH
  // =========================================================

  en: {
    languageName: "English",

    nav: {
      dashboard: "Dashboard",
      leads: "Leads",
      followUps: "Follow-ups",
      messages: "Messages",
      calculator: "Calculator",
      settings: "Settings",
    },

    common: {
      newLead: "New lead",
      viewDemo: "View demo",
      save: "Save changes",
      cancel: "Cancel",
      today: "Today",
      upcoming: "Upcoming",
      overdue: "Overdue",
      free: "Free",
      monthly: "per month",
      viewAll: "View all",
      viewAllLeads: "View all leads",
      write: "Write",
      attention: "Attention",
      language: "Language",
      darkMode: "Dark mode",
      lightMode: "Light mode",
      workspace: "Workspace",
      freeWorkspace: "Free workspace",
    },

    leads: {
      management: "LEAD MANAGEMENT",
      title: "Leads",
      description:
        "Manage your opportunities and decide who to contact next.",
      showing: "Showing",
      lead: "lead",
      leads: "leads",
      visibleValue: "Visible value",
      hotOpportunities: "Hot opportunities",
      requireFollowUp: "require follow-up",
      allStatuses: "All statuses",

      statuses: {
        new: "New",
        contacted: "Contacted",
        proposal: "Proposal",
        "follow-up": "Follow-up",
        won: "Won",
        lost: "Lost",
      },

      sortHighestValue: "Highest value",
      sortLowestValue: "Lowest value",
      sortNewest: "Newest",
      sortNextFollowUp: "Next follow-up",
      opportunity: "Opportunity",
      followUp: "Follow-up",
      noDate: "No date",
      source: "Source",
      lastContact: "Last contact",
      noRecord: "No record",
      edit: "Edit",
      viewDetails: "View details",
      call: "Call",
      email: "Send email",
      delete: "Delete",
      deleteConfirm: "Are you sure you want to delete",
      noLeadsFound: "No leads found",
      noLeadsFoundDescription:
        "Try changing your search or filters.",
      emptyPipeline: "Your pipeline is empty",
      emptyPipelineDescription:
        "Add your first lead to start recovering opportunities.",
      clearFilters: "Clear filters",
      addFirstLead: "Add first lead",
      editOpportunity: "EDIT OPPORTUNITY",
      newOpportunity: "NEW OPPORTUNITY",
      addLead: "Add lead",
      saveChanges: "Save changes",
      createLead: "Create lead",
      searchPlaceholder:
        "Search by name, company, service or contact...",

      sources: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        web: "Web",
        email: "Email",
        referral: "Referral",
        other: "Other",
      },

      fields: {
        name: "Name",
        company: "Company",
        service: "Service",
        value: "Value",
        status: "Status",
        source: "Source",
        lastContact: "Last contact",
        nextFollowUp: "Next follow-up",
        email: "Email",
        phone: "Phone",
        notes: "Notes",
      },

      placeholders: {
        name: "Contact name",
        company: "Company",
        service: "Service or product",
        value: "0",
        email: "email@example.com",
        phone: "+34 600 000 000",
        notes: "Add any relevant information...",
      },
    },

    dashboard: {
      title: "Dashboard",
      subtitle: "Here's what needs your attention.",
      headline: "Don't leave money on the table.",
      description:
        "Lead Rescue shows you which opportunities need follow-up and how much they could be worth.",
      recovery: "Recoverable potential",
      followUps: "Follow-ups today",
      activeLeads: "Active leads",
      pipeline: "Pipeline",
      attention: "Needs your attention",
      recent: "Recent leads",
      recoveryOverview: "Recovery overview",
      rescueScore: "Rescue score",
      followUp: "Follow-up",
      excellent: "Excellent",
      healthy: "Healthy",
      needsAttention: "Needs attention",
      atRisk: "At risk",
      leadsWithOpportunity: "leads with opportunity",
      requireAttention: "require attention",
      totalLeads: "total leads",
      conversion: "conversion",
      prioritizeContacts:
        "Prioritize these contacts first.",
      hotOpportunities: "Hot opportunities",
      highestPotential:
        "Leads with the highest potential.",
      noHotLeads:
        "There are no hot opportunities yet",
      addLeadsToStart:
        "Add leads to start detecting opportunities.",
    },

    landing: {
      badge: "Recover opportunities you already have",
      title: "Turn forgotten leads into revenue.",
      description:
        "Lead Rescue detects which leads need follow-up, when to contact them and how much money you could recover.",
      startFree: "Start for free",
      seeHowItWorks: "See how it works",
      noCard: "No card. No hassle.",
      features: "Everything you need to recover more sales.",
      feature1Title: "Never lose a lead",
      feature1Description:
        "Keep all your leads organized and know exactly who to contact.",
      feature2Title: "Smart follow-ups",
      feature2Description:
        "Get a clear view of which opportunities need attention.",
      feature3Title: "Measure your potential",
      feature3Description:
        "Discover how much money you really have in your pipeline.",
      trustedBy: "Built for teams that want to sell more.",
    },

    page: {
      leads: {
        title: "Leads",
        subtitle:
          "Manage your opportunities and decide who to contact next.",
      },

      followUps: {
        title: "Follow-ups",
        subtitle:
          "Don't let any opportunity go cold.",
      },

      messages: {
        title: "Messages",
        subtitle:
          "Manage and prepare your communications.",
      },

      calculator: {
        title: "Calculator",
        subtitle:
          "Discover how much money you can recover.",
      },

      settings: {
        title: "Settings",
        subtitle:
          "Customize your Lead Rescue experience.",
      },
    },
  },

  // =========================================================
  // 🇫🇷 FRANÇAIS
  // =========================================================

  fr: {
    languageName: "Français",

    nav: {
      dashboard: "Tableau de bord",
      leads: "Leads",
      followUps: "Suivis",
      messages: "Messages",
      calculator: "Calculatrice",
      settings: "Paramètres",
    },

    common: {
      newLead: "Nouveau lead",
      viewDemo: "Voir la démo",
      save: "Enregistrer",
      cancel: "Annuler",
      today: "Aujourd'hui",
      upcoming: "À venir",
      overdue: "En retard",
      free: "Gratuit",
      monthly: "par mois",
      viewAll: "Voir tout",
      viewAllLeads: "Voir tous les leads",
      write: "Écrire",
      attention: "Attention",
      language: "Langue",
      darkMode: "Mode sombre",
      lightMode: "Mode clair",
      workspace: "Workspace",
      freeWorkspace: "Workspace gratuit",
    },

    leads: {
      management: "GESTION DES LEADS",
      title: "Leads",
      description:
        "Gérez vos opportunités et décidez qui contacter ensuite.",
      showing: "Affichage",
      lead: "lead",
      leads: "leads",
      visibleValue: "Valeur visible",
      hotOpportunities: "Opportunités chaudes",
      requireFollowUp: "nécessitent un suivi",
      allStatuses: "Tous les statuts",

      statuses: {
        new: "Nouveau",
        contacted: "Contacté",
        proposal: "Proposition",
        "follow-up": "Suivi",
        won: "Gagné",
        lost: "Perdu",
      },

      sortHighestValue: "Valeur la plus élevée",
      sortLowestValue: "Valeur la plus basse",
      sortNewest: "Plus récents",
      sortNextFollowUp: "Prochain suivi",
      opportunity: "Opportunité",
      followUp: "Suivi",
      noDate: "Sans date",
      source: "Source",
      lastContact: "Dernier contact",
      noRecord: "Aucun enregistrement",
      edit: "Modifier",
      viewDetails: "Voir les détails",
      call: "Appeler",
      email: "Envoyer un email",
      delete: "Supprimer",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer",
      noLeadsFound: "Aucun lead trouvé",
      noLeadsFoundDescription:
        "Essayez de modifier votre recherche ou vos filtres.",
      emptyPipeline: "Votre pipeline est vide",
      emptyPipelineDescription:
        "Ajoutez votre premier lead pour commencer à récupérer des opportunités.",
      clearFilters: "Effacer les filtres",
      addFirstLead: "Ajouter le premier lead",
      editOpportunity: "MODIFIER L'OPPORTUNITÉ",
      newOpportunity: "NOUVELLE OPPORTUNITÉ",
      addLead: "Ajouter un lead",
      saveChanges: "Enregistrer",
      createLead: "Créer un lead",
      searchPlaceholder:
        "Rechercher par nom, entreprise, service ou contact...",

      sources: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        web: "Web",
        email: "Email",
        referral: "Référence",
        other: "Autre",
      },

      fields: {
        name: "Nom",
        company: "Entreprise",
        service: "Service",
        value: "Valeur",
        status: "Statut",
        source: "Source",
        lastContact: "Dernier contact",
        nextFollowUp: "Prochain suivi",
        email: "Email",
        phone: "Téléphone",
        notes: "Notes",
      },

      placeholders: {
        name: "Nom du contact",
        company: "Entreprise",
        service: "Service ou produit",
        value: "0",
        email: "email@exemple.com",
        phone: "+34 600 000 000",
        notes: "Ajoutez toute information pertinente...",
      },
    },

    dashboard: {
      title: "Tableau de bord",
      subtitle: "Voici ce qui nécessite votre attention.",
      headline: "Ne laissez pas d'argent sur la table.",
      description:
        "Lead Rescue vous montre quelles opportunités nécessitent un suivi et combien elles pourraient valoir.",
      recovery: "Potentiel récupérable",
      followUps: "Suivis aujourd'hui",
      activeLeads: "Leads actifs",
      pipeline: "Pipeline",
      attention: "Nécessite votre attention",
      recent: "Leads récents",
      recoveryOverview: "Résumé de récupération",
      rescueScore: "Rescue score",
      followUp: "Suivi",
      excellent: "Excellent",
      healthy: "Sain",
      needsAttention: "Nécessite attention",
      atRisk: "À risque",
      leadsWithOpportunity: "leads avec opportunité",
      requireAttention: "nécessitent attention",
      totalLeads: "leads au total",
      conversion: "conversion",
      prioritizeContacts:
        "Priorisez ces contacts en premier.",
      hotOpportunities: "Opportunités chaudes",
      highestPotential:
        "Les leads au plus fort potentiel.",
      noHotLeads:
        "Aucune opportunité chaude pour le moment",
      addLeadsToStart:
        "Ajoutez des leads pour commencer à détecter des opportunités.",
    },

    landing: {
      badge: "Récupérez les opportunités que vous avez déjà",
      title: "Transformez les leads oubliés en revenus.",
      description:
        "Lead Rescue détecte quels leads nécessitent un suivi, quand les contacter et combien d'argent vous pourriez récupérer.",
      startFree: "Commencer gratuitement",
      seeHowItWorks: "Voir comment ça marche",
      noCard: "Sans carte. Sans complication.",
      features: "Tout ce dont vous avez besoin pour récupérer plus de ventes.",
      feature1Title: "Ne perdez jamais un lead",
      feature1Description:
        "Gardez tous vos leads organisés et sachez exactement qui contacter.",
      feature2Title: "Suivis intelligents",
      feature2Description:
        "Visualisez clairement les opportunités qui nécessitent votre attention.",
      feature3Title: "Mesurez votre potentiel",
      feature3Description:
        "Découvrez combien d'argent se trouve réellement dans votre pipeline.",
      trustedBy: "Créé pour les équipes qui veulent vendre davantage.",
    },

    page: {
      leads: {
        title: "Leads",
        subtitle:
          "Gérez vos opportunités et décidez qui contacter ensuite.",
      },

      followUps: {
        title: "Suivis",
        subtitle:
          "Ne laissez aucune opportunité se refroidir.",
      },

      messages: {
        title: "Messages",
        subtitle:
          "Gérez et préparez vos communications.",
      },

      calculator: {
        title: "Calculatrice",
        subtitle:
          "Découvrez combien d'argent vous pouvez récupérer.",
      },

      settings: {
        title: "Paramètres",
        subtitle:
          "Personnalisez votre expérience Lead Rescue.",
      },
    },
  },

  // =========================================================
  // 🇩🇪 DEUTSCH
  // =========================================================

  de: {
    languageName: "Deutsch",

    nav: {
      dashboard: "Dashboard",
      leads: "Leads",
      followUps: "Follow-ups",
      messages: "Nachrichten",
      calculator: "Rechner",
      settings: "Einstellungen",
    },

    common: {
      newLead: "Neuer Lead",
      viewDemo: "Demo ansehen",
      save: "Änderungen speichern",
      cancel: "Abbrechen",
      today: "Heute",
      upcoming: "Demnächst",
      overdue: "Überfällig",
      free: "Kostenlos",
      monthly: "pro Monat",
      viewAll: "Alle ansehen",
      viewAllLeads: "Alle Leads ansehen",
      write: "Schreiben",
      attention: "Achtung",
      language: "Sprache",
      darkMode: "Dunkelmodus",
      lightMode: "Hellmodus",
      workspace: "Workspace",
      freeWorkspace: "Kostenloser Workspace",
    },

    leads: {
      management: "LEAD-MANAGEMENT",
      title: "Leads",
      description:
        "Verwalte deine Chancen und entscheide, wen du als Nächstes kontaktierst.",
      showing: "Anzeigen",
      lead: "Lead",
      leads: "Leads",
      visibleValue: "Sichtbarer Wert",
      hotOpportunities: "Heiße Chancen",
      requireFollowUp: "benötigen Follow-up",
      allStatuses: "Alle Status",

      statuses: {
        new: "Neu",
        contacted: "Kontaktiert",
        proposal: "Angebot",
        "follow-up": "Follow-up",
        won: "Gewonnen",
        lost: "Verloren",
      },

      sortHighestValue: "Höchster Wert",
      sortLowestValue: "Niedrigster Wert",
      sortNewest: "Neueste",
      sortNextFollowUp: "Nächstes Follow-up",
      opportunity: "Chance",
      followUp: "Follow-up",
      noDate: "Kein Datum",
      source: "Quelle",
      lastContact: "Letzter Kontakt",
      noRecord: "Kein Eintrag",
      edit: "Bearbeiten",
      viewDetails: "Details ansehen",
      call: "Anrufen",
      email: "E-Mail senden",
      delete: "Löschen",
      deleteConfirm: "Möchtest du wirklich löschen",
      noLeadsFound: "Keine Leads gefunden",
      noLeadsFoundDescription:
        "Versuche deine Suche oder Filter zu ändern.",
      emptyPipeline: "Deine Pipeline ist leer",
      emptyPipelineDescription:
        "Füge deinen ersten Lead hinzu, um Chancen zurückzugewinnen.",
      clearFilters: "Filter löschen",
      addFirstLead: "Ersten Lead hinzufügen",
      editOpportunity: "CHANCE BEARBEITEN",
      newOpportunity: "NEUE CHANCE",
      addLead: "Lead hinzufügen",
      saveChanges: "Änderungen speichern",
      createLead: "Lead erstellen",
      searchPlaceholder:
        "Nach Name, Unternehmen, Service oder Kontakt suchen...",

      sources: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        web: "Web",
        email: "E-Mail",
        referral: "Empfehlung",
        other: "Andere",
      },

      fields: {
        name: "Name",
        company: "Unternehmen",
        service: "Service",
        value: "Wert",
        status: "Status",
        source: "Quelle",
        lastContact: "Letzter Kontakt",
        nextFollowUp: "Nächstes Follow-up",
        email: "E-Mail",
        phone: "Telefon",
        notes: "Notizen",
      },

      placeholders: {
        name: "Name des Kontakts",
        company: "Unternehmen",
        service: "Service oder Produkt",
        value: "0",
        email: "mail@beispiel.com",
        phone: "+34 600 000 000",
        notes: "Füge relevante Informationen hinzu...",
      },
    },

    dashboard: {
      title: "Dashboard",
      subtitle: "Das benötigt deine Aufmerksamkeit.",
      headline: "Lass kein Geld liegen.",
      description:
        "Lead Rescue zeigt dir, welche Chancen ein Follow-up benötigen und wie viel sie wert sein könnten.",
      recovery: "Wiederherstellbares Potenzial",
      followUps: "Follow-ups heute",
      activeLeads: "Aktive Leads",
      pipeline: "Pipeline",
      attention: "Benötigt deine Aufmerksamkeit",
      recent: "Neueste Leads",
      recoveryOverview: "Wiederherstellungsübersicht",
      rescueScore: "Rescue Score",
      followUp: "Follow-up",
      excellent: "Ausgezeichnet",
      healthy: "Gesund",
      needsAttention: "Benötigt Aufmerksamkeit",
      atRisk: "Gefährdet",
      leadsWithOpportunity: "Leads mit Chancen",
      requireAttention: "benötigen Aufmerksamkeit",
      totalLeads: "Leads insgesamt",
      conversion: "Conversion",
      prioritizeContacts:
        "Priorisiere diese Kontakte zuerst.",
      hotOpportunities: "Heiße Chancen",
      highestPotential:
        "Leads mit dem höchsten Potenzial.",
      noHotLeads:
        "Noch keine heißen Chancen",
      addLeadsToStart:
        "Füge Leads hinzu, um Chancen zu erkennen.",
    },

    landing: {
      badge: "Nutze Chancen, die du bereits hast",
      title: "Verwandle vergessene Leads in Umsatz.",
      description:
        "Lead Rescue erkennt, welche Leads ein Follow-up benötigen, wann du sie kontaktieren solltest und wie viel Geld du zurückgewinnen könntest.",
      startFree: "Kostenlos starten",
      seeHowItWorks: "So funktioniert es",
      noCard: "Keine Karte. Keine Komplikationen.",
      features: "Alles, was du brauchst, um mehr Verkäufe zurückzugewinnen.",
      feature1Title: "Verliere nie wieder einen Lead",
      feature1Description:
        "Halte alle deine Leads organisiert und weiß genau, wen du kontaktieren musst.",
      feature2Title: "Intelligente Follow-ups",
      feature2Description:
        "Sieh klar, welche Chancen deine Aufmerksamkeit benötigen.",
      feature3Title: "Miss dein Potenzial",
      feature3Description:
        "Entdecke, wie viel Geld tatsächlich in deiner Pipeline steckt.",
      trustedBy: "Für Teams entwickelt, die mehr verkaufen wollen.",
    },

    page: {
      leads: {
        title: "Leads",
        subtitle:
          "Verwalte deine Chancen und entscheide, wen du als Nächstes kontaktierst.",
      },

      followUps: {
        title: "Follow-ups",
        subtitle:
          "Lass keine Chance kalt werden.",
      },

      messages: {
        title: "Nachrichten",
        subtitle:
          "Verwalte und bereite deine Kommunikation vor.",
      },

      calculator: {
        title: "Rechner",
        subtitle:
          "Entdecke, wie viel Geld du zurückgewinnen kannst.",
      },

      settings: {
        title: "Einstellungen",
        subtitle:
          "Passe dein Lead Rescue Erlebnis an.",
      },
    },
  },

  // =========================================================
  // 🇮🇹 ITALIANO
  // =========================================================

  it: {
    languageName: "Italiano",

    nav: {
      dashboard: "Dashboard",
      leads: "Lead",
      followUps: "Follow-up",
      messages: "Messaggi",
      calculator: "Calcolatrice",
      settings: "Impostazioni",
    },

    common: {
      newLead: "Nuovo lead",
      viewDemo: "Vedi demo",
      save: "Salva modifiche",
      cancel: "Annulla",
      today: "Oggi",
      upcoming: "In arrivo",
      overdue: "In ritardo",
      free: "Gratis",
      monthly: "al mese",
      viewAll: "Vedi tutto",
      viewAllLeads: "Vedi tutti i lead",
      write: "Scrivi",
      attention: "Attenzione",
      language: "Lingua",
      darkMode: "Modalità scura",
      lightMode: "Modalità chiara",
      workspace: "Workspace",
      freeWorkspace: "Workspace gratuito",
    },

    leads: {
      management: "GESTIONE DEI LEAD",
      title: "Lead",
      description:
        "Gestisci le tue opportunità e decidi chi contattare dopo.",
      showing: "Visualizzazione",
      lead: "lead",
      leads: "lead",
      visibleValue: "Valore visibile",
      hotOpportunities: "Opportunità calde",
      requireFollowUp: "richiedono follow-up",
      allStatuses: "Tutti gli stati",

      statuses: {
        new: "Nuovo",
        contacted: "Contattato",
        proposal: "Proposta",
        "follow-up": "Follow-up",
        won: "Vinto",
        lost: "Perso",
      },

      sortHighestValue: "Valore più alto",
      sortLowestValue: "Valore più basso",
      sortNewest: "Più recenti",
      sortNextFollowUp: "Prossimo follow-up",
      opportunity: "Opportunità",
      followUp: "Follow-up",
      noDate: "Nessuna data",
      source: "Fonte",
      lastContact: "Ultimo contatto",
      noRecord: "Nessun record",
      edit: "Modifica",
      viewDetails: "Vedi dettagli",
      call: "Chiama",
      email: "Invia email",
      delete: "Elimina",
      deleteConfirm: "Sei sicuro di voler eliminare",
      noLeadsFound: "Nessun lead trovato",
      noLeadsFoundDescription:
        "Prova a modificare la ricerca o i filtri.",
      emptyPipeline: "La tua pipeline è vuota",
      emptyPipelineDescription:
        "Aggiungi il tuo primo lead per iniziare a recuperare opportunità.",
      clearFilters: "Cancella filtri",
      addFirstLead: "Aggiungi il primo lead",
      editOpportunity: "MODIFICA OPPORTUNITÀ",
      newOpportunity: "NUOVA OPPORTUNITÀ",
      addLead: "Aggiungi lead",
      saveChanges: "Salva modifiche",
      createLead: "Crea lead",
      searchPlaceholder:
        "Cerca per nome, azienda, servizio o contatto...",

      sources: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        web: "Web",
        email: "Email",
        referral: "Referenza",
        other: "Altro",
      },

      fields: {
        name: "Nome",
        company: "Azienda",
        service: "Servizio",
        value: "Valore",
        status: "Stato",
        source: "Fonte",
        lastContact: "Ultimo contatto",
        nextFollowUp: "Prossimo follow-up",
        email: "Email",
        phone: "Telefono",
        notes: "Note",
      },

      placeholders: {
        name: "Nome del contatto",
        company: "Azienda",
        service: "Servizio o prodotto",
        value: "0",
        email: "email@esempio.com",
        phone: "+34 600 000 000",
        notes: "Aggiungi informazioni rilevanti...",
      },
    },

    dashboard: {
      title: "Dashboard",
      subtitle: "Ecco cosa richiede la tua attenzione.",
      headline: "Non lasciare soldi sul tavolo.",
      description:
        "Lead Rescue ti mostra quali opportunità richiedono follow-up e quanto potrebbero valere.",
      recovery: "Potenziale recuperabile",
      followUps: "Follow-up di oggi",
      activeLeads: "Lead attivi",
      pipeline: "Pipeline",
      attention: "Richiede la tua attenzione",
      recent: "Lead recenti",
      recoveryOverview: "Riepilogo recupero",
      rescueScore: "Rescue score",
      followUp: "Follow-up",
      excellent: "Eccellente",
      healthy: "Sano",
      needsAttention: "Richiede attenzione",
      atRisk: "A rischio",
      leadsWithOpportunity: "lead con opportunità",
      requireAttention: "richiedono attenzione",
      totalLeads: "lead totali",
      conversion: "conversione",
      prioritizeContacts:
        "Dai priorità a questi contatti.",
      hotOpportunities: "Opportunità calde",
      highestPotential:
        "I lead con il potenziale più alto.",
      noHotLeads:
        "Non ci sono ancora opportunità calde",
      addLeadsToStart:
        "Aggiungi lead per iniziare a rilevare opportunità.",
    },

    landing: {
      badge: "Recupera le opportunità che hai già",
      title: "Trasforma i lead dimenticati in entrate.",
      description:
        "Lead Rescue rileva quali lead necessitano di follow-up, quando contattarli e quanti soldi potresti recuperare.",
      startFree: "Inizia gratis",
      seeHowItWorks: "Scopri come funziona",
      noCard: "Nessuna carta. Nessuna complicazione.",
      features:
        "Tutto ciò che ti serve per recuperare più vendite.",
      feature1Title: "Non perdere mai un lead",
      feature1Description:
        "Tieni tutti i tuoi lead organizzati e sai esattamente chi contattare.",
      feature2Title: "Follow-up intelligenti",
      feature2Description:
        "Visualizza chiaramente quali opportunità richiedono attenzione.",
      feature3Title: "Misura il tuo potenziale",
      feature3Description:
        "Scopri quanti soldi hai realmente nella tua pipeline.",
      trustedBy:
        "Creato per i team che vogliono vendere di più.",
    },

    page: {
      leads: {
        title: "Lead",
        subtitle:
          "Gestisci le tue opportunità e decidi chi contattare dopo.",
      },

      followUps: {
        title: "Follow-up",
        subtitle:
          "Non lasciare che nessuna opportunità si raffreddi.",
      },

      messages: {
        title: "Messaggi",
        subtitle:
          "Gestisci e prepara le tue comunicazioni.",
      },

      calculator: {
        title: "Calcolatrice",
        subtitle:
          "Scopri quanti soldi puoi recuperare.",
      },

      settings: {
        title: "Impostazioni",
        subtitle:
          "Personalizza la tua esperienza con Lead Rescue.",
      },
    },
  },

  // =========================================================
  // 🇵🇹 PORTUGUÊS
  // =========================================================

  pt: {
    languageName: "Português",

    nav: {
      dashboard: "Dashboard",
      leads: "Leads",
      followUps: "Acompanhamentos",
      messages: "Mensagens",
      calculator: "Calculadora",
      settings: "Definições",
    },

    common: {
      newLead: "Novo lead",
      viewDemo: "Ver demonstração",
      save: "Guardar alterações",
      cancel: "Cancelar",
      today: "Hoje",
      upcoming: "Próximos",
      overdue: "Em atraso",
      free: "Grátis",
      monthly: "por mês",
      viewAll: "Ver tudo",
      viewAllLeads: "Ver todos os leads",
      write: "Escrever",
      attention: "Atenção",
      language: "Idioma",
      darkMode: "Modo escuro",
      lightMode: "Modo claro",
      workspace: "Workspace",
      freeWorkspace: "Workspace gratuito",
    },

    leads: {
      management: "GESTÃO DE LEADS",
      title: "Leads",
      description:
        "Gere as tuas oportunidades e decide quem contactar a seguir.",
      showing: "A mostrar",
      lead: "lead",
      leads: "leads",
      visibleValue: "Valor visível",
      hotOpportunities: "Oportunidades quentes",
      requireFollowUp: "precisam de acompanhamento",
      allStatuses: "Todos os estados",

      statuses: {
        new: "Novo",
        contacted: "Contactado",
        proposal: "Proposta",
        "follow-up": "Acompanhamento",
        won: "Ganho",
        lost: "Perdido",
      },

      sortHighestValue: "Maior valor",
      sortLowestValue: "Menor valor",
      sortNewest: "Mais recentes",
      sortNextFollowUp: "Próximo acompanhamento",
      opportunity: "Oportunidade",
      followUp: "Acompanhamento",
      noDate: "Sem data",
      source: "Origem",
      lastContact: "Último contacto",
      noRecord: "Sem registo",
      edit: "Editar",
      viewDetails: "Ver detalhes",
      call: "Ligar",
      email: "Enviar email",
      delete: "Eliminar",
      deleteConfirm: "Tens a certeza que queres eliminar",
      noLeadsFound: "Nenhum lead encontrado",
      noLeadsFoundDescription:
        "Tenta alterar a pesquisa ou os filtros.",
      emptyPipeline: "O teu pipeline está vazio",
      emptyPipelineDescription:
        "Adiciona o teu primeiro lead para começar a recuperar oportunidades.",
      clearFilters: "Limpar filtros",
      addFirstLead: "Adicionar primeiro lead",
      editOpportunity: "EDITAR OPORTUNIDADE",
      newOpportunity: "NOVA OPORTUNIDADE",
      addLead: "Adicionar lead",
      saveChanges: "Guardar alterações",
      createLead: "Criar lead",
      searchPlaceholder:
        "Pesquisar por nome, empresa, serviço ou contacto...",

      sources: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        web: "Web",
        email: "Email",
        referral: "Referência",
        other: "Outro",
      },

      fields: {
        name: "Nome",
        company: "Empresa",
        service: "Serviço",
        value: "Valor",
        status: "Estado",
        source: "Origem",
        lastContact: "Último contacto",
        nextFollowUp: "Próximo acompanhamento",
        email: "Email",
        phone: "Telefone",
        notes: "Notas",
      },

      placeholders: {
        name: "Nome do contacto",
        company: "Empresa",
        service: "Serviço ou produto",
        value: "0",
        email: "email@exemplo.com",
        phone: "+34 600 000 000",
        notes: "Adiciona qualquer informação relevante...",
      },
    },

    dashboard: {
      title: "Dashboard",
      subtitle: "Isto é o que precisa da tua atenção.",
      headline: "Não deixes dinheiro em cima da mesa.",
      description:
        "O Lead Rescue mostra-te quais as oportunidades que precisam de acompanhamento e quanto podem valer.",
      recovery: "Potencial recuperável",
      followUps: "Acompanhamentos hoje",
      activeLeads: "Leads ativos",
      pipeline: "Pipeline",
      attention: "Precisa da tua atenção",
      recent: "Leads recentes",
      recoveryOverview: "Resumo de recuperação",
      rescueScore: "Rescue score",
      followUp: "Acompanhamento",
      excellent: "Excelente",
      healthy: "Saudável",
      needsAttention: "Precisa de atenção",
      atRisk: "Em risco",
      leadsWithOpportunity: "leads com oportunidade",
      requireAttention: "precisam de atenção",
      totalLeads: "leads no total",
      conversion: "conversão",
      prioritizeContacts:
        "Prioriza estes contactos primeiro.",
      hotOpportunities: "Oportunidades quentes",
      highestPotential:
        "Leads com maior potencial.",
      noHotLeads:
        "Ainda não existem oportunidades quentes",
      addLeadsToStart:
        "Adiciona leads para começar a detetar oportunidades.",
    },

    landing: {
      badge: "Recupera oportunidades que já tens",
      title: "Transforma leads esquecidos em receita.",
      description:
        "O Lead Rescue deteta quais os leads que precisam de acompanhamento, quando os contactar e quanto dinheiro podes recuperar.",
      startFree: "Começar grátis",
      seeHowItWorks: "Ver como funciona",
      noCard: "Sem cartão. Sem complicações.",
      features:
        "Tudo o que precisas para recuperar mais vendas.",
      feature1Title: "Nunca percas um lead",
      feature1Description:
        "Mantém todos os teus leads organizados e sabe exatamente quem contactar.",
      feature2Title: "Acompanhamentos inteligentes",
      feature2Description:
        "Obtém uma visão clara das oportunidades que precisam de atenção.",
      feature3Title: "Mede o teu potencial",
      feature3Description:
        "Descobre quanto dinheiro tens realmente no teu pipeline.",
      trustedBy:
        "Criado para equipas que querem vender mais.",
    },

    page: {
      leads: {
        title: "Leads",
        subtitle:
          "Gere as tuas oportunidades e decide quem contactar a seguir.",
      },

      followUps: {
        title: "Acompanhamentos",
        subtitle:
          "Não deixes nenhuma oportunidade arrefecer.",
      },

      messages: {
        title: "Mensagens",
        subtitle:
          "Gere e prepara as tuas comunicações.",
      },

      calculator: {
        title: "Calculadora",
        subtitle:
          "Descobre quanto dinheiro podes recuperar.",
      },

      settings: {
        title: "Definições",
        subtitle:
          "Personaliza a tua experiência no Lead Rescue.",
      },
    },
  },

  // =========================================================
  // 🇨🇳 中文
  // =========================================================

  zh: {
    languageName: "中文",

    nav: {
      dashboard: "仪表盘",
      leads: "潜在客户",
      followUps: "跟进",
      messages: "消息",
      calculator: "计算器",
      settings: "设置",
    },

    common: {
      newLead: "新潜客",
      viewDemo: "查看演示",
      save: "保存更改",
      cancel: "取消",
      today: "今天",
      upcoming: "即将到来",
      overdue: "已逾期",
      free: "免费",
      monthly: "每月",
      viewAll: "查看全部",
      viewAllLeads: "查看所有潜客",
      write: "写消息",
      attention: "注意",
      language: "语言",
      darkMode: "深色模式",
      lightMode: "浅色模式",
      workspace: "工作区",
      freeWorkspace: "免费工作区",
    },

    leads: {
      management: "潜客管理",
      title: "潜客",
      description:
        "管理你的销售机会，并决定下一步联系谁。",
      showing: "显示",
      lead: "潜客",
      leads: "潜客",
      visibleValue: "可见价值",
      hotOpportunities: "热门机会",
      requireFollowUp: "需要跟进",
      allStatuses: "所有状态",

      statuses: {
        new: "新建",
        contacted: "已联系",
        proposal: "报价",
        "follow-up": "跟进",
        won: "赢单",
        lost: "输单",
      },

      sortHighestValue: "价值最高",
      sortLowestValue: "价值最低",
      sortNewest: "最新",
      sortNextFollowUp: "下一次跟进",
      opportunity: "机会",
      followUp: "跟进",
      noDate: "无日期",
      source: "来源",
      lastContact: "最后联系",
      noRecord: "无记录",
      edit: "编辑",
      viewDetails: "查看详情",
      call: "拨打电话",
      email: "发送邮件",
      delete: "删除",
      deleteConfirm: "确定要删除",
      noLeadsFound: "没有找到潜客",
      noLeadsFoundDescription:
        "尝试修改搜索条件或筛选器。",
      emptyPipeline: "你的销售管道为空",
      emptyPipelineDescription:
        "添加第一个潜客，开始挽回销售机会。",
      clearFilters: "清除筛选",
      addFirstLead: "添加第一个潜客",
      editOpportunity: "编辑机会",
      newOpportunity: "新机会",
      addLead: "添加潜客",
      saveChanges: "保存更改",
      createLead: "创建潜客",
      searchPlaceholder:
        "按姓名、公司、服务或联系人搜索...",

      sources: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        web: "网站",
        email: "邮件",
        referral: "推荐",
        other: "其他",
      },

      fields: {
        name: "姓名",
        company: "公司",
        service: "服务",
        value: "价值",
        status: "状态",
        source: "来源",
        lastContact: "最后联系",
        nextFollowUp: "下一次跟进",
        email: "邮箱",
        phone: "电话",
        notes: "备注",
      },

      placeholders: {
        name: "联系人姓名",
        company: "公司",
        service: "服务或产品",
        value: "0",
        email: "email@example.com",
        phone: "+34 600 000 000",
        notes: "添加相关信息...",
      },
    },

    dashboard: {
      title: "仪表盘",
      subtitle: "以下是需要你关注的内容。",
      headline: "不要让钱白白流失。",
      description:
        "Lead Rescue 会告诉你哪些机会需要跟进，以及它们可能值多少钱。",
      recovery: "可挽回潜力",
      followUps: "今日跟进",
      activeLeads: "活跃潜客",
      pipeline: "销售管道",
      attention: "需要你的关注",
      recent: "最近潜客",
      recoveryOverview: "挽回概览",
      rescueScore: "挽回评分",
      followUp: "跟进",
      excellent: "优秀",
      healthy: "健康",
      needsAttention: "需要关注",
      atRisk: "有风险",
      leadsWithOpportunity: "有机会的潜客",
      requireAttention: "需要关注",
      totalLeads: "潜客总数",
      conversion: "转化率",
      prioritizeContacts:
        "优先联系这些客户。",
      hotOpportunities: "热门机会",
      highestPotential:
        "潜力最高的潜客。",
      noHotLeads:
        "目前还没有热门机会",
      addLeadsToStart:
        "添加潜客开始发现机会。",
    },

    landing: {
      badge: "挽回你已经拥有的销售机会",
      title: "把被遗忘的潜客变成收入。",
      description:
        "Lead Rescue 会发现哪些潜客需要跟进、什么时候联系，以及你可以挽回多少钱。",
      startFree: "免费开始",
      seeHowItWorks: "了解工作原理",
      noCard: "无需银行卡。没有复杂操作。",
      features:
        "挽回更多销售所需的一切。",
      feature1Title: "永远不要错过潜客",
      feature1Description:
        "集中管理所有潜客，并准确知道该联系谁。",
      feature2Title: "智能跟进",
      feature2Description:
        "清楚了解哪些机会需要关注。",
      feature3Title: "衡量你的潜力",
      feature3Description:
        "发现你的销售管道中真正有多少资金。",
      trustedBy:
        "为希望提高销售额的团队打造。",
    },

    page: {
      leads: {
        title: "潜客",
        subtitle:
          "管理你的机会，并决定下一步联系谁。",
      },

      followUps: {
        title: "跟进",
        subtitle:
          "不要让任何销售机会冷掉。",
      },

      messages: {
        title: "消息",
        subtitle:
          "管理并准备你的沟通内容。",
      },

      calculator: {
        title: "计算器",
        subtitle:
          "发现你可以挽回多少钱。",
      },

      settings: {
        title: "设置",
        subtitle:
          "自定义你的 Lead Rescue 体验。",
      },
    },
  },

  // =========================================================
  // 🇯🇵 日本語
  // =========================================================

  ja: {
    languageName: "日本語",

    nav: {
      dashboard: "ダッシュボード",
      leads: "リード",
      followUps: "フォローアップ",
      messages: "メッセージ",
      calculator: "計算機",
      settings: "設定",
    },

    common: {
      newLead: "新しいリード",
      viewDemo: "デモを見る",
      save: "変更を保存",
      cancel: "キャンセル",
      today: "今日",
      upcoming: "今後",
      overdue: "期限切れ",
      free: "無料",
      monthly: "月額",
      viewAll: "すべて見る",
      viewAllLeads: "すべてのリードを見る",
      write: "書く",
      attention: "注意",
      language: "言語",
      darkMode: "ダークモード",
      lightMode: "ライトモード",
      workspace: "ワークスペース",
      freeWorkspace: "無料ワークスペース",
    },

    leads: {
      management: "リード管理",
      title: "リード",
      description:
        "商談機会を管理し、次に誰へ連絡するかを決めます。",
      showing: "表示中",
      lead: "リード",
      leads: "リード",
      visibleValue: "表示価値",
      hotOpportunities: "有望な商談",
      requireFollowUp: "フォローアップが必要",
      allStatuses: "すべてのステータス",

      statuses: {
        new: "新規",
        contacted: "連絡済み",
        proposal: "提案",
        "follow-up": "フォローアップ",
        won: "成約",
        lost: "失注",
      },

      sortHighestValue: "価値が高い順",
      sortLowestValue: "価値が低い順",
      sortNewest: "新しい順",
      sortNextFollowUp: "次回フォローアップ",
      opportunity: "商談機会",
      followUp: "フォローアップ",
      noDate: "日付なし",
      source: "流入元",
      lastContact: "最終連絡",
      noRecord: "記録なし",
      edit: "編集",
      viewDetails: "詳細を見る",
      call: "電話",
      email: "メール送信",
      delete: "削除",
      deleteConfirm: "本当に削除しますか",
      noLeadsFound: "リードが見つかりません",
      noLeadsFoundDescription:
        "検索条件またはフィルターを変更してください。",
      emptyPipeline: "パイプラインは空です",
      emptyPipelineDescription:
        "最初のリードを追加して商談機会の回収を始めましょう。",
      clearFilters: "フィルターをクリア",
      addFirstLead: "最初のリードを追加",
      editOpportunity: "商談機会を編集",
      newOpportunity: "新しい商談機会",
      addLead: "リードを追加",
      saveChanges: "変更を保存",
      createLead: "リードを作成",
      searchPlaceholder:
        "名前、会社、サービス、連絡先で検索...",

      sources: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        web: "Web",
        email: "メール",
        referral: "紹介",
        other: "その他",
      },

      fields: {
        name: "名前",
        company: "会社",
        service: "サービス",
        value: "価値",
        status: "ステータス",
        source: "流入元",
        lastContact: "最終連絡",
        nextFollowUp: "次回フォローアップ",
        email: "メール",
        phone: "電話",
        notes: "メモ",
      },

      placeholders: {
        name: "連絡先の名前",
        company: "会社",
        service: "サービスまたは商品",
        value: "0",
        email: "email@example.com",
        phone: "+34 600 000 000",
        notes: "関連情報を追加...",
      },
    },

    dashboard: {
      title: "ダッシュボード",
      subtitle: "対応が必要な項目です。",
      headline: "眠っている売上を逃さない。",
      description:
        "Lead Rescue はフォローアップが必要な商談と、その潜在価値を表示します。",
      recovery: "回収可能な売上",
      followUps: "今日のフォローアップ",
      activeLeads: "アクティブなリード",
      pipeline: "パイプライン",
      attention: "要対応",
      recent: "最近のリード",
      recoveryOverview: "回収状況",
      rescueScore: "Rescue スコア",
      followUp: "フォローアップ",
      excellent: "優秀",
      healthy: "良好",
      needsAttention: "要注意",
      atRisk: "リスクあり",
      leadsWithOpportunity: "商談機会のあるリード",
      requireAttention: "要対応",
      totalLeads: "リード総数",
      conversion: "コンバージョン",
      prioritizeContacts:
        "まずこれらの連絡先を優先してください。",
      hotOpportunities: "有望な商談",
      highestPotential:
        "最も可能性の高いリード。",
      noHotLeads:
        "まだ有望な商談はありません",
      addLeadsToStart:
        "リードを追加して商談機会を見つけましょう。",
    },

    landing: {
      badge: "すでに持っている商談機会を回収",
      title: "忘れられたリードを売上に変える。",
      description:
        "Lead Rescue はフォローアップが必要なリード、連絡するタイミング、回収できる可能性のある金額を検出します。",
      startFree: "無料で始める",
      seeHowItWorks: "仕組みを見る",
      noCard: "カード不要。複雑な設定も不要。",
      features:
        "より多くの売上を回収するために必要なすべて。",
      feature1Title: "リードを失わない",
      feature1Description:
        "すべてのリードを整理し、誰に連絡すべきか正確に把握できます。",
      feature2Title: "スマートフォローアップ",
      feature2Description:
        "どの商談に対応が必要かを明確に確認できます。",
      feature3Title: "可能性を測定",
      feature3Description:
        "パイプラインに実際にどれだけの金額があるかを確認できます。",
      trustedBy:
        "売上を増やしたいチームのために作られています。",
    },

    page: {
      leads: {
        title: "リード",
        subtitle:
          "商談機会を管理し、次に誰へ連絡するかを決めます。",
      },

      followUps: {
        title: "フォローアップ",
        subtitle:
          "商談機会を放置しないようにしましょう。",
      },

      messages: {
        title: "メッセージ",
        subtitle:
          "コミュニケーションを管理・準備します。",
      },

      calculator: {
        title: "計算機",
        subtitle:
          "回収できる可能性のある金額を確認します。",
      },

      settings: {
        title: "設定",
        subtitle:
          "Lead Rescue の体験をカスタマイズします。",
      },
    },
  },
};

function getInitialLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored && translations[stored]) {
      return stored;
    }
  } catch (error) {
    console.error("Error leyendo el idioma:", error);
  }

  return "es";
}

function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.error("Error guardando el idioma:", error);
    }
  }, [language]);

  const currentTranslations =
    translations[language] || translations.es;

  const t = {
    ...translations.es,
    ...currentTranslations,

    nav: {
      ...translations.es.nav,
      ...(currentTranslations.nav || {}),
    },

    common: {
      ...translations.es.common,
      ...(currentTranslations.common || {}),
    },

    leads: {
      ...translations.es.leads,
      ...(currentTranslations.leads || {}),

      statuses: {
        ...translations.es.leads.statuses,
        ...(currentTranslations.leads?.statuses || {}),
      },

      sources: {
        ...translations.es.leads.sources,
        ...(currentTranslations.leads?.sources || {}),
      },

      fields: {
        ...translations.es.leads.fields,
        ...(currentTranslations.leads?.fields || {}),
      },

      placeholders: {
        ...translations.es.leads.placeholders,
        ...(currentTranslations.leads?.placeholders || {}),
      },
    },

    dashboard: {
      ...translations.es.dashboard,
      ...(currentTranslations.dashboard || {}),
    },

    landing: {
      ...translations.es.landing,
      ...(currentTranslations.landing || {}),
    },

    page: {
      ...translations.es.page,
      ...(currentTranslations.page || {}),

      leads: {
        ...translations.es.page.leads,
        ...(currentTranslations.page?.leads || {}),
      },

      followUps: {
        ...translations.es.page.followUps,
        ...(currentTranslations.page?.followUps || {}),
      },

      messages: {
        ...translations.es.page.messages,
        ...(currentTranslations.page?.messages || {}),
      },

      calculator: {
        ...translations.es.page.calculator,
        ...(currentTranslations.page?.calculator || {}),
      },

      settings: {
        ...translations.es.page.settings,
        ...(currentTranslations.page?.settings || {}),
      },
    },
  };

  const changeLanguage = (newLanguage) => {
    if (!translations[newLanguage]) return;

    setLanguageState(newLanguage);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage: changeLanguage,
      t,
      languages: translations,
    }),
    [language, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage debe utilizarse dentro de LanguageProvider"
    );
  }

  return context;
}

export default LanguageProvider;