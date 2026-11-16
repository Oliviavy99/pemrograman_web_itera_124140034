"""
library.py
Berisi class Library yang menyimpan dan mengelola koleksi item perpustakaan.
"""

from library_item import LibraryItem


class Library:
    """Perpustakaan: tempat menyimpan dan mengelola semua item."""

    def __init__(self, nama: str):
        self.nama = nama
        self.__koleksi = []  # private: daftar semua item

    def tambah_item(self, item: LibraryItem) -> None:
        """Menambahkan item ke perpustakaan (id tidak boleh kembar)."""
        if self.cari_by_id(item.id_item) is not None:
            print(f"Gagal: item dengan id {item.id_item} sudah ada.")
            return
        self.__koleksi.append(item)
        print(f"Berhasil menambah: {item.judul}")

    def tampilkan_katalog(self, hanya_tersedia: bool = False) -> None:
        """Menampilkan katalog. Jika hanya_tersedia=True, item yang dipinjam disembunyikan."""
        judul = "ITEM TERSEDIA" if hanya_tersedia else "SEMUA ITEM"
        print(f"\n=== KATALOG {self.nama.upper()} ({judul}) ===")
        ada = False
        for item in self.__koleksi:
            if hanya_tersedia and item.is_dipinjam:
                continue
            print(item.get_detail())  # polymorphism: tiap item punya format sendiri
            ada = True
        if not ada:
            print("(kosong)")

    def cari_by_id(self, id_item: str):
        """Mencari item berdasarkan id. Mengembalikan item atau None."""
        for item in self.__koleksi:
            if item.id_item == id_item:
                return item
        return None

    def cari_by_judul(self, kata_kunci: str) -> list:
        """Mencari item yang judulnya mengandung kata kunci (tidak peka huruf besar/kecil)."""
        hasil = []
        for item in self.__koleksi:
            if kata_kunci.lower() in item.judul.lower():
                hasil.append(item)
        return hasil

    def pinjam_item(self, id_item: str, member) -> None:
        """Anggota meminjam item berdasarkan id."""
        item = self.cari_by_id(id_item)
        if item is None:
            print(f"Gagal: item {id_item} tidak ditemukan.")
        elif not member.bisa_meminjam():
            print(f"Gagal: {member.nama} sudah mencapai batas pinjaman.")
        elif item.pinjam():
            member.tambah_pinjaman(item)
            print(f"{member.nama} berhasil meminjam '{item.judul}'.")
        else:
            print(f"Gagal: '{item.judul}' sedang dipinjam.")

    def kembalikan_item(self, id_item: str, member, hari_terlambat: int = 0) -> None:
        """Anggota mengembalikan item. Denda dihitung jika terlambat."""
        item = self.cari_by_id(id_item)
        if item is None or not item.kembalikan():
            print(f"Gagal: item {id_item} tidak sedang dipinjam.")
            return
        member.hapus_pinjaman(item)
        print(f"{member.nama} mengembalikan '{item.judul}'.")
        denda = item.hitung_denda(hari_terlambat)
        if denda > 0:
            print(f"  Terlambat {hari_terlambat} hari, denda: Rp {denda:,}")
