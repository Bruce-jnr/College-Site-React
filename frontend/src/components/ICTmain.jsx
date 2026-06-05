import Card from './Card';
import placeholder from '../assets/thumbnail.png';
export default function ICTmain() {
  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-9">
          <p className="lead fw-normal text-justify">
            The unit provides network infrastructure and software systems to
            facilitate teaching, learning and administrative activities. In
            addition to this, the unit renders
            <b>technical and general ICT support services</b> aimed at
            cushioning the college to achieving it's vision, with ICT in
            perspective.
          </p>
          <h2 className="fw-bold lh-1 text-main mt-5">
            <i className="bi bi-list-task text-warning"></i> Functions
          </h2>
          <ul>
            <li className="lead fw-normal">
              Overseeing <b>ICT network and internet operations</b>
            </li>
            <li className="lead fw-normal">
              Installation and upgrading computer hardware and software,
              programming and systems design
            </li>
            <li className="lead fw-normal">
              Development of networks, implementation of internet and intranet
              sites
            </li>
            <li className="lead fw-normal">
              Training of staff on ICT related systems and operations
            </li>
            <li className="lead fw-normal">
              Provision of support services for the College community
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <Card name="Name" position="Head of Unit" image={placeholder} />
        </div>
      </div>
    </div>
  );
}
