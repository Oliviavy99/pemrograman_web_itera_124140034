# Tugas Pertemuan 5 - Sistem Manajemen Perpustakaan Sederhana

## Identitas Mahasiswa
- **Nama Lengkap** : Olivia
- **NIM**          : 124140034
- **Kelas Praktikum** :  RB

## Deskripsi Program
Program ini adalah sistem perpustakaan sederhana yang dibuat dengan konsep OOP Python.

**Alur program** (`main.py`):
1. Membuat perpustakaan lalu menambahkan buku dan majalah.
2. Menampilkan katalog.
3. Mencari item berdasarkan id atau judul.
4. Anggota meminjam dan mengembalikan item (status berubah Tersedia / Dipinjam, denda dihitung jika terlambat).

**Struktur file** (`tugas_perpustakaan/`):
| File | Isi |
| --- | --- |
| `library_item.py` | Abstract class `LibraryItem`, subclass `Book` dan `Magazine` |
| `member.py` | Class `Member` (anggota perpustakaan) |
| `library.py` | Class `Library` (menyimpan dan mengelola koleksi) |
| `main.py` | Program untuk menguji semua fitur |

**Penerapan 4 pilar OOP:**
- **Class**: `LibraryItem`, `Book`, `Magazine`, `Member`, dan `Library` adalah cetakan objek.
- **Inheritance**: `Book` dan `Magazine` mewarisi `LibraryItem` dan memakai `super().__init__()`.
- **Encapsulation**: `__dipinjam` (private) pada item, `__koleksi` (private) pada `Library`, `__daftar_pinjam` (private) pada `Member`, dan `_id`, `_judul`, `_tahun` (protected). Status hanya bisa diubah lewat method `pinjam()` dan `kembalikan()`. Decorator `@property` dipakai pada `is_dipinjam`, `judul`, `id_item`, dan `jumlah_pinjam`.
- **Polymorphism**: `get_detail()` dan `hitung_denda()` ditulis ulang oleh `Book` dan `Magazine`. Saat katalog dicetak, `item.get_detail()` dipanggil sama, tetapi hasilnya berbeda untuk buku dan majalah.

Abstract method `get_detail()` dan `hitung_denda()` wajib dibuat oleh setiap subclass.

## Cara Menjalankan
```bash
cd tugas_perpustakaan
python main.py
```

## Screenshot Output
Jalankan program, lalu tambahkan tangkapan layar terminal di sini, misalnya:

```
![Output program](screenshot1/output.png)
![Output program](screenshot2/output.png)
```
