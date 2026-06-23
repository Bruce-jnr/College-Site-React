export default function ProgrammesMain() {
  return (
    <section className="container py-5">
      <p className="fs-5 lh-lg">
        <i className="bi bi-mortarboard-fill text-main me-2"></i>
        Nsawkaw College of Education (NSACoE) currently offers a{' '}
        <b>Bachelor of Education (B.Ed.) in Primary Education</b> with a
        specialization in <b>Social Studies</b>, running through five
        collaborative academic departments to ensure holistic teacher
        preparation.
      </p>
      <div className="row">
        <div className="col-md-7">
          <h3 className="mb-4 fw-bold text-main display-5">Qualifications</h3>
          <hr />
          <ol className="fs-5 lh-lg">
            <li>
              <b>WASSCE Candidates:</b>
              <br />
              Credit Passes <b>(A1-C6)</b> in six(6) subjects comprising three
              core subjects, including English Language, Mathematics and Social
              Studies or Integrated Science plus three (3) relevant elective
              subjects.
            </li>
            <li>
              <b>SSSCE Candidates:</b>
              <br />
              Credit Passes (A-D) in six( 6) subject comprising three core
              subjects including English Language, Mathematics and Social
              Studies or Integrated Science plus three (3) relevant elective
              subjects.
            </li>

            <li>
              <b>GBCE Candidates:</b>
              <br />
              Credits Passes (A-D) in six(6) subjects comprising three core
              subjects, including English Language and Mathematics, plus three
              relevant elective subjects
            </li>
          </ol>
        </div>

        <div className="col-md-5">
          <h3 className="mb-4 fw-bold text-main display-5">Grading System</h3>
          <hr />
          <table className="table table-striped fs-4">
            <thead className="thead-dark">
              <tr>
                <th>Grade</th>
                <th className="text-end">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b>A</b>
                </td>
                <td className="text-end">100% - 80%</td>
              </tr>
              <tr>
                <td>
                  <b>B+</b>
                </td>
                <td className="text-end">79% - 75%</td>
              </tr>
              <tr>
                <td>
                  <b>B</b>
                </td>
                <td className="text-end">74% - 70%</td>
              </tr>
              <tr>
                <td>
                  <b>C+</b>
                </td>
                <td className="text-end">69% - 65%</td>
              </tr>
              <tr>
                <td>
                  <b>C</b>
                </td>
                <td className="text-end">64% - 60%</td>
              </tr>
              <tr>
                <td>
                  <b>D+</b>
                </td>
                <td className="text-end">59% - 55%</td>
              </tr>
              <tr>
                <td>
                  <b>D</b>
                </td>
                <td className="text-end">54% - 50%</td>
              </tr>
              <tr>
                <td>
                  <b>E</b>
                </td>
                <td className="text-end">49% - 0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
