// Check if already logged in
if (localStorage.getItem('token')) {
  window.location.href = 'dashboard.html';
}

document.getElementById('login').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('email').value;
  const password = document.getElementById('pwd').value;
  const alert = document.getElementById('alert');

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      window.location.href = 'dashboard.html';
    } else {
      alert.textContent = data.error || 'Login failed';
      alert.style.display = 'block';
    }
  } catch (error) {
    alert.textContent = 'Error connecting to server';
    alert.style.display = 'block';
    console.error(error);
  }
});
