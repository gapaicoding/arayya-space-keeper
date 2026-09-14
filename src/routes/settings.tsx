import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { businessHours, organizers } from "@/data/demo";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Pengaturan Operasional · Arayya Art & Space" },
      {
        name: "description",
        content:
          "Atur jam operasional per hari dan data penyelenggara internal maupun eksternal Arayya Art & Space.",
      },
      { property: "og:title", content: "Pengaturan Operasional · Arayya Art & Space" },
      {
        property: "og:description",
        content: "Jam buka-tutup per hari dan daftar penyelenggara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Settings,
});

function Settings() {
  return (
    <AppShell title="Pengaturan" subtitle="Jam operasional & penyelenggara · Asia/Jakarta">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="glass rounded-[26px] p-5">
          <h3 className="font-display text-lg font-bold">Jam operasional</h3>
          <div className="mt-3 flex flex-col gap-1.5">
            {businessHours.map((b) => (
              <div
                key={b.day}
                className="flex items-center justify-between rounded-xl bg-frost/55 px-3 py-2.5"
              >
                <span className="text-sm font-semibold">{b.day}</span>
                {b.closed ? (
                  <span className="rounded-lg bg-closed/60 px-2 py-1 text-[11px] font-semibold text-muted-ink">
                    Tutup
                  </span>
                ) : (
                  <span className="text-xs font-bold text-muted-ink">
                    {b.open} – {b.close}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[26px] p-5">
          <h3 className="font-display text-lg font-bold">Penyelenggara</h3>
          <div className="mt-3 flex flex-col gap-1.5">
            {organizers.map((o) => (
              <div
                key={o.name}
                className="flex items-center justify-between gap-3 rounded-xl bg-frost/55 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{o.name}</p>
                  <p className="truncate text-xs text-faint-ink">{o.contact}</p>
                </div>
                <span
                  className={`shrink-0 rounded-lg px-2 py-1 text-[11px] font-semibold ${
                    o.type === "Internal" ? "bg-brand/35 text-brand-ink" : "bg-accentv/35 text-accentv-ink"
                  }`}
                >
                  {o.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
