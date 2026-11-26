# Curriculum Vitae & Portfolio Online - Mulan Style

Website CV & Portofolio interaktif, modern, dan responsif yang terinspirasi dari template **Mulan Resume / CV**, dirancang khusus untuk mahasiswa sistem informasi & mobile developer.

---

## 🌟 Fitur Utama
- **Profil Card Kiri (Sticky Desktop):** Foto profil, nama lengkap, status ketersediaan (*Available for hire*), animasi teks berganti (*typing effect*), tautan media sosial, dan tombol cetak/unduh PDF.
- **Tab Navigasi Interaktif:**
  - **About:** Ringkasan profil, counter statistik interaktif, 4 kartu layanan/keahlian, dan testimoni.
  - **Resume:** Timeline 2 kolom (Pendidikan & Pengalaman), indikator keahlian teknis (*skill progress bar*), serta lencana sertifikasi.
  - **Portfolio:** Galeri showcase proyek dengan tombol filter kategori (*Mobile Apps, UI/UX, Web Portal*) dan pop-up modal detail proyek.
  - **Contact:** Kartu kontak langsung (WhatsApp, Email, Lokasi) dan formulir kirim pesan.
- **Dukungan Dark / Light Mode:** Terintegrasi dengan penyimpanan preferensi lokal (`localStorage`).
- **Download CV / PDF Ready:** Dilengkapi stylesheet `@media print` sehingga saat tombol "Download CV" diklik atau tombol `Ctrl + P` ditekan, tampilan akan otomatis terformat rapi menjadi dokumen CV standar A4.

---

## 📂 Struktur File
```text
CV/
├── index.html            # Halaman utama & markup konten CV
├── assets/
│   ├── css/
│   │   └── style.css     # Animasi, font, timeline, scrollbar & print style
│   ├── js/
│   │   └── main.js       # Typing effect, tab switcher, filter, modal & theme toggle
│   └── images/           # Folder untuk foto profil atau screenshot proyek Anda
└── README.md             # Panduan kustomisasi & hosting online
```

---

## 🚀 Cara Melihat Tampilan Secara Lokal

1. Buka folder `CV` di File Explorer Anda.
2. Klik ganda file `index.html` untuk langsung membukanya di browser (Chrome, Edge, Firefox).
3. Atau jalankan server lokal sederhana lewat terminal:
   ```bash
   # Menggunakan Python
   python -m http.server 3000
   ```
   Lalu buka `http://localhost:3000` di browser.

---

## ✏️ Cara Mengubah Data Dummy dengan Data Asli Anda

Semua teks sangat mudah disesuaikan:

1. **Nama, Foto, & Media Sosial:**
   - Buka `index.html`.
   - Cari bagian `<!-- LEFT SIDEBAR: Profile Card -->`.
   - Ganti teks `Rizky Arda` dengan nama Anda.
   - Ganti `src="https://images.unsplash..."` pada foto dengan foto Anda sendiri (bisa simpan foto di folder `assets/images/foto.jpg` lalu ubah `src="assets/images/foto.jpg"`).
   - Sesuaikan tautan GitHub, LinkedIn, WhatsApp, dan Email Anda.

2. **Daftar Keahlian (Skills) & Nilai Persentase:**
   - Cari bagian `Technical Skills Progress Bars` di `index.html`.
   - Sesuaikan nama teknologi dan ubah atribut `data-percent="90%"` serta lebar `style="width: 90%;"`.

3. **Data Proyek / Portofolio:**
   - Buka `assets/js/main.js`.
   - Cari variabel `const projectData = { ... }`.
   - Di sini Anda dapat menambahkan judul proyek, tautan GitHub, screenshot, dan deskripsi proyek asli Anda.

---

## 🌐 3 Cara Meng-Online-kan CV Ini (Gratis Selamanya)

Pilih salah satu cara termudah berikut agar CV Anda bisa dibuka orang lain melalui internet:

### Cara 1: Menggunakan Netlify Drop (Paling Cepat — Tanpa Coding / Terminal)
1. Buka [https://app.netlify.com/drop](https://app.netlify.com/drop) di browser.
2. *Drag and Drop* (seret) folder `CV` ini langsung ke halaman web Netlify.
3. Tunggu sekitar 10 detik, Netlify akan langsung memberikan link web aktif (contoh: `https://rizky-cv.netlify.app`).

---

### Cara 2: Menggunakan GitHub Pages (Sangat Direkomendasikan untuk Mahasiswa IT)
1. Buat repository baru di [GitHub](https://github.com/new), misalnya beri nama `cv` atau `portfolio`.
2. Upload file proyek ini ke repository tersebut:
   ```bash
   git init
   git add .
   git commit -m "Initial commit Mulan CV portfolio"
   git branch -M main
   git remote add origin https://github.com/<username-github>/cv.git
   git push -u origin main
   ```
3. Buka repository Anda di GitHub -> masuk ke menu **Settings** -> pilih menu **Pages** di sebelah kiri.
4. Pada bagian **Build and deployment > Branch**, pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu 1–2 menit, web Anda akan online di alamat:
   `https://<username-github>.github.io/cv/`

---

### Cara 3: Menggunakan Vercel
1. Buka [https://vercel.com](https://vercel.com) dan masuk dengan akun GitHub Anda.
2. Klik tombol **Add New...** -> **Project**.
3. Hubungkan repository GitHub CV Anda dan klik **Deploy**.
4. Dalam 20 detik, Anda akan mendapatkan alamat seperti `https://cv-namaanda.vercel.app`.
