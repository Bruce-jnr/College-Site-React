import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CopyRight from './CopyRight';

export default function NewsDetails() {
  const [searchParams] = useSearchParams();
  const newsId = searchParams.get('id');
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [newsId]);

  async function fetchArticle() {
    if (!newsId) {
      setError('News article not found.');
      setLoading(false);
      return;
    }

    try {
      // Get the API URL from environment variables or use relative path
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/news/${newsId}`);

      if (!response.ok) {
        throw new Error('News not found');
      }

      const data = await response.json();
      setArticle(data);
    } catch (err) {
      console.error('Error loading news article:', err);
      setError('Error loading news article.');
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
      <section className="pt-5 py-5 mt-5">
        <div className="container">
          <div className="col-md-9 mx-auto">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-danger">{error}</p>
              </div>
            ) : article ? (
              <article>
                <h1 className="display-4 fw-bold text-main mb-3">
                  {article.title}
                </h1>
                <p className="text-muted mb-4">
                  <i className="bi bi-calendar-month text-warning"></i>{' '}
                  {formatDate(article.date)} |
                  <i className="bi bi-person text-warning"></i> {article.author}
                </p>

                {article.imageUrl && (
                  <div className="mb-4">
                    <img
                      src={`${import.meta.env.VITE_API_URL || ''}${article.imageUrl}`}
                      className="img-fluid rounded shadow-sm"
                      alt={article.title}
                    />
                  </div>
                )}

                <div className="news-content">
                  {article.content.split('\n').map((paragraph, index) =>
                    paragraph.trim() ? (
                      <p key={index} className="lead mb-3 text-justify">
                        {paragraph}
                      </p>
                    ) : null,
                  )}
                </div>
              </article>
            ) : (
              <div className="text-center">
                <p className="text-muted">No article found.</p>
              </div>
            )}

            <div className="text-center mt-5">
              <Link
                to="/news"
                className="btn btn-outline-primary no-radius px-4"
              >
                <i className="bi bi-arrow-left me-2"></i> Back to News
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <CopyRight />
    </div>
  );
}
