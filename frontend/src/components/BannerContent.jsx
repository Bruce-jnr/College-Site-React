export default function BannerContent({
  image,
  breadcrumb,
  title,
  description,
}) {
  return (
    <section>
      <div
        className="hero-banner"
        style={{
          background: `url(${image})`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(3, 17, 54, 0.67)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container p-4">
          <nav role="navigation">
            <ol className="breadcrumb mt-3">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none text-light">
                  <i className="fa fa-home"></i> Home
                </a>
              </li>
              <li
                className="breadcrumb-item active text-sec"
                style={{ color: 'white' }}
              >
                {breadcrumb} <small>(Current Page)</small>
              </li>
            </ol>
          </nav>

          <h1 className="text-light">{title}</h1>

          {description && (
            <div className="row">
              <p
                className="col-md-8 col-12 text-light lead"
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}
              >
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
