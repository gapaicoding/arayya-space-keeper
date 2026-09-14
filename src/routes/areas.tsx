import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PrimaryButton } from "@/components/AppShell";
import { areas } from "@/data/demo";

export const Route = createFileRoute("/areas")({
  head: () => ({
    meta: [
      { title: "Master Area · Arayya Art & Space" },
      {
        name: "description",
        content:
          "Kelola data master area Arayya: nama, kode, kapasitas, deskripsi, dan status aktif untuk penjadwalan.",
      },
      { property: "og:title", content: "Master Area · Arayya Art & Space" },
      {
        property: "og:description",
        content: "Data master ruang: kode, kapasitas, dan status aktif.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Areas,
});

function Areas() {
  return (
    <AppShell
      title="Area"
      subtitle="4 area terdaftar · 3 aktif"
      action={<PrimaryButton>+ Area baru</PrimaryButton>}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {areas.map((a) => (
          <div key={a.code} className="glass rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-display text-lg font-bold leading-tight">{a.name}</p>
                <p className="text-xs text-faint-ink">
                  {a.code} · kapasitas {a.capacity} orang
                </p>
              </div>
              <span
                className={`shrink-0 rounded-lg px-2 py-1 text-[11px] font-semibold ${
                  a.active ? "bg-mint/40" : "bg-closed/60 text-muted-ink"
                }`}
              >
                {a.active ? "Aktif" : "Nonaktif"}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-ink">{a.description}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
