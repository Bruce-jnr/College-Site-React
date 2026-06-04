import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import ContentHeader from '../components/ContentHeader';
import BannerContent from '../components/BannerContent';
import SRCMain from '../components/SRCMain';
import BEdit3 from '../assets/BEdit3.png';

export default function SRC() {
  return (
    <div className="mt-5 pt-5">
      <Navbar />
      <BannerContent
        image={BEdit3}
        breadcrumb="SRC"
        title="SRC"
        description="Welcome to the SRC. Find more information about the SRC, personnel and functions"
      />
      <ContentHeader title="SRC" icon="bi bi-people-fill text-secondary ms-2" />
      <SRCMain />
      <Footer />
      <CopyRight />
    </div>
  );
}
