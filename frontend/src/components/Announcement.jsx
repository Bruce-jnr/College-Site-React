import { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext';

export default function Announcement() {
  const { showAlert } = useModal();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements');
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const loadAllAnnouncements = () => {
    showAlert('Coming Soon', 'Full announcements page coming soon!');
  };

  return (
    <section
      className="pt-5 py-5 aos-init aos-animate"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="container">
        <div className="col-md-9 mx-auto">
          <h2 className="display-5 fw-bold text-main text-center cal-sans">
            <div className="spinner-grow text-success me-2" role="status"></div>
            Announcements
          </h2>

          <hr style={{ border: '1px dashed grey' }} />

          <div id="announcementsContainer">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            ) : announcements.length === 0 ? (
              <p className="text-muted text-center">No announcements at this time.</p>
            ) : (
              <div className="alert bg-success-subtle no-radius border-0 border-start border-success border-4 shadow-sm" role="alert">
                <h5 className="alert-heading fw-bold">{announcements[0].title}</h5>
                <p className="small mb-0">{announcements[0].content}</p>
                <p className="mt-1 mb-0 txt-sm text-secondary fw-semibold">
                  <i className="bi bi-calendar-month text-success me-1"></i> {formatDate(announcements[0].date)} |
                  <i className="bi bi-person text-success ms-2 me-1"></i> {announcements[0].author}
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-4 pt-2">
            <button
              className="btn btn-outline-primary no-radius px-4 py-2 border-2 fw-bold shadow-sm"
              onClick={loadAllAnnouncements}
            >
              Read more announcements
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
