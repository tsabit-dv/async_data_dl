// Mengecek status login di dashboard.html
if (window.location.pathname.includes('dashboard.html')) {
  if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html'; // Redirect jika belum login
  } else {
    const username = sessionStorage.getItem('username');
    document.getElementById('welcomeMessage').textContent = `Selamat datang, ${username}!`;
  }
}

// Menampilkan input tambahan setelah 3 menit
setTimeout(function() {
  document.getElementById('additionalInputs').style.display = 'block';
}, 180000); // 3 menit dalam milidetik

// Fungsi untuk menangani penyimpanan data
document.getElementById('dataForm')?.addEventListener('submit', function(event) {
  event.preventDefault();

  const photoBeforeInput = document.getElementById('photoBefore').files[0];
  const keterangan = document.getElementById('keterangan').value;

  if (photoBeforeInput) {
    // Mengonversi foto ke dalam format URL Base64
    const reader = new FileReader();
    reader.onload = function(e) {
      const photoBeforeBase64 = e.target.result;

      // Membuat objek data awal
      const data = {
        photoBefore: photoBeforeBase64,
        keterangan: keterangan,
        timestamp: new Date().toLocaleString()
      };

      // Menyimpan data sementara
      sessionStorage.setItem('tempData', JSON.stringify(data));

      document.getElementById('message').textContent = 'Data awal tersimpan!';
    };
    reader.readAsDataURL(photoBeforeInput);
  }
});

// Fungsi untuk menyimpan data lengkap ketika tombol selesai ditekan
document.getElementById('completeButton')?.addEventListener('click', function() {
  const tempData = JSON.parse(sessionStorage.getItem('tempData'));

  if (tempData) {
    const photoAfterInput = document.getElementById('photoAfter').files[0];
    const catatan = document.getElementById('catatan').value;

    if (photoAfterInput) {
      // Konversi foto after ke Base64
      const reader = new FileReader();
      reader.onload = function(e) {
        const photoAfterBase64 = e.target.result;

        // Menambahkan data tambahan ke data awal
        tempData.photoAfter = photoAfterBase64;
        tempData.catatan = catatan;

        // Menyimpan data lengkap di local storage
        const storedData = JSON.parse(localStorage.getItem('userData')) || [];
        storedData.push(tempData);
        localStorage.setItem('userData', JSON.stringify(storedData));

        // Tampilkan data yang tersimpan
        displayStoredData();
        sessionStorage.removeItem('tempData');
        document.getElementById('dataForm').reset();
      };
      reader.readAsDataURL(photoAfterInput);
    } else {
      alert("Silakan unggah Foto After sebelum menyimpan data lengkap.");
    }
  } else {
    alert("Data awal tidak ditemukan. Silakan mulai ulang form.");
  }
});

// Fungsi untuk menampilkan data dari local storage
function displayStoredData() {
  const storedData = JSON.parse(localStorage.getItem('userData')) || [];
  const storedDataContainer = document.getElementById('storedData');
  storedDataContainer.innerHTML = '';

  storedData.forEach((data, index) => {
    const dataDiv = document.createElement('div');
    dataDiv.innerHTML = `
      <p><strong>Foto Before:</strong></p>
      <img src="${data.photoBefore}" alt="Foto Before ${index + 1}" width="100">
      <p><strong>Keterangan:</strong> ${data.keterangan}</p>
      <p><strong>Waktu Simpan:</strong> ${data.timestamp}</p>
      ${data.photoAfter ? `<p><strong>Foto After:</strong></p><img src="${data.photoAfter}" alt="Foto After ${index + 1}" width="100">` : ''}
      ${data.catatan ? `<p><strong>Catatan:</strong> ${data.catatan}</p>` : ''}
      <hr>
    `;
    storedDataContainer.appendChild(dataDiv);
  });
}

// Menampilkan data tersimpan saat halaman dimuat
if (window.location.pathname.includes('dashboard.html')) {
  displayStoredData();
}

// Fungsi untuk logout
document.getElementById('logoutButton')?.addEventListener('click', function() {
  sessionStorage.clear(); // Menghapus session storage
  window.location.href = 'index.html';
});
