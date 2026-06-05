import { useState, useEffect } from 'react';
export default function Admissions() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdmissionStatus = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/admissions/status',
        );
        const status = await response.json();

        setIsOpen(status.isOpen);
      } catch (error) {
        console.error('Error loading admission status:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAdmissionStatus();
  }, []);
  return (
    <section className="container mx-auto my-5">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-2">
          <div className="bg-grey p-2 cal-sans">
            <h4 className="text-main cal-sans mb-1 ms-3 mt-2">
              <i className="bi bi-list text-danger"></i> Admissions
            </h4>
            <hr className="mt-0 mb-2" />
            <ul className="nav flex-column lh-1 small">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="collapse"
                  data-bs-target="#overview"
                  role="button"
                >
                  <i className="bi bi-chevron-right text-danger"></i> Overview
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#requirements"
                  role="button"
                >
                  <i className="bi bi-chevron-right text-danger"></i>{' '}
                  Requirements
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#how-to-apply"
                  role="button"
                >
                  <i className="bi bi-chevron-right text-danger"></i> How to
                  apply
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#admission-status"
                  role="button"
                >
                  <i className="bi bi-chevron-right text-danger"></i> Check
                  admission status
                </a>
              </li>
            </ul>
          </div>

          <div
            id="payslip-campaign"
            className="mt-4 border border-warning p-3 rounded-3 text-center d-none"
          >
            <i className="bi bi-receipt display-1 text-main"></i>
            <br />
            <h6 className="text-main">
              No need to come to the College, upload the payment slip given by
              the bank
            </h6>
            <button className="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite">
              <i className="bi bi-cloud-upload-fill"></i> Start Upload
            </button>
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-10">
          <div id="contentWrapper">
            <div
              id="overview"
              className="col-md-12 collapse show"
              data-bs-parent="#contentWrapper"
            >
              <h2 className="display-5 fw-bold text-main cal-sans mb-3">
                Admission Procedure{' '}
                <sup>
                  <span className="badge rounded-pill text-bg-primary fw-light fs-5">
                    2025/2026
                  </span>
                </sup>
              </h2>

              <ol className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start border-warning border-4 border-0 border-start bg-primary-subtle mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-normal cal-sans fs-4">
                      <span className="badge rounded-pill text-bg-warning">
                        1
                      </span>{' '}
                      Application
                    </div>
                    <span className="small">
                      Students seeking admission into Colleges of Education will
                      purchase forms online via{' '}
                      <a href="https://app.nsacoe.edu.gh/apply-now-login">
                        NSACoE Application portal
                      </a>{' '}
                      or can visit the College IT to apply
                    </span>
                  </div>
                  <div id="applicationStatusBadge">
                    {loading ? (
                      <span className="badge text-bg-secondary rounded-pill">
                        Loading...
                      </span>
                    ) : isOpen ? (
                      <span className="badge text-bg-success rounded-pill">
                        Opened
                      </span>
                    ) : (
                      <span className="badge text-bg-danger rounded-pill">
                        Closed
                      </span>
                    )}
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start border-warning border-4 border-0 border-start bg-primary-subtle mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-normal cal-sans fs-4">
                      <span className="badge rounded-pill text-bg-warning">
                        2
                      </span>{' '}
                      Admissions
                    </div>
                    <span className="small">
                      Colleges of Education will release admissions and send SMS
                      to successful applicants when application ends. Applicants
                      will follow links in their SMS to print out admission
                      letters
                    </span>
                  </div>
                  <span className="badge text-bg-success rounded-pill d-none">
                    Released
                  </span>{' '}
                  <span className="badge text-bg-success rounded-pill">
                    Pending
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start border-warning border-4 border-0 border-start bg-primary-subtle mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-normal cal-sans fs-4">
                      <span className="badge rounded-pill text-bg-warning">
                        3
                      </span>{' '}
                      Honouring
                    </div>
                    <span className="small fw-bold">
                      **All successfull applicants are advised to make payment
                      of their fees at *CBG Bank Ltd or GCB Bank PLC in Nsawkaw
                      College of Education&apos;s Accounts.* on or before{' '}
                      <b>5:00PM</b>
                    </span>
                    <br />
                    <span className="small fw-bold">
                      **After payment of admission fees at the bank, please
                      upload your payment slip and wait for confirmation
                    </span>
                    <br />
                    <span className="small fw-bold">
                      **After your payment is confirmed by the Finance Office,
                      download your prospectus from this website
                    </span>
                    <br />
                  </div>
                  <span className="badge text-bg-warning rounded-pill">
                    October 31, 2025
                  </span>
                </li>
              </ol>

              <div
                className="alert bg-danger-subtle shadow-sm mt-4"
                role="alert"
              >
                <h4 className="alert-heading fw-bold text-danger">
                  <i className="bi bi-exclamation-diamond-fill"></i> Beware of
                  admission scams
                </h4>
                <p className="small mb-0">
                  Every year, criminals take advantage of Colleges of Education
                  admissions to defraud innocent applicants. Several applicants
                  fall victims to these ill-intent persons in the name of
                  getting them admitted.
                </p>
                <p className="small">
                  Please do not fall a victim. Whatever information you receive,
                  kindly verify it from the respective college before you pay
                  any monies. Note that, you will pay your fees into the bank
                  account of the College where you have gained admission and not
                  to individual persons. Always visit the website of the college
                  and call the phone numbers on the website
                </p>

                <h4 className="alert-heading fw-bold text-danger">
                  <i className="bi bi-exclamation-diamond-fill"></i> Actions
                  punishable by law
                </h4>
                <p className="small">
                  It is an offence to present someone else offer of admission
                  (Impersonation). Applicants who are found guilty will be dealt
                  with by the law. Visit or call our College General Office if
                  you have any issue about admissions
                </p>
              </div>
            </div>

            <div
              id="requirements"
              className="col-md-12 collapse"
              data-bs-parent="#contentWrapper"
            >
              <h2 className="display-5 fw-bold text-main cal-sans mb-3">
                Admission Requirements
              </h2>
              <ol className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start border-primary border-4 border-0 border-start bg-info-subtle mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-normal cal-sans fs-4">
                      WASSCE Holders:
                    </div>
                    <span className="small">
                      CREDIT PASSES (A1 - C6) in Six (6) subjects comprising
                      Three (3) Core subjects, including English language and
                      core Mathematics, and three elective subjects relevant to
                      the course of study.
                    </span>
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start border-primary border-4 border-0 border-start bg-info-subtle mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-normal cal-sans fs-4">
                      SSSCE Holders:
                    </div>
                    <span className="small">
                      PASSES (A-D) in six subjects comprising three core
                      subjects, including English Language and core mathematics
                      and three elective subjects relevant to the course of
                      study.
                    </span>
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start border-primary border-4 border-0 border-start bg-info-subtle mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-normal cal-sans fs-4">
                      General Certificate of Education (GCE) Advance Level:
                    </div>
                    <span className="small">
                      Have passes in three (3) subjects (at least, one of the
                      passes should be Grade D or better), and also have credit
                      passes (Grade 6) in five GCE Ordinary Level subjects
                      including English Language, Mathematics, and a Science
                      subject or a Social Science subject.
                    </span>
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start border-primary border-4 border-0 border-start bg-info-subtle mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-normal cal-sans fs-4">
                      Advanced Business Certificate Examination (ABCE):
                    </div>
                    <span className="small">
                      Applicants must: Have passes in three (3) subjects (at
                      least, one of the passes should be Grade D or better).
                      Have credit passes in five (5) subjects, including English
                      Language, Mathematics, Integrated Science or Social
                      Studies in the General Business Certificate Examination
                      (GBCE).
                    </span>
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start border-primary border-4 border-0 border-start bg-info-subtle mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-normal cal-sans fs-4">
                      Technical and Vocational Education and Training (TVET):
                    </div>
                    <span className="small">
                      Have TVET Certificate II Examinations with Lower Credit
                      (C-) or better in six (6) subjects made up of three (3)
                      core subjects which include English, Mathematics,
                      Integrated Science or Social Studies, and three (3)
                      relevant Elective Subjects. Possess Certificate II in
                      three (3) relevant trade areas awarded by Technical
                      Examinations Unit (TEU), National Vocational Training
                      Institute (NVTI), City &amp; Guilds, and other authorised
                      awarding bodies in addition to NABPTEX Certificate II in
                      lieu of passes in English and Mathematics. Have National
                      Board for Professional and Technicians Examinations
                      (NABPTEX) certificate II in relevant trade areas in
                      addition to three (3) credit passes in WASSCE/SSSCE core
                      subjects, including English and Mathematics. Possess a
                      National Certificate II qualification in Competency Based
                      Training (CBT) in a relevant trade area awarded by (TEU)
                      on the National TVET Qualification Framework (NTVETQF).
                    </span>
                  </div>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-start border-primary border-4 border-0 border-start bg-info-subtle mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-normal cal-sans fs-4">
                      Foreign Qualifications:
                    </div>
                    <span className="small">
                      All foreign qualifications should be referred to the Ghana
                      Tertiary Education Commission (GTEC) for the determination
                      of equivalences and eligibility for admission into the
                      Colleges of Education in Ghana. Note: The American SAT,
                      TOEFL, etc. cannot in themselves be acceptable as entry
                      qualifications into Ghanaian tertiary educational
                      institutions
                    </span>
                  </div>
                </li>
              </ol>
            </div>

            <div
              id="how-to-apply"
              className="col-md-12 collapse"
              data-bs-parent="#contentWrapper"
            >
              <h2 className="display-5 fw-bold text-main cal-sans mb-3">
                How to apply
              </h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h4>
                    <span className="badge rounded-pill text-bg-warning">
                      1
                    </span>{' '}
                    Purchase Voucher
                  </h4>
                  <span className="small">
                    Applicants will first purchase an application voucher and
                    receive a SERIAL and a PIN. Applicants are to purchase
                    vouchers at any CBG bank, mobile money wallet or visit our
                    College library to meet professionals to assist in
                    application.
                  </span>
                  <br />
                  <span className="cal-sans">
                    Price of 2025 Forms is:{' '}
                    <span className="fs-3">GH¢360.00</span>
                  </span>
                  <br />
                  <span className="cal-sans">
                    Online Voucher Purchase:{' '}
                    <span className="fs-3">*924*200*26#</span>
                  </span>
                </li>

                <li className="list-group-item">
                  <h4>
                    <span className="badge rounded-pill text-bg-warning">
                      2
                    </span>{' '}
                    Fill Online Form
                  </h4>
                  <span className="small">
                    Applicants are advised to read and ensure that they fully
                    understand all relevant instructions before completing the
                    application form. Applicants are to select their college of
                    choice tailored to the courses offered in their previous
                    education
                  </span>{' '}
                  <a
                    href="https://app.nsacoe.edu.gh/apply-now-login"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link to admissions portal
                  </a>
                </li>

                <li className="list-group-item">
                  <h4>
                    <span className="badge rounded-pill text-bg-warning">
                      3
                    </span>{' '}
                    Mail Hard Copy
                  </h4>
                  <span className="small">
                    After completing the online application form, an applicant
                    is expected to print a hardcopy which has a passport affixed
                    and a copy/copies of their results slip(s) (where available)
                    by EMS priority envelope obtainable from Ghana Post
                    nationwide and addressed to: The Principal of the
                    applicant&apos;s first College of choice.
                  </span>
                </li>
              </ul>
            </div>

            <div
              id="admission-status"
              className="col-md-12 collapse"
              data-bs-parent="#contentWrapper"
            >
              <h2 className="display-5 fw-bold text-main cal-sans mb-3">
                Check admission status
              </h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="badge rounded-pill text-bg-warning">1</span>{' '}
                  Visit the{' '}
                  <a
                    href="https://app.nsacoe.edu.gh/student/login"
                    target="_blank"
                    rel="noreferrer"
                  >
                    admissions portal
                  </a>{' '}
                  to print your admission letter
                </li>
                <li className="list-group-item">
                  <span className="badge rounded-pill text-bg-warning">2</span>{' '}
                  Enter the Admission Number and Pin Recieved via SMS
                </li>
                <li className="list-group-item">
                  <span className="badge rounded-pill text-bg-warning">3</span>{' '}
                  Select admission Letter
                </li>
                <li className="list-group-item">
                  <span className="badge rounded-pill text-bg-warning">4</span>{' '}
                  Select prospectus
                </li>
                <li className="list-group-item">
                  <span className="badge rounded-pill text-bg-warning">5</span>{' '}
                  Click on Print Letter
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
