import { useState, useEffect } from 'react';

export default function SRCMain() {
  const [groupedExecs, setGroupedExecs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSrcExecs = async () => {
      try {
        const response = await fetch('/api/src');
        if (!response.ok) {
          throw new Error('Failed to fetch SRC executives');
        }
        const data = await response.json();
        setGroupedExecs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSrcExecs();
  }, []);

  const years = Object.keys(groupedExecs).sort((a, b) => b.localeCompare(a));

  return (
    <section className="container mt-5 mb-5 min-vh-100">
      {loading ? (
        <div id="srcExecutivesContainer" className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center shadow-sm max-w-50 mx-auto mt-4">
          <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"></i>
          {error}
        </div>
      ) : years.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-people-fill display-1 text-muted mb-3 d-block"></i>
          <p className="text-muted fs-5">No SRC executives available at this time.</p>
        </div>
      ) : (
        <div className="accordion shadow-sm" id="accordionExample">
          {years.map((year, yearIndex) => {
            const executives = groupedExecs[year];
            const isCurrent = executives.some((e) => e.isCurrent);
            const collapseId = `collapse${yearIndex}`;
            const isFirst = yearIndex === 0;

            return (
              <div className="accordion-item border-0 border-bottom" key={year}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${isFirst ? '' : 'collapsed'} fs-3 fw-bold ${
                      isCurrent ? 'bg-success text-white' : 'bg-secondary text-light'
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={isFirst ? 'true' : 'false'}
                  >
                    SRC Executives - {year}
                    {isCurrent && (
                      <small className="fw-light ms-2 badge bg-white text-success rounded-pill align-text-top" style={{ fontSize: '10pt', marginTop: '6px' }}>
                        Current
                      </small>
                    )}
                    {!isFirst && (
                      <small className="fw-light ms-3 opacity-75" style={{ fontSize: '10pt', marginTop: '8px' }}>
                        <i>(Tap to view)</i>
                      </small>
                    )}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${isFirst ? 'show' : ''}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body bg-light pt-5 pb-5">
                    <div className="row g-4 justify-content-center">
                      {executives.map((exec) => (
                        <div className="col-md-4 col-sm-6 text-center mb-4" key={exec.id}>
                          <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift">
                            <div className="card-body d-flex flex-column align-items-center p-4">
                              {exec.imageUrl ? (
                                <img
                                  src={exec.imageUrl}
                                  className="img-fluid rounded-circle shadow border border-3 border-white mb-3"
                                  style={{ height: '160px', width: '160px', objectFit: 'cover' }}
                                  alt={exec.name}
                                />
                              ) : (
                                <div
                                  className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center shadow border border-3 border-white mb-3"
                                  style={{ height: '160px', width: '160px' }}
                                >
                                  <i className="bi bi-person-fill text-white" style={{ fontSize: '5rem' }}></i>
                                </div>
                              )}
                              <h4 className="mt-2 mb-1 text-main fw-bold">{exec.name}</h4>
                              <p className="fw-semibold text-primary mb-0 text-uppercase letter-spacing-1" style={{ fontSize: '0.9rem' }}>
                                {exec.position}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
