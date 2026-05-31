export default function Card({ image, name, position }) {
  return (
    <div className="card" style={{ width: '18rem', height: '25rem' }}>
      <img
        src={image}
        alt={name}
        className="img-fluid"
        loading="lazy"
      />

      <div className="card-body bg-white text-center">
        <p className="card-text text-main">
          <i className="bi bi-person-fill text-warning"></i>{' '}
          <b>{name}</b>
        </p>

        <hr className="mb-2 mt-1" />

        <span className="text-primary">
          <i>
            <small>{position}</small>
          </i>
        </span>
      </div>
    </div>
  );
}