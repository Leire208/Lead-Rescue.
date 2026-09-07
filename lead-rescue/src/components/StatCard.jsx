function StatCard({
  label,
  value,
  description,
  icon: Icon,
  trend,
  highlight = false,
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5",
        highlight
          ? "border-gray-950 bg-gray-950 text-white shadow-lg shadow-gray-950/10"
          : "border-gray-200 bg-white text-gray-950",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-gray-400">{label}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight">
            {value}
          </p>
        </div>

        {Icon && (
          <div
            className={[
              "flex h-9 w-9 items-center justify-center rounded-xl",
              highlight
                ? "bg-white/10 text-white"
                : "bg-gray-50 text-gray-600",
            ].join(" ")}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      {(description || trend) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {trend && (
            <span className="font-semibold">
              {trend}
            </span>
          )}

          {description && (
            <span
              className={
                highlight ? "text-gray-500" : "text-gray-400"
              }
            >
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default StatCard;