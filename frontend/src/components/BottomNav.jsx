const navItems = [
  { id: 'announcements', label: 'Announcements', icon: 'campaign' },
  { id: 'news', label: 'News', icon: 'newspaper' },
  { id: 'src', label: 'SRC', icon: 'groups' },
  { id: 'admissions', label: 'Admissions', icon: 'school' },
];

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="dashboard-bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`bottom-nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => {
            setActiveTab(item.id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
}
