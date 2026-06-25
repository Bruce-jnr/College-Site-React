import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Username, 2: OTP, 3: New Password
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { showAlert } = useModal();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!username) return setError('Username is required');
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        setStep(2);
        showAlert('OTP Sent', 'A verification code has been sent to the trusted phone number.');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return setError('OTP is required');
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setStep(3);
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return setError('All fields are required');
    if (newPassword !== confirmPassword) return setError('Passwords do not match');
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        showAlert('Success', 'Password has been reset successfully. You can now login.');
        navigate('/login');
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light min-vh-100 d-flex flex-column">
      <header className="d-flex align-items-center justify-content-between border-bottom px-4 py-3 bg-white">
        <div className="d-flex align-items-center gap-2">
          <span className="material-symbols-outlined text-primary fs-2">school</span>
          <h2 className="fw-bold m-0">College Website Admin Panel</h2>
        </div>
      </header>

      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div className="card shadow-lg border-0 animate-in" style={{ maxWidth: '480px', width: '100%' }}>
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <h1 className="fw-bold">Reset Password</h1>
              <p className="text-muted">
                {step === 1 && 'Enter your username to receive a verification code.'}
                {step === 2 && 'Enter the 6-digit code sent to the trusted number.'}
                {step === 3 && 'Enter your new password below.'}
              </p>
            </div>

            {error && (
              <div className="alert alert-danger text-center fw-semibold py-2 mb-4">
                <span className="material-symbols-outlined align-middle me-2 fs-5">warning</span>
                {error}
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleRequestOTP}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <span className="material-symbols-outlined me-2">person</span>
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold py-3" disabled={isLoading}>
                  {isLoading ? 'Sending Code...' : 'Send Verification Code'}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOTP}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <span className="material-symbols-outlined me-2">pin</span>
                    Verification Code
                  </label>
                  <input
                    type="text"
                    className="form-control text-center fs-4 fw-bold"
                    placeholder="000000"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold py-3" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-link w-100 mt-3 text-decoration-none" 
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                >
                  Back to Username
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <span className="material-symbols-outlined me-2">lock</span>
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <span className="material-symbols-outlined me-2">lock_reset</span>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold py-3" disabled={isLoading}>
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}

            <div className="text-center mt-4 pt-4 border-top">
              <Link to="/login" className="text-decoration-none small fw-bold text-primary">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-3">
        <p className="small text-uppercase text-muted mb-0" style={{ letterSpacing: '2px' }}>
          © {new Date().getFullYear()} College Registry Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
