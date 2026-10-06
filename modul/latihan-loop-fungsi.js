// LATIHAN LOOP & FUNGSI
// Nama: Olivia
// NIM: 124140034
// Kelas: RB

// 1. Tabel Perkalian
const angka = 5;

console.log("Tabel Perkalian", angka);

for (let i = 1; i <= 10; i++) {
    console.log(angka + " x " + i + " = " + (angka * i));
}


// 2. Menghitung Faktorial
function faktorial(n) {
    let hasil = 1;

    for (let i = 1; i <= n; i++) {
        hasil = hasil * i;
    }

    return hasil;
}

console.log("Faktorial 5:", faktorial(5));


// 3. Mengecek Bilangan Prima
function cekPrima(angka) {
    if (angka < 2) {
        return false;
    }

    for (let i = 2; i < angka; i++) {
        if (angka % i === 0) {
            return false;
        }
    }

    return true;
}

console.log("Apakah 7 bilangan prima?", cekPrima(7));


// 4. FizzBuzz
console.log("FizzBuzz:");

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}


// 5. Menghitung Luas Persegi Panjang
function luasPersegiPanjang(panjang, lebar) {
    return panjang * lebar;
}

const panjang = 10;
const lebar = 5;

console.log(
    "Luas Persegi Panjang:",
    luasPersegiPanjang(panjang, lebar)
);