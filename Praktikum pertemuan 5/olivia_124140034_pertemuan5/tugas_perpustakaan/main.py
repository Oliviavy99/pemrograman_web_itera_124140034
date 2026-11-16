"""
main.py
Program utama untuk menguji sistem perpustakaan.
Jalankan dengan: python main.py
"""

from library_item import Book, Magazine, LibraryItem
from library import Library
from member import Member


def main():
    perpus = Library("Perpustakaan ITERA")

    # 1. Menambahkan item (buku dan majalah)
    print("--- 1. Menambah Item ---")
    perpus.tambah_item(Book("B001", "Belajar Python", 2022, "Budi Santoso", 250))
    perpus.tambah_item(Book("B002", "Pemrograman Web", 2021, "Siti Rahma", 300))
    perpus.tambah_item(Magazine("M001", "Info Teknologi", 2024, "Edisi 12", "Penerbit Digital"))
    perpus.tambah_item(Magazine("M002", "Dunia Sains", 2023, "Edisi 5", "Sains Media"))
    perpus.tambah_item(Book("B001", "Buku Kembar", 2020, "Tidak Ada", 100))  # id kembar -> gagal

    # 2. Menampilkan katalog
    perpus.tampilkan_katalog()

    # 3. Mencari item
    print("\n--- 2. Mencari Item ---")
    item = perpus.cari_by_id("M001")
    print("Cari id 'M001'   :", item.get_detail() if item else "Tidak ditemukan")

    print("Cari judul 'python':")
    for hasil in perpus.cari_by_judul("python"):
        print("  ", hasil.get_detail())

    print("Cari id 'X999'   :", "Tidak ditemukan" if perpus.cari_by_id("X999") is None else "Ada")

    # 4. Status ketersediaan (meminjam & mengembalikan)
    print("\n--- 3. Peminjaman ---")
    andi = Member("A001", "Andi")
    perpus.pinjam_item("B001", andi)
    perpus.pinjam_item("B001", andi)   # gagal: sudah dipinjam
    perpus.pinjam_item("M001", andi)
    andi.tampilkan_pinjaman()

    perpus.tampilkan_katalog()                       # semua item
    perpus.tampilkan_katalog(hanya_tersedia=True)    # hanya yang tersedia

    print("\n--- 4. Pengembalian & Denda ---")
    perpus.kembalikan_item("B001", andi, hari_terlambat=3)
    perpus.kembalikan_item("M001", andi, hari_terlambat=4)
    perpus.tampilkan_katalog()

    # 5. Bukti abstract class tidak bisa dibuat objeknya
    print("\n--- 5. Uji Abstract Class ---")
    try:
        LibraryItem("X001", "Item Abstrak", 2024)
    except TypeError as error:
        print("Ditolak Python:", error)

    # 6. Bukti encapsulation
    print("\n--- 6. Uji Encapsulation ---")
    buku = perpus.cari_by_id("B002")
    try:
        buku.is_dipinjam = True  # property tidak punya setter
    except AttributeError:
        print("Status tidak bisa diubah langsung, harus lewat method pinjam().")


if __name__ == "__main__":
    main()
