import Card from './Card';
export default function StudentAffairsMain() {
  return (
    <section className="container px-4 py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-lg-9">
          <div>
            <p className="lead fw-normal text-justify">
              The Dean of students keeps under review the system of halls of
              residence in collaboration with hall wardens. Makes subject to
              approval of Academic board, reflection to ensure proper
              functioning of the halls of residence. Makes adequate reflection
              for the supervision and welfare of junior members of the college.
            </p>

            <p className="lead fw-normal text-justify">
              Act in "Loco Parent" for all junior members. Liaises with the
              college secretary, heads of department/units, hall tutors
              (wardens), students' registration council and all other
              appropriate bodies in all matters affecting the welfare of junior
              members and be responsible to the principal in the exercise of the
              unit's function.
            </p>
            <h2 className="fw-bold lh-1 text-main mt-5">
              <i className="bi bi-list-task text-warning"></i> Functions
            </h2>
            <ul className="text-justify">
              <li className="lead fw-normal">
                To ensure effective communication between
                <b> management and students.</b>
              </li>
              <li className="lead fw-normal">
                Foster interpersonal and intrapersonal relations between
                management and students.
              </li>
              <li className="lead fw-normal">
                Enforcement of <b>law, order and maintaining discipline </b>
                among students in collaboration with the hall wardens /other
                stakeholders.
              </li>
              <li className="lead fw-normal">
                Promote a very<b> conducive environment for learning.</b>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-2">
          <Card
            name="Mr. Augustine Djan"
            position="Dean of Student Affairs"
            image="/images/principal.jpg"
          />
        </div>
      </div>
    </section>
  );
}
