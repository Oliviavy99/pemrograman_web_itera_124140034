# Aplikasi CRUD Matakuliah dengan Pyramid dan PostgreSQL

## Identitas
- **Nama:** Olivia
- **NIM:** 124140034
- **Kelas:** PAW RB

## Deskripsi
Aplikasi ini merupakan aplikasi sederhana berbasis Pyramid Framework dan PostgreSQL untuk mengelola data mata kuliah. Aplikasi menyediakan fitur CRUD (Create, Read, Update, Delete) melalui REST API.

Data mata kuliah yang dikelola meliputi kode mata kuliah, nama mata kuliah, jumlah SKS, dan semester.

## Teknologi yang Digunakan
- Python
- Pyramid Framework
- PostgreSQL
- SQLAlchemy
- Alembic
- Postman

## Cara Menjalankan Aplikasi

1. Masuk ke folder proyek `pyramid_mahasiswa`.
2. Aktifkan virtual environment.
3. Install dependencies jika belum tersedia:

   ```powershell
   python -m pip install -e ".[testing]"
   ```

4. Jalankan migrasi database:

   ```powershell
   alembic -c development.ini upgrade head
   ```

5. Jalankan aplikasi:

   ```powershell
   pserve development.ini
   ```

6. Buka aplikasi melalui browser:

   `http://127.0.0.1:6543`

## Daftar Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/matakuliah` | Menampilkan semua data mata kuliah |
| GET | `/api/matakuliah/{id}` | Menampilkan detail mata kuliah |
| POST | `/api/matakuliah` | Menambahkan data mata kuliah |
| PUT | `/api/matakuliah/{id}` | Mengubah data mata kuliah |
| DELETE | `/api/matakuliah/{id}` | Menghapus data mata kuliah |

## Pengujian API

Pengujian dilakukan menggunakan Postman. Seluruh endpoint CRUD telah diuji dan berhasil dijalankan.

1. GET semua data mata kuliah.
2. GET detail mata kuliah.
3. POST menambahkan mata kuliah.
4. PUT mengubah data mata kuliah.
5. DELETE menghapus data mata kuliah.

## Dokumentasi
Screenshot hasil pengujian API dilampirkan pada bagian dokumentasi tugas.