import Card from './Card';
export default function FinanceMain() {
  return (
    <div className="col-md-12 mb-5">
      <div className="row">
        <div className="col-md-9">
          <p className="lead fw-normal text-justify">
            The Finance department takes the fore as the college's
            <b>financial management and advisory</b> body. They implement
            <b>policies and procedures to control</b> and
            <b>administer the financial affairs</b> of the college and to ensure
            good <b>financial health</b>. The unit's mandate spans from revenue
            collection, control of expenditure to budget drafting and financial
            statements preparation.
          </p>
          <h2 className="fw-bold lh-1 text-main mt-5">
            <i className="bi bi-list-task text-warning"></i> Functions
          </h2>
          <ul>
            <li className="lead fw-normal">
              Responsible for <b>collecting all legitimate revenue</b> due to
              the College.
            </li>
            <li className="lead fw-normal">
              <b>Administration of the financial affairs</b> of the College
            </li>

            <li className="lead fw-normal">
              <b>Preparing the annual budget</b> of the College for presentation
              to the appropriate governing body for approval and implementation.
            </li>
            <li className="lead fw-normal">
              <b>Exercises control over expenditure</b> in line with the
              College's objectives and budgets.
            </li>

            <li className="lead fw-normal">
              Liaises with the <b>appointed external auditors</b> to get the
              College's <b> financial statements audited.</b>
            </li>
            <li className="lead fw-normal">
              Responsible for <b>ensuring that the financial statements</b> of
              the College are drawn up in accordance with
              <b>
                the law establishing the Colleges, the Statutes, applicable
                accounting standards
              </b>
              and all other Regulations approved by the College as well as all
              other <b>relevant national laws. </b>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <Card
            image="./_filx/_visualx/img/departments/finance/1.jpg"
            title="Finance Officer"
            name="Name"
          />
        </div>
      </div>
    </div>
  );
}
