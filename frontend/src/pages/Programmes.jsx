import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import ContentHeader from '../components/ContentHeader';
import BannerContent from '../components/BannerContent';
import ProgrammesMain from '../components/ProgrammesMain';
import BEdit3 from '../assets/BEdit3.png';

export default function Programmes() {
  return (
    <div className="mt-5 pt-5">
      <Navbar />
      <BannerContent image={BEdit3} title="Programmes" />
      <ContentHeader
        title="Programme"
        icon="bi bi-mortarboard-fill text-secondary ms-2"
      />
      <ProgrammesMain />
      <Footer />
      <CopyRight />
    </div>
  );
}
