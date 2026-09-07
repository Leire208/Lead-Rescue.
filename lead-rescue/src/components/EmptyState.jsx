import { Inbox } from "lucide-react";

function EmptyState({
  title = "No hay nada aquí todavía",
  description = "Cuando tengas información aparecerá aquí.",
  action,
  onAction,
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
        <Inbox size={21} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-950">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
        {description}
      </p>

      {action && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl bg-gray-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export default EmptyState;