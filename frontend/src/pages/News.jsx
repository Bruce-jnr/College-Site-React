import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import BannerContent from '../components/BannerContent';
import BEdit1 from '../assets/BEdit1.png';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to load news');
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="px-0 mt-5 pt-5">
      <Navbar />
      <BannerContent
        title="News & Highlights"
        breadcrumb="News"
        description="Stay up to date with the latest news, events, and announcements from Nsawkaw College of Education."
        image={BEdit1}
      />

      <section className="py-5">
        <div className="container">
          <div className="col-md-10 col-lg-8 mx-auto">

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : news.length === 0 ? (
              <p className="text-muted text-center py-5 fs-5">No news articles found.</p>
            ) : (
              <div className="d-flex flex-column gap-5">
                {news.map((item, index) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-4 shadow-sm overflow-hidden"
                    id={`news-${item.id}`}
                  >
                    {/* Cover image */}
                    {item.imageUrl && (
                      <div style={{ maxHeight: '420px', overflow: 'hidden' }}>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-100"
                          style={{ objectFit: 'cover', maxHeight: '420px' }}
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-4 p-md-5">
                      {/* Badge */}
                      <span
                        className="badge mb-3 px-3 py-2 rounded-pill"
                        style={{ background: 'var(--accent-color)', color: '#221b00', fontWeight: 700 }}
                      >
                        News #{index + 1}
                      </span>

                      {/* Title */}
                      <h2
                        className="fw-bold mb-2"
                        style={{ color: 'var(--main-color)', fontSize: '1.6rem', lineHeight: 1.3 }}
                      >
                        {item.title}
                      </h2>

                      {/* Meta */}
                      <p className="text-muted small mb-4 d-flex align-items-center gap-3 flex-wrap">
                        <span>
                          <i className="bi bi-calendar3 me-1 text-warning"></i>
                          {formatDate(item.date)}
                        </span>
                        <span>
                          <i className="bi bi-person-fill me-1 text-warning"></i>
                          {item.author}
                        </span>
                      </p>

                      <hr className="mb-4" />

                      {/* Full article content */}
                      <div className="news-content">
                        {item.content.split('\n').map((paragraph, i) =>
                          paragraph.trim() ? (
                            <p
                              key={i}
                              className="mb-3 lh-lg"
                              style={{ fontSize: '1.05rem', textAlign: 'justify' }}
                            >
                              {paragraph}
                            </p>
                          ) : null
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
      <CopyRight />
    </div>
  );
}
