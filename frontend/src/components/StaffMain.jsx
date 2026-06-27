export default function StaffMain({ staff, loading, error }) {
  return (
    <section className="staff-section pt-5 pb-5">
      <div className="container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : staff.length === 0 ? (
          <div className="empty-state text-center py-5">
            <i className="bi bi-person-x display-1 text-muted"></i>
            <h5 className="mt-3">No staff found</h5>
            <p className="text-muted small">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="row g-4">
            {staff.map((m, index) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3"
                key={m.id}
                data-aos="fade-up"
                data-aos-delay={(index % 8) * 50}
              >
                <div className="card h-100 shadow-sm border-0 no-radius text-center staff-card">
                  <div className="card-img-top mx-auto mt-4" style={{ width: '120px', height: '120px' }}>
                    {m.imageUrl ? (
                      <img
                        src={m.imageUrl}
                        className="rounded-circle w-100 h-100 shadow-sm border border-2 border-warning"
                        style={{ objectFit: 'cover' }}
                        alt={m.full_name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="rounded-circle w-100 h-100 bg-light d-flex align-items-center justify-content-center shadow-sm">
                        <i className="bi bi-person-fill display-2 text-secondary"></i>
                      </div>
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-main mb-1">{m.full_name}</h5>
                    <p className="text-muted fw-semibold small mb-2 text-uppercase letter-spacing-1">{m.position}</p>
                    {m.qualification && (
                      <p className="small mb-3 flex-grow-1 min-h-50">
                        <i className="bi bi-award-fill text-warning me-1"></i> {m.qualification}
                      </p>
                    )}
                    {m.department && (
                      <span className="badge bg-light text-dark border align-self-center mt-auto px-3 py-2 rounded-pill shadow-sm">
                        <i className="bi bi-diagram-3-fill text-primary me-2"></i>
                        {m.department}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
