import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Copyright from '../components/CopyRight';
import ContentHeader from '../components/ContentHeader';
import ManagementCard from '../components/ManagementCard';

export default function Management() {
  return (
    <div className="px-0 mt-5 pt-5">
      <Navbar />
      <ContentHeader title="Management" icon="bi bi-folder text-warning ms-2" />
      <div className="container">
        <div className="col-md-12 mb-3">
          <p className="lead">
            We have a management team that ensures the smooth operation of the
            institution. The management team key roles include but not limited
            to:
            <ul className="fs-5">
              <li>
                Leading strategic planning, overseeing all administrative and
                academic affairs.
              </li>
              <li>
                Student admissions, registration, maintaining student records,
                and organizing official ceremonies like matriculation and
                graduation.
              </li>
              <li>
                Budgeting, managing funds, collecting fees, and preparing
                financial reports.
              </li>
              <li>
                Curriculum development, managing academic programs, and ensuring
                the quality of teaching and research.
              </li>
              <li>
                Acquiring new books and journals, managing digital resources,
                and providing support to students and faculty for research.
              </li>
            </ul>
          </p>
        </div>
      </div>

      {/* Management Team */}
      <div className="container p-4">
        <div className="row">
          <div className="col mb-4">
            <ManagementCard
              image="./_filx/_visualx/img/mgmt/7.jpg"
              name="Prof. Oppon-kumi Augustine"
              position="Principal"
              email="principal@nsacoe.edu.gh"
            />
          </div>
          <div className="col mb-4">
            <ManagementCard
              image="./_filx/_visualx/img/mgmt/2.jpg"
              name="Mr. Addo Fosu Sylvester"
              position="Vice Principal"
              email="vice-principal@nsacoe.edu.gh"
            />
          </div>
          <div className="col mb-4">
            <ManagementCard
              image="./_filx/_visualx/img/mgmt/3.jpg"
              name="Mr. Augustine Djan"
              position="Registrar"
              email="secretary@nsacoe.edu.gh"
            />
          </div>
          <div className="col mb-4">
            <ManagementCard
              image="./_filx/_visualx/img/mgmt/4.jpg"
              name="Mr. Kuseg Daniel"
              position="Financial Officer"
              email="finance-officer@nsacoe.edu.gh"
            />
          </div>
          <div className="col mb-4">
            <ManagementCard
              image="#"
              name="Name"
              position="Auditor"
              email="auditor@nsacoe.edu.gh"
            />
          </div>
          <div className="col mb-4">
            <ManagementCard
              image="./_filx/_visualx/img/mgmt/6.jpg"
              name="Bernard Besseah"
              position="Librarian"
              email="librarian@nsacoe.edu.gh"
            />
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
}
