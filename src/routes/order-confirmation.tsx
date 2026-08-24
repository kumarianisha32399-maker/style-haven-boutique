import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout, { EmptyState } from "@/components/site/SiteLayout";
import { inr } from "@/data/catalog";
import { useStore } from "@/lib/store";

const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({ id: str(search["id"]) }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Gadhinglaj Models Club" },
      {
        name: "description",
        content: "Thank you for your order at Gadhinglaj Models Club. Your outfit is being prepared.",
      },
      { property: "og:title", content: "Order Confirmed — Gadhinglaj Models Club" },
      { property: "og:description", content: "Your boutique order has been placed successfully." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const { id } = Route.useSearch();
  const { orders, content } = useStore();
  const order = orders.find((o) => o.id === id);

  return (
    <SiteLayout>
      <div className="container-lux py-20">
        {!order ? (
          <EmptyState
            title="No order found"
            text="We couldn't find that order reference."
            action={
              <Link
                to="/shop"
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Continue shopping
              </Link>
            }
          />
        ) : (
          <div className="animate-fade-up mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-soft md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush">
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="eyebrow mt-6">Thank you</p>
            <h1 className="mt-3 font-display text-4xl text-primary">Order Confirmed</h1>
            <div className="gold-rule mx-auto mt-5" />
            <p className="mt-5 text-sm text-muted-foreground">
              Your order <span className="font-medium text-foreground">{order.id}</span> has been
              placed. Our team will call you on {order.phone} to confirm the details.
            </p>

            <div className="mt-8 space-y-3 rounded-2xl border border-border bg-secondary/40 p-5 text-left">
              {order.items.map((it, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">
                    {it.name}{" "}
                    <span className="text-muted-foreground">
                      (Size {it.size} × {it.qty})
                    </span>
                  </span>
                  <span className="text-foreground">{inr(it.price * it.qty)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm uppercase tracking-widest text-muted-foreground">
                  Total paid via {order.payment}
                </span>
                <span className="font-display text-xl text-primary">{inr(order.amount)}</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Questions? Call {content.phone} or write to {content.email}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/shop"
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="rounded-full border border-border px-6 py-2.5 text-sm text-primary hover:bg-blush"
              >
                Back Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
