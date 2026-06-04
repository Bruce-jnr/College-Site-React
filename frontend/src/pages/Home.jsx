import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import Map from '../components/Map';
import Announcement from '../components/Announcement';
import News from '../components/News';
import HomeAdmissionsBanner from '../components/HomeAdmissionsBanner';

export default function Home() {
  return (
    <div className="px-0 mt-5 pt-5">
      <Navbar />
      <Carousel />
      <Announcement />
      <News />
      <HomeAdmissionsBanner />
      <Map />
      <Footer />
      <CopyRight />
    </div>
  );
}
