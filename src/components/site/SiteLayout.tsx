import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="container-lux animate-fade-up py-14 text-center md:py-18">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl text-primary md:text-5xl">{title}</h1>
        <div className="gold-rule mx-auto mt-5" />
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl text-primary md:text-4xl">{title}</h2>
      <div className={`gold-rule mt-4 ${center ? "mx-auto" : ""}`} />
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground ${center ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="animate-fade-up mx-auto max-w-md rounded-3xl border border-border bg-card px-8 py-16 text-center shadow-soft">
      <div className="mx-auto h-14 w-14 animate-pulse rounded-full bg-blush" />
      <h3 className="mt-6 font-display text-2xl text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
