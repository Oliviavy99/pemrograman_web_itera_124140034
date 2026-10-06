// LATIHAN VARIABEL & KONDISIONAL
// Nama: Olivia
// NIM: 124140034
// Kelas: RB

// 1. Data Diri
const nama = "Olivia";
let umur = 20;
const kota = "Bandar Lampung";

console.log("Nama:", nama);
console.log("Umur:", umur);
console.log("Kota:", kota);


// 2. Pengecekan Kelulusan
const nilai = 80;

if (nilai >= 70) {
    console.log("Status: Lulus");
} else {
    console.log("Status: Tidak Lulus");
}


// 3. Kategori Umur
if (umur < 12) {
    console.log("Kategori: Anak");
} else if (umur <= 17) {
    console.log("Kategori: Remaja");
} else if (umur <= 59) {
    console.log("Kategori: Dewasa");
} else {
    console.log("Kategori: Lansia");
}


// 4. Konversi Nomor Hari
const nomorHari = 3;
let namaHari = "";

switch (nomorHari) {
    case 1:
        namaHari = "Senin";
        break;
    case 2:
        namaHari = "Selasa";
        break;
    case 3:
        namaHari = "Rabu";
        break;
    case 4:
        namaHari = "Kamis";
        break;
    case 5:
        namaHari = "Jumat";
        break;
    case 6:
        namaHari = "Sabtu";
        break;
    case 7:
        namaHari = "Minggu";
        break;
    default:
        namaHari = "Nomor hari tidak valid";
}

console.log("Hari:", namaHari);


// 5. Menentukan Grade dengan Ternary
const nilaiGrade = 85;

const grade = nilaiGrade >= 90
    ? "A"
    : nilaiGrade >= 80
    ? "B"
    : nilaiGrade >= 70
    ? "C"
    : nilaiGrade >= 60
    ? "D"
    : "E";

console.log("Grade:", grade);