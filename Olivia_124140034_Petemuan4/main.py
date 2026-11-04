# ===================================================
# Berkas: main.py
# Deskripsi: Program utama yang memakai modul math_operations
# ===================================================

# Cara 1: import seluruh modul (dipanggil dengan math_operations.nama_fungsi)
import math_operations

# Cara 2: import fungsi tertentu (dipanggil langsung)
from math_operations import luas_lingkaran, keliling_lingkaran

# Cara 3: import dengan alias (nama singkat)
import math_operations as mo

print("=== KONSTANTA ===")
print("PI =", math_operations.PI)

print("\n=== PERSEGI ===")
sisi = 5
print(f"Sisi {sisi}")
print(f"Luas     : {math_operations.luas_persegi(sisi):.2f}")
print(f"Keliling : {math_operations.keliling_persegi(sisi):.2f}")

sisi = 10
print(f"Sisi {sisi}")
print(f"Luas     : {math_operations.luas_persegi(sisi):.2f}")
print(f"Keliling : {math_operations.keliling_persegi(sisi):.2f}")

print("\n=== PERSEGI PANJANG ===")
panjang = 8
lebar = 3
print(f"Panjang {panjang}, Lebar {lebar}")
print(f"Luas     : {mo.luas_persegi_panjang(panjang, lebar):.2f}")
print(f"Keliling : {mo.keliling_persegi_panjang(panjang, lebar):.2f}")

panjang = 12
lebar = 7
print(f"Panjang {panjang}, Lebar {lebar}")
print(f"Luas     : {mo.luas_persegi_panjang(panjang, lebar):.2f}")
print(f"Keliling : {mo.keliling_persegi_panjang(panjang, lebar):.2f}")

print("\n=== LINGKARAN ===")
jari_jari = 7
print(f"Jari-jari {jari_jari}")
print(f"Luas     : {luas_lingkaran(jari_jari):.2f}")
print(f"Keliling : {keliling_lingkaran(jari_jari):.2f}")

jari_jari = 14
print(f"Jari-jari {jari_jari}")
print(f"Luas     : {luas_lingkaran(jari_jari):.2f}")
print(f"Keliling : {keliling_lingkaran(jari_jari):.2f}")

print("\n=== KONVERSI SUHU ===")
for suhu in [0, 37, 100]:
    fahrenheit = math_operations.celsius_ke_fahrenheit(suhu)
    kelvin = math_operations.celsius_ke_kelvin(suhu)
    print(f"{suhu} Celsius = {fahrenheit:.2f} Fahrenheit = {kelvin:.2f} Kelvin")
