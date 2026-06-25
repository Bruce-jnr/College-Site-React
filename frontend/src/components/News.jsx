import { useState, useEffect } from 'react';

export default function News() {
  const [newsList, setNewsList] = useState([]);
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
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNewsList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div
          className="alert alert-danger text-center shadow-sm max-w-50 mx-auto"
          role="alert"
        >
          {error}
        </div>
      );
    }

    if (newsList.length === 0) {
      return (
        <p className="text-muted text-center py-5">No news at this time.</p>
      );
    }

    const newsWithImages = newsList.filter((item) => item.imageUrl);
    const featured = newsWithImages[0] || newsList[0];
    const rightColumnNews = newsWithImages.slice(1, 3);
    const simpleNews = newsList
      .filter(
        (item) => !rightColumnNews.includes(item) && item.id !== featured.id,
      )
      .slice(0, 3);

    return (
      <div className="row g-4">
        {/* Left column - Featured news */}
        <div className="col-md-5">
          {featured && (
            <div className="card no-radius border-0 h-100 shadow-sm hover-lift">
              <a
                href={`/news#news-${featured.id}`}
                className="text-decoration-none text-dark d-flex flex-column h-100"
              >
                {featured.imageUrl && (
                  <img
                    src={`http://localhost:3000${featured.imageUrl}`}
                    className="card-img-top img-fluid rounded-top"
                    alt={featured.title}
                    style={{ objectFit: 'cover', height: '300px' }}
                  />
                )}
                <div className="card-body d-flex flex-column p-4">
                  <p className="card-text mb-3 fs-3 text-secondary fw-bold lh-sm">
                    {featured.title}
                  </p>
                  <p
                    className="text-muted flex-grow-1"
                    style={{ fontSize: '1.05rem', lineHeight: '1.6' }}
                  >
                    {featured.content.substring(0, 150)}
                    {featured.content.length > 150 ? '...' : ''}
                  </p>
                  <span className="text-main small fw-semibold mt-3">
                    <i className="bi bi-calendar-month text-warning me-1"></i>{' '}
                    {formatDate(featured.date)} |
                    <i className="bi bi-person text-warning ms-2 me-1"></i>{' '}
                    {featured.author} |
                    <i className="bi bi-eyeglasses text-warning ms-2 me-1"></i>{' '}
                    Read more
                  </span>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Right column - Other news */}
        <div className="col-md-7 ps-md-4 d-flex flex-column">
          {/* First 2 news with images in card layout */}
          {rightColumnNews.map((item, index) => (
            <a
              href={`/news#news-${item.id}`}
              className="text-decoration-none text-dark hover-lift"
              key={item.id}
            >
              <div className="card mb-4 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="row g-0 align-items-center">
                  <div className="col-md-4 h-100">
                    <img
                      src={`http://localhost:3000${item.imageUrl}`}
                      className="img-fluid h-100 w-100"
                      alt={item.title}
                      style={{ minHeight: '200px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h5
                        className={`card-title fw-bold fs-4 mb-3 ${index === 0 ? 'cal-sans' : ''}`}
                      >
                        {item.title}
                      </h5>
                      <p className="card-text">
                        <small className="text-body-secondary fw-semibold">
                          <i className="bi bi-calendar-month-fill text-warning me-1"></i>{' '}
                          {formatDate(item.date)} |
                          <i className="bi bi-person-fill text-warning ms-2 me-1"></i>{' '}
                          {item.author}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}

          {/* Remaining news as simple list items */}
          <div className="bg-light p-4 rounded-4 shadow-sm flex-grow-1 mt-auto">
            <h5 className="fw-bold mb-4 text-main border-bottom pb-2">
              More Headlines
            </h5>
            <div className="d-flex flex-column gap-3">
              {simpleNews.map((item, index) => (
                <div key={item.id}>
                  {index > 0 && <hr className="my-3 text-muted opacity-25" />}
                  <a
                    href={`/news#news-${item.id}`}
                    className="text-decoration-none text-dark d-block hover-lift"
                  >
                    <h6 className="mb-2 fs-5 fw-bold lh-sm">{item.title}</h6>
                    <span className="text-secondary small fw-semibold">
                      <i className="bi bi-calendar-month text-warning me-1"></i>{' '}
                      {formatDate(item.date)} |
                      <i className="bi bi-person text-warning ms-2 me-1"></i>{' '}
                      {item.author}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4 pt-2">
            <a
              href="/news"
              className="btn btn-outline-primary no-radius px-4 py-2 border-2 fw-bold shadow-sm"
            >
              Explore more News
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className="pb-5 pt-0 aos-init aos-animate overflow-hidden"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="container">
        <div className="col-md-11 mx-auto">
          <h2 className="text-center display-5 fw-bold text-main cal-sans mb-3 pb-2 border-bottom">
            News & Highlights
          </h2>

          <div id="newsContainer" className="mt-5">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
}
