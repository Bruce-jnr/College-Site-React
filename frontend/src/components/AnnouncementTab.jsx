import { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext';

export default function AnnouncementTab() {
  const { showAlert, showConfirm } = useModal();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token');

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/announcements/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 401 || response.status === 403) {
        window.location.href = '/login';
        return;
      }
      const data = await response.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      showAlert('Required', 'Please provide title and content.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          author: localStorage.getItem('username') || 'Admin',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        showAlert('Success', 'Announcement posted successfully!');
        setTitle('');
        setContent('');
        fetchAnnouncements(); // refresh list
      } else {
        showAlert('Error', data.error || 'Failed to post announcement');
      }
    } catch (error) {
      showAlert('Error', 'Error posting announcement');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    showConfirm('Confirm Delete', 'Are you sure you want to delete this announcement?', async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/announcements/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          showAlert('Success', 'Announcement deleted successfully!');
          fetchAnnouncements(); // Refresh the list
        } else {
          showAlert('Error', 'Failed to delete announcement');
        }
      } catch (err) {
        showAlert('Error', 'Error deleting announcement');
        console.error(err);
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="dashboard-section">
      <div className="welcome-card">
        <h2>Welcome, {localStorage.getItem('username') || 'Admin'}</h2>
        <p>Nsawkaw College Admin Dashboard</p>

        <div className="stats-grid">
          <div className="stat-box">
            <strong>{announcements.length}</strong>
            <span>Total Announcements</span>
          </div>

          <div className="stat-box">
            <strong className="gold-text">Manage</strong>
            <span>Dashboard</span>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-title-row">
          <span className="material-symbols-outlined">add_circle</span>
          <h3>Create Announcement</h3>
        </div>

        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input 
              type="text" 
              placeholder="e.g. End of Semester Dates" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Content</label>
            <textarea
              placeholder="Write announcement details..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish Announcement'}
          </button>
        </form>
      </div>

      <h3 className="section-heading mt-3">Recent History</h3>

      {loading ? (
        <p className="text-muted text-center py-3">Loading...</p>
      ) : error ? (
        <p className="text-danger text-center py-3">{error}</p>
      ) : announcements.length === 0 ? (
        <p className="text-muted text-center py-3">No announcements found.</p>
      ) : (
        announcements.map((ann) => (
          <HistoryItem
            key={ann.id}
            icon="campaign"
            title={ann.title}
            time={`${formatDate(ann.date)} by ${ann.author}`}
            onDelete={() => handleDelete(ann.id)}
            gold
          />
        ))
      )}
    </section>
  );
}

function HistoryItem({ icon, title, time, gold, onDelete }) {
  return (
    <div className="history-item shadow-sm mb-3 rounded-3">
      <div className={`history-icon ${gold ? 'gold-bg' : ''}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      <div className="flex-grow-1">
        <strong>{title}</strong>
        <p className="mb-0 text-muted">{time}</p>
      </div>

      <button type="button" className="plain-icon-btn text-danger ms-2" onClick={onDelete} title="Delete">
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}
