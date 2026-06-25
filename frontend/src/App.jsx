import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import CollegePrincipal from './pages/CollegePrincipal.jsx';
import Management from './pages/Management.jsx';
import Contact from './pages/Contact.jsx';
import Governance from './pages/Governance.jsx';
import Registry from './pages/Registry.jsx';
import Admissions from './pages/Admissions.jsx';
import Programmes from './pages/Programmes.jsx';
import Library from './pages/Library.jsx';
import ICT from './pages/ICT.jsx';
import StudentAffairs from './pages/StudentAffairs.jsx';
import SRC from './pages/SRC.jsx';
import Finance from './pages/Finance.jsx';
import StaffDirectory from './pages/StaffDirectory.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Login from './pages/Login.jsx';
import Precis from './pages/Precis.jsx';
import History from './pages/History.jsx';
import News from './pages/News.jsx';
import NewsDetails from './components/NewsDetails.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';

function App() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 600, once: true });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/college-principal" element={<CollegePrincipal />} />
        <Route path="/management" element={<Management />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/library" element={<Library />} />
        <Route path="/ict" element={<ICT />} />
        <Route path="/src" element={<SRC />} />
        <Route path="/student-affairs" element={<StudentAffairs />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/staff-directory" element={<StaffDirectory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/news" element={<News />} />
        <Route path="/news-details" element={<NewsDetails />} />
        <Route path="/precis" element={<Precis />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
