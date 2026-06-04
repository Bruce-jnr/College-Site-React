import { useState, useEffect, useRef } from 'react';

export default function StaffSrcTab() {
  const [activeTab, setActiveTab] = useState('teaching');
  const token = localStorage.getItem('token');

  // Staff state
  const [staffList, setStaffList] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(true);

  // SRC state
  const [srcList, setSrcList] = useState([]);
  const [loadingSrc, setLoadingSrc] = useState(true);

  // Form states
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [qualification, setQualification] = useState('');
  const [year, setYear] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRefStaff = useRef(null);
  const fileInputRefSrc = useRef(null);

  const fetchStaff = async () => {
    try {
      setLoadingStaff(true);
      const res = await fetch('http://localhost:3000/api/staff/history?type=teaching', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) { window.location.href = '/login'; return; }
      const data = await res.json();
      setStaffList(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStaff(false);
    }
  };

  const fetchSrc = async () => {
    try {
      setLoadingSrc(true);
      const res = await fetch('http://localhost:3000/api/src/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) { window.location.href = '/login'; return; }
      const data = await res.json();
      setSrcList(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSrc(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'teaching') {
      fetchStaff();
    } else {
      fetchSrc();
    }
    
    // Clear forms when switching tabs
    setFullName('');
    setPosition('');
    setDepartment('');
    setQualification('');
    setYear('');
    setIsCurrent(false);
    setImageFile(null);
    if (fileInputRefStaff.current) fileInputRefStaff.current.value = '';
    if (fileInputRefSrc.current) fileInputRefSrc.current.value = '';
  }, [activeTab]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmitStaff = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('position', position);
    formData.append('department', department);
    formData.append('qualification', qualification);
    formData.append('type', 'teaching');
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await fetch('http://localhost:3000/api/staff', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        alert('Staff added successfully!');
        setFullName(''); setPosition(''); setDepartment(''); setQualification(''); setImageFile(null);
        if (fileInputRefStaff.current) fileInputRefStaff.current.value = '';
        fetchStaff();
      } else {
        alert('Failed to add staff');
      }
    } catch (e) {
      console.error(e);
      alert('Error adding staff');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSrc = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', fullName);
    formData.append('position', position);
    formData.append('year', year);
    formData.append('isCurrent', isCurrent);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await fetch('http://localhost:3000/api/src', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        alert('SRC executive added successfully!');
        setFullName(''); setPosition(''); setYear(''); setIsCurrent(false); setImageFile(null);
        if (fileInputRefSrc.current) fileInputRefSrc.current.value = '';
        fetchSrc();
      } else {
        alert('Failed to add SRC executive');
      }
    } catch (e) {
      console.error(e);
      alert('Error adding SRC executive');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!window.confirm('Delete this staff member?')) return;
    try {
      await fetch(`http://localhost:3000/api/staff/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchStaff();
    } catch (e) {}
  };

  const handleDeleteSrc = async (id) => {
    if (!window.confirm('Delete this SRC executive?')) return;
    try {
      await fetch(`http://localhost:3000/api/src/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchSrc();
    } catch (e) {}
  };

  return (
    <section className="dashboard-section">
      <div className="toggle-tabs">
        <button 
          className={activeTab === 'teaching' ? 'active' : ''} 
          type="button"
          onClick={() => setActiveTab('teaching')}
        >
          Teaching
        </button>
        <button 
          className={activeTab === 'src' ? 'active' : ''} 
          type="button"
          onClick={() => setActiveTab('src')}
        >
          SRC Executives
        </button>
      </div>

      {activeTab === 'teaching' && (
        <>
          <div className="staff-mini-grid">
            {loadingStaff ? <p className="text-muted text-center w-100" style={{ gridColumn: 'span 2' }}>Loading...</p> : 
             staffList.length === 0 ? <p className="text-muted text-center w-100" style={{ gridColumn: 'span 2' }}>No staff found.</p> :
             staffList.map(staff => (
               <StaffMiniCard 
                 key={staff.id} 
                 name={staff.full_name} 
                 role={staff.position} 
                 image={staff.imageUrl}
                 onDelete={() => handleDeleteStaff(staff.id)}
               />
             ))
            }
          </div>

          <form className="dark-form-card" onSubmit={handleSubmitStaff}>
            <h3>Add Staff Member</h3>

            <input type="text" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input type="text" placeholder="Position/Role" required value={position} onChange={(e) => setPosition(e.target.value)} />
            <input type="text" placeholder="Department (e.g. Science)" value={department} onChange={(e) => setDepartment(e.target.value)} />
            <input type="text" placeholder="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
            
            <label className="text-white small mt-3 d-block">Staff Photo</label>
            <input type="file" ref={fileInputRefStaff} onChange={handleImageChange} accept="image/*" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register Staff'}
            </button>
          </form>
        </>
      )}

      {activeTab === 'src' && (
        <>
          <h3 className="section-heading text-main">SRC Council Directory</h3>
          <div className="d-flex flex-column gap-3 mb-4">
            {loadingSrc ? <p className="text-muted">Loading SRC...</p> :
             srcList.length === 0 ? <p className="text-muted">No SRC executives found.</p> :
             srcList.map(src => (
              <div className="src-card position-relative" key={src.id}>
                <span className="material-symbols-outlined">account_balance</span>
                <div>
                  <strong>{src.name}</strong>
                  <p>{src.position} - {src.year} {src.isCurrent ? '(Current)' : ''}</p>
                </div>
                <button 
                  type="button" 
                  className="bg-light"
                  style={{ color: 'red' }} 
                  onClick={() => handleDeleteSrc(src.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
             ))
            }
          </div>

          <form className="dark-form-card" onSubmit={handleSubmitSrc}>
            <h3>Add SRC Executive</h3>

            <input type="text" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input type="text" placeholder="Position" required value={position} onChange={(e) => setPosition(e.target.value)} />
            <input type="text" placeholder="Year (e.g. 2023-2024)" required value={year} onChange={(e) => setYear(e.target.value)} />
            
            <div className="form-check mt-3">
              <input className="form-check-input" type="checkbox" id="isCurrent" checked={isCurrent} onChange={(e) => setIsCurrent(e.target.checked)} />
              <label className="form-check-label text-white" htmlFor="isCurrent">
                Mark as Current Executive
              </label>
            </div>

            <label className="text-white small mt-3 d-block">Portrait Photo</label>
            <input type="file" ref={fileInputRefSrc} onChange={handleImageChange} accept="image/*" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add SRC Member'}
            </button>
          </form>
        </>
      )}
    </section>
  );
}

function StaffMiniCard({ name, role, image, onDelete }) {
  return (
    <div className="staff-mini-card position-relative shadow-sm rounded-4 border-0">
      <div className="staff-mini-avatar">
        <img src={image ? `http://localhost:3000${image}` : "https://ui-avatars.com/api/?name=Staff"} alt={name} />
      </div>

      <h5 className="fs-6 fw-bold text-main">{name}</h5>
      <p className="small mb-2 text-muted">{role}</p>
      
      <button 
        type="button" 
        className="btn btn-sm text-danger p-0 border-0" 
        onClick={onDelete}
        title="Delete"
        style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent' }}
      >
        <span className="material-symbols-outlined pe-none" style={{ fontSize: '1.2rem' }}>delete</span>
      </button>
    </div>
  );
}
