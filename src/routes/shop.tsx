import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import ProductGrid from "@/components/site/ProductGrid";
import SearchFilter, {
  applyFilters,
  defaultFilters,
  sortOptions,
  type Filters,
} from "@/components/site/SearchFilter";
import SiteLayout, { PageHero } from "@/components/site/SiteLayout";
import { useStore } from "@/lib/store";

type Search = { q?: string | undefined; category?: string | undefined; type?: string | undefined };

const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: str(search["q"]),
    category: str(search["category"]),
    type: str(search["type"]),
  }),
  head: () => ({
    meta: [
      { title: "Shop Designer Outfits — Gadhinglaj Models Club" },
      {
        name: "description",
        content:
          "Browse 24 premium designer gowns, ethnic wear, crop tops and rental outfits with filters for size, colour, occasion and price.",
      },
      { property: "og:title", content: "Shop Designer Outfits — Gadhinglaj Models Club" },
      {
        property: "og:description",
        content: "Browse premium ready-made and rental outfits at Gadhinglaj Models Club.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const { products, categories } = useStore();
  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    q: search.q ?? "",
    category: search.category ?? "All",
    type: search.type ?? "All",
  });

  const sizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))).sort(),
    [products],
  );
  const colors = useMemo(
    () => Array.from(new Set(products.map((p) => p.color))).sort(),
    [products],
  );
  const occasions = useMemo(
    () => Array.from(new Set(products.map((p) => p.occasion))).sort(),
    [products],
  );

  const list = useMemo(() => applyFilters(products, filters), [products, filters]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="The collection"
        title="Shop"
        subtitle="Ready-made designer wear and luxury rental outfits, all in one place."
      />
      <div className="container-lux grid gap-8 py-14 lg:grid-cols-[280px_1fr]">
        <SearchFilter
          filters={filters}
          setFilters={setFilters}
          categories={categories.filter((c) => c.active)}
          sizes={sizes}
          colors={colors}
          occasions={occasions}
        />
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{list.length} outfits found</p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort</span>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-rose"
              >
                {sortOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <ProductGrid products={list} />
        </div>
      </div>
    </SiteLayout>
  );
}
