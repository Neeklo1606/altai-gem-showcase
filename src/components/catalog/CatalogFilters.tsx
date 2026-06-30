import { LayoutGrid, Rows3 } from "lucide-react";

export type SortKey = "price-asc" | "price-desc" | "name-asc";
export type ViewMode = "grid-3" | "grid-4";

interface CatalogFiltersProps {
  count: number;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "name-asc", label: "По названию" },
];

export function CatalogFilters({
  count,
  sort,
  onSortChange,
  view,
  onViewChange,
}: CatalogFiltersProps) {
  return (
    <div
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      style={{
        backgroundColor: "#fffdf7",
        borderRadius: 16,
        padding: "12px 16px",
        border: "1px solid rgba(31,26,14,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--color-text-muted)",
        }}
      >
        Найдено товаров:{" "}
        <span style={{ color: "var(--color-text)", fontWeight: 600 }}>
          {count}
        </span>
      </span>

      <div className="flex items-center gap-3">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className="rounded-md border px-3 py-2 outline-none transition-colors"
          style={{
            borderColor: "rgba(31,26,14,0.15)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--color-text)",
            backgroundColor: "#fff",
            minHeight: 44,
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <div
          className="hidden items-center gap-1 rounded-full p-1 lg:flex"
          style={{ backgroundColor: "rgba(31,26,14,0.06)" }}
        >
          <button
            type="button"
            onClick={() => onViewChange("grid-3")}
            aria-label="Сетка 3 колонки"
            className="inline-flex items-center justify-center rounded-full"
            style={{
              width: 36,
              height: 36,
              backgroundColor:
                view === "grid-3" ? "var(--color-accent)" : "transparent",
              color:
                view === "grid-3"
                  ? "var(--color-bg-dark)"
                  : "var(--color-text-muted)",
              transition: "var(--transition-smooth)",
            }}
          >
            <Rows3 size={16} />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("grid-4")}
            aria-label="Сетка 4 колонки"
            className="inline-flex items-center justify-center rounded-full"
            style={{
              width: 36,
              height: 36,
              backgroundColor:
                view === "grid-4" ? "var(--color-accent)" : "transparent",
              color:
                view === "grid-4"
                  ? "var(--color-bg-dark)"
                  : "var(--color-text-muted)",
              transition: "var(--transition-smooth)",
            }}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatalogFilters;
