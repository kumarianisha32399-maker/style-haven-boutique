import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon } from "./Icons";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/rental", label: "Rental" },
  { to: "/categories", label: "Categories" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="absolute -right-2 -top-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
      {count}
    </span>
  );
}

export default function Navbar() {
  const { cart, wishlist, content } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const cartCount = cart.reduce((n, c) => n + c.qty, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-lux flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="group leading-none">
          <span className="block font-display text-xl font-semibold tracking-tight text-primary md:text-2xl">
            {content.businessName}
          </span>
          <span className="eyebrow mt-1 block text-[9px]">Boutique &amp; Rental Studio</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative text-sm tracking-wide text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-full p-2 text-foreground/80 transition-colors hover:bg-blush hover:text-primary"
          >
            <SearchIcon />
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-full p-2 text-foreground/80 transition-colors hover:bg-blush hover:text-primary"
          >
            <HeartIcon />
            <Badge count={wishlist.length} />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative rounded-full p-2 text-foreground/80 transition-colors hover:bg-blush hover:text-primary"
          >
            <BagIcon />
            <Badge count={cartCount} />
          </Link>
          <Link
            to="/admin/login"
            aria-label="Account"
            className="hidden rounded-full p-2 text-foreground/80 transition-colors hover:bg-blush hover:text-primary sm:block"
          >
            <UserIcon />
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-primary lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border/70 bg-card">
          <form onSubmit={submit} className="container-lux flex gap-2 py-3">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search gowns, ethnic wear, rentals…"
              className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-rose"
            />
            <button className="rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground">
              Search
            </button>
          </form>
        </div>
      )}

      {open && (
        <nav className="border-t border-border/70 bg-card lg:hidden">
          <div className="container-lux flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/50 py-3 text-sm tracking-wide last:border-0"
                activeProps={{ className: "text-primary font-medium" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="py-3 text-sm text-muted-foreground"
            >
              Account / Login
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
