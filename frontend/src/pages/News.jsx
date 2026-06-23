import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/news`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="px-0 mt-5 pt-5">
      <Navbar />
      <section className="container py-5">
        <h1 className="mb-4 fw-bold text-main display-5">Latest News</h1>
        <hr className="mb-5" />

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center my-5">
            <p className="text-muted fs-5">No news articles found.</p>
          </div>
        ) : (
          <div className="row">
            {news.map((item) => (
              <div key={item.id} className="col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm overflow-hidden news-card">
                  <Link to={`/news-details?id=${item.id}`} className="text-decoration-none">
                    {item.imageUrl && (
                      <div className="overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_API_URL || ''}${item.imageUrl}`}
                          className="card-img-top news-image"
                          alt={item.title}
                          style={{ height: '240px', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className="card-body p-4">
                      <h5 className="card-title text-main fw-bold mb-3">{item.title}</h5>
                      <p className="card-text text-secondary mb-4">
                        {item.content.substring(0, 150)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          <i className="bi bi-calendar3 me-1"></i> {formatDate(item.date)}
                        </small>
                        <span className="text-primary fw-bold small">
                          READ MORE <i className="bi bi-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
      <CopyRight />
    </div>
  );
}
