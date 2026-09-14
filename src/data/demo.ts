export type SlotStatus = "available" | "arayya" | "booking" | "blocked" | "closed";

export type Slot = {
  status: SlotStatus;
  title?: string;
  meta?: string;
};

export const hours = ["08", "09", "10", "11", "12", "13", "14", "15", "16"];

export const areas = [
  { name: "Studio A", code: "STA", capacity: 24, description: "Ruang keramik & kiln", active: true },
  { name: "Gallery", code: "GAL", capacity: 40, description: "Ruang pamer utama", active: true },
  { name: "Workshop B", code: "WSB", capacity: 16, description: "Ruang kelas basah", active: true },
  { name: "Lobby", code: "LBY", capacity: 30, description: "Area transit & display", active: false },
];

const A: Slot = { status: "available" };
const C: Slot = { status: "closed" };

export const grid: { area: string; slots: Slot[] }[] = [
  {
    area: "Studio A",
    slots: [
      C,
      { status: "arayya" },
      { status: "arayya", title: "Ceramic Firing", meta: "Internal" },
      { status: "arayya" },
      A,
      A,
      C,
      C,
      C,
    ],
  },
  {
    area: "Gallery",
    slots: [
      C,
      A,
      A,
      { status: "booking", title: "Kiln Co. Tour", meta: "12 pax" },
      { status: "booking" },
      A,
      A,
      { status: "booking" },
      { status: "booking" },
    ],
  },
  {
    area: "Workshop B",
    slots: [
      C,
      { status: "blocked", title: "Cleaning", meta: "Blocked" },
      { status: "blocked" },
      A,
      A,
      A,
      A,
      A,
      C,
    ],
  },
];

export const bookings = [
  {
    customer: "Raka P.",
    organizer: "Kiln Co.",
    area: "Gallery",
    time: "13:00–15:00",
    pax: 12,
    status: "Confirmed",
    contact: "0812-3345",
  },
  {
    customer: "Sari D.",
    organizer: "Studio Loka",
    area: "Workshop B",
    time: "15:00–17:00",
    pax: 8,
    status: "Confirmed",
    contact: "0813-9921",
  },
  {
    customer: "Navis Co.",
    organizer: "Navis Co.",
    area: "Studio A",
    time: "17:00–19:00",
    pax: 18,
    status: "Pending",
    contact: "0811-2210",
  },
];

export const upcoming = [
  { time: "10:00", title: "Ceramic Firing", meta: "Studio A · Internal" },
  { time: "13:00", title: "Kiln Co. Tour", meta: "Gallery · 12 pax" },
  { time: "15:00", title: "Glaze Workshop", meta: "Workshop B · Booking" },
];

export const activities = [
  { name: "Ceramic Firing", category: "Workshop", duration: "2 jam", organizer: "Arayya", active: true },
  { name: "Glaze Workshop", category: "Kelas", duration: "2 jam", organizer: "Arayya", active: true },
  { name: "Private Tour", category: "Kunjungan", duration: "1 jam", organizer: "Eksternal", active: true },
  { name: "Open Studio", category: "Publik", duration: "3 jam", organizer: "Arayya", active: false },
];

export const businessHours = [
  { day: "Senin", open: "09:00", close: "17:00", closed: false },
  { day: "Selasa", open: "09:00", close: "17:00", closed: false },
  { day: "Rabu", open: "09:00", close: "17:00", closed: false },
  { day: "Kamis", open: "09:00", close: "19:00", closed: false },
  { day: "Jumat", open: "09:00", close: "19:00", closed: false },
  { day: "Sabtu", open: "10:00", close: "18:00", closed: false },
  { day: "Minggu", open: "—", close: "—", closed: true },
];

export const organizers = [
  { name: "Arayya Art & Space", type: "Internal", contact: "ops@arayya.id" },
  { name: "Kiln Co.", type: "Eksternal", contact: "0812-3345" },
  { name: "Studio Loka", type: "Eksternal", contact: "0813-9921" },
];

export const slotClass: Record<SlotStatus, string> = {
  available: "bg-mint/40",
  arayya: "bg-brand/40 text-brand-ink",
  booking: "bg-accentv/40 text-accentv-ink",
  blocked: "bg-amber/50 text-amber-ink",
  closed: "bg-closed/60",
};
