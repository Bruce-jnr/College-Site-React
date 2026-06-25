import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import CopyRight from '../components/CopyRight.jsx';
import ContentHeader from '../components/ContentHeader.jsx';
import BEdit3 from '../assets/BEdit3.png';

export default function Precis() {
  return (
    <div className="mx-0 mt-5 pt-5">
      <Navbar />
      <ContentHeader title="Precis" icon="bi bi-info-circle" />
      <div className="container">
        <div className="row">
          <div className="col-md-7 mb-3">
            <span>
              Nsawkaw College of Education (NSACoE) is a mixed-gender
              institution of higher learning located at Nsawkaw in the Tain
              District of the Bono Region, Ghana. Established in 2022 by the
              Nsawkaw Traditional Council under the visionary leadership of
              Daasebre Okogyeaman Duodu Ampem II, the College was founded to
              expand access to quality teacher education and promote educational
              and socio-economic development within the district and beyond. The
              College is affiliated with the University of Cape Coast (UCC), one
              of Ghana's premier institutions for teacher education.
            </span>

            <br />
            <br />

            <span className="mt-4">
              Nsawkaw College of Education currently offers the four-year
              Bachelor of Education (B.Ed.) in Primary Education with
              specialization in Social Studies. The programme is designed to
              equip prospective teachers with strong pedagogical knowledge,
              professional competence, leadership skills, and ethical values for
              effective teaching at the basic education level. Teaching and
              learning are supported through the Departments of Education,
              Social Science, Languages, Mathematics and ICT, and Science and
              Physical Education, ensuring holistic preparation of competent
              professional educators.
            </span>
          </div>
          <div className="col-md-5">
            <img
              src={BEdit3}
              className="img-fluid rounded"
              alt="Berekum College of Education"
              description="Berekum College of Education"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-7 text-main">
            <h1 className="display-5 cal-sans">
              <i className="bi bi-binoculars text-main"></i> Vision
            </h1>
            <p className="ext-font-search-target">
              To be a solid foundation of knowledge in teacher education in
              Ghana and beyond.
            </p>

            <h1 className="display-5 cal-sans mt-5">
              <i className="bi bi-body-text text-main"></i> Mission
            </h1>
            <p>
              To provide learners with opportunities to pursue academic and
              personal excellence within a caring and supportive community.
            </p>
          </div>

          <div className="col-md-5 text-main">
            <h1 className="display-5 cal-sans">
              <i className="bi bi-stars text-main"></i> Core Values
            </h1>
            <span className="d-inline-block bg-warning rounded-circle p-1"></span>{' '}
            Academic Excellence
            <br />
            <span className="d-inline-block bg-warning rounded-circle p-1"></span>{' '}
            Integrity and Accountability
            <br />
            <span className="d-inline-block bg-warning rounded-circle p-1"></span>{' '}
            Professionalism
            <br />
            <span className="d-inline-block bg-warning rounded-circle p-1"></span>{' '}
            Discipline and Respect
            <br />
            <span className="d-inline-block bg-warning rounded-circle p-1"></span>{' '}
            Innovation and Creativity
            <br />
            <span className="d-inline-block bg-warning rounded-circle p-1"></span>{' '}
            Community Service
            <br />
            <span className="d-inline-block bg-warning rounded-circle p-1"></span>{' '}
            Inclusiveness and Equity
          </div>
        </div>
      </div>
      <Footer />
      <CopyRight />
    </div>
  );
}
