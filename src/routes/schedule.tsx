import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PrimaryButton } from "@/components/AppShell";
import { ScheduleGrid } from "@/components/ScheduleGrid";
import { upcoming } from "@/data/demo";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Jadwal Harian · Arayya Art & Space" },
      {
        name: "description",
        content:
          "Lihat timeline harian tiap area Arayya dengan slot 1 jam dan status Tersedia, Arayya, Booking, Blocked, atau Tutup.",
      },
      { property: "og:title", content: "Jadwal Harian · Arayya Art & Space" },
      {
        property: "og:description",
        content: "Timeline harian per area dengan slot 1 jam dan deteksi bentrok.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Schedule,
});

const dates = [
  { d: "19", w: "Min" },
  { d: "20", w: "Sen" },
  { d: "21", w: "Sel", active: true },
  { d: "22", w: "Rab" },
  { d: "23", w: "Kam" },
  { d: "24", w: "Jum" },
  { d: "25", w: "Sab" },
];

function Schedule() {
  return (
    <AppShell
      title="Jadwal"
      subtitle="Selasa, 21 Mei 2025 · zona waktu Asia/Jakarta"
      action={<PrimaryButton>+ Tambah jadwal</PrimaryButton>}
    >
      <div className="glass flex gap-2 overflow-x-auto rounded-[22px] p-3">
        {dates.map((x) => (
          <button
            key={x.d}
            type="button"
            className={
              x.active
                ? "gradient-brand flex w-14 shrink-0 flex-col items-center rounded-xl px-2 py-2 text-frost"
                : "flex w-14 shrink-0 flex-col items-center rounded-xl bg-frost/50 px-2 py-2 text-muted-ink"
            }
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] opacity-80">
              {x.w}
            </span>
            <span className="font-display text-lg font-bold leading-tight">{x.d}</span>
          </button>
        ))}
      </div>

      <ScheduleGrid />

      <div className="glass rounded-[26px] p-5">
        <h3 className="font-display text-base font-bold">Detail jadwal hari ini</h3>
        <ul className="mt-3 flex flex-col gap-2">
          {upcoming.map((u) => (
            <li
              key={u.time}
              className="flex items-center gap-3 rounded-xl bg-frost/55 p-3"
            >
              <span className="w-12 shrink-0 text-xs font-bold text-muted-ink">{u.time}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{u.title}</p>
                <p className="truncate text-xs text-faint-ink">{u.meta}</p>
              </div>
              <span className="shrink-0 rounded-lg bg-mint/40 px-2 py-1 text-[11px] font-semibold">
                Aktif
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
