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

  return (
    <section
      className="pt-5 py-5 aos-init aos-animate"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="container">
        <div className="col-md-11 mx-auto">
          <h2 className="text-center display-5 fw-bold text-main cal-sans mb-1">
            News
          </h2>
          <hr style={{ border: '1px dashed grey' }} />
          {/* News will be loaded here dynamically */}
          <div id="newsContainer">
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
            ) : newsList.length === 0 ? (
              <p className="text-muted text-center">No news at this time.</p>
            ) : (
              <div className="row">
                {newsList.map((item) =>
                  item.imageUrl ? (
                    <div className="col-md-6 mb-4" key={item.id}>
                      <div className="card no-radius border-0 shadow-sm h-100">
                        <a href={`/news/${item.id}`} className="text-decoration-none text-dark h-100 d-flex flex-column">
                          <img
                            src={`http://localhost:3000${item.imageUrl}`}
                            className="card-img-top rounded-top"
                            alt={item.title}
                            style={{ height: '220px', objectFit: 'cover' }}
                          />
                          <div className="card-body d-flex flex-column">
                            <p className="card-text mb-2 fs-5 text-secondary fw-bold">
                              {item.title}
                            </p>
                            <p className="text-muted flex-grow-1">
                              {item.content.substring(0, 150)}
                              {item.content.length > 150 ? '...' : ''}
                            </p>
                            <span className="text-primary small mt-auto fw-semibold">
                              <i className="bi bi-calendar-month text-warning me-1"></i>
                              {formatDate(item.date)} |
                              <i className="bi bi-person text-warning mx-1"></i>
                              {item.author}
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-6 mb-4" key={item.id}>
                      <a href={`/news/${item.id}`} className="text-decoration-none h-100 d-block">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-bold text-dark mb-3">{item.title}</h5>
                            <p className="card-text text-muted flex-grow-1">
                              {item.content.substring(0, 150)}
                              {item.content.length > 150 ? '...' : ''}
                            </p>
                            <p className="card-text mt-auto mb-3">
                              <small className="text-body-secondary fw-semibold">
                                <i className="bi bi-calendar-month-fill text-warning me-1"></i>
                                {formatDate(item.date)} |
                                <i className="bi bi-person-fill text-warning mx-1"></i>
                                {item.author}
                              </small>
                            </p>
                            <button className="btn btn-outline-primary btn-sm mt-auto w-100 no-radius">
                              Read More
                            </button>
                          </div>
                        </div>
                      </a>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
