import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CollegePrincipal from './pages/CollegePrincipal.jsx';
import Administration from './pages/Administration.jsx';
import Academics from './pages/Academic.jsx';
import Management from './pages/Management.jsx';
import Contact from './pages/Contact.jsx';
import Governance from './pages/Governance.jsx';
import Registry from './pages/Registry.jsx';
import Admissions from './pages/Admissions.jsx';

function App() {
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

        <Route path="/administration" element={<Administration />} />

        <Route path="/academics" element={<Academics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
