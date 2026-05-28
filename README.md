# Absensi SD YPU - Single Worker + D1

Versi ini dibuat supaya lebih aman saat deploy di Cloudflare Workers:
- hanya butuh `src/index.js` sebagai entry point
- tidak memakai `public/` dan tidak memakai `functions/`
- database D1 dipakai lewat binding `DB`
- data login demo akan disiapkan otomatis saat app dibuka

## Login demo
- username: `1a` sampai `6b`
- password: `123456`

## Jika database masih kosong
Aplikasi akan membuat tabel dan akun demo otomatis saat dijalankan.
Jika Anda tetap ingin inisialisasi manual, pakai isi `schema.sql` lalu `seed.sql`.

## Struktur
- `src/index.js`
- `wrangler.toml`
- `schema.sql`
- `seed.sql`

## Binding yang dipakai
- D1 binding name: `DB`

## Catatan
Jika Anda sebelumnya memakai project Pages atau folder `public/functions`, proyek ini sengaja disederhanakan agar build Workers lebih stabil.
