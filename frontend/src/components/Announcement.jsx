import { useState, useEffect } from 'react';

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/announcements');
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
    console.log('Loading all announcements...');
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
              <div className="text-center text-muted">
                <p>No announcements available yet.</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="card shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-primary">{announcement.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted small">
                        {new Date(announcement.date).toLocaleDateString()} by {announcement.author}
                      </h6>
                      <p className="card-text">{announcement.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!loading && !error && announcements.length > 0 && (
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-primary no-radius"
                onClick={loadAllAnnouncements}
              >
                Read more announcements
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
