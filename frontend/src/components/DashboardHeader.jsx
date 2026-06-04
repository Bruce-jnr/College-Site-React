import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/');
    }
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <span className="material-symbols-outlined">school</span>
        <h1>AdminPanel</h1>
      </div>

      <div className="dashboard-header-actions">
        <button type="button" className="icon-btn text-danger" onClick={handleLogout} title="Logout">
          <span className="material-symbols-outlined">logout</span>
        </button>

        <div className="admin-avatar">
          <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin Avatar" />
        </div>
      </div>
    </header>
  );
}
