import clsx from "clsx";

export default function FormField({
  field,
  value,
  error,
  onChange,
  dark = false,
}) {
  const baseClasses = clsx(
    "w-full rounded-2xl border px-5 py-4",
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold",
    dark
      ? "bg-white/[0.06] text-parchment placeholder:text-parchment/35"
      : "bg-white/80 text-ink placeholder:text-slate/60",
    error
      ? "border-red-400"
      : dark
      ? "border-parchment/15 hover:border-gold/40"
      : "border-gold/20 hover:border-gold/40"
  );

  return (
    <div className="space-y-2">
      <label
        htmlFor={field.name}
        className={clsx(
          "block font-medium",
          dark ? "text-parchment" : "text-ink"
        )}
      >
        {field.label}

        {field.required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {/* TEXTAREA */}

      {field.type === "textarea" ? (
        <textarea
          id={field.name}
          name={field.name}
          rows={5}
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder}
          className={baseClasses}
        />
      ) : field.type === "select" ? (
        /* SELECT */

        <select
          id={field.name}
          name={field.name}
          value={value || ""}
          onChange={onChange}
          className={clsx(baseClasses, dark && "[color-scheme:dark]")}
        >
          <option value="">
            Select an option
          </option>

          {field.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        /* INPUT */

        <input
          id={field.name}
          name={field.name}
          type={field.type}
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder}
          className={baseClasses}
        />
      )}

      {error && (
        <p className={clsx("text-sm", dark ? "text-red-400" : "text-red-500")}>
          {error}
        </p>
      )}
    </div>
  );
}