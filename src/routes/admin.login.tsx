import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { adminCredentials } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Gadhinglaj Models Club" },
      {
        name: "description",
        content: "Demo administrator sign-in for the Gadhinglaj Models Club management panel.",
      },
      { property: "og:title", content: "Admin Login — Gadhinglaj Models Club" },
      { property: "og:description", content: "Boutique management panel sign-in." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login, admin, hydrated } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && admin) navigate({ to: "/admin", replace: true });
  }, [hydrated, admin, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) navigate({ to: "/admin", replace: true });
    else setError("Invalid credentials. Use the demo login shown below.");
  };

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-rose";

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-lift">
        <div className="text-center">
          <p className="eyebrow">Gadhinglaj Models Club</p>
          <h1 className="mt-3 font-display text-3xl text-primary">Admin Login</h1>
          <div className="gold-rule mx-auto mt-4" />
        </div>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-lift"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 rounded-xl bg-blush px-4 py-3 text-center text-xs text-primary">
          <p className="font-medium uppercase tracking-widest">Demo credentials</p>
          <p className="mt-1 break-all">{adminCredentials.email}</p>
          <p>{adminCredentials.password}</p>
        </div>
        <Link
          to="/"
          className="mt-6 block text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          Back to website
        </Link>
      </div>
    </div>
  );
}
