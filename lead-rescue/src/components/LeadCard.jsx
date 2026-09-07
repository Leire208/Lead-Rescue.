import {
  ArrowUpRight,
  Clock3,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

const statusConfig = {
  new: {
    label: "Nuevo",
    className: "bg-blue-50 text-blue-700",
  },
  contacted: {
    label: "Contactado",
    className: "bg-gray-100 text-gray-700",
  },
  proposal: {
    label: "Presupuesto",
    className: "bg-purple-50 text-purple-700",
  },
  "follow-up": {
    label: "Seguimiento",
    className: "bg-amber-50 text-amber-700",
  },
  won: {
    label: "Ganado",
    className: "bg-emerald-50 text-emerald-700",
  },
  lost: {
    label: "Perdido",
    className: "bg-red-50 text-red-700",
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date) {
  if (!date) return "Sin fecha";

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

function LeadCard({ lead, onClick }) {
  const status = statusConfig[lead.status] || statusConfig.new;

  return (
    <button
      type="button"
      onClick={() => onClick?.(lead)}
      className="group w-full rounded-2xl border border-gray-200 bg-white p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-900/5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
            {lead.name
              ?.split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-950">
              {lead.name}
            </h3>

            <p className="truncate text-xs text-gray-400">
              {lead.company}
            </p>
          </div>
        </div>

        <ArrowUpRight
          size={18}
          className="shrink-0 text-gray-300 transition group-hover:text-gray-900"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
        >
          {status.label}
        </span>

        <span className="text-sm font-bold text-gray-950">
          {formatCurrency(lead.value)}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock3 size={14} />
          <span>{formatDate(lead.nextFollowUp)}</span>
        </div>

        <div className="flex justify-end gap-2">
          {lead.phone && (
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
              <Phone size={13} />
            </span>
          )}

          {lead.email && (
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
              <Mail size={13} />
            </span>
          )}

          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
            <MessageCircle size={13} />
          </span>
        </div>
      </div>
    </button>
  );
}

export default LeadCard;