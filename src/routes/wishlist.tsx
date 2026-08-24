import { createFileRoute, Link } from "@tanstack/react-router";
import ProductGrid from "@/components/site/ProductGrid";
import SiteLayout, { EmptyState, PageHero } from "@/components/site/SiteLayout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Gadhinglaj Models Club" },
      {
        name: "description",
        content: "Saved designer gowns, ethnic wear and rental outfits from Gadhinglaj Models Club.",
      },
      { property: "og:title", content: "Your Wishlist — Gadhinglaj Models Club" },
      {
        property: "og:description",
        content: "Keep your favourite boutique outfits in one place.",
      },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { products, wishlist } = useStore();
  const list = products.filter((p) => wishlist.includes(p.id) && p.active);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Saved for later"
        title="Wishlist"
        subtitle="The pieces you loved, kept safe until you are ready."
      />
      <div className="container-lux py-14">
        {list.length ? (
          <ProductGrid products={list} />
        ) : (
          <EmptyState
            title="Your wishlist is empty"
            text="Tap the heart on any outfit to save it here."
            action={
              <Link
                to="/shop"
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Browse the collection
              </Link>
            }
          />
        )}
      </div>
    </SiteLayout>
  );
}
