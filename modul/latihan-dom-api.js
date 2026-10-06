// LATIHAN DOM & API
// Nama: Olivia
// NIM: 124140034
// Kelas: RB


// 1. Mengubah Teks dengan DOM

const teks = document.getElementById("teks");
const btnUbah = document.getElementById("btnUbah");

btnUbah.addEventListener("click", function() {
    teks.textContent = "Teks sudah berhasil diubah!";
});


// 2. Form Validation

const formNama = document.getElementById("formNama");
const inputNama = document.getElementById("inputNama");
const pesanNama = document.getElementById("pesanNama");

formNama.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = inputNama.value.trim();

    if (nama.length < 3) {
        pesanNama.textContent = "Nama minimal 3 karakter.";
        pesanNama.style.color = "red";
    } else {
        pesanNama.textContent = "Nama berhasil dikirim.";
        pesanNama.style.color = "green";
    }
});


// 3. LocalStorage

const inputCatatan = document.getElementById("inputCatatan");
const btnSimpan = document.getElementById("btnSimpan");
const btnTampil = document.getElementById("btnTampil");
const hasilCatatan = document.getElementById("hasilCatatan");

btnSimpan.addEventListener("click", function() {
    localStorage.setItem("catatan", inputCatatan.value);
    hasilCatatan.textContent = "Catatan berhasil disimpan.";
});

btnTampil.addEventListener("click", function() {
    const catatan = localStorage.getItem("catatan");

    if (catatan) {
        hasilCatatan.textContent = "Catatan: " + catatan;
    } else {
        hasilCatatan.textContent = "Belum ada catatan.";
    }
});


// 4. Dark Mode

const btnMode = document.getElementById("btnMode");

btnMode.addEventListener("click", function() {
    if (document.body.style.backgroundColor === "black") {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
    }
});


// 5. Mengambil Data dari API

const btnAPI = document.getElementById("btnAPI");
const hasilAPI = document.getElementById("hasilAPI");

btnAPI.addEventListener("click", function() {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            hasilAPI.innerHTML = "";

            data.forEach(function(post) {
                const li = document.createElement("li");

                li.textContent = post.title;

                hasilAPI.appendChild(li);
            });
        })
        .catch(function(error) {
            hasilAPI.textContent = "Gagal mengambil data.";
            console.log(error);
        });
});