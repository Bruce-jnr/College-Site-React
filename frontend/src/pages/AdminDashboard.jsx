import { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import BottomNav from '../components/BottomNav';
import FloatingActionButton from '../components/FloatingActionButton';
import AnnouncementTab from '../components/AnnouncementTab';
import NewsTab from '../components/NewsTab';
import StaffSrcTab from '../components/StaffSrcTab';
import AdmissionsTab from '../components/AdmissionsTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="admin-dashboard">
      <DashboardHeader />

      <main className="admin-main">
        {activeTab === 'announcements' && <AnnouncementTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'src' && <StaffSrcTab />}
        {activeTab === 'admissions' && <AdmissionsTab />}
      </main>

      {activeTab !== 'src' && activeTab !== 'admissions' && (
        <FloatingActionButton />
      )}

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
