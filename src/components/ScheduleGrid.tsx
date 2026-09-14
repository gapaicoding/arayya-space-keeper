import { grid, hours, slotClass } from "@/data/demo";

const legend = [
  { label: "Tersedia", cls: "bg-mint" },
  { label: "Arayya", cls: "bg-brand" },
  { label: "Booking", cls: "bg-accentv" },
  { label: "Blocked", cls: "bg-amber" },
  { label: "Tutup", cls: "bg-closed" },
];

export function ScheduleGrid() {
  return (
    <section className="glass rounded-[26px] p-4 lg:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold">Jadwal harian</h2>
          <p className="text-sm text-muted-ink">Ketersediaan per area · slot 1 jam</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-medium text-muted-ink">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <i className={`size-2.5 rounded-full ${l.cls}`} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <div className="-mx-1 mt-5 overflow-x-auto px-1">
        <div className="min-w-[520px]">
          <div className="grid grid-cols-[64px_repeat(9,1fr)] gap-1.5 text-center text-[11px] font-semibold text-faint-ink">
            <div />
            {hours.map((h) => (
              <div key={h}>{h}</div>
            ))}
          </div>

          {grid.map((row) => (
            <div
              key={row.area}
              className="mt-2 grid grid-cols-[64px_repeat(9,1fr)] items-stretch gap-1.5"
            >
              <div className="flex items-center justify-end truncate pr-1 text-right text-xs font-semibold text-muted-ink">
                {row.area}
              </div>
              {row.slots.map((slot, i) => (
                <div
                  key={i}
                  className={`min-h-9 rounded-lg p-1.5 text-left ${slotClass[slot.status]}`}
                >
                  {slot.title ? (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold leading-tight">{slot.title}</span>
                      <span className="text-[9px] opacity-70">{slot.meta}</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
