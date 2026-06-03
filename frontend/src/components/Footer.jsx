import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="bg-secondary text-light pt-5">
      <div className="container">
        <div className="row gy-4">
          {/* About College */}
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-3">
              <img
                className="img-fluid me-2"
                src={logo}
                alt="Nsawkaw College of Education Logo"
                style={{ height: '70px', width: 'auto' }}
                loading="lazy"
              />

              <span className="fs-3 fw-bold">Nsawkaw CoE</span>
            </div>

            <div className="d-flex flex-column gap-2 pb-5">
              <a href="/#" className="text-decoration-none text-light fw-light">
                <i className="bi bi-geo-alt-fill text-warning me-2"></i>
                Nsawkaw, Bono Region - Ghana
              </a>

              <a href="/#" className="text-decoration-none text-light fw-light">
                <i className="bi bi-mailbox2 text-warning me-2"></i>
                P. O. Box 1, Nsawkaw
              </a>

              <a
                href="mailto:info@nsacoe.edu.gh"
                className="text-decoration-none text-light fw-light"
              >
                <i className="bi bi-envelope-fill text-warning me-2"></i>
                info@nsacoe.edu.gh
              </a>

              <a
                href="tel:+2330546535902"
                className="text-decoration-none text-light fw-light"
              >
                <i className="bi bi-phone text-warning me-2"></i>
                (233) 0546 535 902
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="col-md-2">
            <h5 className="text-light mb-1">Resources</h5>

            <hr className="col-4 border border-warning border-2 opacity-75" />

            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/management"
                  className="text-light text-decoration-none"
                >
                  Management
                </Link>
              </li>

              <li>
                <Link
                  to="/admissions"
                  className="text-light text-decoration-none"
                >
                  Admissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="text-light mb-1">Quick Links</h5>

            <hr className="col-4 border border-warning border-2 opacity-75" />

            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <a
                  href="https://lms.nsacoe.edu.gh"
                  className="text-light text-decoration-none"
                  target="_blank"
                  rel="noreferrer"
                >
                  LMS Portal
                </a>
              </li>

              <li>
                <a
                  href="https://studentioe.ucc.edu.gh"
                  className="text-light text-decoration-none"
                  target="_blank"
                  rel="noreferrer"
                >
                  UCC Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-md-3">
            <h5 className="text-light mb-1">Connect with Us</h5>

            <hr className="col-4 border border-warning border-2 opacity-75" />

            <div className="d-flex align-items-center gap-3">
              <a
                href="https://www.facebook.com/"
                className="text-light"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-facebook fs-2 text-warning"></i>
              </a>

              <a href="mailto:info@nsacoe.edu.gh" className="text-light">
                <i className="bi bi-envelope fs-2 text-warning"></i>
              </a>

              <a
                href="https://www.tiktok.com/"
                className="text-light"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-tiktok fs-2 text-warning"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
