import Navbar from '../components/Navbar';
import ContentHeader from '../components/ContentHeader';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import HistoryMain from '../components/HistoryMain';

export default function History() {
  return (
    <div className="px-0 mt-5 pt-5">
      <Navbar />
      <ContentHeader title="History" icon="bi bi-boxes text-secondary ms-2" />
      <HistoryMain />
      <Footer />
      <CopyRight />
    </div>
  );
}
