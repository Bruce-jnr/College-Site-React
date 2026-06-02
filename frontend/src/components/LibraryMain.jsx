import Card from './Card';
import LibraryModal from './LibraryModal';

export default function LibraryMain() {
  return (
    <section className="container px-4" id="hanging-icons">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-9 text-justify">
            <p className="lead fw-normal">
              It is the academic nerve of the college. The pivotal role of the
              library is to <b>provide research and academic needs</b> of staff
              and students in the college. The library exists mainly to support
              teaching, learning and research. It has the
              <b> Reference Section, General Stack </b>
              and the <b>Electronic Library</b>.
            </p>

            <p className="lead fw-normal mb-1">
              The library has two main units:
            </p>

            <i className="bi bi-chevron-right"></i>
            <b>Cataloguing and Classification</b>
            <br />

            <i className="bi bi-chevron-right"></i>
            <b>Reference Service and User Education.</b>
            <br />

            {/* Digital Resources */}
            <div className="alert text-bg-info shadow mt-4" role="alert">
              <h4 className="alert-heading fw-bold">
                <i className="bi bi-info-circle"></i> Digital Library Resources
              </h4>

              <p>
                The College Library has provided electronic materials for staff,
                students and the general public. Tap on the button below to show
                links to the various electronic resources.
              </p>

              <a
                href="#"
                className="btn btn-light btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#digital-resources-modal"
              >
                Digital Library Resources
              </a>
            </div>

            <h2 className="fw-bold lh-1 text-main mt-5">
              <i className="bi bi-list-task text-warning"></i> Functions
            </h2>

            <ul>
              <li className="lead fw-normal">
                Drawing up and monitoring the implementation of College Library
                Strategic Plan
              </li>

              <li className="lead fw-normal">
                Directing and coordinating the components such as
                <b> services, collections and external relations</b>.
              </li>

              <li className="lead fw-normal">
                Establishing and maintaining procedures, policies and systems
                that make for efficient library operation
              </li>

              <li className="lead fw-normal">
                Collaboration with the relevant and appropriate institutional
                libraries and organisations within and outside the country in
                order to keep up with developing trends
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <Card
              image="./_filx/_visualx/img/departments/library/1.jpg"
              name="Henrietta Abena Fio"
              position="College Librarian"
            />
          </div>
        </div>
      </div>

      <h2 className="fw-bold lh-1 text-main mt-5 mb-3">
        <i className="bi bi-people-fill text-warning"></i> Personnel
      </h2>

      <div className="col-md-12">
        <div className="row justify-content-center">
          {[
            { img: '2.jpg', role: 'Assistant Librarian' },
            { img: '3.jpg', role: 'Assistant Librarian' },
            { img: '4.jpg', role: 'Library Assistant' },
            { img: '5.jpg', role: 'Library Assistant' },
            { img: '6.jpg', role: 'Library Assistant', mt: true },
          ].map((person, index) => (
            <div key={index} className={`col-md-3 ${person.mt ? 'mt-3' : ''}`}>
              <div className="card shadow">
                <img
                  className="img-fluid"
                  src={`./_filx/_visualx/img/departments/library/${person.img}`}
                  style={{ height: '280px' }}
                  alt="Nsawkaw College of Education"
                  loading="lazy"
                />

                <div className="card-body bg-white text-center">
                  <p className="card-text text-main">
                    <i className="bi bi-person-fill text-warning"></i>
                    <b>Name</b>
                    <br />
                    <i className="text-primary small">({person.role})</i>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LibraryModal />
    </section>
  );
}
