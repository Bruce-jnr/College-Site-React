import BEdit3 from '../assets/BEdit3.png';

export default function HistoryMain() {
  return (
    <section className="container py-5">
      <div className="row">
        <div className="row">
          <div className="col">
            <p>
              Nsawkaw College of Education (NSACoE) was established in{' '}
              <b>2022</b> at Nsawkaw in the Tain District of the Bono Region of
              Ghana. The College was founded by the Nsawkaw Traditional Council
              under the visionary leadership and reign of Daasebre Okogyeaman
              Duodu Ampem II, Paramount Chief of the Nsawkaw Traditional Area.
              It was inspired by the collective aspirations of the youth and
              people of Nsawkaw to improve accessibility to higher education and
              promote socio-economic development.
            </p>
            <p>
              The College began as a private mixed-gender tertiary institution.
              Its initial administrative and academic activities were conducted
              in buildings generously donated free of charge (pro bono) by Mr.
              Ebenezer Baffo-Mensah of the Atipim Royal Family of Nsawkaw.
              Start-up capital was mobilized through grants, fundraising
              durbars, and a communal development levy where every male resident
              contributed GHS 20 and every female resident contributed GHS 10.
            </p>
            <div className="bg-grey rounded-4 p-1 shadow mb-3 mt-2">
              <img
                src={BEdit3}
                className="img-fluid rounded border border-light border-3"
                alt="Nsawkaw College of Education"
                description="Nsawkaw College of Education"
              />
            </div>
            <p>
              Significant roles were played by local religious organizations,
              including Rev. Fr. Alex Awuah-Osei, who served on both the
              Implementation Committee and the Governing Council. The first
              Principal of the College is <b>Professor Augustine Oppon-Kumi</b>.
              To support long-term sustainability, the Paramount Chief allocated
              approximately 122 acres of land for the development of its
              permanent campus.
            </p>
            <p>
              In <b>February 2025,</b> the College relocated its administrative
              offices and lecture halls to a new campus facility. The structure,
              originally built by the community as a community centre, was
              successfully converted into a functional academic environment to
              support teaching, learning, and administrative operations.
            </p>
            <p>
              Nsawkaw College of Education is academically affiliated to the{' '}
              <b>University of Cape Coast (UCC)</b>. The College currently
              offers a <b>Bachelor of Education (B.Ed.) in Primary Education</b>{' '}
              with a specialization in Social Studies, running through five
              collaborative academic departments to ensure holistic teacher
              preparation.
            </p>
          </div>
          <div className="col-md-4 py-3 bg-secondary-subtle p-3">
            <h3 className="cal-sans text-maiiin">Leadership Roll</h3>
            <hr />
            <div className="row">
              <div className="col-auto col-md-12">
                <div className="border-start border-success border-4 ps-3 bg-success-subtle p-2 mb-2">
                  <h5 className="mb-0">Prof. Oppon-Kumi Augustine (Current)</h5>
                  <p className="mt-0 mb-0 small">Aug. 2023 - Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
