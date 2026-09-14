# Arayya Hub

buatkan desain untuk projek prd ini

# PRD — Arayya Art & Space: Activity & Space Management




## 1. Product summary

Arayya Activity & Space Management adalah web app mobile-friendly untuk mengelola area, aktivitas, jadwal, availability, dan booking. MVP berfungsi sebagai single source of truth operasional agar staf tidak lagi mengecek bentrok ruangan secara manual.




## 2. Problem statement

Operasional ruang memiliki tiga sumber konflik utama: jadwal internal Arayya, reservasi pihak eksternal, dan jam operasional. Tanpa sistem terpusat, risiko double booking, informasi availability tidak konsisten, dan perubahan jadwal sulit ditelusuri.




## 3. MVP goal

1. Admin dapat mengelola Area, Activity, Organizer, dan Business Hours.

2. Staff dapat melihat jadwal harian/mingguan dan availability berbasis slot 1 jam.

3. Staff dapat membuat kegiatan internal atau booking eksternal hanya jika area tidak bentrok.

4. Database menolak overlap walaupun terjadi race condition dari dua user.

5. UI usable dari HP untuk pengecekan operasional cepat.




## 4. Non-goals MVP

Belum mencakup membership, profil anak, enrollment kelas, attendance, instructor payroll, payment gateway, invoice, public self-booking, multi-branch, recurring schedule kompleks, waiting list, atau partner portal.




## 5. Users & roles

### Admin

- CRUD master Area, Activity, Organizer, Business Hours.

- Membuat/mengubah/cancel schedule dan booking.

- Mengelola user/role melalui Supabase dashboard pada fase MVP.




### Staff

- Read master data.

- Membuat/mengubah/cancel schedule dan booking.

- Tidak dapat mengubah master konfigurasi.




## 6. Core entities

- Area: ruang fisik yang bisa digunakan.

- Organizer: Arayya (internal) atau organisasi eksternal.

- Activity: jenis kegiatan dan default duration.

- Business Hours: jam buka/tutup per weekday.

- Schedule: sumber okupansi area. Semua kegiatan dan booking harus menghasilkan record schedule.

- Booking: metadata customer/reservasi eksternal yang mempunyai tepat satu schedule.




## 7. Key design decisions

- **Tidak membuat tabel time_slots permanen.** Slot 1 jam adalah presentation/availability layer yang dihitung dari business hours + schedules. Ini menghindari jutaan row slot saat skala bertambah.

- **Schedule menyimpan timestamp aktual, bukan hanya slot.** MVP menampilkan grid 1 jam, tetapi data tetap mampu menyimpan 09:30–11:00 apabila bisnis membutuhkannya nanti.

- **Overlap dicegah di PostgreSQL** dengan exclusion constraint pada `(area_id, tstzrange(start_at,end_at))` untuk semua schedule non-cancelled.

- **Booking menggunakan schedule sebagai occupancy source**, sehingga availability hanya perlu membaca satu tabel.

- **Soft operational cancellation** memakai status `cancelled`; history tidak hilang.




## 8. Functional requirements

### FR-01 Authentication

Email/password login menggunakan Supabase Auth. User tanpa profile aktif tidak boleh mengakses data operasional.




### FR-02 Area master

Admin dapat create/read/update/deactivate area. Data minimum: name, code, capacity, description, active status.




### FR-03 Activity master

Admin dapat create/read/update/deactivate activity. Data: name, category, default duration, organizer, description, active status.




### FR-04 Organizer

Admin dapat menyimpan organizer internal/external beserta contact metadata.




### FR-05 Business hours

Admin dapat menentukan open/close atau closed per weekday.




### FR-06 Schedule

Staff/Admin dapat membuat internal activity, external booking, atau blocked time dengan area, title, start/end, organizer/activity opsional, notes.




### FR-07 Availability

Untuk tanggal terpilih, sistem menampilkan area x slot per jam. Status minimal: Available, Arayya Activity, Booking, Blocked, Closed.




### FR-08 Booking

Staff/Admin membuat booking dengan customer name, phone/email opsional, pax, area, tanggal, start/end. Sistem menolak overlap.




### FR-09 Calendar

Mobile-first day view menjadi default. Week overview dapat ditambahkan setelah core day-grid stabil.




### FR-10 Audit minimum

created_at, updated_at dan created_by disimpan pada entity transaksional. Full immutable audit log masuk fase berikutnya.




## 9. User flows

### Internal activity

Login → Schedule → Add → pilih area → pilih activity → date/time → system validate business hours & conflict → Confirm → schedule muncul pada grid.




### External booking

Login → Booking → New → data customer → area/date/time → availability check → Confirm → schedule(kind=external_booking) + booking dibuat dalam satu workflow → booking muncul pada grid.




### Availability check

Login → Dashboard/Schedule → pilih tanggal → lihat seluruh area dan slot → tap occupancy untuk detail.




## 10. Business rules

1. End time harus setelah start time.

2. Schedule non-cancelled pada area yang sama tidak boleh overlap.

3. Slot di luar business hours dianggap Closed.

4. Area inactive tidak dapat dipakai untuk schedule baru.

5. Pax booking idealnya <= capacity area; MVP menampilkan validation/error pada workflow.

6. Cancellation mempertahankan record untuk histori.

7. Timezone operasional MVP: `Asia/Jakarta`.




## 11. Mobile UI information architecture

Bottom/compact navigation: Dashboard, Schedule, Bookings, More. Desktop menggunakan left sidebar.




### Screens

- Login

- Dashboard: tanggal hari ini, occupancy summary, quick actions, upcoming schedules

- Schedule: day timeline per area, date picker, add schedule

- Bookings: list + new booking

- Areas

- Activities

- Settings: organizer & business hours




## 12. Acceptance criteria MVP

- CRUD area/activity berfungsi sesuai role.

- Grid hari menampilkan availability setiap area untuk jam operasional.

- Internal schedule berhasil dibuat.

- External booking berhasil dibuat.

- Percobaan double booking menghasilkan error dan tidak membuat occupancy ganda.

- Cancelled schedule membebaskan slot.

- UI dapat digunakan pada viewport 360px tanpa horizontal page overflow.

- Semua exposed tables memakai RLS dan privilege minimum.




## 13. Extensibility toward Kids Center

Domain baru nanti dapat ditambahkan tanpa mengubah konsep area/schedule: `children`, `guardians`, `memberships`, `programs/classes`, `enrollments`, `sessions`, `attendance`, `instructors`, `invoices/payments`, `partners`. `session` nantinya dapat mereferensikan `schedule_id`, sehingga resource/room conflict tetap memakai scheduling engine yang sama.




## 14. MVP delivery phases

- Phase 0: schema, auth, role/RLS, seed.

- Phase 1: area/activity/organizer/business hours.

- Phase 2: schedule + anti-overlap + mobile day view.

- Phase 3: booking workflow + availability.

- Phase 4: QA/UAT, production seed, operational SOP.




## 15. Assumptions

- Satu lokasi Arayya pada MVP.

- Booking publik/self-service belum dibuka; staff mencatat reservasi eksternal.

- Payment dikelola di luar app pada MVP.

- Admin provisioning dilakukan melalui Supabase dashboard.

- Default slot visualization 60 menit, tetapi timestamp tidak dibatasi kelipatan satu jam.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6745e666-7be0-4873-b164-b43923590f7d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
