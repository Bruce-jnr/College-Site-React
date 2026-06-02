import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import ContentHeader from '../components/ContentHeader';

export default function Programmes() {
  return (
    <div className="mt-5 pt-5">
      <Navbar />
      <ContentHeader
        title="Programmes"
        icon="bi bi-mortarboard-fill text-secondary ms-2"
      />
      <Footer />
      <CopyRight />
    </div>
  );
}
