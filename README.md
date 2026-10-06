# Mini POS - Pertemuan 1

## Identitas

- Nama: Olivia
- NIM: 124140034
- Kelas: RB
- Mata Kuliah: Praktikum Pengembangan Aplikasi Web

## Deskripsi Aplikasi

Mini POS merupakan aplikasi kasir dan keranjang belanja sederhana yang dibuat untuk memenuhi tugas Praktikum Pengembangan Aplikasi Web Pertemuan 1.

Aplikasi ini menggunakan studi kasus kasir pada kantin atau toko kampus. Pengguna dapat memasukkan barang, harga, dan jumlah barang. Sistem kemudian menghitung subtotal, total belanja, diskon, pembayaran, dan kembalian secara otomatis.

Aplikasi juga menggunakan localStorage sehingga data keranjang tetap tersimpan ketika halaman browser di-refresh.

## Daftar Fitur

- [x] Input nama barang
- [x] Validasi nama barang minimal 3 karakter
- [x] Input harga satuan
- [x] Validasi harga minimal Rp500
- [x] Input jumlah / Qty
- [x] Validasi Qty minimal 1 dan berupa bilangan bulat
- [x] Menampilkan pesan error berwarna merah
- [x] Menambahkan barang ke keranjang
- [x] Menampilkan daftar barang dalam tabel
- [x] Menghitung subtotal setiap barang
- [x] Menghitung total belanja
- [x] Diskon 10% jika total belanja minimal Rp50.000
- [x] Input uang pembayaran
- [x] Menghitung kembalian secara otomatis
- [x] Memberikan peringatan jika uang pembayaran kurang
- [x] Menghapus barang dari keranjang
- [x] Menyimpan data keranjang menggunakan localStorage
- [x] Memuat data keranjang setelah halaman di-refresh
- [x] Tombol Transaksi Baru / Reset
- [x] Tampilan responsif

## Struktur Folder

```text
Olivia_124140034_pertemuan1/
│
├── dokumentasi/
│   ├── screenshot1.png
│   ├── screenshot2.png
│   └── screenshot3.png
│
├── modul/
│   ├── latihan-variabel-kondisional.js
│   ├── latihan-loop-fungsi.js
│   ├── latihan-array-objek.js
│   ├── latihan-dom-api.html
│   └── latihan-dom-api.js
│
├── index.html
├── style.css
├── script.js
└── README.md