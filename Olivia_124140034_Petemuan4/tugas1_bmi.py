# Berkas: tugas1_bmi.py
# Deskripsi: Program penghitung BMI (Body Mass Index)

print("--- PROGRAM PENGHITUNG BMI ---")

# Input dari pengguna (input() selalu berupa string, jadi diubah ke float)
berat = float(input("Masukkan berat badan (kg): "))
tinggi = float(input("Masukkan tinggi badan (m): "))

# Hitung BMI
bmi = berat / (tinggi * tinggi)

# Tentukan kategori BMI
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

# Tampilkan hasil
print("\n--- HASIL ---")
print(f"Berat badan  : {berat} kg")
print(f"Tinggi badan : {tinggi} m")
print(f"Nilai BMI    : {bmi:.2f}")
print(f"Kategori     : {kategori}")
