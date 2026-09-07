export const messageCategories = [
  {
    id: "first-follow-up",
    title: "Primer seguimiento",
    description: "Cuando el lead ha preguntado pero todavía no ha decidido.",
    messages: [
      {
        id: "first-1",
        title: "Seguimiento simple",
        channel: "WhatsApp",
        text: `Hola {{nombre}}, ¿qué tal?

Te escribo para saber si pudiste revisar la información que te envié sobre {{servicio}}.

Si tienes cualquier duda, estoy aquí para ayudarte 😊`,
      },
      {
        id: "first-2",
        title: "Directo y profesional",
        channel: "Email",
        text: `Hola {{nombre}},

Quería hacer un breve seguimiento de la propuesta de {{servicio}} que te envié.

¿Sigues interesado/a en avanzar? Si quieres, podemos revisar cualquier duda o ajustar la propuesta.

Un saludo.`,
      },
      {
        id: "first-3",
        title: "Corto",
        channel: "WhatsApp",
        text: `Hola {{nombre}} 👋

¿Pudiste echarle un vistazo a lo de {{servicio}}?

Si quieres, te resuelvo cualquier duda por aquí.`,
      },
    ],
  },
  {
    id: "quote",
    title: "Presupuesto enviado",
    description: "Para clientes que recibieron un presupuesto y no respondieron.",
    messages: [
      {
        id: "quote-1",
        title: "Después del presupuesto",
        channel: "WhatsApp",
        text: `Hola {{nombre}}.

Te escribo por el presupuesto de {{servicio}} que te envié.

Quería saber si has podido revisarlo y si hay algo que quieras comentar o modificar.

¿Te viene bien que lo veamos?`,
      },
      {
        id: "quote-2",
        title: "Abrir conversación",
        channel: "WhatsApp",
        text: `Hola {{nombre}} 👋

¿Qué te pareció la propuesta de {{servicio}}?

Si el precio o algún detalle no encaja exactamente con lo que buscabas, dímelo y vemos qué podemos hacer.`,
      },
    ],
  },
  {
    id: "old-lead",
    title: "Lead antiguo",
    description: "Para recuperar conversaciones que quedaron abandonadas.",
    messages: [
      {
        id: "old-1",
        title: "Reactivación",
        channel: "WhatsApp",
        text: `Hola {{nombre}}.

Hace un tiempo hablamos sobre {{servicio}} y quería volver a escribirte por si sigue siendo algo que tienes en mente.

Si todavía te interesa, puedo actualizarte la información y vemos cómo encajarlo.`,
      },
      {
        id: "old-2",
        title: "Muy natural",
        channel: "WhatsApp",
        text: `Hola {{nombre}} 😊

Me acordé de la conversación que tuvimos sobre {{servicio}}.

¿Llegaste finalmente a resolverlo o sigue pendiente?

Si sigue pendiente, estaré encantado/a de ayudarte.`,
      },
    ],
  },
  {
    id: "no-response",
    title: "Sin respuesta",
    description: "Cuando has escrito varias veces y el lead sigue sin responder.",
    messages: [
      {
        id: "no-response-1",
        title: "Último toque",
        channel: "WhatsApp",
        text: `Hola {{nombre}}.

Te escribo una última vez por {{servicio}} para no molestarte más.

Si finalmente no estás interesado/a, no pasa nada. Y si sigue en pie, simplemente respóndeme por aquí y lo retomamos.`,
      },
    ],
  },
];

export const allMessages = messageCategories.flatMap(
  (category) =>
    category.messages.map((message) => ({
      ...message,
      categoryId: category.id,
      categoryTitle: category.title,
    }))
);