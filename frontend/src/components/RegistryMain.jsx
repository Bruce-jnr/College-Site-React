import Card from './Card';
export default function RegistryMain() {
  return (
    <div className="container col-md-12">
      <div className="row">
        <div className="col-md-9">
          <p className="lead fw-normal text-justify">
            The Registry is the{' '}
            <b>general secretariat and the administrative unit</b> of the
            college headed by the College Secretary. The unit{' '}
            <b>provide assistance to the principal</b> and other{' '}
            <b>top management members</b> in the administration and management
            of the college through College Secretary.
          </p>

          <p className="lead fw-normal text-justify">
            The Registry also renders assistance in ensuring the functioning of
            all boards and standing committees as well as fulfilling the charge
            of all administrative, secretarial and personnel matters of the
            college.
          </p>

          <h2 className="fw-bold lh-1 text-main mt-5">
            <i className="bi bi-list-task text-warning"></i> Functions
          </h2>

          <ul>
            <li className="lead fw-normal">
              <b>Human resource management</b>.
            </li>

            <li className="lead fw-normal">
              <b>Keeping and maintaining the inventory</b> of the college's
              assets.
            </li>

            <li className="lead fw-normal">
              <b>Management and development</b> of the college's assets.
            </li>

            <li className="lead fw-normal">
              Organisation of examinations and publication of results.
            </li>

            <li className="lead fw-normal">
              Organisation of all official ceremonies including{' '}
              <b>matriculation, congregation and convocations</b>.
            </li>

            <li className="lead fw-normal">Student record management.</li>

            <li className="lead fw-normal">
              Report writing and organising of meetings.
            </li>

            <li className="lead fw-normal">
              <b>Public relations</b>.
            </li>
          </ul>
        </div>

        <div className="col-md-3">
          <Card
            name="Name"
            position="Head of Unit"
            image="./_filx/_visualx/img/departments/registry/1.jpg"
          />
        </div>
      </div>
    </div>
  );
}
