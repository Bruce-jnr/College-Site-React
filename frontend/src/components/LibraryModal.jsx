export default function LibraryModal() {
  return (
    <div
      id="digital-resources-modal"
      className="modal fade"
      tabIndex="-1"
      data-bs-keyboard="true"
      aria-hidden="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Digital Libraries - Open Access Resources
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body bg-white">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.core.ac.uk"
                      className="text-decoration-none"
                    >
                      Core
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://academicjournals.org/journals.htm"
                      className="text-decoration-none"
                    >
                      Academic Journals
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.doabooks.org/"
                      className="text-decoration-none"
                    >
                      Directory of Open Access Books
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.internationalafricaninstitute.org/repositories"
                      className="text-decoration-none"
                    >
                      African digital repositories
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://v2.sherpa.ac.uk/opendoar/"
                      className="text-decoration-none"
                    >
                      Directory of Open Access Repositories
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.doaj.org/"
                      className="text-decoration-none"
                    >
                      Academic Journals
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.oapen.org/"
                      className="text-decoration-none"
                    >
                      OAPEN
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.hathitrust.org/"
                      className="text-decoration-none"
                    >
                      Hathi Trust
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.openbookpublishers.com/"
                      className="text-decoration-none"
                    >
                      Open Book
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://opendocs.ids.ac.uk/opendocs/handle/20.500.12413/3"
                      className="text-decoration-none"
                    >
                      Open Docs
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://openlibrary.org/"
                      className="text-decoration-none"
                    >
                      Open Library
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.loc.gov/collections/world-digital-library/aboutthis-collection/"
                      className="text-decoration-none"
                    >
                      World Digital Library
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://z-lib.org/"
                      className="text-decoration-none"
                    >
                      ZLibrary
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.pdfdrive.com"
                      className="text-decoration-none"
                    >
                      PDF Drive
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://scholar.google.com/"
                      className="text-decoration-none"
                    >
                      Google Scholar
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="http://en.bookfi.net/"
                      className="text-decoration-none"
                    >
                      Bookfi
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="http://e-booksdirectory.com/"
                      className="text-decoration-none"
                    >
                      E-Books Directory
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://bookboon.com/"
                      className="text-decoration-none"
                    >
                      Book Boon
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://libgen.is/"
                      className="text-decoration-none"
                    >
                      Library Genesis
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="http://2020ok.com/10605.htm"
                      className="text-decoration-none"
                    >
                      2020 OK
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
