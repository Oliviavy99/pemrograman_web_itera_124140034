# ===================================================
# Berkas: math_operations.py
# Deskripsi: Modul operasi matematika (geometri dan suhu)
# ===================================================

# Konstanta
PI = 3.14159


# ---------- Persegi ----------
def luas_persegi(sisi):
    """Menghitung luas persegi. Parameter: sisi. Return: luas."""
    return sisi * sisi


def keliling_persegi(sisi):
    """Menghitung keliling persegi. Parameter: sisi. Return: keliling."""
    return 4 * sisi


# ---------- Persegi panjang ----------
def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang. Parameter: panjang, lebar. Return: luas."""
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang. Parameter: panjang, lebar. Return: keliling."""
    return 2 * (panjang + lebar)


# ---------- Lingkaran ----------
def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran. Parameter: jari_jari. Return: luas."""
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran. Parameter: jari_jari. Return: keliling."""
    return 2 * PI * jari_jari


# ---------- Konversi suhu ----------
def celsius_ke_fahrenheit(celsius):
    """Mengubah Celsius ke Fahrenheit. Parameter: celsius. Return: fahrenheit."""
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius):
    """Mengubah Celsius ke Kelvin. Parameter: celsius. Return: kelvin."""
    return celsius + 273.15


# Kode ini hanya jalan jika file dijalankan langsung (untuk tes modul)
if __name__ == "__main__":
    print("Tes luas persegi sisi 4 =", luas_persegi(4))
    print("Tes 100 C =", celsius_ke_fahrenheit(100), "F")
