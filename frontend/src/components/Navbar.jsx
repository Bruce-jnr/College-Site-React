import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <header className="fixed-top">
      {/* Top Bar */}
      <div className="top-bar bg-primary">
        <div className="container">
          <div className="row align-items-center py-2">
            {/* Social Icons */}
            <div className="col-lg-3 col-md-4 d-flex gap-3">
              <a href="tel:+233546535902">
                <i className="bi bi-telephone-outbound-fill text-warning"></i>
              </a>

              <a
                href="https://wa.me/233546535902"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-whatsapp text-warning"></i>
              </a>

              <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
                <i className="bi bi-tiktok text-warning"></i>
              </a>
            </div>

            {/* Notification Ticker */}
            <div className="col-lg-9 col-md-8 overflow-hidden">
              <div className="ticker-wrapper">
                <div className="ticker">
                  <span>
                    <i className="bi bi-megaphone-fill text-warning me-2"></i>
                    Welcome to Nsawkaw College of Education Official Website
                  </span>

                  <span className="mx-4 text-warning">|</span>

                  <span>
                    <i className="bi bi-megaphone-fill text-warning me-2"></i>
                    Applications are still ongoing for selected programmes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg bg-warning shadow-sm">
        <div className="container-xl">
          {/* Logo */}
          <Link className="navbar-brand fw-bold brand" to="/">
            <img
              className="img-fluid me-2"
              src={logo}
              alt="school logo"
              style={{ height: '60px', width: 'auto' }}
            />
            Nsawkaw
            <span className="d-md-none">COE</span>
            <span className="d-none d-md-inline">College of Education</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Home */}
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold" to="/">
                  <i className="bi bi-house-door-fill text-main"></i> Home
                </Link>
              </li>

              {/* About Us */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark fw-bold"
                  href="/#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-info-circle text-main"></i> About Us
                </a>

                <ul className="dropdown-menu border-0 shadow bg-warning">
                  <li>
                    <Link className="dropdown-item fw-bold" to="/precis">
                      <i className="bi bi-chevron-right"></i> Precis
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item fw-bold" to="/history">
                      <i className="bi bi-chevron-right"></i> History
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item fw-bold"
                      to="/college-principal"
                    >
                      <i className="bi bi-chevron-right"></i> College Principal
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/governance">
                      <i className="bi bi-chevron-right"></i> Governance
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/management">
                      <i className="bi bi-chevron-right"></i> Management
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/units">
                      <i className="bi bi-chevron-right"></i> Units
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/projects">
                      <i className="bi bi-chevron-right"></i> Projects
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/contact">
                      <i className="bi bi-chevron-right"></i> Contact Us
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Administration */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark fw-bold"
                  href="/#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-diagram-3 text-main"></i> Administration
                </a>

                <ul className="dropdown-menu border-0 shadow bg-warning">
                  <li>
                    <Link className="dropdown-item fw-bold" to="/registry">
                      <i className="bi bi-chevron-right"></i> Registry
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/finance">
                      <i className="bi bi-chevron-right"></i> Finance
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/ict">
                      <i className="bi bi-chevron-right"></i> ICT
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/audit">
                      <i className="bi bi-chevron-right"></i> Audit
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/library">
                      <i className="bi bi-chevron-right"></i> Library
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/procurement">
                      <i className="bi bi-chevron-right"></i> Procurement
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/estate">
                      <i className="bi bi-chevron-right"></i> Estate
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item fw-bold"
                      to="/works-sanitation"
                    >
                      <i className="bi bi-chevron-right"></i> Works & Sanitation
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/security">
                      <i className="bi bi-chevron-right"></i> Security
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Academics */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark fw-bold"
                  href="/#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-mortarboard text-main"></i> Academics
                </a>

                <ul className="dropdown-menu border-0 shadow bg-warning">
                  <li>
                    <Link className="dropdown-item fw-bold" to="/admissions">
                      <i className="bi bi-chevron-right"></i> Admissions
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/programmes">
                      <i className="bi bi-chevron-right"></i> Programmes
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/departments">
                      <i className="bi bi-chevron-right"></i> Departments
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/library">
                      <i className="bi bi-chevron-right"></i> Library
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item fw-bold"
                      to="/staff-directory"
                    >
                      <i className="bi bi-chevron-right"></i> Staff Directory
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Media */}
              <li className="nav-item dropdown bg-warning">
                <a
                  className="nav-link dropdown-toggle text-dark fw-bold"
                  href="/#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-newspaper text-main"></i> Media
                </a>

                <ul className="dropdown-menu border-0 shadow bg-warning">
                  <li>
                    <Link className="dropdown-item fw-bold" to="/news">
                      <i className="bi bi-chevron-right"></i> News
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/gallery">
                      <i className="bi bi-chevron-right"></i> Gallery
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Students */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark fw-bold"
                  href="/#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-people text-main"></i> Students
                </a>

                <ul className="dropdown-menu border-0 shadow bg-warning">
                  <li>
                    <Link
                      className="dropdown-item fw-bold"
                      to="/student-affairs"
                    >
                      <i className="bi bi-chevron-right"></i> Dean of Student
                      Affairs
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item fw-bold" to="/src">
                      <i className="bi bi-chevron-right"></i> SRC
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item fw-bold"
                      to="/clubs-and-societies"
                    >
                      <i className="bi bi-chevron-right"></i> Clubs & Societies
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
