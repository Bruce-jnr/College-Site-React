export default function ManagementCard({image, name, position, email}) {
    return (
        <div className="card shadow">
                <img
                  className="img-fluid fit-img-30vh"
                  src={image}
                  alt="Nsawkaw College of Education"
                  description="Sylvester Donkor - Principal of Berkeum College of Education"
                  loading="lazy"
                />
                <div className="card-body">
                  <p className="card-text h3 cal-sans">
                    <b>{name}</b>
                  </p>
                  <hr className="mb-2 mt-1" />
                  <span className="text-muted fs-4">{position}</span>
                  <hr className="mb-2 mt-1" />
                  <span className="text-primary"
                    ><i className="bi bi-envelope"></i>
                    {email}</span
                  >
                </div>
        </div>
    )
}