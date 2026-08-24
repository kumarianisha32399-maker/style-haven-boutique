import { inr, type Category } from "@/data/catalog";

export type Filters = {
  q: string;
  category: string;
  type: string;
  occasion: string;
  size: string;
  color: string;
  maxPrice: number;
  minRating: number;
  sort: string;
};

export const defaultFilters: Filters = {
  q: "",
  category: "All",
  type: "All",
  occasion: "All",
  size: "All",
  color: "All",
  maxPrice: 50000,
  minRating: 0,
  sort: "Newest",
};

export const sortOptions = ["Newest", "Price Low to High", "Price High to Low", "Popular", "Best Rated"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const select =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-rose";

export default function SearchFilter({
  filters,
  setFilters,
  categories,
  sizes,
  colors,
  occasions,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  categories: Category[];
  sizes: string[];
  colors: string[];
  occasions: string[];
}) {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setFilters({ ...filters, [k]: v });

  return (
    <aside className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-soft">
      <Field label="Search">
        <input
          value={filters.q}
          onChange={(e) => set("q", e.target.value)}
          placeholder="Search outfits…"
          className={select}
        />
      </Field>

      <Field label="Category">
        <select value={filters.category} onChange={(e) => set("category", e.target.value)} className={select}>
          {["All", ...categories.map((c) => c.name)].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>

      <Field label="Type">
        <select value={filters.type} onChange={(e) => set("type", e.target.value)} className={select}>
          {["All", "Ready-Made", "Rental"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label={`Max Price — ${inr(filters.maxPrice)}`}>
        <input
          type="range"
          min={1000}
          max={50000}
          step={500}
          value={filters.maxPrice}
          onChange={(e) => set("maxPrice", Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
        />
      </Field>

      <Field label="Size">
        <select value={filters.size} onChange={(e) => set("size", e.target.value)} className={select}>
          {["All", ...sizes].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>

      <Field label="Colour">
        <select value={filters.color} onChange={(e) => set("color", e.target.value)} className={select}>
          {["All", ...colors].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>

      <Field label="Occasion">
        <select value={filters.occasion} onChange={(e) => set("occasion", e.target.value)} className={select}>
          {["All", ...occasions].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field label="Minimum Rating">
        <select
          value={filters.minRating}
          onChange={(e) => set("minRating", Number(e.target.value))}
          className={select}
        >
          {[0, 4, 4.5, 4.8].map((r) => (
            <option key={r} value={r}>
              {r === 0 ? "Any rating" : `${r}+ stars`}
            </option>
          ))}
        </select>
      </Field>

      <button
        onClick={() => setFilters(defaultFilters)}
        className="w-full rounded-full border border-border py-2.5 text-sm text-primary transition-colors hover:bg-blush"
      >
        Reset Filters
      </button>
    </aside>
  );
}

export function applyFilters<
  T extends {
    name: string;
    category: string;
    type: string;
    price: number;
    rating: number;
    sizes: string[];
    color: string;
    occasion: string;
    id: number;
    reviews: number;
    active: boolean;
  },
>(items: T[], f: Filters): T[] {
  const q = f.q.trim().toLowerCase();
  const out = items.filter(
    (p) =>
      p.active &&
      (!q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q)) &&
      (f.category === "All" ||
        p.category === f.category ||
        (f.category === "Rental Collection" && p.type === "rental")) &&
      (f.type === "All" ||
        (f.type === "Rental" ? p.type === "rental" : p.type === "readymade")) &&
      (f.size === "All" || p.sizes.includes(f.size)) &&
      (f.color === "All" || p.color === f.color) &&
      (f.occasion === "All" || p.occasion === f.occasion) &&
      p.price <= f.maxPrice &&
      p.rating >= f.minRating,
  );

  const sorted = [...out];
  if (f.sort === "Price Low to High") sorted.sort((a, b) => a.price - b.price);
  else if (f.sort === "Price High to Low") sorted.sort((a, b) => b.price - a.price);
  else if (f.sort === "Popular") sorted.sort((a, b) => b.reviews - a.reviews);
  else if (f.sort === "Best Rated") sorted.sort((a, b) => b.rating - a.rating);
  else sorted.sort((a, b) => b.id - a.id);
  return sorted;
}
