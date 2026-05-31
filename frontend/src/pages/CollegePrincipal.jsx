import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import ContentHeader from '../components/ContentHeader';
import Card from '../components/Card';

import principalImage from '../assets/principal.jpg';

export default function CollegePrincipal() {
  return (
    <div className="px-0 mt-5 pt-5">
      <Navbar />

      <ContentHeader
        title="College Principal"
        icon="bi bi-folder text-warning ms-2"
      />

      <div className="container py-5">
        <div className="row justify-content-center gy-4">
          {/* Text Content */}
          <div className="col-12 col-md-8 col-lg-9">
            <div>
              <p className="lead fw-normal text-justify">
                The Principal provides overall leadership and policy direction
                for the administration and management of the halls of residence,
                ensuring their effective functioning in line with the
                regulations of the College and the standards of the Ghana
                Tertiary Education Commission (GTEC). The Principal approves and
                oversees measures aimed at maintaining discipline, safety, and a
                conducive residential environment, subject to the
                recommendations of the Academic Board.
              </p>

              <p className="lead fw-normal text-justify">
                The Principal holds ultimate responsibility for the welfare,
                supervision, and holistic development of all junior members of
                the College. The Principal liaises with the College Secretary,
                Deans, Heads of Departments and Units, Hall Tutors/Wardens, the
                Students&apos; Representative Council (SRC), and other relevant
                stakeholders on matters affecting student welfare and remains
                accountable for the effective discharge of these
                responsibilities in accordance with institutional statutes and
                GTEC guidelines.
              </p>

              <h2 className="fw-bold lh-1 text-main mt-5">
                <i className="bi bi-list-task text-warning"></i> Functions
              </h2>

              <ul className="text-justify">
                <li className="lead fw-normal">
                  Provide strategic leadership and overall administrative and
                  academic direction for the{' '}
                  <b>effective management of the College</b>.
                </li>

                <li className="lead fw-normal">
                  Ensure effective communication and collaboration between{' '}
                  <b>management, staff, and students</b>.
                </li>

                <li className="lead fw-normal">
                  Oversee the implementation and enforcement of{' '}
                  <b>
                    college statutes, policies, and disciplinary procedures
                  </b>{' '}
                  in collaboration with relevant stakeholders.
                </li>

                <li className="lead fw-normal">
                  Promote a{' '}
                  <b>
                    safe, inclusive, and conducive environment for teaching,
                    learning, and research
                  </b>.
                </li>
              </ul>
            </div>
          </div>

          {/* Principal Card */}
          <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center">
            <Card
              image={principalImage}
              name="Prof. Oppon-Kumi Augustine"
              position="College Principal"
            />
          </div>
        </div>
      </div>

      <Footer />
      <CopyRight />
    </div>
  );
}