export default function FilterBar({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  departments,
  staffCount,
  loading,
  onClearFilters,
}) {
  const hasFilters = searchQuery || departmentFilter;

  return (
    <div className="filter-bar py-3 bg-light border-bottom">
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-md-5">
            <div className="position-relative">
              <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input
                type="text"
                className="form-control ps-5 rounded-pill shadow-sm"
                placeholder="Search by name or position..."
                aria-label="Search staff"
                value={searchQuery}
                onChange={onSearchChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select rounded-pill shadow-sm form-select-sm py-2"
              aria-label="Filter by department"
              value={departmentFilter}
              onChange={onDepartmentChange}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-center gap-2">
            <span className="badge text-bg-warning rounded-pill px-3 py-2 shadow-sm fs-6">
              {loading ? 'Loading...' : `${staffCount} staff`}
            </span>
            {hasFilters ? (
              <button
                className="btn btn-outline-danger btn-sm rounded-pill shadow-sm ms-2"
                onClick={onClearFilters}
              >
                <i className="bi bi-x-lg"></i> Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
