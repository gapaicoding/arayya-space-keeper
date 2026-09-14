import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PrimaryButton } from "@/components/AppShell";
import { activities } from "@/data/demo";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Master Aktivitas · Arayya Art & Space" },
      {
        name: "description",
        content:
          "Daftar jenis kegiatan Arayya beserta kategori, durasi default, penyelenggara, dan status aktif.",
      },
      { property: "og:title", content: "Master Aktivitas · Arayya Art & Space" },
      {
        property: "og:description",
        content: "Jenis kegiatan, durasi default, dan penyelenggara.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Activities,
});

function Activities() {
  return (
    <AppShell
      title="Aktivitas"
      subtitle="4 jenis kegiatan · 3 aktif"
      action={<PrimaryButton>+ Aktivitas baru</PrimaryButton>}
    >
      <div className="glass overflow-hidden rounded-[26px] p-2">
        {activities.map((a) => (
          <div
            key={a.name}
            className="flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-frost/40"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{a.name}</p>
              <p className="truncate text-xs text-faint-ink">
                {a.category} · {a.organizer}
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold text-muted-ink">{a.duration}</span>
            <span
              className={`shrink-0 rounded-lg px-2 py-1 text-[11px] font-semibold ${
                a.active ? "bg-mint/40" : "bg-closed/60 text-muted-ink"
              }`}
            >
              {a.active ? "Aktif" : "Nonaktif"}
            </span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
