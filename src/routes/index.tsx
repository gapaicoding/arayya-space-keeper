import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PrimaryButton } from "@/components/AppShell";
import { ScheduleGrid } from "@/components/ScheduleGrid";
import { upcoming } from "@/data/demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Arayya Art & Space Operations" },
      {
        name: "description",
        content:
          "Pantau okupansi area, jadwal harian, dan booking Arayya Art & Space dalam satu dashboard operasional.",
      },
      { property: "og:title", content: "Dashboard · Arayya Art & Space Operations" },
      {
        property: "og:description",
        content: "Okupansi area, jadwal 1 jam, dan booking harian dalam satu layar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Terpakai sekarang", value: "2", suffix: "/3", note: "dari 3 area aktif" },
  { label: "Booking hari ini", value: "2", note: "1 eksternal, 1 internal" },
  { label: "Konflik", value: "0", note: "anti-overlap aktif", accent: true },
  { label: "Slot kosong", value: "5", note: "dalam jam operasional" },
];

function Dashboard() {
  return (
    <AppShell
      title="Selamat pagi, Devika"
      subtitle="Selasa, 21 Mei 2025 · 3 area · 2 booking hari ini"
      action={
        <div className="flex items-center gap-2">
          <div className="glass hidden items-center rounded-xl px-3 py-2 text-xs font-semibold text-muted-ink sm:flex">
            Hari ini
          </div>
          <PrimaryButton>+ Aktivitas baru</PrimaryButton>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint-ink">
              {k.label}
            </p>
            <p
              className={`mt-2 font-display text-3xl font-bold ${k.accent ? "text-mint" : ""}`}
            >
              {k.value}
              {k.suffix ? <span className="text-lg text-faint-ink">{k.suffix}</span> : null}
            </p>
            <p className="mt-1 text-xs text-muted-ink">{k.note}</p>
          </div>
        ))}
      </div>

      <ScheduleGrid />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="glass-strong rounded-[26px] p-5 lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-accentv/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accentv-ink">
                Booking eksternal
              </span>
              <h3 className="mt-2 font-display text-xl font-bold">Kiln Co. — Private Tour</h3>
              <p className="text-sm text-muted-ink">Gallery · hari ini 13:00–15:00 · 12 pax</p>
            </div>
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-frost/70 font-display text-sm font-bold text-muted-ink">
              KC
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint-ink">
                Pelanggan
              </p>
              <p className="font-medium">Raka P.</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint-ink">
                Kontak
              </p>
              <p className="font-medium">0812-3345</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint-ink">
                Status
              </p>
              <p className="font-medium text-mint">Confirmed</p>
            </div>
          </div>
          <p className="mt-4 rounded-xl bg-frost/50 p-3 text-xs text-muted-ink">
            "Mohon siapkan walkthrough ruang pembakaran dan dua tray sampel glasir."
          </p>
        </div>

        <div className="glass rounded-[26px] p-5">
          <h3 className="font-display text-base font-bold">Akan datang hari ini</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {upcoming.map((u) => (
              <li key={u.time} className="flex items-center gap-3 rounded-xl bg-frost/55 p-2.5">
                <span className="w-11 shrink-0 text-xs font-bold text-muted-ink">{u.time}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{u.title}</p>
                  <p className="truncate text-xs text-faint-ink">{u.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
