import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import ContentHeader from '../components/ContentHeader';
import BannerContent from '../components/BannerContent';
import StudentAffairsMain from '../components/StudentAffairsMain';

export default function StudentAffairs() {
  return (
    <div className="mt-5 pt-5">
      <Navbar />
      <ContentHeader
        title="Dean of Student Affairs"
        icon="bi bi-people-fill text-secondary ms-2"
      />
      <StudentAffairsMain />
      <Footer />
      <CopyRight />
    </div>
  );
}
