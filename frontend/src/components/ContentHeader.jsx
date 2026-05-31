export default function ContentHeader({ title, icon }) {
  return (
    <div className="container mt-5">
      <h1 className="display-4 text-secondary lh-1 fw-bold">
        <i className={icon}></i> <span className="brand">{title}</span>
      </h1>
      <hr />
    </div>
  );
}
