// Mengecek status login di dashboard.html
if (window.location.pathname.includes('dashboard.html')) {
  if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html'; // Redirect jika belum login
  } else {
    const username = sessionStorage.getItem('username');
    document.getElementById('welcomeMessage').textContent = `Selamat datang, ${username}!`;
  }
}

// Fungsi untuk menangani penyimpanan data
document.getElementById('dataForm')?.addEventListener('submit', function(event) {
  event.preventDefault();

  const photoInput = document.getElementById('photo').files[0];
  const keterangan = document.getElementById('keterangan').value;

  if (photoInput) {
    // Mengonversi foto ke dalam format URL Base64
    const reader = new FileReader();
    reader.onload = function(e) {
      const photoBase64 = e.target.result;

      // Membuat objek data
      const data = {
        photo: photoBase64,
        keterangan: keterangan,
        timestamp: new Date().toLocaleString()
      };

      // Menyimpan data dalam local storage
      const storedData = JSON.parse(localStorage.getItem('userData')) || [];
      storedData.push(data);
      localStorage.setItem('userData', JSON.stringify(storedData));

      // Menampilkan data yang tersimpan
      displayStoredData();
      document.getElementById('dataForm').reset();
    };
    reader.readAsDataURL(photoInput);
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
      <p><strong>Foto:</strong></p>
      <img src="${data.photo}" alt="Foto ${index + 1}" width="100">
      <p><strong>Keterangan:</strong> ${data.keterangan}</p>
      <p><strong>Waktu Simpan:</strong> ${data.timestamp}</p>
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
