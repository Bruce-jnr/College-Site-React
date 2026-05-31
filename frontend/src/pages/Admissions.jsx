import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import AdmissionsMain from '../components/AdmissionMain';
import ContentHeader from '../components/ContentHeader';

export default function Admissions() {
  return (
    <div className="mx-0 mt-5 pt-5">
      <Navbar />

      <ContentHeader
        title="Admissions"
        icon="bi bi-mortarboard-fill text-secondary ms-2"
      />
      <AdmissionsMain />
      <Footer />
      <CopyRight />
    </div>
  );
}
