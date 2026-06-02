import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import ContentHeader from '../components/ContentHeader';
import BannerContent from '../components/BannerContent';
import LibraryMain from '../components/LibraryMain';
import BEdit2 from '../assets/BEdit3.png';

export default function Library() {
  return (
    <div className="mt-5 pt-5">
      <Navbar />
      <BannerContent image={BEdit2} breadcrumb="Library" title="Library" />
      <ContentHeader
        title="Library"
        icon="bi bi-journal-check text-secondary ms-2"
      />
      <LibraryMain />
      <Footer />
      <CopyRight />
    </div>
  );
}
