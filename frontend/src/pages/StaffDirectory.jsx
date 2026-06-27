import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import BannerContent from '../components/BannerContent';
import ContentHeader from '../components/ContentHeader';
import FilterBar from '../components/FilterBar';
import StaffMain from '../components/StaffMain';
import BEdit1 from '../assets/BEdit1.png';

export default function StaffDirectory() {
  const [allStaff, setAllStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(
          '/api/staff?type=teaching',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch staff directory');
        }
        const data = await response.json();
        setAllStaff(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const departments = [
    ...new Set(allStaff.map((s) => s.department).filter(Boolean)),
  ].sort();

  const filteredStaff = allStaff.filter((m) => {
    const matchSearch =
      !searchQuery ||
      m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.position &&
        m.position.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchDept = !departmentFilter || m.department === departmentFilter;

    return matchSearch && matchDept;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('');
  };

  return (
    <div className="mt-5 pt-5">
      <Navbar />
      <BannerContent
        title="Academic Staff Directory"
        breadcrumb="Staff Directory"
        description="Welcome to the Staff Directory. Find more information about the staff, personnel and functions"
        image={BEdit1}
      />
      <ContentHeader
        title="Staff Directory"
        icon="bi bi-people-fill text-secondary ms-2"
      />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        departmentFilter={departmentFilter}
        onDepartmentChange={(e) => setDepartmentFilter(e.target.value)}
        departments={departments}
        staffCount={filteredStaff.length}
        loading={loading}
        onClearFilters={clearFilters}
      />

      <StaffMain staff={filteredStaff} loading={loading} error={error} />

      <Footer />
      <CopyRight />
    </div>
  );
}
