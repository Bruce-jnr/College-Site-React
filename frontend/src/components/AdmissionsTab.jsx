import { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext';

export default function AdmissionsTab() {
  const { showAlert, showConfirm } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem('token');

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/admissions/status');
      const data = await response.json();
      setIsOpen(data.isOpen);
      setYear(data.year || '2024/2025');
    } catch (error) {
      console.error('Error fetching admission status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    showConfirm('Save Changes?', `Admissions will be explicitly marked as ${isOpen ? 'OPEN' : 'CLOSED'}.`, async () => {
      setIsUpdating(true);
      try {
        const response = await fetch('/api/admissions/status', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ isOpen, year })
        });

        if (response.status === 401 || response.status === 403) {
          window.location.href = '/login';
          return;
        }

        if (response.ok) {
          showAlert('Success', `Admission settings successfully updated!`);
        } else {
          showAlert('Error', 'Failed to update status');
        }
      } catch (err) {
        showAlert('Error', 'Error updating status');
      } finally {
        setIsUpdating(false);
      }
    });
  };

  return (
    <section className="dashboard-section">
      <div className="dashboard-card border-0 shadow-sm">
        <div className="admission-header border-bottom pb-4 mb-4">
          <div>
            <h3>Admission Settings</h3>
            <p className="text-muted mb-0">Configure the global admission portal properties</p>
          </div>

          <span className={`status-badge ${isOpen ? 'bg-success text-white' : 'bg-danger text-white'}`}>
            <span className="bg-white"></span>
            {loading ? '...' : isOpen ? 'Currently Opened' : 'Currently Closed'}
          </span>
        </div>

        {loading ? (
          <p className="text-center text-muted">Loading settings...</p>
        ) : (
          <form className="dashboard-form" onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="fw-bold mb-2">Academic Year</label>
              <input 
                type="text" 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2024/2025"
                required
              />
            </div>

            <div className="mb-4 pb-2 border-bottom">
              <label className="fw-bold mb-3">Admission Portal Status</label>
              <div className="d-flex gap-3 mb-4">
                <button 
                  type="button"
                  className={`btn flex-grow-1 fw-bold py-3 shadow-sm ${isOpen ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setIsOpen(true)}
                >
                  <i className="bi bi-door-open-fill me-2"></i> Open Portal
                </button>
                <button 
                  type="button"
                  className={`btn flex-grow-1 fw-bold py-3 shadow-sm ${!isOpen ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-door-closed-fill me-2"></i> Close Portal
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="primary-btn w-100 py-3 shadow my-2"
              disabled={isUpdating}
              style={{ fontSize: '1.05rem' }}
            >
              {isUpdating ? 'Saving Updates...' : 'Save Configuration'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
