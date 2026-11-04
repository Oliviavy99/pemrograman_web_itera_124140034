# Berkas: tugas2_nilai_mahasiswa.py
# Deskripsi: Pengelolaan data nilai mahasiswa


def hitung_nilai_akhir(uts, uas, tugas):
    """
    Menghitung nilai akhir mahasiswa.
    Parameter: uts, uas, tugas (nilai angka)
    Return: nilai akhir (30% UTS + 40% UAS + 30% Tugas)
    """
    nilai_akhir = (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)
    return nilai_akhir


def tentukan_grade(nilai):
    """
    Menentukan grade berdasarkan nilai akhir.
    Parameter: nilai (nilai akhir)
    Return: grade berupa huruf A, B, C, D, atau E
    """
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


# Data mahasiswa (list berisi dictionary)
data_mahasiswa = [
    {"nama": "Olivia", "nim": "124140034", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Budi", "nim": "124140035", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Siti", "nim": "124140036", "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Andi", "nim": "124140037", "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 60},
    {"nama": "Dewi", "nim": "124140038", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
]

# Hitung nilai akhir dan grade untuk setiap mahasiswa
for mhs in data_mahasiswa:
    mhs["nilai_akhir"] = hitung_nilai_akhir(mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
    mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])

# Tampilkan tabel
print("=" * 55)
print(f"{'No':<4}{'Nama':<12}{'NIM':<12}{'Nilai Akhir':<14}{'Grade'}")
print("=" * 55)

nomor = 1
for mhs in data_mahasiswa:
    print(f"{nomor:<4}{mhs['nama']:<12}{mhs['nim']:<12}{mhs['nilai_akhir']:<14.2f}{mhs['grade']}")
    nomor += 1

print("=" * 55)

# Cari nilai tertinggi dan terendah
tertinggi = data_mahasiswa[0]
terendah = data_mahasiswa[0]

for mhs in data_mahasiswa:
    if mhs["nilai_akhir"] > tertinggi["nilai_akhir"]:
        tertinggi = mhs
    if mhs["nilai_akhir"] < terendah["nilai_akhir"]:
        terendah = mhs

print("\nNilai akhir tertinggi:")
print(f"{tertinggi['nama']} ({tertinggi['nim']}) - {tertinggi['nilai_akhir']:.2f} - Grade {tertinggi['grade']}")

print("\nNilai akhir terendah:")
print(f"{terendah['nama']} ({terendah['nim']}) - {terendah['nilai_akhir']:.2f} - Grade {terendah['grade']}")
