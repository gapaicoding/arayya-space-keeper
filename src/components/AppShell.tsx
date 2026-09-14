import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", glyph: "▦" },
  { to: "/schedule", label: "Jadwal", glyph: "≡" },
  { to: "/bookings", label: "Booking", glyph: "▤" },
  { to: "/areas", label: "Area", glyph: "◫" },
  { to: "/activities", label: "Aktivitas", glyph: "◈" },
  { to: "/settings", label: "Pengaturan", glyph: "⚙" },
] as const;

const mobileNav = nav.filter((n) =>
  ["/", "/schedule", "/bookings", "/settings"].includes(n.to),
);

export function AppShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-body text-ink">
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[linear-gradient(160deg,oklch(0.97_0.02_240)_0%,oklch(0.95_0.02_265)_45%,oklch(0.95_0.03_300)_100%)]" />
      <div className="blob-a pointer-events-none fixed -z-20 left-[-8%] top-[-12%] size-[42rem] rounded-full bg-brand/40 blur-[120px]" />
      <div className="blob-b pointer-events-none fixed -z-20 right-[-10%] top-[18%] size-[36rem] rounded-full bg-accentv/35 blur-[130px]" />
      <div className="blob-c pointer-events-none fixed -z-20 left-[30%] bottom-[-16%] size-[34rem] rounded-full bg-mint/30 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] gap-5 p-4 pb-24 lg:gap-6 lg:p-6 lg:pb-6">
        <aside className="glass hidden w-64 shrink-0 flex-col rounded-[26px] p-5 lg:flex">
          <div className="flex items-center gap-3">
            <div className="gradient-brand grid size-10 place-items-center rounded-xl font-display text-lg font-bold text-frost shadow-lg shadow-brand/30">
              A
            </div>
            <div>
              <p className="font-display text-base font-bold leading-none">Arayya</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-faint-ink">
                Art &amp; Space
              </p>
            </div>
          </div>
          <nav className="mt-8 flex flex-col gap-1">
            {nav.map((item) => {
              const active = item.to === path;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    active
                      ? "rounded-xl bg-frost/70 px-4 py-2.5 text-sm font-semibold text-ink shadow-sm"
                      : "rounded-xl px-4 py-2.5 text-sm font-medium text-muted-ink transition-colors hover:bg-frost/40"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-2xl border border-frost/60 bg-frost/40 p-3">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-full bg-accentv/30 font-display text-sm font-bold text-accentv-ink">
                DW
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">Devika W.</p>
                <p className="text-[11px] text-faint-ink">Admin</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex w-full min-w-0 flex-col gap-5">
          <header className="glass flex flex-wrap items-center justify-between gap-3 rounded-[22px] px-5 py-3">
            <div className="min-w-0">
              <p className="font-display text-lg font-bold leading-tight">{title}</p>
              <p className="mt-1 text-sm text-muted-ink">{subtitle}</p>
            </div>
            {action}
          </header>

          {children}
        </main>
      </div>

      <nav className="glass-strong fixed inset-x-3 bottom-3 z-20 flex items-center justify-around rounded-2xl px-2 py-2 lg:hidden">
        {mobileNav.map((item) => {
          const active = item.to === path;
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className={
                active
                  ? "grid size-10 place-items-center rounded-xl bg-frost/70 text-ink shadow-sm"
                  : "grid size-10 place-items-center rounded-xl text-faint-ink"
              }
            >
              <span className="text-lg">{item.glyph}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="gradient-brand rounded-xl px-4 py-2.5 text-sm font-semibold text-frost shadow-lg shadow-brand/30 transition-transform active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
