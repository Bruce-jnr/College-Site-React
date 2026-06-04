import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        // Sometimes backend sends { token: '...', user: {...} } or similar.
        // The dashboard assumes localStorage has 'token' to verify connection.
        if (data.user && data.user.username) {
          localStorage.setItem('username', data.user.username);
        } else {
          localStorage.setItem('username', formData.username);
        }

        navigate('/admin');
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error connecting to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="d-flex align-items-center justify-content-between border-bottom px-4 py-3 bg-white">
        <div className="d-flex align-items-center gap-2">
          <span className="material-symbols-outlined text-primary fs-2">
            school
          </span>

          <h2 className="fw-bold m-0">College Website Admin Panel</h2>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div
          className="card shadow-lg border-0"
          style={{ maxWidth: '480px', width: '100%' }}
        >
          {/* Hero */}
          <div
            className="position-relative d-flex justify-content-center align-items-center"
            style={{
              height: '200px',
              background:
                'linear-gradient(to bottom right, rgba(48,110,232,0.2), rgba(48,110,232,0.05))',
            }}
          >
            <div
              className="bg-white rounded-circle d-flex justify-content-center align-items-center shadow"
              style={{
                width: '100px',
                height: '100px',
              }}
            >
              <span className="material-symbols-outlined text-primary fs-1">
                account_balance
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <h1 className="fw-bold">Welcome Back</h1>

              <p className="text-muted">
                Please enter your credentials to access the registry
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger text-center fw-semibold py-2">
                  <span className="material-symbols-outlined align-middle me-2 fs-5">
                    warning
                  </span>
                  {error}
                </div>
              )}
              {/* Username */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <span className="material-symbols-outlined me-2">person</span>
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <span className="material-symbols-outlined me-2">lock</span>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 fw-bold py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            {/* Footer Text */}
            <div className="text-center mt-4 pt-4 border-top">
              <p className="small text-muted">
                Authorized personnel only. For access requests, contact your{' '}
                <a href="#" className="text-decoration-none">
                  department administrator
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-3">
        <p
          className="small text-uppercase text-muted mb-0"
          style={{ letterSpacing: '2px' }}
        >
          © {new Date().getFullYear()} College Registry Management System. All
          Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
