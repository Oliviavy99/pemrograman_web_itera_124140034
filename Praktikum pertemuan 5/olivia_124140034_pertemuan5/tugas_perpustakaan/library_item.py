"""
library_item.py
Berisi class dasar (abstract) untuk semua item perpustakaan,
beserta dua turunannya: Book (buku) dan Magazine (majalah).
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract class: cetakan dasar untuk semua item perpustakaan.
    Class ini tidak bisa dibuat objeknya langsung, harus lewat subclass.
    """

    def __init__(self, id_item: str, judul: str, tahun: int):
        self._id = id_item          # protected: hanya untuk class ini & turunannya
        self._judul = judul         # protected
        self._tahun = tahun         # protected
        self.__dipinjam = False     # private: status hanya diubah lewat method

    # ---------- PROPERTY (getter) ----------
    @property
    def id_item(self) -> str:
        """Membaca id item (tidak bisa diubah dari luar)."""
        return self._id

    @property
    def judul(self) -> str:
        """Membaca judul item."""
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        """Membaca status peminjaman: True jika sedang dipinjam."""
        return self.__dipinjam

    # ---------- METHOD BIASA ----------
    def pinjam(self) -> bool:
        """Meminjam item. Mengembalikan True jika berhasil."""
        if self.__dipinjam:
            return False  # sudah dipinjam orang lain
        self.__dipinjam = True
        return True

    def kembalikan(self) -> bool:
        """Mengembalikan item. Mengembalikan True jika berhasil."""
        if not self.__dipinjam:
            return False  # memang tidak sedang dipinjam
        self.__dipinjam = False
        return True

    def status_teks(self) -> str:
        """Mengubah status menjadi teks yang mudah dibaca."""
        return "Dipinjam" if self.__dipinjam else "Tersedia"

    # ---------- METHOD ABSTRACT (wajib ditulis ulang oleh subclass) ----------
    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan teks detail item."""
        pass

    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> int:
        """Menghitung denda keterlambatan (dalam rupiah)."""
        pass


class Book(LibraryItem):
    """Buku: turunan dari LibraryItem."""

    DENDA_PER_HARI = 1000  # denda buku Rp 1.000 per hari

    def __init__(self, id_item: str, judul: str, tahun: int, penulis: str, jumlah_halaman: int):
        super().__init__(id_item, judul, tahun)  # panggil constructor induk
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman

    def get_detail(self) -> str:
        """Detail khusus buku."""
        return (f"[Buku] {self._id} | {self._judul} | Penulis: {self.penulis} | "
                f"{self.jumlah_halaman} hlm | Tahun {self._tahun} | {self.status_teks()}")

    def hitung_denda(self, hari_terlambat: int) -> int:
        """Denda buku = hari terlambat x Rp 1.000."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Majalah: turunan dari LibraryItem."""

    DENDA_PER_HARI = 500  # denda majalah Rp 500 per hari

    def __init__(self, id_item: str, judul: str, tahun: int, edisi: str, penerbit: str):
        super().__init__(id_item, judul, tahun)
        self.edisi = edisi
        self.penerbit = penerbit

    def get_detail(self) -> str:
        """Detail khusus majalah."""
        return (f"[Majalah] {self._id} | {self._judul} | Edisi: {self.edisi} | "
                f"Penerbit: {self.penerbit} | Tahun {self._tahun} | {self.status_teks()}")

    def hitung_denda(self, hari_terlambat: int) -> int:
        """Denda majalah = hari terlambat x Rp 500."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI
