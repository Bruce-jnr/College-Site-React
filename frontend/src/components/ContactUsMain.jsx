export default function ContactUsMain() {
  return (
    <main>
      <div className="container">
        <div className="p-4">
          <div className="row">
            <div className="col-md-4 text-main">
              <h1 className="display-5 fw-bold">
                <i className="bi bi-mailbox2 text-main"></i> Mailing
              </h1>
              <p>
                You write us a letter or send us a message through mail. Find
                below the postal address and the email address. Tap on the email
                address to compose an email
              </p>
              <hr className="col-3 border border-warning border-2 mt-1" />
              <a className="text-decoration-none fw-bold lead text-dark">
                Nsawkaw College of Education
                <br />
                Box 1, Nsawkaw - Bono, Ghana
              </a>
              <br />
              <a
                href="mail:info@becoled.edu.gh"
                className="text-decoration-none fw-bold lead text-primary"
              >
                info@nsacoe.edu.gh
              </a>
            </div>
            <div className="col-md-4 text-start text-main">
              <h1 className="display-5 fw-bold">
                <i className="bi bi-telephone-inbound text-main"></i> Voice
              </h1>
              <p>
                You can place a call to the General Office correspondence.
                <i>
                  NB: Due to our customer base, your call might delay a while
                </i>
              </p>
              <hr className="col-3 border border-warning border-2 mt-1" />
              <a
                href="tel:+233 054 653 5902"
                className="text-decoration-none fw-bold lead text-dark"
              >
                <i className="bi bi-phone text-main display-4"></i> (233) 054
                653 5902
              </a>
            </div>
            <div className="col-md-4 text-start text-main">
              <h1 className="display-5 fw-bold">
                <i className="bi bi-chat-dots text-main"></i> Social
              </h1>
              <p>
                You can also chat IT Support on WhatsApp for a fast response if
                your mails are not attended to.
                <b>To begin chatting, tap on the WhatsApp icon</b>
              </p>
              <hr className="col-3 border border-success border-2 mt-1 opacity-85" />
              <a
                href="https://wa.me/233207175809"
                className="text-decoration-none fw-bold lead text-dark"
              >
                <i className="bi bi-whatsapp text-main display-5"></i> ICT Unit
              </a>
              <br />
              <a
                href="https://facebook.com/becoled/"
                className="text-decoration-none fw-bold lead text-dark"
              >
                <i className="bi bi-facebook text-main display-5"></i> Facebook
              </a>
              <br />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
