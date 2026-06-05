import { useEffect, useState } from 'react';
import AdmissionImage from '../assets/admission.jpg';

export default function HomeAdmissionsBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admissionYear, setAdmissionYear] = useState('');

  useEffect(() => {
    const loadAdmissionStatus = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/admissions/status',
        );
        const data = await response.json();

        setIsOpen(data.isOpen);
        setAdmissionYear(data.year || '2025/2026');
      } catch (error) {
        console.error('Error loading admission status:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAdmissionStatus();
  }, []);

  return (
    <section
      className="text-light text-center position-relative aos-init aos-animate"
      data-aos="fade-up"
      data-aos-delay="100"
      style={{ background: '#05133cff' }}
    >
      <img
        src={AdmissionImage}
        alt="admission-image"
        className="img-fluid"
        style={{
          width: '100%',
          height: '500px',
          opacity: 0.4,
          objectFit: 'cover',
        }}
        loading="lazy"
      />

      <div className="position-absolute top-50 start-50 translate-middle px-4 py-5">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">College Admissions</h1>

          <div className="col-lg-8 mx-auto">
            <div id="admissionStatusContainer">
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                {loading ? (
                  <label className="display-6 text-warning fw-bold">
                    Loading...
                  </label>
                ) : isOpen ? (
                  <label className="display-4 text-warning fw-bold">
                    <i className="bi bi-check-circle"></i> Opened
                  </label>
                ) : (
                  <label className="display-4 text-warning fw-bold">
                    <i className="bi bi-x-circle"></i> Closed
                  </label>
                )}
              </div>

              {!loading && (
                <label className="fs-5 text-warning">
                  {admissionYear} Admissions {isOpen ? 'Opened' : 'Closed'}
                </label>
              )}
            </div>

            <br />

            <a href="/admissions" className="btn btn-warning mt-3">
              <i className="bi bi-file-text"></i> Visit Admissions Page
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
