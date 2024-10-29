// Mengelola login di index.html
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah reload halaman
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Validasi username dan password secara sederhana
    if (username === 'admin' && password === 'admin123') {
      // Simpan status login di session storage
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
  
      document.getElementById('message').textContent = 'Login berhasil!';
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('message').textContent = 'Username atau password salah';
    }
  });
  
  // Memeriksa status login di dashboard.html
  if (window.location.pathname.includes('dashboard.html')) {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'index.html'; // Redirect jika belum login
    } else {
      const username = sessionStorage.getItem('username');
      document.getElementById('welcomeMessage').textContent = `Selamat datang, ${username}!`;
    }
  }
  
  // Menangani logout di dashboard.html
  document.getElementById('logoutButton')?.addEventListener('click', function() {
    sessionStorage.clear(); // Menghapus session storage
    window.location.href = 'index.html';
  });
  