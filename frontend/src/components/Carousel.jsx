import { Link } from 'react-router-dom';

import BEdit3 from '../assets/BEdit3.png';
import Image10 from '../assets/Image10.jpg';
import Durbur2 from '../assets/DURBUR 2.jpg';
import Durbur1 from '../assets/Durbur 1.jpg';
import BEdit1 from '../assets/BEdit1.png';

function Carousel() {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide mb-4"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          aria-label="Slide 1"
        ></button>

        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>

        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>

        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          className="active"
          aria-current="true"
          aria-label="Slide 4"
        ></button>

        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {/* Slide 1 */}
        <div className="carousel-item">
          <img
            src={BEdit3}
            className="img-fluid d-block w-100"
            alt="The Principal Nsawkaw College of Education"
            loading="lazy"
          />

          <div className="carousel-caption text-center">
            <p className="fw-normal text-sec fs-3 mb-0">Welcome to</p>

            <h1 className="display-2 fw-bold mt-0">
              Nsawkaw College of Education
            </h1>

            <Link to="/about" className="btn btn-warning shadow btn-lg">
              Read More
            </Link>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img
            className="img-fluid d-block w-100"
            src={Image10}
            alt="Nsawkaw College of Education"
            loading="lazy"
          />

          <div className="carousel-caption">
            <p className="fw-normal text-sec fs-3 mb-0">
              Pursue a Four-Year
            </p>

            <h1 className="display-2 fw-bold mt-0">
              Bachelor of Education Programme
            </h1>

            <Link
              to="/admissions"
              className="btn btn-warning shadow btn-lg"
            >
              Visit Admissions Page
            </Link>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={Durbur2}
            alt="Nsawkaw College of Education"
            loading="lazy"
          />

          <div className="carousel-caption text-start text-md-start">
            <p className="fw-normal text-sec fs-3 mb-0">
              We inculcate
            </p>

            <h1 className="display-2 fw-bold mt-0">
              Discipline into Our Education
            </h1>
          </div>
        </div>

        {/* Slide 4 */}
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src={Durbur1}
            alt="Nsawkaw College of Education"
            loading="lazy"
          />

          <div className="carousel-caption">
            <p className="fw-normal text-sec fs-3 mb-0">
              We are committed to
            </p>

            <h1 className="display-2 fw-bold mt-0">
              Training Disciplined Teachers
            </h1>

            <a
              href="https://app.nsacoe.edu.gh"
              className="btn btn-warning shadow btn-lg"
              target="_blank"
              rel="noreferrer"
            >
              Apply Now
            </a>
          </div>
        </div>

        {/* Slide 5 */}
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={BEdit1}
            alt="Nsawkaw College of Education"
            loading="lazy"
          />

          <div className="carousel-caption">
            <p className="fw-normal text-sec fs-3 mb-0">
              We are ever ready to
            </p>

            <h1 className="display-2 fw-bold mt-0">
              Respond to Your Enquiries
            </h1>

            <Link to="/contact" className="btn btn-warning shadow btn">
              Contact Us Now
            </Link>
          </div>
        </div>
      </div>

      {/* Previous Button */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>

        <span className="visually-hidden">Previous</span>
      </button>

      {/* Next Button */}
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>

        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;