$(document).ready(function() {

    // 1. Logika Efek Hover Tombol Kirim Form
    $("#btn").mouseenter(function() { $("#info").text("Pengguna ingin mengeklik tombol..."); });
    $("#btn").mouseleave(function() { $("#info").text(""); });

    // 2. Logika Real-Time Preview Gambar Pasfoto 3x4
    $("#foto").on("change", function() {
        let file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                $("#placeholderPreview").hide();
                $("#imgPreview").attr("src", e.target.result).fadeIn(300);
            };
            reader.readAsDataURL(file);
            $(this).valid();
        } else {
            resetFotoContainer();
        }
    });

    function resetFotoContainer() {
        $("#imgPreview").hide().attr("src", "");
        $("#placeholderPreview").show();
    }

    // 3. Custom Method Validasi Regex Hanya Huruf Alfabet
    $.validator.addMethod("hanyaHuruf", function(value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
    }, "⚠️ Mohon dilengkapi, nama hanya boleh berisi huruf alfabet!");

    // 4. Inisialisasi Utama Engine Validasi Form
    let validator = $("#formDaftar").validate({
        onkeyup: function(element) { $(element).valid(); },
        onfocusout: function(element) { $(element).valid(); },
        onclick: function(element) { $(element).valid(); },

        // Aturan Validasi Sesuai Parameter Soal Dosen Azhar
        rules: {
            nama: { required: true, minlength: 5, hanyaHuruf: true },
            nim: { required: true, digits: true, minlength: 8 },
            email: { required: true, email: true },
            nohp: { required: true, digits: true, minlength: 10 },
            jk: { required: true },
            prodi: { required: true },
            alamat: { required: true, minlength: 10 },
            foto: { required: true, extension: "jpg|jpeg|png|jfif", maxsize: 2097152 }
        },

        // Teks Notifikasi Peringatan Kesalahan Bahasa Indonesia
        messages: {
            nama: {
                required: "⚠️ Data wajib diisi, nama tidak boleh kosong!",
                minlength: "⚠️ Mohon dilengkapi, nama lengkap minimal harus 5 karakter."
            },
            nim: {
                required: "⚠️ Data wajib diisi, NIM tidak boleh kosong!",
                digits: "⚠️ Mohon dilengkapi dengan karakter angka saja!",
                minlength: "⚠️ Mohon dilengkapi, nomor NIM minimal terdiri dari 8 digit."
            },
            email: {
                required: "⚠️ Data wajib diisi, email tidak boleh kosong!",
                email: "⚠️ Format tidak sesuai, mohon dilengkapi dengan tanda '@'."
            },
            nohp: {
                required: "⚠️ Data wajib diisi, nomor HP tidak boleh kosong!",
                digits: "⚠️ Nomor HP hanya boleh diisi menggunakan karakter angka!",
                minlength: "⚠️ Mohon dilengkapi, nomor HP minimal berukuran 10 digit."
            },
            jk: { required: "⚠️ Data wajib diisi, jenis kelamin wajib kamu pilih!" },
            prodi: { required: "⚠️ Data wajib diisi, silakan pilih program studi kamu!" },
            alamat: {
                required: "⚠️ Data wajib diisi, alamat rumah tidak boleh kosong!",
                minlength: "⚠️ Mohon dilengkapi, alamat rumah minimal berisi 10 karakter."
            },
            foto: {
                required: "⚠️ Data wajib diisi, pas foto mahasiswa harus diunggah!",
                extension: "⚠️ Format salah! Hanya menerima berkas berekstensi JPG, JPEG, PNG, atau JFIF.",
                maxsize: "⚠️ Berkas terlalu besar! Ukuran file foto maksimal adalah 2MB."
            }
        },

        errorPlacement: function(error, element) {
            if (element.attr("name") == "foto") {
                error.appendTo("#errorFotoPlace");
            } else if (element.attr("name") == "jk") {
                error.appendTo("#errorJkPlace");
            } else {
                error.insertAfter(element);
            }
        },

        // Handler Sukses: Sembunyikan Form & Munculkan Kartu Ringkasan
        submitHandler: function(form) {
            alert("Pendaftaran Berhasil! Seluruh data lolos kriteria validasi.");

            $("#resNama").text($("#nama").val());
            $("#resNim").text($("#nim").val());
            $("#resEmail").text($("#email").val());
            $("#resNohp").text($("#nohp").val());
            $("#resJk").text($("input[name='jk']:checked").val());
            $("#resProdi").text($("#prodi").val());
            $("#resAlamat").text($("#alamat").val());
            $("#imgResult").attr("src", $("#imgPreview").attr("src"));

            $("#formDaftar").hide();
            $("#cardRingkasan").hide().slideDown(500);

            return false;
        }
    });

    // 5. FITUR BARU: TOMBOL CLEAR DATA / RESET FORM
    $("#btnReset").on("click", function() {
        if (confirm("Apakah kamu yakin ingin mengosongkan dan menghapus seluruh isi data form?")) {
            $("#formDaftar")[0].reset(); // Mengosongkan isian teks bawaan HTML
            validator.resetForm();        // Menghapus semua pesan peringatan error merah jQuery
            resetFotoContainer();         // Mengembalikan preview foto ke ikon kamera semula
            alert("Formulir pendaftaran berhasil dibersihkan.");
        }
    });

    // 6. Tombol Edit Data Kembali
    $("#btnEdit").on("click", function() {
        $("#cardRingkasan").hide();
        $("#formDaftar").slideDown(500);
    });

    // 7. FITUR BARU: TOMBOL CETAK & UNDUH PDF
    $("#btnCetak").on("click", function() {
        // Membuka jendela perintah print bawaan OS / Browser secara instan
        window.print();
    });

});

/// 7. KEMBALI KE AWAL: FITUR CETAK STANDAR HVS / A4 VIA BROWSER
    $("#btnCetak").on("click", function() {
        // Membuka dialog print bawaan sistem browser yang mendukung penuh cetak A4
        window.print();
    });
