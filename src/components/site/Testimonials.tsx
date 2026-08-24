import { useStore } from "@/lib/store";
import { Stars } from "./Icons";
import { SectionHead } from "./SiteLayout";

const tints = ["bg-blush", "bg-secondary", "bg-muted", "bg-accent/20", "bg-rose/15", "bg-primary/10"];

export default function Testimonials() {
  const { reviews } = useStore();
  const list = reviews.filter((r) => r.approved);

  return (
    <section className="container-lux py-20">
      <SectionHead
        eyebrow="Loved by our clients"
        title="Stories from the Boutique"
        subtitle="Real feedback from customers who dressed for their biggest moments with us."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((r, idx) => (
          <figure
            key={r.id}
            className="animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <Stars rating={r.rating} />
            <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm text-primary ${tints[idx % tints.length]}`}
              >
                {r.initials}
              </span>
              <span>
                <span className="block text-sm font-medium">{r.name}</span>
                <span className="block text-xs text-muted-foreground">Verified customer</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
