import Navbar from '../components/Navbar';
import ContentHeader from '../components/ContentHeader';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import BannerContent from '../components/BannerContent';
import BEdit1 from '../assets/BEdit1.png';
import RegistryMain from '../components/RegistryMain';
import RegistryPersonnel from '../components/RegistryPersonnel';

export default function Registry() {
  return (
    <div className="mx-0 mt-5 pt-5">
      <Navbar />
      <BannerContent
        title="Registry"
        breadcrumb="Registry"
        image={BEdit1}
        description=" Welcome to the College Registry. Find more information about the
              registry, personnel and functions"
      />
      <ContentHeader
        title="Registry"
        icon="bi bi-check2-circle text-secondary ms-2"
      />
      <RegistryMain />
      <ContentHeader
        title="Personnel"
        icon="bi bi-people-fill text-secondary ms-2"
      />
      <RegistryPersonnel />
      <Footer />
      <CopyRight />
    </div>
  );
}
