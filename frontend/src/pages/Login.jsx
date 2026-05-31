import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Call your backend API here
    // axios.post('/api/auth/login', formData)
  };

  return (
    <div className="bg-background-light min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="d-flex align-items-center justify-content-between border-bottom px-4 py-3 bg-white">
        <div className="d-flex align-items-center gap-2">
          <span className="material-symbols-outlined text-primary fs-2">
            school
          </span>

          <h2 className="fw-bold m-0">College Registry System</h2>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small">Help Center</span>

          <span className="material-symbols-outlined">help_outline</span>
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
              >
                Sign In
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
