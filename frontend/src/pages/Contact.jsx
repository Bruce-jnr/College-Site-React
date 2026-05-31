import Navbar from '../components/Navbar';
import BannerContent from '../components/BannerContent';
import Map from '../components/Map';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import ContactUsMain from '../components/ContactUsMain';
import BEdit1 from '../assets/BEdit1.png';

export default function Contact() {
  return (
    <div className="px-0 mt-5 pt-5">
      <Navbar />
      <BannerContent
        title="Contact Us"
        description="Reach Nsawkaw College of Education using any of the communication channels below. You can also follow the Google Map directions on this page to visit us"
        image={BEdit1}
        breadcrumb="Contact Us"
      />
      <ContactUsMain />
      <Map />
      <Footer />
      <CopyRight />
    </div>
  );
}
