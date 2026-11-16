"""
member.py
Berisi class Member (anggota perpustakaan) yang mencatat item yang sedang dipinjam.
"""


class Member:
    """Anggota perpustakaan."""

    MAKS_PINJAM = 3  # satu anggota maksimal meminjam 3 item

    def __init__(self, id_member: str, nama: str):
        self.id_member = id_member
        self.nama = nama
        self.__daftar_pinjam = []  # private: hanya diubah lewat method

    @property
    def jumlah_pinjam(self) -> int:
        """Jumlah item yang sedang dipinjam."""
        return len(self.__daftar_pinjam)

    def bisa_meminjam(self) -> bool:
        """Cek apakah anggota masih boleh meminjam."""
        return self.jumlah_pinjam < self.MAKS_PINJAM

    def tambah_pinjaman(self, item) -> None:
        """Mencatat item yang dipinjam."""
        self.__daftar_pinjam.append(item)

    def hapus_pinjaman(self, item) -> None:
        """Menghapus item dari catatan pinjaman."""
        if item in self.__daftar_pinjam:
            self.__daftar_pinjam.remove(item)

    def tampilkan_pinjaman(self) -> None:
        """Menampilkan item yang sedang dipinjam anggota."""
        print(f"Pinjaman {self.nama}:")
        if not self.__daftar_pinjam:
            print("  (tidak ada)")
        for item in self.__daftar_pinjam:
            print(f"  - {item.judul}")
