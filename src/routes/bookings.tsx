import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PrimaryButton } from "@/components/AppShell";
import { areas, bookings } from "@/data/demo";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "Booking Eksternal · Arayya Art & Space" },
      {
        name: "description",
        content:
          "Catat dan kelola reservasi eksternal Arayya: pelanggan, area, jam, dan jumlah pax dengan pengecekan bentrok.",
      },
      { property: "og:title", content: "Booking Eksternal · Arayya Art & Space" },
      {
        property: "og:description",
        content: "Reservasi eksternal dengan pengecekan ketersediaan slot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Bookings,
});

function Bookings() {
  return (
    <AppShell
      title="Booking"
      subtitle="Reservasi eksternal · 3 aktif hari ini"
      action={<PrimaryButton>+ Booking baru</PrimaryButton>}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-3 lg:col-span-2">
          {bookings.map((b) => (
            <div key={b.customer} className="glass flex items-center gap-3 rounded-2xl p-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-accentv/30 font-display text-sm font-bold text-accentv-ink">
                {b.organizer.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{b.organizer}</p>
                <p className="truncate text-xs text-muted-ink">
                  {b.customer} · {b.area} · {b.contact}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs font-bold">{b.time}</p>
                <p className="text-[11px] text-faint-ink">{b.pax} pax</p>
              </div>
              <span
                className={`shrink-0 rounded-lg px-2 py-1 text-[11px] font-semibold ${
                  b.status === "Confirmed" ? "bg-mint/40" : "bg-amber/50 text-amber-ink"
                }`}
              >
                {b.status}
              </span>
            </div>
          ))}
        </div>

        <div className="glass-strong rounded-[26px] p-5">
          <h3 className="font-display text-lg font-bold">Booking baru</h3>
          <div className="mt-4 flex flex-col gap-3">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint-ink">
                Nama pelanggan
              </span>
              <input
                type="text"
                placeholder="cth. Kiln Co."
                className="mt-1 w-full rounded-xl border border-frost/70 bg-frost/60 px-3 py-2 text-sm outline-none placeholder:text-faint-ink focus:ring-2 focus:ring-brand/50"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint-ink">
                  Area
                </span>
                <select className="mt-1 w-full rounded-xl border border-frost/70 bg-frost/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/50">
                  {areas
                    .filter((a) => a.active)
                    .map((a) => (
                      <option key={a.code}>{a.name}</option>
                    ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint-ink">
                  Pax
                </span>
                <input
                  type="number"
                  placeholder="12"
                  className="mt-1 w-full rounded-xl border border-frost/70 bg-frost/60 px-3 py-2 text-sm outline-none placeholder:text-faint-ink focus:ring-2 focus:ring-brand/50"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint-ink">
                  Mulai
                </span>
                <input
                  type="time"
                  defaultValue="13:00"
                  className="mt-1 w-full rounded-xl border border-frost/70 bg-frost/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/50"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint-ink">
                  Selesai
                </span>
                <input
                  type="time"
                  defaultValue="15:00"
                  className="mt-1 w-full rounded-xl border border-frost/70 bg-frost/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/50"
                />
              </label>
            </div>
            <p className="rounded-xl bg-mint/30 px-3 py-2 text-xs font-medium">
              Slot tersedia · tidak bentrok
            </p>
            <PrimaryButton>Simpan booking</PrimaryButton>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
