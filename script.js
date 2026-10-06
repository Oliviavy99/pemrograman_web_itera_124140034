let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

const formBarang = document.getElementById("formBarang");
const namaBarang = document.getElementById("namaBarang");
const hargaBarang = document.getElementById("hargaBarang");
const qtyBarang = document.getElementById("qtyBarang");

const keranjangBody = document.getElementById("keranjangBody");
const keranjangKosong = document.getElementById("keranjangKosong");

const totalBelanja = document.getElementById("totalBelanja");
const diskon = document.getElementById("diskon");
const totalAkhir = document.getElementById("totalAkhir");

const uangBayar = document.getElementById("uangBayar");
const pesanPembayaran = document.getElementById("pesanPembayaran");
const kembalian = document.getElementById("kembalian");


// Fungsi untuk mengubah angka menjadi format Rupiah
function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}


// Menyimpan data keranjang ke localStorage
function simpanKeranjang() {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
}


// Menampilkan isi keranjang
function tampilkanKeranjang() {

    keranjangBody.innerHTML = "";

    if (keranjang.length === 0) {
        keranjangKosong.style.display = "block";
    } else {
        keranjangKosong.style.display = "none";
    }

    keranjang.forEach(function(item, index) {

        const subtotal = item.harga * item.qty;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${formatRupiah(item.harga)}</td>
            <td>${item.qty}</td>
            <td>${formatRupiah(subtotal)}</td>
            <td>
                <button onclick="hapusBarang(${index})">
                    Hapus
                </button>
            </td>
        `;

        keranjangBody.appendChild(row);
    });

    hitungTotal();
}


// Menghitung total belanja dan diskon
function hitungTotal() {

    let total = 0;

    keranjang.forEach(function(item) {
        total += item.harga * item.qty;
    });

    let jumlahDiskon = 0;

    // Diskon 10% jika total minimal Rp50.000
    if (total >= 50000) {
        jumlahDiskon = total * 0.10;
    }

    const totalBayar = total - jumlahDiskon;

    totalBelanja.textContent = formatRupiah(total);
    diskon.textContent = formatRupiah(jumlahDiskon);
    totalAkhir.textContent = formatRupiah(totalBayar);

    hitungKembalian();
}


// Validasi input barang
function validasiForm() {

    let valid = true;

    document.getElementById("errorNama").textContent = "";
    document.getElementById("errorHarga").textContent = "";
    document.getElementById("errorQty").textContent = "";

    const nama = namaBarang.value.trim();
    const harga = Number(hargaBarang.value);
    const qty = Number(qtyBarang.value);


    // Validasi nama
    if (nama.length < 3) {

        document.getElementById("errorNama").textContent =
            "Nama barang minimal 3 karakter.";

        valid = false;
    }


    // Validasi harga
    if (!hargaBarang.value || harga < 500) {

        document.getElementById("errorHarga").textContent =
            "Harga harus minimal Rp500.";

        valid = false;
    }


    // Validasi jumlah
    if (!Number.isInteger(qty) || qty < 1) {

        document.getElementById("errorQty").textContent =
            "Qty harus berupa angka bulat minimal 1.";

        valid = false;
    }

    return valid;
}


// Ketika tombol tambah barang ditekan
formBarang.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validasiForm()) {
        return;
    }

    const barang = {
        nama: namaBarang.value.trim(),
        harga: Number(hargaBarang.value),
        qty: Number(qtyBarang.value)
    };

    keranjang.push(barang);

    simpanKeranjang();

    tampilkanKeranjang();

    // Mengosongkan form setelah berhasil
    formBarang.reset();
});


// Menghapus barang dari keranjang
function hapusBarang(index) {

    keranjang.splice(index, 1);

    simpanKeranjang();

    tampilkanKeranjang();
}


// Menghitung kembalian ketika uang bayar diisi
uangBayar.addEventListener("input", function() {

    hitungKembalian();

});


function hitungKembalian() {

    let total = 0;

    keranjang.forEach(function(item) {
        total += item.harga * item.qty;
    });

    let jumlahDiskon = 0;

    if (total >= 50000) {
        jumlahDiskon = total * 0.10;
    }

    const totalBayar = total - jumlahDiskon;

    const bayar = Number(uangBayar.value);


    if (!uangBayar.value) {

        pesanPembayaran.textContent = "";

        kembalian.textContent = "Rp0";

        return;
    }


    // Jika uang kurang
    if (bayar < totalBayar) {

        const kurang = totalBayar - bayar;

        pesanPembayaran.textContent =
            "Uang belum mencukupi. Kurang " + formatRupiah(kurang);

        pesanPembayaran.style.color = "red";

        kembalian.textContent = "Rp0";

    } else {

        const hasilKembalian = bayar - totalBayar;

        pesanPembayaran.textContent =
            "Uang pembayaran mencukupi.";

        pesanPembayaran.style.color = "green";

        kembalian.textContent =
            formatRupiah(hasilKembalian);
    }
}


// Tombol transaksi baru
document.getElementById("btnReset").addEventListener("click", function() {

    const yakin = confirm("Apakah ingin memulai transaksi baru?");

    if (yakin) {

        keranjang = [];

        localStorage.removeItem("keranjang");

        uangBayar.value = "";

        tampilkanKeranjang();

    }

});


// Menampilkan data yang tersimpan ketika halaman dibuka
tampilkanKeranjang();